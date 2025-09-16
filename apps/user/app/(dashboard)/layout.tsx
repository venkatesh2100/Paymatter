"use client";

import Navbar from "../../components/appbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-screen">
      <div>
        <Navbar />
      </div>

      <div className="px-20">
        {children}
      </div>
    </div>
  );
}
