import LeaderboardPage from "../../../components/dashboard/leaderboard";

export default function Dashboard() {
  return (
    <div className="flex p-4">
      <div className="flex-grow mr-4">
        <LeaderboardPage />
      </div>
      <div className="w-64 flex-shrink-0">
      </div>
    </div>
  );
}
