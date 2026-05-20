import type { PromptItem } from "./prompts";

type FieldKeys = "subject" | "action" | "shot" | "lighting" | "audio" | "negative";
type IntentTemplate = Pick<PromptItem, FieldKeys>;

interface Intent {
  label: string;
  matchers: RegExp[];
  template: IntentTemplate;
}

const INTENTS: Intent[] = [
  {
    label: "image_to_video_natural",
    matchers: [
      /foto.*(jadi|menjadi|ke).*video/i,
      /image.?to.?video/i,
      /\bi2v\b/i,
      /animasi(in)? foto/i,
    ],
    template: {
      subject:
        "Persis seperti foto referensi. Pakaian, rambut, latar, dan ekspresi awal dipertahankan identik.",
      action:
        "[00:00\u201300:01] Kedipan halus. [00:01\u201300:03] Kepala miring 4\u00b0 ke kanan dan kembali. [00:03\u201300:04] Senyum tipis tumbuh perlahan tanpa membuka mulut.",
      shot:
        "Static framing identik dengan referensi. 50mm equivalent, depth of field mengikuti referensi, tanpa zoom dan tanpa pan.",
      lighting:
        "Mengikuti lighting foto referensi. Tidak menambahkan key light baru, hanya gerakan refleksi dan rambut yang sudah ada.",
      audio: "Mute, atau room tone -50 dB. No dialogue, no music.",
      negative:
        "wajah berubah, baju berganti warna, latar bergeser, anggota badan tambahan, ekspresi melompat, lipsync palsu",
    },
  },
  {
    label: "couple_motion",
    matchers: [/couple|pasangan|berdua|bareng pacar/i],
    template: {
      subject:
        "Pasangan 20-an, outfit casual netral. Subjek A: jaket linen oat. Subjek B: dress katun mocha. Sneaker putih.",
      action:
        "[00:00\u201300:02] Memasuki frame dari kanan, langkah sinkron. [00:02\u201300:06] Tangan kanan A memegang tangan kiri B, sesekali saling pandang. [00:06\u201300:08] B tertawa kecil satu beat.",
      shot:
        "Tracking shot dari samping, 35mm, eye-level, framing pinggang ke atas, kecepatan kamera match dengan langkah subjek.",
      lighting:
        "Golden hour 6500K dari kiri-belakang, fill kabut tipis, daun sebagai natural gobo. Palette: oat, mocha, sage, warm amber.",
      audio:
        "Ambient: taman pagi, burung kecil, langkah di gravel. SFX: gesekan jaket linen. No dialogue terbaca.",
      negative:
        "tangan menyatu jadi satu, langkah tidak sinkron, drift posisi, ekspresi morphing, latar bergeser",
    },
  },
  {
    label: "anti_face_drift",
    matchers: [
      /face drift|wajah berubah|konsisten wajah|anti drift|consistent face|character consistency/i,
    ],
    template: {
      subject:
        "Subjek dari character reference (mis. Sora 2 Characters API atau Kling reference). Fitur wajah, rambut, dan pakaian dipertahankan identik di setiap frame.",
      action:
        "[00:00\u201300:02] Kontak mata stabil ke kamera, kedipan natural. [00:02\u201300:05] Kepala miring 6\u00b0 lalu kembali. [00:05\u201300:08] Bahu naik-turun mengikuti napas, ekspresi netral hangat.",
      shot:
        "Static medium close-up, 85mm, f/2.8, eye-level, framing 3/4. Tanpa zoom, tanpa pan.",
      lighting:
        "Soft key 5600K dari kiri 45\u00b0, fill reflector cream tipis dari kanan, hair light cool tipis. Palette: charcoal, cream, soft grey, skin warm.",
      audio: "Ambient: ruangan tenang -45 dB. No dialogue, no music.",
      negative:
        "morphing wajah, mata bergeser, hidung berubah bentuk, rahang menyusut, plastic skin, AI glow, smoothing pori",
    },
  },
  {
    label: "product",
    matchers: [/produk|product|barang|botol|sepatu|brand|skincare|kosmetik/i],
    template: {
      subject:
        "Produk dari referensi di atas alas marmer netral. Label menghadap kamera, posisi simetris, tanpa teks merek terbaca.",
      action:
        "[00:00\u201300:04] Rotasi 360\u00b0 searah jarum jam dengan kecepatan konstan. [00:04\u201300:06] Settle frame akhir, refleksi highlight bergeser pelan.",
      shot:
        "Static low-angle hero, 50mm, f/4.0 deep focus, framing simetris, 1080p 16:9.",
      lighting:
        "Softbox 4x6 dari kiri sebagai key 5600K, gridded back light untuk separasi, gobo tipis di lantai. Palette: bone, slate, soft amber.",
      audio: "Mute. Optional room tone -50 dB. No dialogue, no music.",
      negative:
        "label dengan teks terbaca, refleksi kamera, distorsi botol, gerakan goyang, motion blur, jari masuk frame",
    },
  },
  {
    label: "viral_hook",
    matchers: [/hook|viral|3 detik|opening|pembuka|reels|shorts|tiktok/i],
    template: {
      subject:
        "Subjek menatap langsung ke kamera, framing close-up dada ke atas, format vertikal 9:16. Outfit netral, anting kecil opsional.",
      action:
        "[00:00\u201300:01] Tatapan langsung, kepala diam. [00:01\u201300:03] Mengucapkan pertanyaan singkat, alis sedikit naik di akhir kalimat.",
      shot:
        "Close-up 35mm, f/2.0, eye-level, framing 9:16, kamera diam.",
      lighting:
        "Window key kiri 5500K, fill kanan reflector cream, latar bokeh hangat. Palette: cream, oat, walnut, skin warm.",
      audio:
        "Dialogue: \"Kenapa hasil AI kamu masih kayak gitu-gitu aja?\" Ambient: ruangan tenang. No music.",
      negative:
        "ekspresi berlebihan, gestur tangan random, latar mengganggu, lipsync miss, mata bergeser",
    },
  },
  {
    label: "headshot",
    matchers: [/headshot|linkedin|profil|portrait|pasfoto|talking head|host|founder/i],
    template: {
      subject:
        "Profesional 30-an, blazer wol charcoal, kemeja krem polos, rambut sebahu, anting kecil emas.",
      action:
        "[00:00\u201300:02] Kontak mata dengan kamera, sedikit miring kepala 3\u00b0. [00:02\u201300:07] Berbicara satu kalimat utuh dengan gestur tangan halus di luar frame. [00:07\u201300:08] Senyum tipis menutup kalimat.",
      shot:
        "Medium close-up dada ke atas, 85mm, f/2.8, eye-level, framing 3/4, kamera diam.",
      lighting:
        "Soft key kiri 45\u00b0 5600K, fill kanan reflector cream, hair light cool dari belakang, latar abu lembut. Palette: charcoal, cream, soft grey.",
      audio:
        "Dialogue: \"Hai, hari ini kita mulai dari satu hal yang sering bikin hasil kamu inkonsisten.\" Ambient: ruang tertutup tenang. No music.",
      negative:
        "lipsync miss, mata juling, plastic skin, kepala bergerak liar, makeup heavy, tangan masuk frame tiba-tiba",
    },
  },
  {
    label: "landscape",
    matchers: [/landscape|pemandangan|gunung|pantai|sunset|sunrise|city|kota/i],
    template: {
      subject:
        "Pemandangan dari referensi. Komposisi rule of thirds, foreground jelas dengan parallax subtle.",
      action:
        "[00:00\u201300:03] Awan bergerak pelan ke kanan dengan kecepatan natural. [00:03\u201300:05] Kabut atau bayangan bergeser, parallax foreground subtle. [00:05\u201300:06] Settle frame akhir.",
      shot:
        "Slow dolly-in 30cm, 24mm wide, deep focus, sedikit tilt-up 2\u00b0 di akhir.",
      lighting:
        "Mengikuti referensi: golden hour, key dari kanan, kabut sebagai natural diffuser. Palette: cobalt sky, oat grass, slate rock, soft amber.",
      audio: "Ambient: angin lembut, suara alam jauh. No music, no dialogue.",
      negative:
        "objek bergerak random, warna oversaturate, glitch geometri, oversharpened, awan flicker, parallax patah",
    },
  },
  {
    label: "dialogue_scene",
    matchers: [/dialog|percakapan|ngobrol|two character|two-shot|interview/i],
    template: {
      subject:
        "Karakter A: pria 35 tahun, sweater navy. Karakter B: wanita 33 tahun, blouse silk pearl. Setting: meja kayu walnut, dua gelas air.",
      action:
        "[00:00\u201300:04] A meletakkan gelas, melihat ke B sambil bicara satu kalimat. [00:04\u201300:08] B menjawab pelan dengan senyum tipis, jari bermain di tepi gelas.",
      shot:
        "Shot 1: medium A 50mm. Shot 2: reverse medium B 50mm. 180\u00b0 rule, eye-level, depth of field shallow.",
      lighting:
        "Practical pendant warm 2700K di atas meja, ambient resto fall-off ke shadow lembut. Palette: walnut, navy, pearl, candle amber.",
      audio:
        "Dialogue:\nA: \"Aku nggak nyangka kamu beneran datang.\"\nB: \"Aku juga nggak nyangka aku iya.\"\nAmbient: restoran sedang ramai -24 LUFS.",
      negative:
        "lipsync miss, gelas teleport, jari menembus gelas, kepala saling menembus, plastic skin",
    },
  },
  {
    label: "motion_control",
    matchers: [/motion control|reference video|dance|choreo|sport|martial|spar/i],
    template: {
      subject:
        "Karakter dari character reference. Outfit dan proporsi tubuh dipertahankan persis dengan identitas referensi.",
      action:
        "Motion Control: gunakan video referensi (uploaded) sebagai timeline gerakan. Karakter mengikuti choreography frame demi frame, tanpa mengubah tempo atau ritme.",
      shot:
        "Locked-off medium-wide 35mm, eye-level, framing center, kamera diam, ground line stabil.",
      lighting:
        "Single key spot 5600K dari atas-depan 30\u00b0, fill ringan dari kanan, latar gradient ungu ke charcoal. Palette: charcoal, lavender, bone.",
      audio:
        "Music: track yang sama dengan referensi atau di-mute. SFX: footsteps mengikuti beat.",
      negative:
        "spaghetti limbs, kaki menembus lantai, drift posisi, tempo tidak match, jari menyatu, outfit berubah",
    },
  },
];

