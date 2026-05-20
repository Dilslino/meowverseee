"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/section-heading";

const FAQS = [
  {
    q: "Apakah prompt ini menjamin video saya viral?",
    a: "Tidak. Tidak ada yang bisa menjamin viral. Kami bantu kamu membuat hasil yang lebih konsisten dan layak posting. Performa konten tetap tergantung ide, hook, audiens, dan timing kamu.",
  },
  {
    q: "Apakah ini layanan editing atau auto-generate?",
    a: "Bukan. meowverseee menjual prompt system, bukan jasa edit. Kami juga tidak menggenerate video untuk kamu. Kamu tetap pakai tool AI favoritmu sendiri seperti Veo 3.1, Kling, Sora 2, Seedance, atau Wan.",
  },
  {
    q: "Tools apa saja yang didukung?",
    a: "Per Mei 2026 fokus di Veo 3.1 (Standard, Fast, Lite), Kling 2.6 Pro dan v3 Pro, Sora 2 dan Sora 2 Pro, Seedance 1.5 Pro, Wan 2.6, Hailuo 2.3, Luma Ray 2, PixVerse V5.5, dan LTXV 2. Setiap rilis tool baru, prompt-nya kami update untuk paket Starter dan Pro.",
  },
  {
    q: "Kalau hasil masih kurang bagus, salah siapa?",
    a: "Beberapa hal di luar kontrol prompt: kualitas input image, versi tool yang berubah, dan random seed. Kami transparan: hasil sangat bergantung pada tool dan referensi kamu. Tapi prompt yang terstruktur secara konsisten mengurangi retry yang dibutuhkan.",
  },
  {
    q: "Apakah saya boleh pakai untuk klien?",
    a: "Boleh, untuk semua paket. Kamu boleh pakai prompt untuk konten pribadi maupun pekerjaan klien. Yang tidak boleh adalah menjual ulang prompt kami sebagai produk kamu.",
  },
  {
    q: "Apa bedanya dengan pack prompt gratis di internet?",
    a: "Pack gratis biasanya kumpulan teks tanpa struktur dan tanpa negative prompt. Kami menulis ulang setiap prompt dalam format Subject / Motion / Emotion / Camera dengan negative prompt yang spesifik per kasus.",
  },
  {
    q: "Apakah ada refund?",
    a: "Karena ini produk digital yang langsung bisa diakses, kami tidak menyediakan refund otomatis. Kalau kamu beli paket tapi tidak bisa mengakses kontennya, hubungi kami dan akan kami bantu manual.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <SectionHeading
            eyebrow="FAQ"
            align="left"
            title={
              <>
                Pertanyaan jujur. <br />
                <span className="italic text-brand-700">Jawaban jujur.</span>
              </>
            }
            description="Kami sengaja tidak menulis FAQ yang isinya self-promotion. Ini yang biasanya ditanyakan creator sebelum beli."
          />

          <div className="rounded-3xl border border-line bg-canvas px-6 shadow-soft md:px-8">
            <Accordion type="single" collapsible defaultValue="q-0">
              {FAQS.map((item, i) => (
                <AccordionItem key={item.q} value={`q-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
