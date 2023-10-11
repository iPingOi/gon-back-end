import { PrismaClient } from '@prisma/client'
import { populate } from './populate'

const prisma = new PrismaClient()

async function main () {
  await prisma.product.createMany({
    data: populate
  })
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
