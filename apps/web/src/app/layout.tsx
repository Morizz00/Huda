import type { Metadata } from "next";
import { Amiri, Cormorant_Garamond, Noto_Naskh_Arabic, Outfit } from "next/font/google";
import { AppShell } from "@/components/shell/AppShell";
import { ThemeScript } from "@/components/shell/ThemeScript";
import { LenisProvider } from "@/components/motion/LenisProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "HUDA — Guidance, wherever you are.",
  description:
    "Quran, prayer, Qibla, Hadith, Duas, Adhkar, and Islamic knowledge — privacy-first and ad-free.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} ${naskh.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <ThemeScript />
        <LenisProvider>
          <AppShell>{children}</AppShell>
        </LenisProvider>
      </body>
    </html>
  );
}
