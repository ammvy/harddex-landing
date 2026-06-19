"use client";

import { JSX } from "react";
import { CatHeadBase } from "../cat-head-base";
import { MiniCatBase } from "../mini-cat-base";

const BODY = "var(--mouse-body, #e7eaea)";
const ACCENT = "var(--mouse-accent, #3a70f4)";
const DETAIL = "var(--mouse-detail, #0a0a0a)";

export const CreativeCat = ({ className }: { className?: string } = {}) => (
  <CatHeadBase className={className}>
    <ellipse cx="80" cy="36" rx="52" ry="16" fill={DETAIL} />
    <ellipse cx="80" cy="32" rx="44" ry="10" fill="#1A1A1A" />
    <circle cx="116" cy="22" r="6" fill={ACCENT} />
    <g transform="translate(80 168) rotate(-18)">
      <rect x="-36" y="-3" width="42" height="6" fill={DETAIL} />
      <rect x="6" y="-4" width="8" height="8" fill={ACCENT} />
      <path
        d="M 14 -6 L 30 -10 L 30 10 L 14 6 Z"
        fill={BODY}
        stroke={DETAIL}
        strokeWidth="1"
      />
      <circle cx="22" cy="-2" r="1.4" fill={ACCENT} />
    </g>
  </CatHeadBase>
);

export const CreativeMiniCat = ({ className }: { className?: string } = {}) => (
  <MiniCatBase className={className}>
    <ellipse cx="50" cy="26" rx="30" ry="9" fill={DETAIL} />
    <ellipse cx="50" cy="23" rx="24" ry="6" fill="#1A1A1A" />
    <circle cx="72" cy="18" r="3.5" fill={ACCENT} />
  </MiniCatBase>
);
