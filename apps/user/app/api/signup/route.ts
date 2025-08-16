// app/api/signup/route.ts
import { NextResponse } from "next/server";
import prisma from "@repo/db";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const { username, phonenumber, password, email } = await req.json();
  await getServerSession();
  if (!username || !phonenumber || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { phonenumber }],
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        phonenumber,
        email,
        password: hashedPassword,
      },
    });

    await prisma.balance.create({
      data: {
        amount: 0,
        locked: 0,
        userId: user.id,

      }
    })
    return NextResponse.json({ message: "User created", user });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }

}
