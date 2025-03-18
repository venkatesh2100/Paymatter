"use client"
// import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
export * from "@prisma/client"

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

  return(
    <div>
      <Navbar/>
      <div className="pt-20 text-4xl">Home Page</div>
      {/* <div>{count}</div> */}
    </div>
  )
}