
import { NextResponse } from "next/server";
import prisma from "@repo/db"; // adjust import path

export async function GET() {
  try {
    const leaderboard = await prisma.balance.findMany({
      select: {
        amount: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      orderBy: {
        amount: "desc",
      },
    });

    // Flatten for easier frontend
    const formatted = leaderboard.map((entry) => ({
      id: entry.user.id,
      username: entry.user.username,
      email: entry.user.email,
      amount: entry.amount,
    }));

    return NextResponse.json({ leaderboard: formatted });
  } catch (error) {
    console.error("Leaderboard fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
