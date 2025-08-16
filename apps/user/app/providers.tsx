"use client";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface ProviderProps {
  children: React.ReactNode;
  session?:Session | null; 
}

export const Provider = ({ children, session }: ProviderProps) => {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </RecoilRoot>
  );
};