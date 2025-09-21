"use client";
//TODO: Onboarding Modal for First time User
import LeaderboardPage from "../../../components/dashboard/leaderboard";
import SendCard from "../../../components/SendCardComponent";
import TransactionHistory from "../transactions/page";

export default function Dashboard() {

  // useEffect(() => {
  //   async function fetchUser() {
  //     if (!session?.user?.id) return;
  //     const res = await fetch(`/api/user/${session.user.id}/onboard`);
  //     const user = await res.json();
  //     if (!user.onboarded) {
  //       setShowOnboarding(true);
  //     }
  //   }
  //
  //   fetchUser();
  // }, [session?.user?.id]);

  return (
    <div className="">
      {/* {showOnboarding && ( */}
      {/*   <OnboardingModal */}
      {/*     userId={session?.user?.id} */}
      {/*     onClose={() => setShowOnboarding(false)} */}
      {/*   /> */}
      {/* )} */}

      {/* Dashboard layout */}
      <div className="flex mr-4">
        <LeaderboardPage />
        <SendCard />
      </div>
      <div className="w-64 flex-shrink-0"></div>
      <TransactionHistory />
    </div>
  );
}
