"use client";

import { JSX } from "react";
import { CatHeadBase } from "../cat-head-base";
import { MiniCatBase } from "../mini-cat-base";

const BODY = "var(--mouse-body, #e7eaea)";
const ACCENT = "var(--mouse-accent, #3a70f4)";
const DETAIL = "var(--mouse-detail, #0a0a0a)";

export const GamerCat = ({ className }: { className?: string } = {}) => (
  <CatHeadBase className={className}>
    <path
      d="M 36 56 Q 80 4 124 56"
      stroke={DETAIL}
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
    />
    <rect x="18" y="48" width="16" height="26" rx="4" fill={DETAIL} />
    <rect x="126" y="48" width="16" height="26" rx="4" fill={ACCENT} />
    <rect x="20" y="54" width="12" height="12" fill={ACCENT} />
    <path
      d="M 18 74 Q 12 92 36 102"
      stroke={DETAIL}
      strokeWidth="2.6"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="38" cy="104" r="3.6" fill={ACCENT} />
    <g transform="translate(80 160)">
      <path
        d="M -34 -8 Q -34 -16 -26 -16 L 26 -16 Q 34 -16 34 -8 L 34 8 Q 34 16 26 16 L -26 16 Q -34 16 -34 8 Z"
        fill={DETAIL}
      />
      <circle cx="-16" cy="0" r="4" fill={ACCENT} />
      <rect x="-22" y="-1" width="4" height="2" fill={BODY} />
      <rect x="-14" y="-1" width="4" height="2" fill={BODY} />
      <rect x="-17" y="-5" width="2" height="4" fill={BODY} />
      <rect x="-17" y="1" width="2" height="4" fill={BODY} />
      <circle cx="16" cy="-4" r="3" fill={ACCENT} />
      <circle cx="22" cy="4" r="3" fill={BODY} />
      <circle cx="10" cy="4" r="3" fill={BODY} />
    </g>
  </CatHeadBase>
);

export const GamerMiniCat = ({ className }: { className?: string } = {}) => (
  <MiniCatBase className={className}>
    <path
      d="M 22 40 Q 50 6 78 40"
      stroke={DETAIL}
      strokeWidth="2.6"
      fill="none"
      strokeLinecap="round"
    />
    <rect x="12" y="34" width="10" height="16" rx="2.5" fill={DETAIL} />
    <rect x="78" y="34" width="10" height="16" rx="2.5" fill={ACCENT} />
    <rect x="13.5" y="38" width="7" height="8" fill={ACCENT} />
  </MiniCatBase>
);
