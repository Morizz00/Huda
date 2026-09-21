import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  primary: "btn-primary hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
  secondary: "btn-secondary text-foreground hover:-translate-y-0.5 active:scale-[0.98]",
  ghost: "bg-transparent text-foreground hover:bg-soft",
  hero: "btn-hero hover:bg-hero-fg/20 active:scale-[0.98]",
} as const;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  href?: string;
  children: ReactNode;
};

export function Button({ variant = "primary", href, className = "", children, ...props }: Props) {
  const cls = `focus-ring inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${variants[variant]} ${className}`;
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
