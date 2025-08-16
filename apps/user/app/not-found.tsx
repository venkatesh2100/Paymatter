"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-cyan-100 px-6 text-center">
      {/* Big 404 */}
      <h1 className="text-9xl font-extrabold text-indigo-600 drop-shadow-md">404</h1>

      {/* Message */}
      <h2 className="mt-6 text-3xl font-bold text-gray-900">
        Oops! Page Not Found
      </h2>
      <p className="mt-4 text-lg text-gray-600 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
        Let’s get you back on track!
      </p>

      {/* Buttons */}
      <div className="mt-8 flex space-x-4">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition"
        >
          <ArrowLeft size={20} />
          <span>Go Back</span>
        </button>

        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-md transition"
        >
          Home Page
        </button>
      </div>
    </div>
  );
}
