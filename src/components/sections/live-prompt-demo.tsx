"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Copy, Check, ArrowDown, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import {
  DEMO_EXAMPLES,
  structurePrompt,
  structuredToText,
  type StructuredPrompt,
} from "@/data/structure-prompt";
import { useCopy } from "@/hooks/use-copy";
import { useToast } from "@/components/ui/toast";

const FIELDS: { key: keyof Omit<StructuredPrompt, "intent" | "negative">; label: string }[] = [
  { key: "subject", label: "Subject" },
  { key: "motion", label: "Motion" },
  { key: "emotion", label: "Emotion" },
  { key: "camera", label: "Camera" },
];

export function LivePromptDemo() {
  const [input, setInput] = React.useState("buat foto jadi video natural");
  const [submitted, setSubmitted] = React.useState(input);
  const [generating, setGenerating] = React.useState(false);
  const result = React.useMemo(() => structurePrompt(submitted), [submitted]);
  const { copied, copy } = useCopy();
  const { push } = useToast();

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    setGenerating(true);
    setSubmitted(input);
    setTimeout(() => setGenerating(false), 520);
  };

  const onCopy = async () => {
    const ok = await copy(structuredToText(result));
    if (ok) push({ title: "Prompt copied.", description: "Paste ke Kling, Runway, atau tool kamu." });
  };

  return (
    <section id="demo" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Live demo"
          title={
            <>
              Ketik niat kamu. Dapat prompt yang{" "}
              <span className="italic text-brand-700">terstruktur</span>.
            </>
          }
          description="Tulis apa yang mau kamu buat. Kami susun jadi prompt yang lebih jelas, lebih natural, dan punya negative prompt."
        />

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1fr_auto_1.1fr]">
          <div className="rounded-3xl border border-line bg-canvas p-6 shadow-soft">
            <div className="flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-brand-600" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                input
              </span>
            </div>
            <form onSubmit={onSubmit} className="mt-4 space-y-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="contoh: buat foto jadi video natural"
                aria-label="Ide prompt kamu"
              />
              <Button
                type="submit"
                variant="brand"
                size="md"
                className="w-full"
                disabled={generating}
              >
                {generating ? (
                  <>
                    <Cpu className="h-4 w-4 animate-pulse-soft" />
                    Menyusun struktur…
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    Generate structured prompt
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted">
                Coba contoh
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {DEMO_EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => {
                      setInput(ex);
                      setSubmitted(ex);
                    }}
                    className="rounded-full border border-line bg-canvas px-3 py-1.5 text-[12px] text-ink-soft transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden self-center text-ink-muted lg:flex" aria-hidden>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-canvas">
              <ArrowDown className="h-4 w-4 -rotate-90 text-brand-600" />
            </div>
          </div>
          <div className="self-center text-ink-muted lg:hidden flex justify-center" aria-hidden>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-canvas">
              <ArrowDown className="h-4 w-4 text-brand-600" />
            </div>
          </div>

          <motion.div
            layout
            className="rounded-3xl border border-line bg-canvas p-2 shadow-plate"
          >
            <div className="rounded-[20px] bg-gradient-to-b from-brand-50 to-canvas p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse-soft" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                    structured output
                  </span>
                </div>
                <Badge tone="brand">{intentLabel(result.intent)}</Badge>
              </div>

              <div className="mt-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={submitted + (generating ? "-loading" : "")}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-3"
                  >
                    {FIELDS.map((f) => (
                      <div
                        key={f.key}
                        className="grid grid-cols-[88px_1fr] gap-3 rounded-2xl bg-canvas/70 p-3 ring-1 ring-line/70"
                      >
                        <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-700">
                          {f.label}
                        </dt>
                        <dd className="text-[14px] leading-relaxed text-ink-soft">
                          {result[f.key]}
                        </dd>
                      </div>
                    ))}
                    <div className="rounded-2xl border border-dashed border-line bg-canvas/60 p-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                        Negative prompt
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                        {result.negative}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-[12px] text-ink-muted">
                  Output bisa langsung dipaste ke tool video AI kamu.
                </p>
                <Button
                  type="button"
                  onClick={onCopy}
                  variant={copied ? "soft" : "primary"}
                  size="sm"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function intentLabel(intent: string): string {
  switch (intent) {
    case "image_to_video_natural":
      return "Image → Video";
    case "couple_motion":
      return "Couple Motion";
    case "anti_face_drift":
      return "Anti Face Drift";
    case "product":
      return "Product";
    case "viral_hook":
      return "Viral Hook";
    case "headshot":
      return "Headshot";
    case "landscape":
      return "Landscape";
    default:
      return "Magic Prompt";
  }
}
