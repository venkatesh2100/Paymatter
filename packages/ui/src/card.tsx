import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border   p-6  rounded-xl"
    >
      <h1 className="text-md border-b pb-2">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
} 2
