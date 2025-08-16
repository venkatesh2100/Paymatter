"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { randomUUID } from "crypto"


export default async function CreateOnRampTransactions(
  provider: string,
  amount: string
) {
  const session = await getServerSession(authOptions);
  console.log("Session:", session);
  if (!session?.user?.id) throw new Error("User not found");

  const userID = Number(session?.user.id);
  const token = randomUUID();
 await prisma.onRamptransactions.create({
  data: {
    provider,
    status: "Processing",
    amount: Number(amount) * 100,
    userId: userID,
    token,
    startTime: new Date(),
  },
});



  try {
    const response = await fetch("http://localhost:3003/hdfcWebhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        userId: userID,
        amount: Number(amount) * 100,
      }),
    });

    const json = await response.json();
    console.log("Webhook response:", json);
  } catch (e) {
    console.error("Error calling webhook:", e);
  }

  return { message: "Transaction is Updated!" };
}
