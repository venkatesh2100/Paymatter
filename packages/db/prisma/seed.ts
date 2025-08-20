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
      email: "dreamxcodey@gmail.com",
      streakCount: 9,
      longestStreak: 11,
      lastStreakDate: new Date(),
      balance: {
        create: {
          amount: 20000,
          locked: 0
        }
      },
      onRamptransactions: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token__1",
          provider: "SBI Bank",
        },
      },
    },
  })
  const zoro = await prisma.user.upsert({
    where: { phonenumber: '2222222222' },
    update: {},
    create: {
      phonenumber: '2222222222',
      password: await bcrypt.hash('bob', 10),
      username: 'bob',
      email: "zoroboro.ynm@gmail.com",
      streakCount: 4,
      longestStreak: 5,
      lastStreakDate: new Date(),
      balance: {
        create: {
          amount: 10020,
          locked: 0
        }
      },
      onRamptransactions: {
        create: {
          startTime: new Date(),
          status: "Success",
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
