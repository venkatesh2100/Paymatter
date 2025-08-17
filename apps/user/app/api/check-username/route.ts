import { NextResponse } from "next/server";
import prisma from "@repo/db";

export async function GET(req:Request){
  const {searchParams} = new URL(req.url);
  const username = searchParams.get("username");


  if(!username){
    return NextResponse.json({available:false});
  }

  const existingUser = await prisma.user.findFirst({
    where:{
      username
    }
  });

 return NextResponse.json({available:!existingUser});
}