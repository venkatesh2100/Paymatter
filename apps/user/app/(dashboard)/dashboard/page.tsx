"use client";
// TODO: Onboarding Modal for First time User
import LeaderboardPage from "../../../components/dashboard/leaderboard";
import SendCard from "../../../components/SendCardComponent";
import TransactionHistory from "../transactions/page";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PublicKeyComponent from "../../../components/dashboard/publickey";
import LoadingPage from "../../../components/loading";
export default function Dashboard() {
  const [publicKey, setPublicKey] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    async function fetchPublicKey() {
      try {
        const res = await fetch(`/api/user/${userId}/public-key`);
        if (!res.ok) throw new Error("Failed to fetch public key");
        const data = await res.json();
        setPublicKey(data.publicKey);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPublicKey();
  }, [userId]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="p-4">
      <div className="flex items-center">

        {publicKey && <PublicKeyComponent publicKey={publicKey} />}
      </div>
      {/* Dashboard layout */}
      <div className="flex ">

        <LeaderboardPage />
        <SendCard />
      </div>

      <div className="w-64 flex-shrink-0"></div>
      <TransactionHistory />
    </div>
  );
}
