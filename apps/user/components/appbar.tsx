"use client";

import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const router = useRouter();
  const { status } = useSession();

  const isLoggedIn = status === "authenticated";

  return (
    <nav className="flex items-center justify-between px-8 py-4 border rounded-xl border-white shadow-md bg-white">
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

      {/* Only show links + logout when logged in */}
      {isLoggedIn && (
        <div className="flex items-center space-x-6">
          <span
            className="cursor-pointer hover:text-blue-500 font-medium"
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </span>
          <span
            className="cursor-pointer hover:text-blue-500 font-medium"
            onClick={() => router.push("/transfer")}
          >
            Transfer
          </span>
          <span
            className="cursor-pointer hover:text-blue-500 font-medium"
            onClick={() => router.push("/send-receive")}
          >
            Send & Receive
          </span>
          <span
            className="cursor-pointer hover:text-blue-500 font-medium"
            onClick={() => router.push("/transactions")}
          >
            Transactions
          </span>

          <div className="flex items-center space-x-3">
            <Button
              onClick={() => signOut({ callbackUrl: "/secure/login" })}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
