import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../lib/auth";
const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = Number(session.user.id);

  try {
    const onRampTxns = await prisma.onRamptransactions.findMany({
      where: { userId },
      orderBy: { startTime: "desc" },
    });

    // Fetch P2P transactions where user is sender or receiver
    // const p2pTxns = await prisma.p2PTransaction.findMany({
    //   where: {
    //     OR: [{ senderID: userId }, { reciverID: userId }],
    //   },
    //   orderBy: { createdAt: "desc" },
    // });

    // const allTxns = [...onRampTxns, ...p2p];
    // console.log("All Transactions:", allTxns);

    return NextResponse.json(onRampTxns , { status: 200 });
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
