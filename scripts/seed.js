const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const {
  rostyBarsRestaruantes,
  foodTypesSeed,
} = require('../app/lib/placeholder-data.js')

const createUsers = async () => {
  const users = await prisma.users.create({
    data: {
      name: 'Facundo',
      email: 'vegafacundo187@gmail.com',
      password: await bcrypt.hash('no', 10),
      user_type_id: 1,
    },
  })
  return users
}

const createUsersTypes = async () => {
  const users = await prisma.users_types.create({
    data: {
      name: 'admin',
    },
  })
  const users2 = await prisma.users_types.create({
    data: {
      name: 'user',
    },
  })

  return users
}

const createFoodTypes = async () => {
  const insertFoodTypes = await Promise.all(
    await foodTypesSeed.map(async (foodTypesSeedItem) => {
      return await prisma.food_types.create({
        data: { name: foodTypesSeedItem.name },
      })
    })
  )
  return insertFoodTypes
}

const createRestoBars = async () => {
  const insertRostyBarsRestaruantes = await Promise.all(
    await rostyBarsRestaruantes.map(async (rostyBarsRestaruant) => {
      return await prisma.rosty_bar_restaurants.create({
        data: {
          name: rostyBarsRestaruant.name,
          street: rostyBarsRestaruant.street,
          street_number: rostyBarsRestaruant.street_number,
          description: rostyBarsRestaruant.description,
          work_time: rostyBarsRestaruant.workTime,
          phone: rostyBarsRestaruant.phone,
          phone2: rostyBarsRestaruant.phone2,
        },
      })
    })
  )
  return insertRostyBarsRestaruantes
}

async function main() {
  //const users = await createUsers()
  //const createUsersType = await createUsersTypes()

  //const foodTypesCreated = await createFoodTypes()
  //const RestoBarsCreated = await createRestoBars()

  console.log('end seed')
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
