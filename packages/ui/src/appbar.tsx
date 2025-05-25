"use client";
import { Button } from "./button";
import { useRouter } from "next/navigation";
interface NavbarProps{
    user?:{
        name?:string | null;
    };
    onSignin:any;
    onSignout:any;
}

export default function Navbar({user,onSignout,onSignin}:NavbarProps) {
  const router = useRouter();

  return (
    <nav className="flex items-center border rounded-xl border-white justify-between px-8 py-4 bg-gradient-to-r from-blue-300 to-cyan-200 shadow-md">
      <div
        className="text-3xl font-extrabold text-gray-900 cursor-pointer"
        onClick={() => router.push("/")}
      >
        Paymatter
      </div>
      {/* <div className="space-x-4">
        <button className="px-6 py-2 text-blue-600 bg-gradient-to-r from-blue-300 to-emerald-200 rounded-3xl font-medium" onClick={() => router.push("/secure/login")}>Login</button>
        <button className="px-6 py-2 text-blue-600 rounded-3xl bg-gradient-to-l from-blue-200 to-cyan-300 font-medium" onClick={() => router.push("/secure/signup")}>Signup</button>
      </div> */}
      <div className="flex flex-col border px-4 py-2 bg-cyan-60px-6  text-blue-900 bg-gradient-to-r from-blue-300 to-emerald-400 rounded-3xl font-medium justify-center pt-2">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </nav>
  );
}
