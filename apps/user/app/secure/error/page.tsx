"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, ArrowLeft } from "lucide-react";

function ErrorMessage() {
  const router = useRouter();
  const params = useSearchParams();
  const error = params.get("error");

  const messages: Record<string, string> = {
    OAuthCallback: "Google login failed. Please try again.",
    AccessDenied: "Access denied. Contact support if this persists.",
    Configuration: "Provider misconfigured. Please contact admin.",
    JWT_PROCESSING_ERROR: "Error while processing your login. Please retry.",
    USER_NOT_FOUND: "No account exists for this Google user.",
    NO_EMAIL: "Google account did not return an email address.",
    default: "An unknown error occurred. Please try again later.",
  };

  const message = messages[error ?? "default"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* Icon */}
      <AlertTriangle className="w-20 h-20 drop-shadow-md" />

      {/* Title */}
      <h1 className="mt-6 text-4xl font-extrabold drop-shadow-sm">
        Login Error
      </h1>

      {/* Message */}
      <p className="mt-4 text-lg text-gray-700 max-w-md">{message}</p>

      {/* Buttons */}
      <div className="mt-8 flex space-x-4">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium shadow-md transition"
        >
          <ArrowLeft size={20} />
          <span>Go Back</span>
        </button>

        <button
          onClick={() => router.push("/secure/login")}
          className="px-6 py-3 rounded-lg font-medium hover:from-red-700 hover:to-orange-700 shadow-md transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorMessage />
    </Suspense>
  );
}
