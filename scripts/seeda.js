const { db } = require('@vercel/postgres')
const {
  invoices,
  customers,
  revenue,
  users,
  rostyBarsRestaruantes,
  foodTypesSeed,
} = require('../app/lib/placeholder-data.js')
const bcrypt = require('bcrypt')

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `

    console.log(`Created "users" table`)

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `
      })
    )

    console.log(`Seeded ${insertedUsers.length} users`)

    return {
      createTable,
      users: insertedUsers,
    }
  } catch (error) {
    console.error('Error seeding users:', error)
    throw error
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`

    console.log(`Created "invoices" table`)

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    )

    console.log(`Seeded ${insertedInvoices.length} invoices`)

    return {
      createTable,
      invoices: insertedInvoices,
    }
  } catch (error) {
    console.error('Error seeding invoices:', error)
    throw error
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `

    console.log(`Created "customers" table`)

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    )

    console.log(`Seeded ${insertedCustomers.length} customers`)

    return {
      createTable,
      customers: insertedCustomers,
    }
  } catch (error) {
    console.error('Error seeding customers:', error)
    throw error
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `

    console.log(`Created "revenue" table`)

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `
      )
    )

    console.log(`Seeded ${insertedRevenue.length} revenue`)

    return {
      createTable,
      revenue: insertedRevenue,
    }
  } catch (error) {
    console.error('Error seeding revenue:', error)
    throw error
  }
}

async function seedRestaurants(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS rosty_bar_restaurants (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        street VARCHAR(255) NOT NULL,
        street_number VARCHAR(255) NOT NULL,
        description VARCHAR(511),
        work_time VARCHAR(127) NOT NULL,
        phone VARCHAR(255),
        phone2 VARCHAR(255),
        deleted BOOLEAN  DEFAULT FALSE NOT NULL,
        deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `

    /* type rostyBarRestaurantes = {
      id: string
      rostiName: string
      street: string
      streetNumber: string
      description: string
      deleted: boolean
      //deletedAt:time 

rostyBarsRestaruantes
    } */

    /* const insertedUsers = await Promise.all(
      rostyBarsRestaruantes.map(async (rostyBarsRestaruante) => {
        return client.sql`
        INSERT INTO rosty_bar_restaurants ( name, street, street_number,description,work_time,phone,phone2, deleted, deleted_at)
        VALUES ( ${rostyBarsRestaruante.name}, ${rostyBarsRestaruante.street}, ${rostyBarsRestaruante.street_number}, ${rostyBarsRestaruante.description},${rostyBarsRestaruante.workTime}, ${rostyBarsRestaruante.phone}, ${rostyBarsRestaruante.phone2},FALSE, NOW())
        ON CONFLICT (id) DO NOTHING;
      `
      })
    ) */

    console.log(`Created "rosty_bar_restarants" table`)

    return {
      createTable,
    }
  } catch (error) {
    console.error('Error seeding users:', error)
    throw error
  }
}

async function seedFoodTypes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS food_types (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        deleted BOOLEAN  DEFAULT FALSE NOT NULL,
        deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `

    /* type foodTypes = {
        id: string
        foodType: string
        deleted: boolean
        //deletedAt:time
      }
    */

    /*  const insertedFoodTypes = await Promise.all(
      foodTypesSeed.map(async (foodType) => {
        return client.sql`
          INSERT INTO food_types (  name, deleted, deleted_at)
          VALUES ( ${foodType.name}, FALSE, NOW())
          ON CONFLICT (id) DO NOTHING;
        `
      })
    ) */

    console.log(`Created "food_types" table`)

    return {
      createTable,
    }
  } catch (error) {
    console.error('Error seeding users:', error)
    throw error
  }
}

async function seedRestaurantsTypesFood(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS rosty_bar_rest_Types_Food (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        id_restaurant UUID NOT NULL,
        id_food_type UUID NOT NULL,
        deleted BOOLEAN NOT NULL default FALSE,
        deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `

    /* 
      type rostyBarRestTypesFood = {
        id_restaurant: string
        id_food_type: string
        deleted: boolean
        //deletedAt:time
      }
    */

    /*  const insertedFoodTypes = await Promise.all(
      [
        {
          idRestaurant: '3ca04a3c-2580-4b35-9515-217cccb66935',
          idFoodType: '365bf343-f56c-47c7-9024-3b1a1bbf9002',
        },
      ].map(async (foodRestoType) => {
        return client.sql`
            INSERT INTO rosty_bar_rest_Types_Food (  id_restaurant, id_food_type, deleted, deleted_at)
            VALUES ( ${foodRestoType.idRestaurant},${foodRestoType.idFoodType}, FALSE, NOW())
            ON CONFLICT (id) DO NOTHING;
          `
      })
    ) */

    console.log(`Created "rosty_bar_rest_Types_Food" table`)

    return {
      createTable,
    }
  } catch (error) {
    console.error('Error seeding users:', error)
    throw error
  }
}

async function seedRestaurantsTypesAttributes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS rosty_bar_rest_Types_Food (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        id_restaurant UUID NOT NULL,
        id_Attributes_type UUID NOT NULL,
        deleted BOOLEAN NOT NULL default FALSE,
        deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `

    /* 
      type rostyBarRestTypesFood = {
        id_restaurant: string
        idFoodType: string
        deleted: boolean
        //deletedAt:time
      }
    */

    console.log(`Created "rosty_bar_rest_Types_Food" table`)

    return {
      createTable,
    }
  } catch (error) {
    console.error('Error seeding users:', error)
    throw error
  }
}

async function seedAttributesTypes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS rest_attributes_types (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        deleted BOOLEAN  DEFAULT FALSE NOT NULL,
        deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `

    /* type foodTypes = {
        id: string
        foodType: string
        deleted: boolean
        //deletedAt:time
      }
    */

    console.log(`Created "food_types" table`)

    return {
      createTable,
    }
  } catch (error) {
    console.error('Error seeding users:', error)
    throw error
  }
}

async function main() {
  const client = await db.connect()

  await seedRestaurants(client)
  await seedFoodTypes(client)
  await seedRestaurantsTypesFood(client)
  await seedRestaurantsTypesAttributes(client)
  await seedAttributesTypes(client)

  await client.end()
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err)
})
