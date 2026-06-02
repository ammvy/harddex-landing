"use client";

import { CatHead } from "../cat-head";

export function ProPersona() {
  const ACCENT = "var(--primary)";
  const CAT_WHITE = "var(--card)";

  return (
    <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
      <CatHead />
      <path
        d="M 14 92 L 14 78 Q 14 64 30 64 L 70 64 Q 86 64 86 78 L 86 92 Z"
        fill="#0F0F0F"
      />
      <path
        d="M 30 64 L 50 78 L 50 92 L 30 92 Q 30 80 30 64 Z"
        fill={CAT_WHITE}
      />
      <path
        d="M 70 64 L 50 78 L 50 92 L 70 92 Q 70 80 70 64 Z"
        fill={CAT_WHITE}
      />
      <path
        d="M 44 64 L 50 70 L 56 64 L 54 72 L 50 75 L 46 72 Z"
        fill={ACCENT}
      />
      <path d="M 46 72 L 54 72 L 56 88 L 50 92 L 44 88 Z" fill={ACCENT} />
      <path
        d="M 46 72 L 54 72 L 53.5 76 L 46.5 76 Z"
        fill="#0A0A0A"
        opacity="0.25"
      />
    </svg>
  );
}
