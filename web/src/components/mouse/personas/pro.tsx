"use client";

import { CatHead } from "../cat-head";
import { cn } from "@/lib/utils";

export function ProPersona({
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
        fill={DETAIL}
        opacity="0.25"
      />
    </svg>
  );
}
