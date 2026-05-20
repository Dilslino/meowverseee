import data from "./prompts.json";

export interface PromptItem {
  id: string;
  title: string;
  category: string;
  tool: string;
  difficulty: "Pemula" | "Menengah" | "Lanjutan";
  preview: string;
  subject: string;
  action: string;
  shot: string;
  lighting: string;
  audio: string;
  negative: string;
  tags: string[];
}

interface PromptDatabase {
  categories: string[];
  tools: string[];
  items: PromptItem[];
}

const db = data as PromptDatabase;

export const CATEGORIES = db.categories;
export const TOOLS = db.tools;
export const PROMPTS: PromptItem[] = db.items;

export function getPromptById(id: string): PromptItem | undefined {
  return PROMPTS.find((p) => p.id === id);
}

export function formatPromptText(p: PromptItem): string {
  return [
    `Subject: ${p.subject}`,
    `Action: ${p.action}`,
    `Shot: ${p.shot}`,
    `Lighting & palette: ${p.lighting}`,
    `Audio: ${p.audio}`,
    `Negative prompt: ${p.negative}`,
  ].join("\n");
}
