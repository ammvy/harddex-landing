"use client";

import { cn } from "@/lib/utils";

interface MiniCatBaseProps extends React.ComponentProps<"svg"> {
  children?: React.ReactNode;
}

export function MiniCatBase({ className, children, ...props }: MiniCatBaseProps) {
  const BODY = "var(--mouse-body, #e7eaea)";
  const ACCENT = "var(--mouse-accent, #3a70f4)";
  const DETAIL = "var(--mouse-detail, #0a0a0a)";

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("w-full h-full", className)}
      {...props}
    >
      <path d="M 22 38 L 30 10 L 40 40 Z" fill={BODY} />
      <path d="M 78 38 L 70 10 L 60 40 Z" fill={BODY} />
      <path d="M 27 36 L 30 20 L 35 38 Z" fill={ACCENT} />
      <path d="M 73 36 L 70 20 L 65 38 Z" fill={ACCENT} />
      <path
        d="M 18 46 Q 18 32 32 32 L 68 32 Q 82 32 82 46 L 82 76 Q 82 92 50 92 Q 18 92 18 76 Z"
        fill={BODY}
      />
      <circle cx="38" cy="60" r="3" fill={DETAIL} />
      <circle cx="62" cy="60" r="3" fill={DETAIL} />
      <circle cx="39" cy="59" r="0.9" fill={BODY} />
      <circle cx="63" cy="59" r="0.9" fill={BODY} />
      <circle cx="28" cy="68" r="2" fill={ACCENT} opacity="0.3" />
      <circle cx="72" cy="68" r="2" fill={ACCENT} opacity="0.3" />
      <path d="M 47 70 L 53 70 L 50 74 Z" fill={ACCENT} />
      <path
        d="M 50 74 Q 50 78 47 78 M 50 74 Q 50 78 53 78"
        stroke={DETAIL}
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      />
      {children}
    </svg>
  );
}
