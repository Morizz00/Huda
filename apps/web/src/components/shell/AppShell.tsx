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

function NavItems({ pathname }: { pathname: string }) {
  return (
    <>
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={`focus-ring flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] transition-colors md:flex-none md:flex-row md:gap-3 md:px-3 md:py-2.5 md:text-sm ${
              active ? "bg-soft text-accent" : "text-muted hover:text-foreground"
            }`}
          >
            <Icon size={20} />
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
    <div className="min-h-full bg-background text-foreground md:flex">
      <aside className="hidden w-52 shrink-0 border-r border-stroke bg-nav p-4 md:flex md:flex-col">
        <Link href="/" className="mb-8 px-2">
          <p dir="rtl" lang="ar" className="font-arabic text-2xl leading-none">
            هُدًى
          </p>
          <p className="mt-1 text-xs tracking-[0.2em] text-muted">HUDA</p>
        </Link>
        <nav className="flex flex-col gap-1">
          <NavItems pathname={pathname} />
        </nav>
        <p className="mt-auto px-2 text-xs leading-relaxed text-muted">{hijri}</p>
      </aside>

      <div className="flex min-h-full min-w-0 flex-1 flex-col pb-20 md:pb-0">
        <header className="flex items-center justify-between border-b border-stroke px-5 py-3 md:hidden">
          <Link href="/">
            <p dir="rtl" lang="ar" className="font-arabic text-xl leading-none">
              هُدًى
            </p>
          </Link>
          <p className="text-xs text-muted">{hijri}</p>
        </header>
        <main className="flex-1">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-stroke bg-nav/95 backdrop-blur-sm md:hidden">
        <div className="mx-auto flex max-w-md items-stretch px-2 py-1.5">
          <NavItems pathname={pathname} />
        </div>
      </nav>
    </div>
  );
}
