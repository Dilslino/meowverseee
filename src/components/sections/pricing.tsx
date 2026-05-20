"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { useToast } from "@/components/ui/toast";
import { formatIDR, cn } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  price: number;
  tagline: string;
  audience: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    tagline: "Coba dulu, tanpa risiko.",
    audience: "Buat creator yang baru mulai eksplor AI video.",
    features: [
      "10 prompt starter siap pakai",
      "Akses ke kategori Image→Video",
      "Update bulanan",
      "Negative prompt dasar",
    ],
    cta: "Get Free Pack",
  },
  {
    id: "starter",
    name: "Starter",
    price: 9000,
    tagline: "Untuk creator harian.",
    audience: "Cocok kalau kamu posting konten 2-3 kali seminggu.",
    features: [
      "60+ prompt di semua kategori",
      "Anti face drift system",
      "Update mingguan",
      "Save & filter di library",
      "Email support",
    ],
    cta: "Ambil Starter",
  },
  {
    id: "pro",
    name: "Pro",
    price: 29000,
    tagline: "Untuk creator yang serius.",
    audience: "Buat yang udah live sebagai creator dan butuh hasil konsisten.",
    features: [
      "120+ prompt premium, semua kategori",
      "Workflow Couple Motion + Anti Drift",
      "Magic Prompt builder",
      "Update setiap rilis tool baru",
      "Priority request prompt",
      "Akses awal fitur baru",
    ],
    cta: "Mulai Pro",
    highlight: true,
  },
];

export function Pricing() {
  const { push } = useToast();

  const onSelect = (plan: Plan) => {
    push({
      title:
        plan.id === "free"
          ? "Free pack siap diunduh."
          : `${plan.name} pack dipilih.`,
      description:
        plan.id === "free"
          ? "Cek email kamu sebentar lagi."
          : "Lanjut ke pembayaran di tahap berikutnya.",
      tone: "brand",
    });
  };

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Harga jujur. <br className="hidden md:block" />
              <span className="italic text-brand-700">Tanpa drama.</span>
            </>
          }
          description="Bayar sekali per pack. Update gratis selama pack masih aktif. Pilih sesuai ritme posting kamu."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "relative flex flex-col rounded-3xl border p-7 transition-all duration-500",
                plan.highlight
                  ? "border-brand-300 bg-gradient-to-b from-brand-50 to-canvas shadow-plate lg:scale-[1.015]"
                  : "border-line bg-canvas shadow-soft hover:-translate-y-1 hover:shadow-plate",
              )}
            >
              {plan.highlight ? (
                <div className="absolute -top-3 left-7">
                  <Badge tone="brand" className="shadow-soft">
                    Paling dipilih
                  </Badge>
                </div>
              ) : null}

              <header>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl tracking-tighter2 text-ink">
                    {plan.name}
                  </h3>
                  {plan.price === 0 ? (
                    <Badge tone="positive">Gratis</Badge>
                  ) : null}
                </div>
                <p className="mt-1 text-[14px] text-ink-muted">{plan.tagline}</p>
              </header>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-[44px] leading-none tracking-tighter2 text-ink">
                  {formatIDR(plan.price)}
                </span>
                {plan.price > 0 ? (
                  <span className="text-sm text-ink-muted">/ pack</span>
                ) : null}
              </div>

              <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">
                <span className="font-medium text-ink">Buat siapa: </span>
                {plan.audience}
              </p>

              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[14px] text-ink-soft"
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                        plan.highlight
                          ? "bg-brand-600 text-white"
                          : "bg-positive/50 text-emerald-700",
                      )}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Button
                  type="button"
                  variant={plan.highlight ? "brand" : "outline"}
                  size="md"
                  className="w-full"
                  onClick={() => onSelect(plan)}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="mt-3 text-center text-[12px] text-ink-muted">
                  {plan.price === 0
                    ? "Tanpa kartu kredit. Tanpa trial trap."
                    : "Pembayaran sekali. Tanpa langganan otomatis."}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-ink-muted">
          Harga dalam IDR. Pajak sudah termasuk.
        </p>
      </div>
    </section>
  );
}
