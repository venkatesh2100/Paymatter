import { NextResponse } from "next/server";
import prisma from "@repo/db";
import redis from "../../lib/redis";
const LEADERBOARD_CACHE_KEY = "leaderboard";

export async function GET() {
  try {
    // 1️⃣ Try cache first
    const cached = await redis.get(LEADERBOARD_CACHE_KEY);
    if (cached) {
      const data = JSON.parse(cached as string);
      return NextResponse.json({ leaderboard: data, cached: true });
    }

    const leaderboard = await prisma.balance.findMany({
      select: {
        amount: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            image: true,
            streakCount: true
          },
        },
      },
      orderBy: {
        amount: "desc",
      },
      take: 50, // optional: limit to top 50
    });

    const formatted = leaderboard.map((entry) => ({
      id: entry.user.id,
      username: entry.user.username,
      email: entry.user.email,
      image: entry.user.image,
      amount: entry.amount,
      streakCount: entry.user.streakCount
    }));

    await redis.set(LEADERBOARD_CACHE_KEY, JSON.stringify(formatted), "EX", 30); // cache for 30s

    return NextResponse.json({ leaderboard: formatted, cached: false });
  } catch (error) {
    console.error("Leaderboard fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
