"use client";
// import { useEffect, useState } from "react"
import Navbar from "../components/navbar";
export * from "@prisma/client";
import HomePage from "../components/Homepage";
export default function Home() {
  /* useState & useEffect code.
  const [count ,setcount] = useState(0);
  useEffect(()=>{
    if(code(count)){
      setTimeout(()=>{
        setcount(count=>count+1)
      },1000)
    }
  },[count])

  function code(i:any) {
    if(i===10){
      return false;
    }
    return true
  }*/

  return (
    <div>
      <Navbar />
      <HomePage />
    </div>
  );
}
