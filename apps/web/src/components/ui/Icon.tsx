import type { ReactNode, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

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

export function IconCalendar(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
      <path d="M4 9.5h16" />
      <path d="M8 3.5v3M16 3.5v3" />
    </Base>
  );
}

export function IconBeads(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="20" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="16" cy="18.9" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="8" cy="18.9" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="4" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="8" cy="5.1" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="16" cy="5.1" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 12v6.2" strokeDasharray="1 2.6" />
    </Base>
  );
}

export function IconMoon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M19.5 14.6A7.6 7.6 0 0 1 9.4 4.5a7.6 7.6 0 1 0 10.1 10.1z" />
    </Base>
  );
}

export function IconMap(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0c0 5.4 6.5 11 6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </Base>
  );
}

export function IconBookmark(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z" />
    </Base>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Base>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 12h13" />
      <path d="m14 7 5 5-5 5" />
    </Base>
  );
}
