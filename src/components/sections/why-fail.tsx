"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shuffle, Layers, Coins } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const ITEMS = [
  {
    icon: Shuffle,
    title: "Bad prompt",
    bridge: "Random output",
    body: "Prompt yang terlalu umum bikin model menebak. Hasilnya inkonsisten dari satu generate ke generate berikutnya.",
  },
  {
    icon: Layers,
    title: "No structure",
    bridge: "Inconsistent result",
    body: "Tanpa subject, action, shot, lighting, dan audio yang jelas, model nebak. Itulah kenapa output kamu inkonsisten dari satu generate ke generate berikutnya.",
  },
  {
    icon: Coins,
    title: "Too many retries",
    bridge: "Waste credits",
    body: "Setiap retry adalah credit. Empat percobaan untuk satu shot yang layak posting bukan kreativitas, itu pemborosan.",
  },
];

export function WhyFail() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Kenapa hasil AI sering jelek"
          title={
            <>
              Bukan tool-nya. <br className="hidden md:block" />
              <span className="italic text-brand-700">Cara nge-prompt-nya.</span>
            </>
          }
          description="Tiga pola yang paling sering bikin creator buang credit tanpa hasil yang layak posting."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {ITEMS.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-3xl border border-line bg-canvas p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-plate"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  pola #{i + 1}
                </span>
              </div>

              <div className="mt-7 flex items-center gap-3">
                <h3 className="font-display text-2xl tracking-tighter2 text-ink">
                  {item.title}
                </h3>
                <ArrowRight className="h-4 w-4 text-brand-600 transition-transform duration-500 group-hover:translate-x-1" />
                <span className="font-display text-2xl tracking-tighter2 text-brand-700">
                  {item.bridge}
                </span>
              </div>

              <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                {item.body}
              </p>

              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-100 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
