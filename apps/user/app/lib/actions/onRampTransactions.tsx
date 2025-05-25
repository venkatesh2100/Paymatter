"use server"
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export default async function CreateOnRampTractions(provider:string , amount:string) {

  const session = await getServerSession(authOptions);
  if(!session?.user||!session.user?.id){
    return {
      "message":"User is not authenticated."
    }
  }

  const token = (Math.random()*1000).toString();

  await prisma.onRamptransactions.create({
    data:{
      provider:provider,
      status:"Proccesing",
      amount:Number(amount) * 100,
      userId:Number(session?.user?.id),
      token:token,
      startTime:new Date(),
    }
  })

  return{
    "message":"Transaction is Updated!"
  }
}
