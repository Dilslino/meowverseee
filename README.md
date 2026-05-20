# meowverseee

Premium AI prompt system landing page. Next.js 14 App Router, TypeScript, Tailwind, Framer Motion, Radix primitives.

## Quick start

```bash
pnpm install   # or npm install / yarn
pnpm dev
```

Open http://localhost:3000.

## Stack

- Next.js 14 (App Router, server components by default)
- TypeScript strict
- Tailwind CSS with custom brand tokens (`#FF82C7`, `#F8DDF1`, `#D85FA7`, `#FFFDFE`, `#A7F3D0`, `#F3D8EA`, `#111827`, `#5B6472`)
- Framer Motion for entrance and hover motion
- Radix primitives wrapped as shadcn-style UI (button, card, dialog, accordion, toast, badge, input)
- Lucide icons
- Local JSON prompt database at `src/data/prompts.json`

## Project layout

```
src/
  app/
    layout.tsx        # Fonts, metadata, ToastProvider
    page.tsx          # Section composition
    globals.css       # Tailwind layers, design tokens
  components/
    navbar.tsx
    footer.tsx
    logo.tsx
    section-heading.tsx
    sections/
      hero.tsx
      live-prompt-demo.tsx
      why-fail.tsx
      prompt-library.tsx
      pricing.tsx
      before-after.tsx
      how-it-works.tsx
      social-proof.tsx
      faq.tsx
      final-cta.tsx
    ui/
      accordion.tsx
      badge.tsx
      button.tsx
      card.tsx
      dialog.tsx
      input.tsx
      toast.tsx
  data/
    prompts.json      # Library data
    prompts.ts        # Typed accessors
    structure-prompt.ts  # Live demo intent → structured prompt
  hooks/
    use-copy.ts
    use-saved.ts      # localStorage-backed save list
  lib/
    utils.ts
```

## Functional notes

- Copy buttons write to clipboard with a textarea fallback.
- Saved prompts persist to `localStorage` under `meowverseee:saved-prompts`.
- Library search filters across title, preview, tool, and tags.
- Filter pills cycle category, "Tersimpan" shows saved-only, with empty state.
- Live demo maps Indonesian intents (image-to-video, couple, anti-drift, product, viral hook, headshot, landscape) to a structured prompt template.
- Pricing uses local `formatIDR`. No real payment provider is wired; the CTA shows a confirmation toast.
- Toast lives at `ui/toast.tsx`, mounted via `ToastProvider` in the root layout.

## Deploy to Vercel

```bash
vercel        # interactive
vercel --prod # deploy
```

No environment variables required.

## Scripts

- `pnpm dev` — local dev
- `pnpm build` — production build
- `pnpm start` — serve the build
- `pnpm lint` — Next ESLint
- `pnpm typecheck` — `tsc --noEmit`
