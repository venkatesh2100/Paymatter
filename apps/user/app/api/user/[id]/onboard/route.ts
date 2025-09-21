'use server'
import { NextResponse } from "next/server";
import prisma from "@repo/db";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { age, gender, onboarded, location } = body;

    // Generate image based on gender (basic example)
    let image: string | null = null;
    if (gender === "MALE") {
      const random = Math.floor(Math.random() * 5) + 1; // pick 1-5
      image = `/profiles/m/${random}.webp`;
    } else if (gender === "FEMALE") {
      const random = Math.floor(Math.random() * 5) + 1;
      image = `/profiles/f/${random}.webp`;
    }

    // First, check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(params.id) },
      include: { balance: true },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Update user + ensure balance exists
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: Number(params.id) },
        data: {
          age: age || null,
          gender,
          location,
          onboarded,
          ...(image ? { image } : {}), // only set if not null
        },
      });

      // Ensure balance exists and increment
      await tx.balance.upsert({
        where: { userId: user.id },
        update: { amount: { increment: 1000 } },
        create: { userId: user.id, amount: 1000 },
      });

      return user;
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to onboard" },
      { status: 500 }
    );
  }
}


function getRandomProfile(gender: string): string {
  const profiles: Record<string, string[]> = {
    MALE: [
      "/profiles/m/m1.webp",
      "/profiles/m/m2.webp",
      "/profiles/m/m3.webp",
      "/profiles/m/m4.webp",
      "/profiles/m/m5.webp",
      "/profiles/m/m6.webp",
      "/profiles/m/m7.jpg",
      "/profiles/m/m8.webp",
      "/profiles/m/m9.jpg",
      "/profiles/m/m10.webp",
      "/profiles/m/m11.webp",
    ],
    FEMALE: [
      "/profiles/f/f1.jpg",
      "/profiles/f/f2.jpg",
      "/profiles/f/f3.jpg",
      "/profiles/f/f4.jpg",
      "/profiles/f/f5.jpg",
      "/profiles/f/f6.jpg",
      "/profiles/f/f7.jpg",
      "/profiles/f/f8.jpg",
      "/profiles/f/f9.jpg",
      "/profiles/f/f10.jpg",
    ],
    OTHER: [
      "/profiles/o/o1.webp",
      "/profiles/o/o2.webp",
      "/profiles/o/o3.webp",
      "/profiles/o/o4.webp",
      "/profiles/o/o5.jpg",
    ],
  };

  const set = profiles[gender.toUpperCase()] ?? profiles["OTHER"];
  return set[Math.floor(Math.random() * set.length)];
}
