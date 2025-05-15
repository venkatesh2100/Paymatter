// "use client";
// import { useEffect, useState } from "react"
import Navbar from "../components/navbar";
export * from "@prisma/client";
import HomePage from "../components/Homepage";
export default function Home() {

  return (
    <div>
      <Navbar />
      <HomePage />
    </div>
  );
}
