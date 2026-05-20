import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatIDR(value: number): string {
  if (value === 0) return "Rp0";
  return `Rp${value.toLocaleString("id-ID")}`;
}
