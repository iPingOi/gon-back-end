import { prisma } from '../src/utils/prisma'

import { populate } from './populate'

async function main() {
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
