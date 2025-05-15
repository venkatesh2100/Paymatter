"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex items-center border rounded-xl border-white justify-between px-8 py-4 bg-gradient-to-r from-blue-200 to-white shadow-md">
      {/* Logo */}
      <div
        className="text-3xl font-extrabold text-gray-900 cursor-pointer"
        onClick={() => router.push("/")}
      >
        Paymatter
      </div>

      {/* Navigation Links (Hidden on Mobile) */}
      <div className="hidden md:flex space-x-6 text-gray-700">
        <span
          className="cursor-pointer hover:text-blue-500 transition"
          onClick={() => router.push("/send-receive")}
        >
          Send & Receive
        </span>
        <span
          className="cursor-pointer hover:text-blue-500 transition"
          onClick={() => router.push("/pay-now")}
        >
          Pay Now
        </span>
        <span
          className="cursor-pointer hover:text-blue-500 transition"
          onClick={() => router.push("/help")}
        >
          Help Center
        </span>
      </div>

      {/* Action Buttons */}
      <div className="space-x-4">
        <button
          className="px-6 py-2 text-blue-600 font-medium rounded-lg shadow-md hover:bg-blue-100 transition"
          onClick={() => router.push("/auth/login")}
        >
          Login
        </button>
        <button
          className="px-6 py-2 text-white bg-blue-600 font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => router.push("/auth/signup")}
        >
          Signup
        </button>
      </div>
    </nav>
  );
}
