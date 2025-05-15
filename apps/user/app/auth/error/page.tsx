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
    <div>
      <h1>Authentication Error</h1>
      <p>{errorMessage}</p>
      <a href="/auth/login">Go back to Login</a>
    </div>
  );
}
