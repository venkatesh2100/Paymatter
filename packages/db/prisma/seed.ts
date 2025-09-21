import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();
function generatePublicId() {
  return crypto.randomUUID();
}
async function main() {
  // Example user: Venky
  const venky = await prisma.user.upsert({
    where: { phonenumber: "111" },
    update: {},
    create: {
      phonenumber: "111",
      password: await bcrypt.hash("venky@4**", 10),
      username: "venky",
      email: "dreamxcodey@gmail.com",
      age: 23,
      gender: "MALE",
      publicKey: generatePublicId(),

      location: "Yanam",
      onboarded: true,
      image: "/profiles/m/m6.webp", // default avatar
      streakCount: 2,
      longestStreak: 3,
      lastStreakDate: new Date(),
      balance: {
        create: {
          amount: 5000,
          locked: 200,
        },
      },
      onRamptransactions: {
        create: {
          startTime: new Date(),
          status: "Processing",
          amount: 1000,
          token: "token__1",
          provider: "฿ Bank",
        },
      },
    },
  });

  // Example user: Zoro
  const zoro = await prisma.user.upsert({
    where: { phonenumber: "222" },
    update: {},
    create: {
      phonenumber: "222",
      password: await bcrypt.hash("zoro@4**", 10),
      username: "zoro",
      email: "zoroboro.ynm@gmail.com",
      age: 21,
      gender: "MALE",

      publicKey: generatePublicId(),
      location: "Japan",
      onboarded: true,
      image: "/profiles/m/m11.webp", // default avatar
      streakCount: 4,
      longestStreak: 5,
      lastStreakDate: new Date(),
      balance: {
        create: {
          amount: 10020,
          locked: 0,
        },
      },
      onRamptransactions: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 2000,
          token: "token__2",
          provider: "฿ Bank",
        },
      },
    },
  });

  const Nami = await prisma.user.upsert({
    where: { phonenumber: "333" },
    update: {},
    create: {
      phonenumber: "333",
      password: await bcrypt.hash("nami@4**", 10),
      username: "Nami",
      email: "venkyvenkat.iit@gmail.com",
      age: 26,
      gender: "FEMALE",

      publicKey: generatePublicId(),
      location: "Yanam",
      onboarded: true,
      image: "/profiles/f/f1.jpg", // default avatar
      streakCount: 3,
      longestStreak: 4,
      lastStreakDate: new Date(),
      balance: {
        create: {
          amount: 3000,
          locked: 200,
        },
      },
      onRamptransactions: {
        create: {
          startTime: new Date(),
          status: "Processing",
          amount: 1000,
          token: "token__3",
          provider: "฿ Bank",
        },
      },
    },
  });
}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
