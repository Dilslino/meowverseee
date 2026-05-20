"use client";

import { motion } from "framer-motion";
import {
  LibraryBig,
  Image as ImageIcon,
  Wand2,
  Download,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const STEPS = [
  {
    icon: LibraryBig,
    label: "Choose prompt",
    body: "Pilih dari library berdasarkan kategori atau cari kata kunci. Setiap prompt sudah punya negative prompt-nya.",
  },
  {
    icon: ImageIcon,
    label: "Upload image",
    body: "Masukkan foto referensi ke tool kamu. Subjek, pakaian, dan latar dijaga tetap konsisten.",
  },
  {
    icon: Wand2,
    label: "Generate",
    body: "Paste prompt, generate. Karena strukturnya jelas, retry yang dibutuhkan lebih sedikit.",
  },
  {
    icon: Download,
    label: "Export",
    body: "Save hasilnya. Posting ke platform pilihan kamu, atau lanjut edit di tool video kamu.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-canvas-warm/40"
      />
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Empat langkah, <span className="italic text-brand-700">tanpa drama.</span>
            </>
          }
          description="Dari pilih prompt sampai export hasil. Tidak ada onboarding panjang."
        />

        <div className="relative mt-16">
          <PathLine />
          <ol className="relative grid gap-6 md:grid-cols-4">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                <div className="rounded-3xl border border-line bg-canvas p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-plate">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-soft">
                      <step.icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                      step {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl tracking-tighter2 text-ink">
                    {step.label}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                    {step.body}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="absolute -top-2 right-4 hidden h-6 w-6 items-center justify-center rounded-full bg-canvas font-mono text-[11px] font-medium text-brand-700 ring-line md:flex"
                >
                  {i + 1}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function PathLine() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 120"
      className="absolute left-0 right-0 top-12 hidden h-24 w-full md:block"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF82C7" stopOpacity="0" />
          <stop offset="20%" stopColor="#FF82C7" stopOpacity="0.7" />
          <stop offset="80%" stopColor="#D85FA7" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#D85FA7" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M40 60 C 220 0, 380 120, 600 60 S 980 0, 1160 60"
        fill="none"
        stroke="url(#pathGrad)"
        strokeWidth="2"
        strokeDasharray="4 6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
