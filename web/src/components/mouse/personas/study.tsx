"use client";

import { CatHead } from "../cat-head";
import { cn } from "@/lib/utils";

export function StudyPersona({
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
      <circle cx="38" cy="44" r="3" fill={CAT_WHITE} />
      <circle cx="62" cy="44" r="3" fill={CAT_WHITE} />
      <circle cx="38" cy="44" r="2" fill="black" />
      <circle cx="62" cy="44" r="2" fill="black" />
      <circle
        cx="38"
        cy="44"
        r="7.5"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
      <circle
        cx="62"
        cy="44"
        r="7.5"
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.2"
      />
      <line
        x1="45.5"
        y1="44"
        x2="54.5"
        y2="44"
        stroke={ACCENT}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="22"
        y1="42"
        x2="30.5"
        y2="43"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="78"
        y1="42"
        x2="69.5"
        y2="43"
        stroke={ACCENT}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 16 72 Q 30 66 50 70 Q 70 66 84 72 L 84 88 Q 84 90 82 90 Q 70 86 50 88 Q 30 86 18 90 Q 16 90 16 88 Z"
        fill={ACCENT}
      />
      <path
        d="M 50 70 L 50 88"
        stroke={DETAIL}
        strokeWidth="1.2"
        opacity="0.45"
      />
      <path
        d="M 26 76 L 44 74 M 26 80 L 42 78 M 26 84 L 44 82"
        stroke={CAT_WHITE}
        strokeWidth="1.2"
        opacity="0.75"
        strokeLinecap="round"
      />
      <path
        d="M 56 74 L 74 76 M 58 78 L 74 80 M 56 82 L 74 84"
        stroke={CAT_WHITE}
        strokeWidth="1.2"
        opacity="0.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
