"use client";

import { motion } from "framer-motion";
import { ArrowRight, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";

const GENERIC = `buat foto cewek lagi jalan keren, sinematik, viral, full hd, masterpiece`;

const STRUCTURED = [
  {
    k: "Subject",
    v: "Wanita 25 tahun, jaket linen krem, celana wide-leg, rambut hitam panjang sebahu.",
  },
  {
    k: "Action",
    v: "[00:00–00:03] Tiga langkah pelan ke arah kamera. [00:03–00:06] Berhenti, tangan kanan menyentuh tepi jaket. [00:06–00:08] Kepala miring 4° lalu kembali.",
  },
  {
    k: "Shot",
    v: "Slow dolly-in 30cm, 35mm, f/2.0, eye-level, depth of field dangkal.",
  },
  {
    k: "Lighting",
    v: "Golden hour 6500K dari kanan-belakang, fill reflector cream dari kiri. Palette: oat, cream, walnut, warm amber.",
  },
  {
    k: "Audio",
    v: "Ambient: angin pelan, langkah di gravel. SFX: gesekan jaket linen di 00:04. No dialogue.",
  },
];

const NEGATIVE =
  "wajah berubah, distorsi tangan, gerakan patah, mulut menari, latar bergeser";

const ISSUES = [
  "Wajah berubah tiap frame",
  "Langkah kaku, tangan glitch",
  "Lighting random",
  "3 retry sebelum dapat 1 yang ok",
];

const WINS = [
  "Wajah konsisten dari awal sampai akhir",
  "Gerakan natural, bukan animasi kaku",
  "Lighting terkontrol",
  "Sekali generate sering langsung pakai",
];

export function BeforeAfter() {
  return (
    <section id="before-after" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Before / after"
          title={
            <>
              Prompt yang sama panjangnya.{" "}
              <span className="italic text-brand-700">Hasil yang berbeda.</span>
            </>
          }
          description="Bukan soal banyaknya kata. Soal cara nyusunnya. Coba bandingkan dua prompt di bawah."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 md:items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-3xl border border-line bg-canvas p-6 shadow-soft"
          >
            <div className="flex items-center gap-2">
              <Badge tone="outline">Generic prompt</Badge>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                before
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl tracking-tighter2 text-ink">
              Asal panjang, asal “sinematik”
            </h3>
            <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-canvas-soft p-4 font-mono text-[13px] leading-relaxed text-ink-soft">
              {GENERIC}
            </pre>
            <ResultStrip mode="bad" items={ISSUES} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex flex-col rounded-3xl border border-brand-300 bg-gradient-to-b from-brand-50 to-canvas p-6 shadow-plate"
          >
            <div className="flex items-center gap-2">
              <Badge tone="brand">Structured prompt</Badge>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                after
              </span>
            </div>
            <h3 className="mt-4 font-display text-xl tracking-tighter2 text-ink">
              Subject, action, shot, lighting, audio
            </h3>

            <dl className="mt-5 space-y-2.5">
              {STRUCTURED.map((row) => (
                <div
                  key={row.k}
                  className="grid grid-cols-[80px_1fr] gap-3 rounded-2xl bg-canvas/70 p-3 ring-1 ring-line/70"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-700">
                    {row.k}
                  </dt>
                  <dd className="text-[13px] leading-relaxed text-ink-soft">
                    {row.v}
                  </dd>
                </div>
              ))}
              <div className="rounded-2xl border border-dashed border-line bg-canvas/60 p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  Negative prompt
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
                  {NEGATIVE}
                </p>
              </div>
            </dl>

            <ResultStrip mode="good" items={WINS} />
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 text-sm text-ink-muted">
          <span>Generic</span>
          <ArrowRight className="h-4 w-4 text-brand-600" />
          <span className="font-medium text-ink">Structured</span>
          <span className="text-ink-muted">·</span>
          <span>~3x lebih sedikit retry rata-rata.</span>
        </div>
      </div>
    </section>
  );
}

function ResultStrip({
  mode,
  items,
}: {
  mode: "good" | "bad";
  items: string[];
}) {
  const isGood = mode === "good";
  return (
    <div className="mt-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
        Hasil tipikal
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li
            key={it}
            className="flex items-start gap-2.5 text-[14px] text-ink-soft"
          >
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                isGood ? "bg-positive/50 text-emerald-700" : "bg-canvas-soft text-ink-muted"
              }`}
            >
              {isGood ? (
                <Check className="h-3 w-3" />
              ) : (
                <X className="h-3 w-3" />
              )}
            </span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
