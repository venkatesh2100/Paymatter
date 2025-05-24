"use client";

import { useSearchParams } from "next/navigation";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "An unknown error occurred.";
  if (error) {
    switch (error) {
      case "CredentialsSignin":
        errorMessage = "Invalid username, phone number, or password.";
        break;
      case "UserNotFound":
        errorMessage = "User not found.";
        break;
      case "UserExists":
        errorMessage = "User already exists.";
        break;
      default:
        errorMessage = error;
    }
  }

  return (
    <div className="flex flex-col items-center p-40 ">
      <h1 className="text-4xl ">Authentication Error</h1>
      <p>{errorMessage}{404}</p>
      <div className="border border-black bg-blue-500 p-5 rounded-4xl mt-3">
        <a href="/secure/login">Go back to Login</a>
      </div>
    </div>
  );
}
