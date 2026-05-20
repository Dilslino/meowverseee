"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[36px] border border-brand-200 bg-gradient-to-br from-brand-50 via-canvas to-brand-100 px-6 py-16 shadow-plate md:px-16 md:py-24"
        >
          <Aurora />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas/80 px-3 py-1.5 text-[12px] font-medium tracking-tightish text-brand-700 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              Siap dipakai sekarang
            </span>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.8rem)] font-medium leading-[1.04] tracking-tighter2 text-ink text-balance">
              Stop generate random.
              <br />
              <span className="italic text-brand-700">
                Start generating intentionally.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-ink-muted text-pretty">
              Mulai dari pack gratis. Tanpa kartu kredit, tanpa trial trap, tanpa
              spam. Cuma prompt yang jelas dan langsung bisa dipakai.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="brand" size="lg">
                <a href="#pricing">
                  Get Free Prompt
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#library">Lihat Library Dulu</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-brand-300/40 blur-3xl" />
      <div className="absolute -right-16 bottom-8 h-72 w-72 rounded-full bg-brand-200/60 blur-3xl" />
      <div className="absolute inset-0 bg-grid-fade opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
    </div>
  );
}
