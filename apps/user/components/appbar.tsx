"use client";

import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();
interface CustomUser {
  id: string;
  username?: string;
  phonenumber?: string;
}
  const user = session?.user as CustomUser | undefined;
  const isLoggedIn = user?.id;

  // Fallback profile image
  // const profileImage =
  //   session?.user?.image ||
  //   "https://ui-avatars.com/api/?name=User&background=ddd&color=555";

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

      {/* Dashboard Links */}
      {isLoggedIn ? (
        <div className="flex items-center space-x-6">
          {/* Links for logged-in users */}
          <span
            className="cursor-pointer hover:text-blue-500 font-medium"
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
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

          {/* Profile / Logout */}
          <div className="flex items-center space-x-3">
            {/* <img
              src={profileImage}
              alt="profile"
              className="w-8 h-8 rounded-full"
            /> */}
            {/* <span className="font-medium">{session?.user?.name || ""}</span> */}
            <Button
              onClick={() => signOut({ callbackUrl: "/secure/login" })}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              Logout
            </Button>
          </div>
        </div>
      ) : (
        // Not logged in: show login button
        <div className="flex px-4 py-2 bg-gradient-to-r from-blue-300 to-emerald-400 rounded-3xl font-medium justify-center">
          {status === "loading" ? (
            <span className="text-gray-700">Checking...</span>
          ) : (
            <Button onClick={() => signIn()}>Login</Button>
          )}
        </div>
      )}
    </nav>
  );
}
