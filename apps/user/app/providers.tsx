"use client";
import { RecoilRoot } from "recoil";
import { sessionProviders } from "next-auth/react";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <sessionProviders>{children}</sessionProviders>
    </RecoilRoot>
  );
};
