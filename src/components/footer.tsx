import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-canvas">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Prompt system untuk creator yang serius. Hasil lebih konsisten,
              credit lebih hemat, output lebih layak posting.
            </p>
          </div>
          <FooterCol
            title="Produk"
            items={[
              { label: "Prompt Library", href: "#library" },
              { label: "How It Works", href: "#how" },
              { label: "Pricing", href: "#pricing" },
            ]}
          />
          <FooterCol
            title="Resource"
            items={[
              { label: "FAQ", href: "#faq" },
              { label: "Demo Prompt", href: "#demo" },
              { label: "Before / After", href: "#before-after" },
            ]}
          />
          <FooterCol
            title="Legal"
            items={[
              { label: "Terms", href: "#" },
              { label: "Privacy", href: "#" },
              { label: "Contact", href: "mailto:hi@meowverseee.com" },
            ]}
          />
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-muted md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} meowverseee. Dibuat untuk creator yang capek nge-prompt acak.</p>
          <p className="font-mono uppercase tracking-[0.2em] text-ink-muted/70">
            v0.1 · Jakarta
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-[15px] text-ink-soft transition-colors hover:text-brand-700"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
