import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  showWord?: boolean;
}

export function Logo({ showWord = true, className, ...props }: LogoProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    >
      <span
        aria-hidden
        className="relative flex h-7 w-7 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 18V8l4 6 4-6v10" />
          <path d="M16 8h5M18.5 8v10" />
        </svg>
      </span>
      {showWord ? (
        <span className="font-display text-[19px] font-semibold tracking-tighter2 text-ink">
          meowverseee
        </span>
      ) : null}
    </span>
  );
}
