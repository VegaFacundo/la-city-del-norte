'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { auth } from '@/auth'

const prisma = new PrismaClient()

const RostiBarRestaurantSchema = z.object({
  id: z.number(),
  name: z.string({
    invalid_type_error: 'falta nombre del BRB.',
  }),
  street: z.string({
    invalid_type_error: 'falta calle.',
  }),
  street_number: z.string({
    invalid_type_error: 'falta numero de calle.',
  }),
  description: z.string().nullable(),
  work_time: z.string().nullable(),
  phone: z.string().nullable(),
  phone2: z.string().nullable(),
  deleted: z.boolean(),
  deleted_at: z.date(),
})

export type State = {
  errors?: {
    name?: string[]
    street?: string[]
    street_number?: string[]
  }
  message?: string | null
}

const RostiBarRestaurantCreateSchema = RostiBarRestaurantSchema.omit({
  id: true,
  deleted: true,
  deleted_at: true,
})

export async function createRestoBarRestaurant(
  prevState: State,
  formData: FormData
) {
  const validatedFields = RostiBarRestaurantCreateSchema.safeParse({
    name: formData.get('name'),
    street: formData.get('street'),
    street_number: formData.get('street_number'),
    description: formData.get('description'),
    work_time: formData.get('work_time'),
    phone: formData.get('phone'),
    phone2: formData.get('phone2'),
  })

  try {
    const sessionAuth = await auth()
    if ((sessionAuth?.user as any).userType !== 'admin') {
      revalidatePath('/dashboard/bar-rostis-resta')
      redirect('/dashboard/bar-rostis-resta')
      return {}
    }
  } catch (e) {
    console.log('session error', e)
  }

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields.',
    }
  }

  const { name, street, street_number, description, work_time, phone, phone2 } =
    validatedFields.data

  try {
    await prisma.rosty_bar_restaurants.create({
      data: {
        name,
        street,
        street_number,
        description,
        work_time,
        phone,
        phone2,
      },
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create rosty/bar/restaurant.',
    }
  }

  revalidatePath('/dashboard/bar-rostis-resta')
  redirect('/dashboard/bar-rostis-resta')
}

export const getAllFoodTypes = async () => {
  try {
    const allFodTypes = await prisma.food_types.findMany({
      where: { deleted: false },
      orderBy: { id: 'asc' },
    })
    return { allFodTypes }
  } catch (error) {
    return { allFodTypes: [] }
  }
}

export const getAllAttributesTypes = async () => {
  try {
    const allRestAttributesTypes = await prisma.rest_attributes_types.findMany({
      where: { deleted: false },
      orderBy: { id: 'asc' },
    })
    return { allRestAttributesTypes }
  } catch (error) {
    return { allRestAttributesTypes: [] }
  }
}

