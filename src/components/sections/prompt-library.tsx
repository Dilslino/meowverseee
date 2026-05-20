"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  X,
  Sparkles,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SectionHeading } from "@/components/section-heading";
import { useSaved } from "@/hooks/use-saved";
import { useCopy } from "@/hooks/use-copy";
import { useToast } from "@/components/ui/toast";
import {
  CATEGORIES,
  PROMPTS,
  formatPromptText,
  type PromptItem,
} from "@/data/prompts";
import { cn } from "@/lib/utils";

const ALL = "Semua";
const FILTERS = [ALL, ...CATEGORIES, "Tersimpan"];

export function PromptLibrary() {
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState<string>(ALL);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<PromptItem | null>(null);
  const { saved, toggle, has } = useSaved();
  const { push } = useToast();

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROMPTS.filter((p) => {
      if (filter === "Tersimpan") {
        if (!saved.includes(p.id)) return false;
      } else if (filter !== ALL && p.category !== filter) {
        return false;
      }
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.preview.toLowerCase().includes(q) ||
        p.tool.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, filter, saved]);

  const onCardCopy = (p: PromptItem) => {
    push({ title: "Prompt copied.", description: p.title });
  };

  const onSave = (p: PromptItem) => {
    const wasSaved = has(p.id);
    toggle(p.id);
    push({
      title: wasSaved ? "Removed from saved." : "Saved to your library.",
      description: p.title,
      tone: "brand",
    });
  };

  return (
    <section id="library" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-canvas-warm via-canvas to-canvas"
      />
      <div className="container">
        <SectionHeading
          eyebrow="Prompt library"
          title={
            <>
              Prompt yang dipakai berulang. <br className="hidden md:block" />
              <span className="italic text-brand-700">Bukan dump acak.</span>
            </>
          }
          description="Setiap prompt sudah diuji di tool aslinya. Cari berdasarkan kategori, simpan favoritmu, copy dalam satu klik."
        />

        <div className="mt-12 rounded-3xl border border-line bg-canvas p-3 shadow-soft md:p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari: kling, couple, headshot, viral hook…"
                className="pl-10"
                aria-label="Search prompts"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink-muted hover:bg-canvas-soft hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </div>
            <div className="flex items-center gap-2 px-1 text-xs text-ink-muted md:px-3">
              <Filter className="h-3.5 w-3.5" />
              {filtered.length} prompt
            </div>
          </div>

          <div
            className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-clean"
            role="tablist"
            aria-label="Filter by category"
          >
            {FILTERS.map((f) => {
              const active = filter === f;
              const count =
                f === ALL
                  ? PROMPTS.length
                  : f === "Tersimpan"
                    ? saved.length
                    : PROMPTS.filter((p) => p.category === f).length;
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-medium tracking-tightish transition-colors",
                    active
                      ? "border-transparent bg-ink text-canvas"
                      : "border-line bg-canvas text-ink-soft hover:border-brand-300 hover:text-brand-700",
                  )}
                >
                  <span>{f}</span>
                  <span
                    className={cn(
                      "ml-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-mono",
                      active
                        ? "bg-canvas/15 text-canvas"
                        : "bg-canvas-soft text-ink-muted",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-canvas py-16 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl tracking-tighter2 text-ink">
                  {filter === "Tersimpan"
                    ? "Belum ada prompt tersimpan"
                    : "Tidak ada prompt yang cocok"}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-ink-muted">
                  {filter === "Tersimpan"
                    ? "Tap ikon bookmark di kartu untuk menyimpan prompt favoritmu."
                    : "Coba kata kunci lain atau pilih kategori berbeda."}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                layout
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((p, i) => (
                  <PromptCard
                    key={p.id}
                    item={p}
                    saved={has(p.id)}
                    onSave={() => onSave(p)}
                    onCopy={() => onCardCopy(p)}
                    onView={() => {
                      setActive(p);
                      setOpen(true);
                    }}
                    index={i}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {active ? <PromptDetail item={active} /> : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function PromptCard({
  item,
  saved,
  onSave,
  onCopy,
  onView,
  index,
}: {
  item: PromptItem;
  saved: boolean;
  onSave: () => void;
  onCopy: () => void;
  onView: () => void;
  index: number;
}) {
  const { copied, copy } = useCopy();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index, 6) * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-canvas p-5 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-plate"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge tone="brand">{item.category}</Badge>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            {item.tool}
          </span>
        </div>
        <button
          type="button"
          onClick={onSave}
          aria-label={saved ? "Remove from saved" : "Save prompt"}
          aria-pressed={saved}
          className={cn(
            "rounded-full border p-2 transition-all",
            saved
              ? "border-brand-300 bg-brand-50 text-brand-700"
              : "border-line bg-canvas text-ink-muted hover:border-brand-300 hover:text-brand-700",
          )}
        >
          {saved ? (
            <BookmarkCheck className="h-3.5 w-3.5" />
          ) : (
            <Bookmark className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      <button
        type="button"
        onClick={onView}
        className="mt-4 text-left"
      >
        <h3 className="font-display text-[19px] leading-snug tracking-tighter2 text-ink transition-colors group-hover:text-brand-700">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-ink-muted">
          {item.preview}
        </p>
      </button>

      <div className="mt-auto pt-5">
        <div className="mb-4 flex flex-wrap items-center gap-1.5">
          <Badge tone="outline">{item.difficulty}</Badge>
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-canvas-soft px-2 py-0.5 text-[11px] font-medium text-ink-muted"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onView}
            className="flex-1"
          >
            View
          </Button>
          <Button
            type="button"
            variant={copied ? "soft" : "primary"}
            size="sm"
            onClick={async () => {
              const ok = await copy(formatPromptText(item));
              if (ok) onCopy();
            }}
            className="flex-1"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

function PromptDetail({ item }: { item: PromptItem }) {
  const { copied, copy } = useCopy();
  const { push } = useToast();

  const onCopy = async () => {
    const ok = await copy(formatPromptText(item));
    if (ok) push({ title: "Prompt copied.", description: item.title });
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto pr-1">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="brand">{item.category}</Badge>
        <Badge tone="outline">{item.tool}</Badge>
        <Badge tone="positive">{item.difficulty}</Badge>
      </div>
      <DialogTitle className="mt-4">{item.title}</DialogTitle>
      <DialogDescription className="mt-2">{item.preview}</DialogDescription>

      <dl className="mt-6 space-y-3">
        {[
          { k: "Subject", v: item.subject },
          { k: "Action", v: item.action },
          { k: "Shot", v: item.shot },
          { k: "Lighting", v: item.lighting },
          { k: "Audio", v: item.audio },
        ].map((row) => (
          <div
            key={row.k}
            className="grid grid-cols-[88px_1fr] gap-3 rounded-2xl bg-canvas-soft p-3 ring-1 ring-line/70"
          >
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-700">
              {row.k}
            </dt>
            <dd className="text-[14px] leading-relaxed text-ink-soft">
              {row.v}
            </dd>
          </div>
        ))}
        <div className="rounded-2xl border border-dashed border-line p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
            Negative prompt
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
            {item.negative}
          </p>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-canvas-soft px-2.5 py-1 text-[11px] font-medium text-ink-muted"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          type="button"
          variant={copied ? "soft" : "brand"}
          onClick={onCopy}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy full prompt
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
