"use client";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Only true when user is logged in

  const isLoggedIn = !!session?.user?.id; // since you set id in JWT callback
  console.log(isLoggedIn)
  return (
    <nav className="flex items-center justify-between px-8 py-4 border rounded-xl border-white shadow-md">
      <div
        className="text-3xl font-extrabold text-gray-900 cursor-pointer"
        onClick={() => router.push("/")}
      >
        PayChey
      </div>

      <div className="flex px-4 py-2 bg-gradient-to-r from-blue-300 to-emerald-400 rounded-3xl font-medium justify-center">
        {status === "loading" ? (
          <span className="text-gray-700">Checking...</span>
        ) : (
          <Button onClick={isLoggedIn ? () => signOut({ callbackUrl: "/secure/login" }) : () => signIn()}>
            {isLoggedIn ? "Logout" : "Login"}
          </Button>
        )}
      </div>
    </nav>
  );
}
