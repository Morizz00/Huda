import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  primary:
    "bg-accent text-accent-fg hover:opacity-90",
  secondary:
    "bg-soft text-foreground hover:bg-stroke",
  ghost:
    "bg-transparent text-foreground hover:bg-soft",
  hero:
    "bg-hero-fg/10 text-hero-fg hover:bg-hero-fg/16",
} as const;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  href?: string;
  children: ReactNode;
};

export function Button({ variant = "primary", href, className = "", children, ...props }: Props) {
  const cls = `focus-ring inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition-opacity ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