export async function editRestoBarRestaurant(
  rbrID: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = RostiBarRestaurantCreateSchema.safeParse({
    name: formData.get('name'),
    street: formData.get('street'),
    street_number: formData.get('street_number'),
    description: formData.get('description'),
    work_time: formData.get('work_time'),
    phone: formData.get('phone'),
    phone2: formData.get('phone2'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields.',
    }
  }

  const { name, street, street_number, description, work_time, phone, phone2 } =
    validatedFields.data

  const idToUpdateRBR = parseInt(rbrID)
  try {
    await prisma.rosty_bar_restaurants.update({
      where: { id: idToUpdateRBR },
      data: {
        name,
        street,
        street_number,
        description,
        work_time,
        phone,
        phone2,
      },
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create rosty/bar/restaurant.',
    }
  }

  revalidatePath('/dashboard/bar-rostis-resta')
  redirect('/dashboard/bar-rostis-resta')
}

const RostiBarRestaurantAddFoodTypeSchema = z.object({
  id_food_type: z.string(),
})

export type StateAddFoodType =
  | {
      errors?: {
        id_food_type?: string[]
        id_restaurant?: string[]
      }
      message?: string | null
    }
  | undefined

export async function addFoodTypeToRestoBarRestaurant(
  idRestaurant: string,
  prevState: StateAddFoodType,
  formData: FormData
) {
  const idRestaurantParseInt = parseInt(idRestaurant)

  const validatedFields = RostiBarRestaurantAddFoodTypeSchema.safeParse({
    id_food_type: formData.get('id_food_type'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields.',
    }
  }

  const { id_food_type } = validatedFields.data
  const idFoodTypeParseInt = parseInt(id_food_type)

  const existingEntry = await prisma.rosty_bar_rest_types_food.findMany({
    where: {
      id_restaurant: idRestaurantParseInt,
      id_food_type: idFoodTypeParseInt,
    },
  })

  if (existingEntry.length > 0) {
    return {
      message: 'Ya se encuentra el tipo de comida',
    }
  }

  try {
    await prisma.rosty_bar_rest_types_food.create({
      data: {
        id_food_type: idFoodTypeParseInt,
        id_restaurant: idRestaurantParseInt,
      },
    })
    return {
      message: 'ok',
    }
  } catch (error) {
    return {
      message: 'error en el servidor',
    }
  }
}

export async function deleteReAddFoodTypeToRestoBarRestaurant(
  idFoodTypeRestaurant: number
) {
  const existingEntry = await prisma.rosty_bar_rest_types_food.findUnique({
    where: { id: idFoodTypeRestaurant },
  })

  if (!existingEntry) {
    throw new Error(`Elemento con ID ${idFoodTypeRestaurant} no encontrado`)
  }

  try {
    await prisma.rosty_bar_rest_types_food.update({
      where: { id: idFoodTypeRestaurant },
      data: {
        deleted: !existingEntry.deleted,
      },
    })
    return { message: 'ok' }
  } catch (error) {
    return {
      message: 'Database Error: Failed to edit rosty/bar/restaurant.',
    }
  }

  //revalidatePath(`/dashboard/bar-rostis-resta/${idFoodTypeRestaurant}/edit`)
  //redirect(`/dashboard/bar-rostis-resta/${idFoodTypeRestaurant}/edit`)
}

export async function deleteReAddRestoBarRestaurant(
  idFoodTypeRestaurant: number
) {
  const existingEntry = await prisma.rosty_bar_restaurants.findUnique({
    where: { id: idFoodTypeRestaurant },
  })

  if (!existingEntry) {
    throw new Error(`Elemento con ID ${idFoodTypeRestaurant} no encontrado`)
  }

  try {
    await prisma.rosty_bar_restaurants.update({
      where: { id: idFoodTypeRestaurant },
      data: {
        deleted: !existingEntry.deleted,
      },
    })
    return { message: 'ok' }
  } catch (error) {
    return {
      message: 'Database Error: Failed to edit rosty/bar/restaurant.',
    }
  }

  //revalidatePath(`/dashboard/bar-rostis-resta/${idFoodTypeRestaurant}/edit`)
  //redirect(`/dashboard/bar-rostis-resta/${idFoodTypeRestaurant}/edit`)
}

const RostiBarRestaurantAddAttributeTypeSchema = z.object({
  id_rest_attributes_types: z.string(),
  value: z.string(),
  observations: z.string().nullable().optional(),
})

export type StateAddAttributeType =
  | {
      errors?: {
        id_rest_attributes_types?: string[]
        id_restaurant?: string[]
        value?: string[]
      }
      message?: string | null
    }
  | undefined

export async function addAttritubeToRestoBarRestaurant(
  idRestaurant: string,
  prevState: StateAddAttributeType,
  formData: FormData
) {
  const idRestaurantParseInt = parseInt(idRestaurant)

  const validatedFields = RostiBarRestaurantAddAttributeTypeSchema.safeParse({
    id_rest_attributes_types: formData.get('id_rest_attributes_types'),
    value: formData.get('value'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields.',
    }
  }
  const { id_rest_attributes_types, value, observations } = validatedFields.data
  const idAttributeTypeParseInt = parseInt(id_rest_attributes_types)

  const existingEntry = await prisma.rosty_bar_rest_rest_attributes.findMany({
    where: {
      id_restaurant: idRestaurantParseInt,
      id_rest_attributes_types: idAttributeTypeParseInt,
    },
  })

  if (existingEntry.length > 0) {
    return {
      message: 'Ya se encuentra el attributo',
    }
  }

  try {
    await prisma.rosty_bar_rest_rest_attributes.create({
      data: {
        id_rest_attributes_types: idAttributeTypeParseInt,
        id_restaurant: idRestaurantParseInt,
        value,
        observations,
      },
    })
    return {
      message: 'ok',
    }
  } catch (error) {
    return {
      message: 'error en el servidor',
    }
  }
}

const RostiBarRestaurantAttributeCreateSchema =
  RostiBarRestaurantAddAttributeTypeSchema.omit({
    id_rest_attributes_types: true,
  })

export type StateEditAttributeType =
  | {
      errors?: {
        value?: string[]
        observations?: string[]
      }
      message?: string | null
    }
  | undefined

export async function editRestoBarRestaurantAttribute(
  rbrAttributeID: number,
  prevState: StateEditAttributeType,
  formData: FormData
) {
  const validatedFields = RostiBarRestaurantAttributeCreateSchema.safeParse({
    value: formData.get('value'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields.',
    }
  }

  const { value, observations } = validatedFields.data

  try {
    await prisma.rosty_bar_rest_rest_attributes.update({
      where: { id: rbrAttributeID },
      data: {
        value,
        observations,
      },
    })
    return {
      message: 'ok',
    }
  } catch (error) {
    return {
      message: 'Database Error: Failed to edit attribute.',
    }
  }

  //revalidatePath('/dashboard/bar-rostis-resta')
  //redirect('/dashboard/bar-rostis-resta')
}
