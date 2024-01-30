import { sql } from '@vercel/postgres'
import {
  CustomerField,
  CustomersTable,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  rostiBaresRestaurantsFields,
  baresSearchParamsType,
} from './types/definitions'
import { formatCurrency } from './utils'
import { unstable_noStore as noStore } from 'next/cache'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore()
  try {
    const data = await sql<Revenue>`SELECT * FROM revenue`
    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch revenue data.')
  }
}

export async function fetchLatestInvoices() {
  noStore()
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }))
    return latestInvoices
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch the latest invoices.')
  }
}

export async function fetchCardData() {
  noStore()
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ])

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0')
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0')
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0')
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0')

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to card data.')
  }
}

const ITEMS_PER_PAGE = 6
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `

    return invoices.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch invoices.')
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore()
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch total number of invoices.')
  }
}

export async function fetchInvoiceById(id: string) {
  noStore()
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }))
    return invoice[0]
  } catch (error) {
    console.error('Database Error:', error)
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `

    const customers = data.rows
    return customers
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to fetch all customers.')
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTable>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }))

    return customers
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to fetch customer table.')
  }
}

//new ones

export async function fetchRostyBarsRestaurant({
  query,
}: {
  query: baresSearchParamsType
}) {
  try {
    const data = await sql<rostiBaresRestaurantsFields>`
      SELECT
      id, name, street, street_number, description, phone, phone2
      FROM rosty_bar_restaurants
      ORDER BY name ASC
    `
    const response = data.rows.map(
      ({
        id,
        name,
        street,
        street_number: streetNumber,
        description,
        phone,
        phone2,
      }) => {
        return { id, name, street, streetNumber, description, phone, phone2 }
      }
    )

    const rostyBarResta = response
    return { rostyBarResta }
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to fetch all customers.')
  }
}

export async function getRostyBarsRestaurant({
  query,
}: {
  query: baresSearchParamsType
}) {
  const rostyBarResta = await prisma.rosty_bar_restaurants.findMany({
    where: query?.buscar
      ? {
          deleted: false,
          OR: [
            { name: { contains: query?.buscar, mode: 'insensitive' } },
            {
              foodTypes: {
                some: {
                  food_type: {
                    name: { contains: query?.buscar, mode: 'insensitive' },
                  },
                },
              },
            },
          ],
        }
      : { deleted: false },
    include: {
      foodTypes: {
        where: {
          deleted: false,
        },
        select: {
          food_type: { select: { name: true } },
        },
      },
      restAtributtes: {
        where: {
          deleted: false,
        },
        select: {
          value: true,
          observations: true,
          rest_attributes: { select: { name: true } },
        },
      },
    },
    orderBy: { name: 'asc' },
  })

  return { rostyBarResta }
}

export const getRostyBarsRestaurantByID = async ({
  idToSearch,
}: {
  idToSearch: string
}) => {
  const idParseIntToSearch = parseInt(idToSearch)
  try {
    const rostyBarResta = await prisma.rosty_bar_restaurants.findUnique({
      where: { id: idParseIntToSearch },
      include: {
        foodTypes: {
          select: {
            id: true,
            id_food_type: true,
            id_restaurant: true,
            deleted: true,
            food_type: { select: { name: true } },
          },
        },
        restAtributtes: {
          select: {
            id: true,
            observations: true,
            value: true,
            deleted: true,
            rest_attributes: { select: { name: true } },
          },
        },
      },
    })
    return { rostyBarResta }
  } catch (e) {
    return null
  }
}

export async function getRostyBarsRestaurantAdmin({
  query,
}: {
  query: baresSearchParamsType
}) {
  const rostyBarResta = await prisma.rosty_bar_restaurants.findMany({
    where: query?.buscar
      ? {
          OR: [
            { name: { contains: query?.buscar, mode: 'insensitive' } },
            {
              foodTypes: {
                some: {
                  food_type: {
                    name: { contains: query?.buscar, mode: 'insensitive' },
                  },
                },
              },
            },
          ],
        }
      : {},
    include: {
      foodTypes: {
        select: {
          food_type: { select: { name: true } },
        },
      },
    },
    orderBy: { name: 'asc' },
  })

  return { rostyBarResta }
}
