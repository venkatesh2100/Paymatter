"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const handleSignup = async () => {
  try {
    // 1. Create user
    // console.log("HIIHIHI")
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, phonenumber, password }),
    });
    const data = await res.json();
    // console.log(data)

    if (!res.ok) {
      setError(data.error || "Signup failed");
      return;
    }

    // 2. Auto-login after successful signup
    const loginRes = await signIn("credentials", {
      login: username || phonenumber, // since login accepts either
      password,
      redirect: false,
    });
    console.log(res)
    console.log(loginRes)

    if (loginRes?.error) {
      setError(loginRes.error);
    } else {
      router.push("/dashboard");
    }
  } catch (err) {
    console.error("Signup error:", err);
    setError("An unexpected error .");
  }
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Signup</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-2 mb-4 border rounded"
          value={phonenumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Signup
        </button>
      </div>
    </div>
  );
}