const FALLBACK: IntentTemplate = {
  subject:
    "Subjek utama dari referensi. Detail pakaian, ekspresi awal, dan latar dipertahankan.",
  action:
    "[00:00\u201300:02] Setup pose awal, kedipan natural. [00:02\u201300:05] Aksi utama dijalankan dengan timing seimbang. [00:05\u201300:08] Settle ke pose akhir tenang.",
  shot:
    "Medium shot 35\u201350mm, eye-level, depth of field menengah, framing seimbang. Tanpa zoom dan tanpa pan.",
  lighting:
    "Soft key 5500K dari kiri, fill reflector cream dari kanan, latar fall-off ke shadow lembut. Palette: bone, walnut, warm amber.",
  audio: "Ambient: ruangan tenang. SFX minimal. No dialogue kecuali diminta.",
  negative:
    "wajah berubah, distorsi tangan, gerakan patah, latar bergeser, plastic skin, AI glow, motion blur agresif",
};

export interface StructuredPrompt {
  subject: string;
  action: string;
  shot: string;
  lighting: string;
  audio: string;
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
    `Action: ${p.action}`,
    `Shot: ${p.shot}`,
    `Lighting & palette: ${p.lighting}`,
    `Audio: ${p.audio}`,
    `Negative prompt: ${p.negative}`,
  ].join("\n");
}

export const DEMO_EXAMPLES = [
  "buat foto jadi video natural",
  "couple jalan di taman pagi",
  "wajah subjek tetap konsisten",
  "hook 3 detik buat reels",
  "transfer dance dari video referensi",
  "two character dialog scene",
];
