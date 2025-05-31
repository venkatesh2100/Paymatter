type onRampstatus = "Proccesing" | "Success" | "Failed";
import { Card } from "@repo/ui/card";
export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: onRampstatus;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2 space-y-4">
        {transactions.map((t, i) => (
          <div key={i} className="flex justify-between">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
              <div className="flex ">
              <div className="text-xs text-slate-500">{t.provider}</div>
              <div className="text-xs pl-5 text-slate-500">{t.status}</div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
