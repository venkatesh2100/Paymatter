"use client";

import { Button } from "@repo/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {


  return (
    <nav className="flex items-center justify-between px-8 py-4 border rounded-xl border-white shadow-md bg-white">
      {/* Logo with Link */}
      <Link href="/" className="flex items-center space-x-3">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
          </div>
        </div>
        <span className="text-xl font-bold text-gray-900">
          Pay<span className="text-indigo-600">Chey</span>
        </span>
      </Link>

      {/* Navigation Links - Middleware will protect these routes */}
      {/* If user can see these routes, they're authenticated */}
      <div className="flex items-center space-x-6">
        <Link
          href="/dashboard"
          className="cursor-pointer hover:text-blue-500 font-medium"
        >
          Dashboard
        </Link>

        <Link
          href="/transfer"
          className="cursor-pointer hover:text-blue-500 font-medium"
        >
          Transfer
        </Link>

        <Link
          href="/send-receive"
          className="cursor-pointer hover:text-blue-500 font-medium"
        >
          Send & Receive
        </Link>

        <Link
          href="/transactions"
          className="cursor-pointer hover:text-blue-500 font-medium"
        >
          Transactions
        </Link>

        {/* Logout Button */}
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => signOut({ callbackUrl: "/secure/login" })}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
