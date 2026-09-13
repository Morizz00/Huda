import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 22, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconHome(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
    </Base>
  );
}

export function IconBook(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 4.5h9.5A2.5 2.5 0 0 1 17 7v13.5H7.5A2.5 2.5 0 0 0 5 18z" />
      <path d="M5 18a2.5 2.5 0 0 1 2.5-2.5H17" />
    </Base>
  );
}

export function IconSun(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
    </Base>
  );
}

export function IconGrid(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" />
    </Base>
  );
}

export function IconUser(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="8.5" r="3.2" />
      <path d="M5 19.2c1.4-3 4-4.5 7-4.5s5.6 1.5 7 4.5" />
    </Base>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-3.5-3.5" />
    </Base>
  );
}

export function IconCompass(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m9.2 14.8 2-6.2 6.2 2-2 6.2z" />
    </Base>
  );
}

export function IconArrowLeft(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M19 12H6" />
      <path d="m10 7-4 5 4 5" />
    </Base>
  );
}
