import type { Metadata } from "next";
import { Geist, Noto_Naskh_Arabic } from "next/font/google";
import { AppShell } from "@/components/shell/AppShell";
import { ThemeScript } from "@/components/shell/ThemeScript";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HUDA — Guidance, wherever you are.",
  description:
    "Quran, prayer, Qibla, Hadith, Duas, Adhkar, and Islamic knowledge — privacy-first and ad-free.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${naskh.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <ThemeScript />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
