"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCrown, FaCoins, FaFire } from "react-icons/fa";
import { useSession } from "next-auth/react";

type Leader = {
  id: number;
  username: string;
  email: string;
  amount: number;
  rank?: number;
  image?: string;
  streakCount?: number;
};

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  const currentUserId = session?.user?.id
    ? Number(session.user.id)
    : undefined;

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch("/api/lboard");
        const data = await res.json();
        const formatted: Leader[] = (data.leaderboard || []).map(
          (player: Leader, index: number) => ({
            ...player,
            rank: index + 1,

          })
        );
        setLeaders(formatted);
        if (currentUserId) {
          const me = formatted.find((p) => p.id === Number(currentUserId));
          setMyRank(me ? me.rank! : null);
        }
      } catch (err) {
        console.error("Error fetching leaderboard", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, [currentUserId]);


  // console.log(leaders)
  return (
    <section className="max-w-4xl mx-auto mt-10 mb-16 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Global Leaderboard
        </h2>
        <div className="flex items-center text-indigo-600 mt-2 sm:mt-0">
          {myRank ? (
            <>
              <span className="mr-2 font-medium">Your rank: #{myRank}</span>
              <div className="bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="font-bold">{myRank}</span>
              </div>
            </>
          ) : (
            <span className="text-gray-500 text-sm">Not ranked yet</span>
          )}
        </div>
      </div>

      {/* Table container */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
        {/* Table header (hidden on mobile) */}
        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-indigo-50 border-b border-gray-200 font-semibold text-gray-700">
          <div className="col-span-1">Rank</div>
          <div className="col-span-6">Player</div>
          <div className="col-span-3">Balance</div>
          <div className="col-span-2">Streak</div>
        </div>

        {/* Table rows */}
        <div className="divide-y divide-gray-100">
          {loading
            ? // Skeleton loader
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="grid sm:grid-cols-12 gap-4 px-6 py-4 animate-pulse"
              >
                <div className="col-span-1 w-6 h-6 bg-gray-200 rounded"></div>
                <div className="col-span-6 flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="col-span-3 flex items-center">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="col-span-2 flex items-center">
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))
            : leaders.map((player) => (
              <div
                key={player.id}
                className="grid sm:grid-cols-12 gap-4 px-6 py-4 hover:bg-indigo-50/50 transition"
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

                {
                  <div key={player.id} className="col-span-6 flex items-center">
                    <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                      {player.image ? (
                        <Image
                          src={player.image}
                          alt={player.username}
                          height={60}
                          width={60}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="font-bold text-indigo-700">
                          {player.username.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="font-medium">{player.username}</span>
                  </div>
                }

                {/* Balance */}
                <div className="col-span-3 flex items-center">
                  <FaCoins className="text-yellow-400 mr-2" />
                  <span className="font-medium">
                    ฿{(player.amount) / 100}
                  </span>
                </div>

                {/* Streak */}
                <div className="col-span-2 flex items-center">
                  <FaFire
                    className={`mr-2 ${(player.streakCount ?? 0) > 7
                      ? "text-orange-500"
                      : "text-gray-400"
                      }`}
                  />
                  <span className="font-medium">{(player.streakCount ?? 0) + 1} days</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
