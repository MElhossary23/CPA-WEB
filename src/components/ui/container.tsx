
import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "small" | "default" | "large" | "fluid";
}

export function Container({
  children,
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        {
          "max-w-screen-sm": size === "small",
          "max-w-screen-xl": size === "default",
          "max-w-screen-2xl": size === "large",
          "": size === "fluid",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
