"use server"

import { getServerSession } from "next-auth"
import prisma from "@repo/db/client"
import { authOptions } from "../auth"


export  async function  P2Ptransactions(amount:number,phone_number:number) {

  const session =await getServerSession(authOptions);
  const from = session?.user?.id;
  // console.log(from);
  if(!from){
    return{
      msg:"Error While Get user Details"
    }
  }

  const toUser = await prisma.user.findFirst({
    where:{
      phonenumber:phone_number.toString(),
    }
  })
  console.log(toUser);
  

  if(!toUser){
    return{
      msg:'Reciver user is Not found'
    }
  }
  //? P2P transaction Upadte the Database
  await prisma.$transaction(async (tx) => {
    const userBalance = await prisma.balance.findUnique({
      where:{
        userId:Number(from),
      }
    })
    if(!userBalance || userBalance.amount < amount){
      return{
        msg:"Balance is too Low"
      }
    }

    await tx.balance.update({
      where:{
        userId:Number(from),
      },
      data:{
        amount:{
          decrement:amount,
        }
      }
    })

    await tx.balance.update({
      where:{
        userId:toUser.id,
      },
      data:{
        amount:{
          increment:amount,
        }
      }
    })


  });

}