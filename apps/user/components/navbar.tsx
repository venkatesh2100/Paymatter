"use client";

import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex items-center border rounded-xl border-white justify-between px-8 py-4 bg-gradient-to-r from-blue-300 to-cyan-200 shadow-md">
      <div
        className="text-3xl font-extrabold text-gray-900 cursor-pointer"
        onClick={() => router.push("/")}
      >
        Paymatter
      </div>

      <div className="hidden md:flex space-x-6 text-gray-900">
        <span className="cursor-pointer hover:text-blue-500" onClick={() => router.push("/send-receive")}>Send & Receive</span>
        <span className="cursor-pointer hover:text-blue-500" onClick={() => router.push("/pay-now")}>Pay Now</span>
        <span className="cursor-pointer hover:text-blue-500" onClick={() => router.push("/help")}>Help Center</span>
      </div>

      <div className="space-x-4">
        <button className="px-6 py-2 text-blue-600 bg-gradient-to-r from-blue-300 to-emerald-200 rounded-3xl font-medium" onClick={() => router.push("/secure/login")}>Login</button>
        <button className="px-6 py-2 text-blue-600 rounded-3xl bg-gradient-to-l from-blue-200 to-cyan-300 font-medium" onClick={() => router.push("/secure/signup")}>Signup</button>
      </div>
    </nav>
  );
}
