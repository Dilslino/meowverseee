import type { PromptItem } from "./prompts";

interface Intent {
  matchers: RegExp[];
  template: Omit<PromptItem, "id" | "title" | "category" | "tool" | "difficulty" | "preview" | "tags">;
  label: string;
}

const INTENTS: Intent[] = [
  {
    label: "image_to_video_natural",
    matchers: [
      /foto.*(jadi|menjadi|ke).*video/i,
      /image.?to.?video/i,
      /i2v/i,
      /animasiin foto/i,
    ],
    template: {
      subject:
        "Subjek persis seperti foto referensi. Pakaian, rambut, dan latar dipertahankan identik.",
      motion:
        "Gerakan halus dan ambient. Kepala miring 5 derajat lalu kembali. Kedipan natural setiap 4 detik. Rambut bergerak ringan oleh angin pelan.",
      emotion:
        "Sesuai mood foto referensi. Tidak menambahkan ekspresi baru atau senyum yang tidak ada di foto.",
      camera:
        "Static framing identik dengan referensi. Tanpa zoom, tanpa pan. 50mm equivalent.",
      negative:
        "wajah berubah, baju berganti warna, latar bergeser, anggota badan tambahan, motion blur agresif",
    },
  },
  {
    label: "couple_motion",
    matchers: [/couple|pasangan|berdua/i],
    template: {
      subject:
        "Pasangan 20-an, outfit casual netral, postur dekat dan natural.",
      motion:
        "Berjalan langkah sinkron pelan, sesekali saling pandang dan tertawa kecil. Tangan kanan saling memegang.",
      emotion: "Hangat, akrab, tawa yang tidak dipaksakan.",
      camera:
        "Tracking shot dari samping, 35mm, kecepatan kamera mengikuti langkah subjek.",
      negative:
        "tangan menyatu jadi satu, langkah tidak sinkron, drift posisi, ekspresi morphing",
    },
  },
  {
    label: "anti_face_drift",
    matchers: [/face drift|wajah berubah|konsisten wajah|anti drift|consistent face/i],
    template: {
      subject:
        "Subjek dari referensi. Fitur wajah, rambut, dan pakaian dipertahankan identik di setiap frame.",
      motion:
        "Gerakan kepala lembut maksimal 8 derajat. Kedipan natural setiap 3 detik. Bahu naik-turun mengikuti napas.",
      emotion: "Ekspresi netral hangat, kontak mata stabil ke kamera.",
      camera:
        "Static medium close-up, eye-level, framing 3/4. Tanpa zoom, tanpa pan.",
      negative:
        "morphing wajah, mata bergeser, hidung berubah bentuk, rahang menyusut, plastic skin, AI glow",
    },
  },
  {
    label: "product",
    matchers: [/produk|product|barang|botol|sepatu|brand/i],
    template: {
      subject:
        "Produk dari referensi di atas alas marmer netral. Label menghadap kamera, posisi simetris.",
      motion:
        "Rotasi 360 derajat searah jarum jam, kecepatan konstan, durasi 6 detik.",
      emotion: "Bersih, tenang, premium.",
      camera:
        "Static low-angle 50mm. Soft key light dari kanan. Fill ringan di kiri.",
      negative:
        "label rusak, refleksi kamera, gerakan goyang, distorsi botol, motion blur",
    },
  },
  {
    label: "viral_hook",
    matchers: [/hook|viral|3 detik|opening|pembuka|reels|shorts|tiktok/i],
    template: {
      subject:
        "Subjek menatap langsung ke kamera, framing close-up dada ke atas, format vertikal 9:16.",
      motion:
        "Mulut bergerak alami mengikuti audio. Kepala diam. Alis sedikit naik di akhir kalimat pertama.",
      emotion: "Penasaran, mengundang, bukan agresif.",
      camera: "Static close-up 35mm, eye-level, framing 9:16.",
      negative:
        "ekspresi berlebihan, gestur tangan random, latar mengganggu, lipsync miss",
    },
  },
  {
    label: "headshot",
    matchers: [/headshot|linkedin|profil|portrait|pasfoto/i],
    template: {
      subject:
        "Profesional 30-an, blazer netral, kemeja polos, rambut rapi, postur tegak 3/4 angle.",
      motion: "Foto diam. Postur stabil. Sedikit miring ke kanan 5 derajat.",
      emotion: "Percaya diri, ramah, approachable.",
      camera:
        "85mm equivalent, f/2.0. Soft key light kiri, fill light kanan, latar netral abu lembut.",
      negative:
        "tangan ekstra, jari aneh, blur, latar ramai, sticker glow, smoothing kulit",
    },
  },
  {
    label: "landscape",
    matchers: [/landscape|pemandangan|gunung|pantai|sunset|sunrise|city/i],
    template: {
      subject:
        "Pemandangan dari referensi. Komposisi rule of thirds, foreground jelas.",
      motion:
        "Awan bergerak pelan, kabut naik perlahan, parallax foreground subtle. Durasi 6 detik.",
      emotion: "Tenang, lapang, kontemplatif.",
      camera: "Slow dolly-in, 24mm wide, sedikit tilt-up di akhir.",
      negative:
        "objek bergerak random, warna oversaturate, glitch geometri, oversharpened",
    },
  },
];

const FALLBACK: Intent["template"] = {
  subject:
    "Subjek utama dari referensi. Detail pakaian, ekspresi awal, dan latar dipertahankan.",
  motion:
    "Gerakan halus dan natural. Kepala bergerak ringan, kedipan setiap 3-4 detik, ekspresi tetap konsisten.",
  emotion: "Tenang dan hangat. Tidak menambahkan emosi baru di luar referensi.",
  camera:
    "Static medium shot 35-50mm, eye-level, framing seimbang. Tanpa zoom dan tanpa pan.",
  negative:
    "wajah berubah, distorsi tangan, gerakan patah, latar bergeser, plastic skin, AI glow",
};

export interface StructuredPrompt {
  subject: string;
  motion: string;
  emotion: string;
  camera: string;
  negative: string;
  intent: string;
}

export function structurePrompt(input: string): StructuredPrompt {
  const text = input.trim();
  if (!text) {
    return { ...FALLBACK, intent: "default" };
  }
  const matched = INTENTS.find((intent) =>
    intent.matchers.some((rx) => rx.test(text)),
  );
  const base = matched?.template ?? FALLBACK;
  return { ...base, intent: matched?.label ?? "default" };
}

export function structuredToText(p: StructuredPrompt): string {
  return [
    `Subject: ${p.subject}`,
    `Motion: ${p.motion}`,
    `Emotion: ${p.emotion}`,
    `Camera: ${p.camera}`,
    `Negative prompt: ${p.negative}`,
  ].join("\n");
}

export const DEMO_EXAMPLES = [
  "buat foto jadi video natural",
  "couple jalan di taman",
  "wajah subjek tetap konsisten",
  "hook 3 detik buat reels",
];
