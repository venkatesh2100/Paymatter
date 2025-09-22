import React from "react";

interface CardProps {
  title: string;
  children?: React.ReactNode;
}

export function Card({ title, children }: CardProps): React.ReactNode {
  return (
    <div className="border  p-6  rounded-xl">
      <h1 className="text-3xl font-bold border-b pb-2">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
