// app/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  console.log('home  page:', session)
  if (session?.user) {
    redirect("/dashboard"); // logged in → dashboard
  }

  redirect("/home"); // not logged in → public landing
}
