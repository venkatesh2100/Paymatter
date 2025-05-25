import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

async function main() {
  const venky = await prisma.user.upsert({
    where: { phonenumber: '99' },
    update: {},
    create: {
      phonenumber: '99',
      password: await bcrypt.hash('venky', 10),
      username: 'venky',
      balance: {
        create: {
            amount: 200000,
            locked: 0
        }
      },
      onRamptransactions: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 200000,
          token: "token__1",
          provider: "SBI Bank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { phonenumber: '2222222222' },
    update: {},
    create: {
      phonenumber: '2222222222',
      password: await bcrypt.hash('bob', 10),
      username: 'bob',
      balance: {
        create: {
            amount: 2000,
            locked: 0
        }
      },
      onRamptransactions: {
        create: {
          startTime: new Date(),
          status: "Failed",
          amount: 2000,
          token: "token__2",
          provider: "HDFC Bank",
        },
      },
    },
  })
  // console.log({ venky, bob })
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