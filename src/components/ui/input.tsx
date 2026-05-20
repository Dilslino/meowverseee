"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "h-11 w-full rounded-full border border-line bg-canvas px-4 text-[15px] text-ink placeholder:text-ink-muted/80 transition-colors",
      "focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200/60",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
