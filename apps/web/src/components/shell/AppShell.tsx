"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconBook,
  IconGrid,
  IconHome,
  IconSun,
  IconUser,
} from "@/components/ui/Icon";
import { hijriDateLabel } from "@/lib/dates";
import { EXPLORE_ITEMS } from "@/lib/explore";
import { VantaFog } from "@/components/motion/VantaFog";

const NAV = [
  { href: "/", label: "Home", icon: IconHome },
  { href: "/quran", label: "Quran", icon: IconBook },
  { href: "/prayer", label: "Prayer", icon: IconSun },
  { href: "/explore", label: "Explore", icon: IconGrid },
  { href: "/profile", label: "Profile", icon: IconUser },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/prayer") return pathname === "/prayer" || pathname.startsWith("/qibla");
  if (href === "/profile") {
    return (
      pathname === "/profile" ||
      pathname.startsWith("/settings") ||
      pathname.startsWith("/bookmarks")
    );
  }
  if (href === "/explore") {
    if (pathname.startsWith("/qibla")) return false;
    if (pathname === "/explore" || pathname.startsWith("/explore/")) return true;
    return EXPLORE_ITEMS.some(
      (item) =>
        item.href !== "/qibla" &&
        (pathname === item.href || pathname.startsWith(`${item.href}/`)),
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavItems({ pathname, desktop }: { pathname: string; desktop?: boolean }) {
  return (
    <>
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={`focus-ring flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl px-2 text-[10px] tracking-[0.14em] uppercase md:min-h-0 md:flex-none md:flex-row md:justify-start md:gap-3 md:px-3 md:py-2.5 md:text-sm md:normal-case md:tracking-normal ${
              desktop ? "" : "py-1"
            } ${active ? "bg-soft text-gold" : "text-muted hover:text-foreground"}`}
          >
            <Icon size={desktop ? 20 : 22} />
            {label}
          </Link>
        );
      })}
    </>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hijri = hijriDateLabel();

  return (
    <div className="relative min-h-full bg-background text-foreground md:flex">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <VantaFog />
        <div className="geom-veil absolute inset-0 opacity-70" />
      </div>

      <aside className="relative z-10 hidden w-60 shrink-0 border-r border-gold/20 bg-nav/80 p-5 backdrop-blur-md md:flex md:flex-col">
        <Link href="/" className="mb-10 px-2">
          <p dir="rtl" lang="ar" className="font-amiri text-3xl leading-none text-gold">
            هُدًى
          </p>
          <p className="mt-2 font-display text-lg tracking-[0.28em] text-foreground">HUDA</p>
        </Link>
        <nav className="flex flex-col gap-1">
          <NavItems pathname={pathname} desktop />
        </nav>
        <div className="mt-auto px-2">
          <div className="ornament-line mb-3" />
          <p className="text-xs leading-relaxed text-muted">{hijri}</p>
        </div>
      </aside>

      <div className="relative z-10 flex min-h-full min-w-0 flex-1 flex-col pb-[calc(5.75rem+env(safe-area-inset-bottom))] md:pb-0">
        <header className="flex items-center justify-between border-b border-gold/20 px-5 py-3.5 backdrop-blur-md md:hidden">
          <Link href="/" className="min-h-11 flex items-center">
            <p dir="rtl" lang="ar" className="font-amiri text-2xl leading-none text-gold">
              هُدًى
            </p>
          </Link>
          <p className="max-w-[55%] text-right text-[11px] leading-snug text-muted">{hijri}</p>
        </header>
        <main className="flex-1">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 px-3 pb-[calc(0.65rem+env(safe-area-inset-bottom))] pt-2 md:hidden">
        <div className="mx-auto flex max-w-md items-stretch rounded-[1.6rem] border border-gold/25 bg-nav/90 px-1.5 py-1 shadow-[0_12px_40px_-18px_rgba(7,18,16,0.8)] backdrop-blur-xl">
          <NavItems pathname={pathname} />
        </div>
      </nav>
    </div>
  );
}
