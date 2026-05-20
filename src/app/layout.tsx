import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meowverseee.com"),
  title: {
    default: "meowverseee — prompt systems for AI creators",
    template: "%s · meowverseee",
  },
  description:
    "Curated AI prompt systems and creator workflows. Stop wasting credits on generic prompts. Get structured prompts that work.",
  openGraph: {
    title: "meowverseee — prompt systems for AI creators",
    description:
      "Curated AI prompt systems and creator workflows. Stop wasting credits on generic prompts.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFDFE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${fraunces.variable} ${mono.variable}`}
    >
      <body className="font-sans bg-canvas text-ink antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
