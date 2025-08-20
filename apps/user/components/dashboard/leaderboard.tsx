"use client";

import { useEffect, useState } from "react";
import { FaCrown, FaCoins, FaFire } from "react-icons/fa";
import { useSession } from "next-auth/react";

type Leader = {
  id: number;
  username: string;
  email: string;
  amount: number;
  rank?: number;
  streak?: number;
};

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);

  const { data: session } = useSession();

  const currentUserId = session?.user?.id
    ? Number(session.user.id)
    : undefined;
  useEffect(() => {
    async function fetchLeaderboard() {
      const res = await fetch("/api/lboard");
      const data = await res.json();

      const formatted: Leader[] = (data.leaderboard || []).map(
        (player: Leader, index: number) => ({
          ...player,
          rank: index + 1,
          streak: Math.floor(Math.random() * 10) + 1,
        })
      );
      setLeaders(formatted);

      if (currentUserId) {
        const me = formatted.find((p) => p.id === Number(currentUserId));
        setMyRank(me ? me.rank! : null);
      }
    }
    fetchLeaderboard();
  }, [currentUserId]);

  return (
    <section className="max-w-4xl mx-auto mt-10 mb-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Global Leaderboard</h2>
        <div className="flex items-center text-indigo-600">
          {myRank ? (
            <>
              <span className="mr-2 font-medium">Your rank: #{myRank}</span>
              <div className="bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="font-bold">{myRank}</span>
              </div>
            </>
          ) : (
            <span className="text-gray-500"></span>
          )}
        </div>
      </div>

      {/* Table header */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-indigo-50 border-b border-gray-200 font-semibold text-gray-700">
          <div className="col-span-1">Rank</div>
          <div className="col-span-6">Player</div>
          <div className="col-span-3">Balance</div>
          <div className="col-span-2">Streak</div>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-gray-100">
          {leaders.map((player) => (
            <div
              key={player.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-indigo-50/50 transition"
            >
              {/* Rank + Crown */}
              <div className="col-span-1 flex items-center">
                {player.rank === 1 ? (
                  <FaCrown className="text-yellow-400 text-xl" />
                ) : player.rank === 2 ? (
                  <FaCrown className="text-gray-400 text-xl" />
                ) : player.rank === 3 ? (
                  <FaCrown className="text-amber-700 text-xl" />
                ) : (
                  <span className="font-medium">{player.rank}</span>
                )}
              </div>

              {/* Player avatar + name */}
              <div className="col-span-6 flex items-center">
                <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <span className="font-bold text-indigo-700">
                    {player.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-medium">{player.username}</span>
              </div>

              {/* Balance */}
              <div className="col-span-3 flex items-center">
                <FaCoins className="text-yellow-400 mr-2" />
                <span className="font-medium">₹{player.amount.toLocaleString()}</span>
              </div>

              {/* Streak */}
              <div className="col-span-2 flex items-center">
                <FaFire
                  className={`mr-2 ${(player.streak ?? 0) > 7 ? "text-orange-500" : "text-gray-400"}`}
                />
                <span className="font-medium">{player.streak} days</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
