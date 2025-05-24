"use client";
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // Prevents the page from refreshing

  if (!login || !password) {
    console.log("Login or password is empty");
    setError("Please fill in all fields");
    return;
  }

  try {

    const result = await signIn("credentials", {
      login,
      password,
      redirect: false,
    });
    console.log("Login Payload:", { login, password });

    console.log("SignIn Result:", result);
    if (result === undefined) {
      router.push("/secure/error");
    } else {
      router.push("/dashboard");
    }

    if (result?.error) {
      console.log("Error:", result.error);
      setError(result.error);
      return;
    }


  } catch (error) {
    console.error("SignIn Error:", error);
    setError("An error occurred during login");
  }
};



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="text"
            placeholder="username or phonenumber"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}
