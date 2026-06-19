"use client";

import { cn } from "@/lib/utils";

interface CatHeadBaseProps extends React.ComponentProps<"svg"> {
  children?: React.ReactNode;
}

export function CatHeadBase({ className, children, ...props }: CatHeadBaseProps) {
  const BODY = "var(--mouse-body, #e7eaea)";
  const ACCENT = "var(--mouse-accent, #3a70f4)";
  const DETAIL = "var(--mouse-detail, #0a0a0a)";

  return (
    <svg
      viewBox="0 0 160 200"
      className={cn("w-full h-auto max-w-[280px]", className)}
      {...props}
    >
      <path d="M 36 50 L 50 14 L 64 54 Z" fill={BODY} />
      <path d="M 124 50 L 110 14 L 96 54 Z" fill={BODY} />
      <path d="M 44 48 L 50 26 L 58 50 Z" fill={ACCENT} />
      <path d="M 116 48 L 110 26 L 102 50 Z" fill={ACCENT} />
      <path
        d="M 30 60 Q 30 44 50 44 L 110 44 Q 130 44 130 60 L 130 110 Q 130 130 80 130 Q 30 130 30 110 Z"
        fill={BODY}
      />
      <circle cx="62" cy="80" r="5" fill={DETAIL} />
      <circle cx="98" cy="80" r="5" fill={DETAIL} />
      <circle cx="63.5" cy="78" r="1.6" fill={BODY} />
      <circle cx="99.5" cy="78" r="1.6" fill={BODY} />
      <circle cx="44" cy="92" r="3.4" fill={ACCENT} opacity="0.3" />
      <circle cx="116" cy="92" r="3.4" fill={ACCENT} opacity="0.3" />
      <path d="M 76 96 L 84 96 L 80 102 Z" fill={ACCENT} />
      <path
        d="M 80 102 Q 80 108 76 108 M 80 102 Q 80 108 84 108"
        stroke={DETAIL}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      {children}
    </svg>
  );
}
