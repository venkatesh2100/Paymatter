// apps/user/app/api/user/[id]/public-key/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db";
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { publicKey: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ publicKey: user.publicKey });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
