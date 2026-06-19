"use client";

import { JSX } from "react";
import { CatHeadBase } from "../cat-head-base";
import { MiniCatBase } from "../mini-cat-base";

const BODY = "var(--mouse-body, #e7eaea)";
const ACCENT = "var(--mouse-accent, #3a70f4)";
const DETAIL = "var(--mouse-detail, #0a0a0a)";

export const MobileCat = ({ className }: { className?: string } = {}) => (
  <CatHeadBase className={className}>
    <path
      d="M 46 36 Q 80 -2 122 30"
      stroke={DETAIL}
      strokeWidth="3.4"
      fill="none"
    />
    <rect x="116" y="26" width="16" height="22" rx="4" fill={ACCENT} />
    <rect x="118" y="32" width="12" height="3" fill={BODY} />
    <g transform="translate(80 168)">
      <path d="M -18 -14 L 18 -14 L 16 16 L -16 16 Z" fill={DETAIL} />
      <path
        d="M 18 -8 Q 30 -6 30 4 Q 30 14 18 12"
        stroke={DETAIL}
        strokeWidth="2.4"
        fill="none"
      />
      <rect x="-14" y="-18" width="28" height="4" fill={BODY} />
      <path
        d="M -6 -22 Q -6 -28 -2 -28"
        stroke={ACCENT}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 2 -22 Q 2 -28 6 -28"
        stroke={ACCENT}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  </CatHeadBase>
);

export const MobileMiniCat = ({ className }: { className?: string } = {}) => (
  <MiniCatBase className={className}>
    <path
      d="M 28 26 Q 50 -4 76 22"
      stroke={DETAIL}
      strokeWidth="2.2"
      fill="none"
    />
    <rect x="72" y="20" width="10" height="14" rx="2.5" fill={ACCENT} />
    <rect x="73.5" y="24" width="7" height="2" fill={BODY} />
  </MiniCatBase>
);
