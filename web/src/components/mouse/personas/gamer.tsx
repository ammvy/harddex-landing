"use client";

import { CatHead } from "../cat-head";
import { cn } from "@/lib/utils";

export function GamerPersona({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  const ACCENT = "var(--mouse-accent, #3a70f4)";
  const CAT_WHITE = "var(--mouse-body, #e7eaea)";
  const DETAIL = "var(--mouse-detail, #0a0a0a)";

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("w-full h-full", className)}
      {...props}
    >
      <CatHead />
      <path
        d="M 16 36 Q 16 8 50 8 Q 84 8 84 36"
        fill="none"
        stroke={ACCENT}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <rect x="11" y="30" width="13" height="20" rx="3.5" fill={ACCENT} />
      <rect x="76" y="30" width="13" height="20" rx="3.5" fill={ACCENT} />
      <rect
        x="14"
        y="34"
        width="7"
        height="12"
        rx="2"
        fill={DETAIL}
        opacity="0.35"
      />
      <rect
        x="79"
        y="34"
        width="7"
        height="12"
        rx="2"
        fill={DETAIL}
        opacity="0.35"
      />
      <path
        d="M 24 70 Q 24 62 32 62 L 68 62 Q 76 62 76 70 L 76 84 Q 76 92 68 92 L 32 92 Q 24 92 24 84 Z"
        fill="#1F1F1F"
      />
      <path
        d="M 26 70 Q 26 64 32 64 L 68 64 Q 74 64 74 70 L 74 84 Q 74 90 68 90 L 32 90 Q 26 90 26 84 Z"
        fill={ACCENT}
      />
      <rect x="32" y="74" width="10" height="3" rx="1.5" fill={CAT_WHITE} />
      <rect x="35.5" y="70.5" width="3" height="10" rx="1.5" fill={CAT_WHITE} />
      <circle cx="58" cy="74" r="2" fill={CAT_WHITE} />
      <circle cx="66" cy="74" r="2" fill={CAT_WHITE} />
      <circle cx="58" cy="80" r="2" fill={CAT_WHITE} />
      <circle cx="66" cy="80" r="2" fill={CAT_WHITE} />
    </svg>
  );
}
