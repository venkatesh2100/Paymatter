
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/home')
  } else {
    redirect('/home')
  }
}

// import Navbar from "../components/navbar";
// export * from "@prisma/client";
// import HomePage from "../components/Homepage";
// export default function Home() {

//   return (
//     <div>
//       <Navbar />
//       <HomePage />
//     </div>
//   );
// }