'use server'
import { NextResponse } from "next/server";
import prisma from "@repo/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
    include: { balance: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { age, gender, onboarded, location } = body;

    // First, check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(params.id) },
      include: { balance: true }
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Update user and handle balance creation/update in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update user details
      const user = await tx.user.update({
        where: { id: Number(params.id) },
        data: {
          age: age || null,
          gender,
          location,
          onboarded,
        },
      });

      // Create new balance with bonus
      await tx.balance.create({
        data: {
          userId: user.id,
          amount: 1000,
          locked: 0,
        },
      });

      return user;
    });
    // Fetch the updated user with balance

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to onboard" },
      { status: 500 }
    );
  }
}
