"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/use-copy";
import { useToast } from "@/components/ui/toast";

const HERO_PROMPT = {
  title: "Foto jadi video, natural",
  tool: "Veo 3.1 Fast",
  subject:
    "Persis seperti foto referensi. Pakaian, rambut, latar, dan ekspresi awal dipertahankan identik.",
  action:
    "[00:00\u201300:01] Kedipan halus. [00:01\u201300:03] Kepala miring 4° ke kanan dan kembali. [00:03\u201300:04] Senyum tipis tumbuh tanpa membuka mulut.",
  shot:
    "Static framing identik dengan referensi, 50mm equivalent, tanpa zoom dan tanpa pan.",
  lighting:
    "Mengikuti lighting foto referensi. Tidak menambahkan key light baru.",
  audio: "Mute, atau room tone -50 dB.",
  negative:
    "wajah berubah, baju berganti warna, latar bergeser, anggota badan tambahan, ekspresi melompat",
};

function promptToText() {
  return [
    `Subject: ${HERO_PROMPT.subject}`,
    `Action: ${HERO_PROMPT.action}`,
    `Shot: ${HERO_PROMPT.shot}`,
    `Lighting & palette: ${HERO_PROMPT.lighting}`,
    `Audio: ${HERO_PROMPT.audio}`,
    `Negative prompt: ${HERO_PROMPT.negative}`,
  ].join("\n");
}

export function Hero() {
  const { copied, copy } = useCopy();
  const { push } = useToast();

  const onCopy = async () => {
    const ok = await copy(promptToText());
    if (ok) push({ title: "Prompt copied.", description: "Tinggal paste ke tool kamu." });
  };

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 md:pt-40"
    >
      <BackgroundDecor />
      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas/80 px-3 py-1.5 text-[12px] font-medium tracking-tightish text-brand-700 shadow-soft backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Prompt system untuk AI creator
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.02] tracking-tighter2 text-ink text-balance"
            >
              AI-nya bukan yang salah.
              <br />
              <span className="relative">
                Prompt kamu yang
                <span className="ml-3 inline-block">
                  <em className="font-display italic text-brand-700">
                    belum tepat.
                  </em>
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted text-pretty"
            >
              Stop buang waktu dan credit. Pakai prompt system yang lebih jelas,
              lebih natural, dan lebih gampang dipakai untuk Kling, Seedance,
              Runway, dan tools favorit kamu.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button asChild variant="brand" size="lg">
                <a href="#pricing">
                  Get Free Prompt
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#library">Explore Library</a>
              </Button>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 grid grid-cols-3 gap-6 max-w-md"
            >
              {[
                { v: "25+", l: "Prompt siap pakai" },
                { v: "10", l: "Tool 2026" },
                { v: "60s", l: "Setup pertama" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-2xl tracking-tighter2 text-ink">
                    {s.v}
                  </dt>
                  <dd className="mt-1 text-xs text-ink-muted">{s.l}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <PromptCard onCopy={onCopy} copied={copied} />
            <FloatingChip
              className="absolute -left-4 top-10 hidden md:flex"
              label="Veo 3.1"
            />
            <FloatingChip
              className="absolute -right-2 bottom-12 hidden md:flex"
              label="No face drift"
              tone="positive"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PromptCard({
  onCopy,
  copied,
}: {
  onCopy: () => void;
  copied: boolean;
}) {
  const fields: { k: string; v: string }[] = [
    { k: "Subject", v: HERO_PROMPT.subject },
    { k: "Action", v: HERO_PROMPT.action },
    { k: "Shot", v: HERO_PROMPT.shot },
    { k: "Lighting", v: HERO_PROMPT.lighting },
  ];

  return (
    <div className="group relative rounded-[28px] border border-line bg-canvas p-2 shadow-plate transition-transform duration-500 hover:-translate-y-1">
      <div className="rounded-[22px] bg-gradient-to-b from-brand-50 to-canvas p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse-soft" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              prompt preview
            </span>
          </div>
          <span className="rounded-full bg-canvas px-2.5 py-1 text-[11px] font-medium text-ink-muted ring-line">
            v1.2
          </span>
        </div>

        <h3 className="mt-4 font-display text-[22px] tracking-tighter2 text-ink">
          {HERO_PROMPT.title}
        </h3>

        <dl className="mt-5 space-y-3">
          {fields.map((f) => (
            <div
              key={f.k}
              className="grid grid-cols-[88px_1fr] gap-3 rounded-2xl bg-canvas/70 p-3 ring-1 ring-line/70"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-700">
                {f.k}
              </dt>
              <dd className="text-[14px] leading-relaxed text-ink-soft">
                {f.v}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 rounded-2xl border border-dashed border-line bg-canvas/60 p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            Negative prompt
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
            {HERO_PROMPT.negative}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-[12px] text-ink-muted">
            Tested di Veo 3.1, Kling 2.6, Sora 2, Seedance 1.5 Pro.
          </p>
          <Button
            type="button"
            onClick={onCopy}
            variant={copied ? "soft" : "primary"}
            size="sm"
            aria-live="polite"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy prompt
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function FloatingChip({
  label,
  className,
  tone = "default",
}: {
  label: string;
  className?: string;
  tone?: "default" | "positive";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className={`flex items-center gap-2 rounded-full border border-line bg-canvas px-3 py-1.5 text-[12px] font-medium shadow-soft ${
        tone === "positive" ? "text-emerald-700" : "text-ink-soft"
      } ${className ?? ""}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          tone === "positive" ? "bg-emerald-500" : "bg-brand-500"
        }`}
      />
      {label}
    </motion.div>
  );
}

function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-x-0 top-0 h-[640px] bg-gradient-to-b from-brand-50/80 via-canvas to-canvas" />
      <div className="absolute left-1/2 top-[420px] h-[500px] w-[920px] -translate-x-1/2 rounded-full bg-brand-100/60 blur-3xl" />
      <div className="absolute right-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-brand-200/40 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-[640px] bg-grid-fade [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_70%)] opacity-70" />
    </div>
  );
}
