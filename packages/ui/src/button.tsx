"use client";

import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName?: string;   // Make this optional
  onClick?: MouseEventHandler<HTMLButtonElement>; // <-- add onClick prop
}

export const Button = ({ children, className, appName, onClick }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={(e) => {
        if (onClick) {
          onClick(e);  // forward the click
        } else if (appName) {
          alert(`Hello from your ${appName} app!`);
        }
      }}
    >
      {children}
    </button>
  );
};
