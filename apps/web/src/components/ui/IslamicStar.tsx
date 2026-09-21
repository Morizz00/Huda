/** Eight-pointed star (two overlapping squares) — the classic rub el hizb motif. */
export function IslamicStar({
  size = 120,
  className = "",
  strokeWidth = 1,
}: {
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="20" y="20" width="60" height="60" />
      <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
      <circle cx="50" cy="50" r="17" />
      <circle cx="50" cy="50" r="6" />
    </svg>
  );
}
