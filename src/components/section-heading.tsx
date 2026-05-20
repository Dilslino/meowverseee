import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      id={id}
      className={cn(
        "flex flex-col gap-4",
        align === "center"
          ? "items-center text-center"
          : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-brand-700">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] font-medium leading-[1.05] tracking-tighter2 text-ink text-balance">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-[17px] leading-relaxed text-ink-muted text-pretty",
            align === "center" ? "mx-auto" : "",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
