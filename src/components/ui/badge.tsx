"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "brand" | "outline" | "positive";
}

export function Badge({
  className,
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium tracking-tightish",
        tone === "neutral" && "bg-canvas-soft text-ink-soft",
        tone === "brand" && "bg-brand-100 text-brand-700",
        tone === "outline" &&
          "border border-line bg-canvas text-ink-muted",
        tone === "positive" && "bg-positive/40 text-emerald-800",
        className,
      )}
      {...props}
    />
  );
}
