"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const NOTES = [
  {
    body: "Hasil jadi lebih konsisten. Wajah subjek nggak berubah-ubah lagi tiap retry.",
    context: "Image-to-video, creator beauty",
  },
  {
    body: "Lebih ngerti cara ngomong ke AI. Bukan cuma asal nulis 'sinematik, viral'.",
    context: "Pindah dari prompt template ke Veo 3.1",
  },
  {
    body: "Lebih hemat generate. Yang biasanya 4-5 retry sekarang sering sekali jadi.",
    context: "Couple motion untuk konten relationship",
  },
  {
    body: "Negative prompt-nya yang paling membantu. Itu yang biasanya kelewat.",
    context: "Editor video freelance",
  },
  {
    body: "Akhirnya tahu apa yang harus saya tulis di kolom motion. Selama ini ngarang.",
    context: "Pemula, baru pakai AI 2 bulan",
  },
  {
    body: "Workflow buat couple bareng pasangan jauh lebih mudah dipakai berulang.",
    context: "Konten couple, weekly posting",
  },
];

export function SocialProof() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Catatan dari pengguna"
          title={
            <>
              Kata mereka yang udah ganti{" "}
              <span className="italic text-brand-700">cara nge-prompt.</span>
            </>
          }
          description="Catatan kasar dari beta tester kami. Bukan testimonial yang dipoles."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {NOTES.map((note, i) => (
            <motion.figure
              key={note.body}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex h-full flex-col rounded-3xl border border-line bg-canvas p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-plate"
            >
              <Quote
                className="h-5 w-5 text-brand-300"
                aria-hidden
              />
              <blockquote className="mt-4 font-display text-[19px] leading-snug tracking-tightish text-ink text-pretty">
                “{note.body}”
              </blockquote>
              <figcaption className="mt-auto pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  {note.context}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-ink-muted">
          Catatan dianonimkan untuk menjaga privasi tester.
        </p>
      </div>
    </section>
  );
}
