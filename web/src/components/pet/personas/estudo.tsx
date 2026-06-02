"use client";

import { CatHead } from "../cat-head";

export function EstudoPersona() {
  return (
    <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
      <CatHead />
      <circle cx="38" cy="44" r="3" className="fill-card" />
      <circle cx="62" cy="44" r="3" className="fill-card" />
      <circle cx="38" cy="44" r="2" className="fill-neutral-950" />
      <circle cx="62" cy="44" r="2" className="fill-neutral-950" />
      <circle cx="38" cy="44" r="7.5" className="fill-transparent stroke-primary stroke-[2.2]" />
      <circle cx="62" cy="44" r="7.5" className="fill-transparent stroke-primary stroke-[2.2]" />
      <line x1="45.5" y1="44" x2="54.5" y2="44" className="stroke-primary stroke-[2.2] [stroke-linecap:round]" />
      <line x1="22" y1="42" x2="30.5" y2="43" className="stroke-primary stroke-[2] [stroke-linecap:round]" />
      <line x1="78" y1="42" x2="69.5" y2="43" className="stroke-primary stroke-[2] [stroke-linecap:round]" />
      <path
        d="M 16 72 Q 30 66 50 70 Q 70 66 84 72 L 84 88 Q 84 90 82 90 Q 70 86 50 88 Q 30 86 18 90 Q 16 90 16 88 Z"
        className="fill-primary"
      />
      <path d="M 50 70 L 50 88" className="stroke-neutral-950/45 stroke-[1.2]" />
      <path
        d="M 26 76 L 44 74 M 26 80 L 42 78 M 26 84 L 44 82"
        className="stroke-card stroke-[1.2] opacity-75 [stroke-linecap:round]"
      />
      <path
        d="M 56 74 L 74 76 M 58 78 L 74 80 M 56 82 L 74 84"
        className="stroke-card stroke-[1.2] opacity-75 [stroke-linecap:round]"
      />
    </svg>
  );
}
