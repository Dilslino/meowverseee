"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Prompt Library", href: "#library" },
  { label: "How It Works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled ? "py-2" : "py-3",
      )}
    >
      <div className="container">
        <div
          className={cn(
            "flex items-center justify-between rounded-full border px-3 pl-5 transition-all duration-300",
            scrolled
              ? "glass border-line shadow-soft"
              : "border-transparent",
          )}
        >
          <Link
            href="#top"
            className="flex items-center gap-2 py-3"
            aria-label="meowverseee home"
          >
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-soft transition-colors hover:bg-canvas-soft hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="brand" size="sm" className="hidden sm:inline-flex">
              <a href="#pricing">Get Free Pack</a>
            </Button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden rounded-full border border-line bg-canvas p-2.5 text-ink"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="md:hidden mt-2 rounded-3xl border border-line bg-canvas p-2 shadow-plate">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-[15px] font-medium text-ink-soft hover:bg-canvas-soft"
              >
                {item.label}
              </a>
            ))}
            <div className="p-2">
              <Button asChild variant="brand" size="md" className="w-full">
                <a href="#pricing" onClick={() => setOpen(false)}>
                  Get Free Pack
                </a>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
