"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="container mx-auto px-4 py-4 flex justify-between  rounded-xl">
      {/* Logo */}
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
          </div>
        </div>
        <span className="text-xl font-bold text-gray-900">
          Pay<span className="text-indigo-600">Chey</span>
        </span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex space-x-8 text-gray-900 font-medium">
        <span
          className="cursor-pointer hover:text-indigo-600 transition"
          onClick={() => router.push("/")}
        >
          Home
        </span>
        <span
          className="cursor-pointer hover:text-indigo-600 transition"
          onClick={() => router.push("/leaderboard")}
        >
          Leaderboard
        </span>
        <span
          className="cursor-pointer hover:text-indigo-600 transition"
          onClick={() => router.push("/rewards")}
        >
          Rewards
        </span>
        <span
          className="cursor-pointer hover:text-indigo-600 transition"
          onClick={() => router.push("/achievements")}
        >
          Achievements
        </span>
        <span
          className="cursor-pointer hover:text-indigo-600 transition"
          onClick={() => router.push("/help")}
        >
          Help center
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <button
          className="hidden md:block text-gray-600 hover:text-indigo-600 transition font-medium"
          onClick={() => router.push("/secure/login")}
        >
          Log In
        </button>
        <button
          className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-5 py-2 rounded-lg font-medium transition transform hover:-translate-y-0.5 shadow-md"
          onClick={() => router.push("/secure/signup")}
        >
          Play Now
        </button>
      </div>
    </nav>
  );
}
