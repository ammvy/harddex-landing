"use client";

import { CatHead } from "../cat-head";

export function GamerPersona() {
  return (
    <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
      <CatHead />
      <path
        d="M 16 36 Q 16 8 50 8 Q 84 8 84 36"
        className="fill-transparent stroke-primary stroke-[3.5] [stroke-linecap:round]"
      />
      <rect x="11" y="30" width="13" height="20" rx="3.5" className="fill-primary" />
      <rect x="76" y="30" width="13" height="20" rx="3.5" className="fill-primary" />
      <rect x="14" y="34" width="7" height="12" rx="2" className="fill-neutral-950/35" />
      <rect x="79" y="34" width="7" height="12" rx="2" className="fill-neutral-950/35" />
      <path
        d="M 24 70 Q 24 62 32 62 L 68 62 Q 76 62 76 70 L 76 84 Q 76 92 68 92 L 32 92 Q 24 92 24 84 Z"
        className="fill-neutral-900"
      />
      <path
        d="M 26 70 Q 26 64 32 64 L 68 64 Q 74 64 74 70 L 74 84 Q 74 90 68 90 L 32 90 Q 26 90 26 84 Z"
        className="fill-primary"
      />
      <rect x="32" y="74" width="10" height="3" rx="1.5" className="fill-card" />
      <rect x="35.5" y="70.5" width="3" height="10" rx="1.5" className="fill-card" />
      <circle cx="58" cy="74" r="2" className="fill-card" />
      <circle cx="66" cy="74" r="2" className="fill-card" />
      <circle cx="58" cy="80" r="2" className="fill-card" />
      <circle cx="66" cy="80" r="2" className="fill-card" />
    </svg>
  );
}
