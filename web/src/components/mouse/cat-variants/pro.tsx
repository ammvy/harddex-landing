"use client";

import { JSX } from "react";
import { CatHeadBase } from "../cat-head-base";
import { MiniCatBase } from "../mini-cat-base";

const BODY = "var(--mouse-body, #e7eaea)";
const ACCENT = "var(--mouse-accent, #3a70f4)";
const DETAIL = "var(--mouse-detail, #0a0a0a)";

export const ProCat = ({ className }: { className?: string } = {}) => (
  <CatHeadBase className={className}>
    <path
      d="M 50 132 L 80 152 L 110 132 L 116 196 L 44 196 Z"
      fill={DETAIL}
    />
    <path
      d="M 60 132 L 80 146 L 100 132"
      stroke={BODY}
      strokeWidth="1.6"
      fill="none"
    />
    <path d="M 76 146 L 84 146 L 90 162 L 80 196 L 70 162 Z" fill={ACCENT} />
    <rect x="74" y="146" width="12" height="3" fill="var(--primary, #3a70f4)" />
  </CatHeadBase>
);

export const ProMiniCat = ({ className }: { className?: string } = {}) => (
  <MiniCatBase className={className}>
    <path d="M 32 92 L 50 100 L 68 92 L 68 100 L 32 100 Z" fill={DETAIL} />
    <path d="M 47 92 L 53 92 L 55 98 L 50 100 L 45 98 Z" fill={ACCENT} />
  </MiniCatBase>
);
