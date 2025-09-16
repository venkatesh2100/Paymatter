import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../lib/auth";
const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const txns = await prisma.onRamptransactions.findMany({
    where: { userId: Number(session.user.id) },
    orderBy: { startTime: "desc" },
  });

  return NextResponse.json(txns);
}
