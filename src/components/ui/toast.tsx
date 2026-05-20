"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  tone?: "default" | "brand";
}

interface ToastContextValue {
  push: (toast: Omit<ToastItem, "id">) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);
  const idRef = React.useRef(0);

  const push = React.useCallback<ToastContextValue["push"]>((toast) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, tone: "default", ...toast }]);
  }, []);

  const remove = React.useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      <ToastPrimitive.Provider swipeDirection="right" duration={2400}>
        {children}
        {toasts.map((t) => (
          <ToastPrimitive.Root
            key={t.id}
            onOpenChange={(open) => {
              if (!open) remove(t.id);
            }}
            className={cn(
              "group pointer-events-auto flex w-[min(92vw,360px)] items-start gap-3 rounded-2xl border border-line bg-canvas p-4 shadow-plate",
              "data-[state=open]:animate-in data-[state=open]:slide-in-from-right-2 data-[state=open]:fade-in-0",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-2",
              "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                t.tone === "brand"
                  ? "bg-brand-100 text-brand-700"
                  : "bg-positive/40 text-emerald-700",
              )}
              aria-hidden
            >
              <Check className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <ToastPrimitive.Title className="text-sm font-medium tracking-tightish text-ink">
                {t.title}
              </ToastPrimitive.Title>
              {t.description ? (
                <ToastPrimitive.Description className="mt-0.5 text-xs text-ink-muted">
                  {t.description}
                </ToastPrimitive.Description>
              ) : null}
            </div>
            <ToastPrimitive.Close
              aria-label="Dismiss"
              className="rounded-full p-1 text-ink-muted transition hover:bg-canvas-soft hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-5 right-5 z-[60] flex w-[min(92vw,360px)] flex-col gap-2 outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}
