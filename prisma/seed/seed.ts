import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function run() {
  await prisma.tutorial.deleteMany()

  const promises = []

  for (let i = 0; i < 30; i++) {
    promises.push(
      prisma.tutorial.create({
        data: {
          title: faker.lorem.words(3),
        },
      }),
    )
  }

  await prisma.user.create({
    data: {
      name: 'teste',
      password: 'teste',
    },
  })

  await Promise.all(promises)
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
  })
