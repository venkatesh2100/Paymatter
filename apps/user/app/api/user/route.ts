import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";

const client = new PrismaClient();


export const GET = async () => {
  // const hashedPassword = await bcrypt.hash("code", 10);

  await client.user.create({
    data: {
      email: "thisisvenky.ynm@gmail.com",
      username: "venky",
      password: "code",
      Phonenumber: "91",
    },
  });

  return NextResponse.json({
    message: "User Created Successfully!",
  });
};
