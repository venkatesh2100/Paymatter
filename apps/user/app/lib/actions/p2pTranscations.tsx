"use server";

import { getServerSession } from "next-auth";
import prisma from "@repo/db";
import { authOptions } from "../auth";
export async function P2Ptransactions(phone_number: number, amount: number) {
  const session = await getServerSession(authOptions);
  interface CustomUser {
    id: string;
    username?: string;
    phonenumber?: string;
  }

  const user = session?.user as CustomUser | undefined;
  const from = user?.id;

  if (!from) {
    return {
      msg: "Error While Get user Details",
    };
  }

  const toUser = await prisma.user.findFirst({
    where: {
      phonenumber: phone_number.toString(),
    },
  });

  if (!toUser) {
    return {
      msg: "Reciver user is Not found",
    };
  }

  const result = await prisma.$transaction(async (tx) => {
    const userBalance = await tx.balance.findUnique({
      where: {
        userId: Number(from),
      },
    });

    if (!userBalance || userBalance.amount < amount) {
      throw new Error("Balance is too Low");
    }

    await tx.balance.update({
      where: {
        userId: Number(from),
      },
      data: {
        amount: {
          decrement: amount,
        },
      },
    });

    await tx.balance.update({
      where: {
        userId: toUser.id,
      },
      data: {
        amount: {
          increment: amount,
        },
      },
    });

    await tx.p2PTransaction.create({
      data: {
        senderID: Number(from),
        reciverID: toUser.id,
        amount: amount,
      },
    });

    return {
      msg: "Transaction is Updated",
    };
  });

  return result;
}
