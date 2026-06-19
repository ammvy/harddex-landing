"use client";

import { JSX } from "react";
import { CatHeadBase } from "../cat-head-base";
import { MiniCatBase } from "../mini-cat-base";

const ACCENT = "var(--mouse-accent, #3a70f4)";
const DETAIL = "var(--mouse-detail, #0a0a0a)";

export const DevCat = ({ className }: { className?: string } = {}) => (
  <CatHeadBase className={className}>
    <path
      d="M 28 50 L 132 50 L 132 38 Q 132 26 110 26 L 50 26 Q 28 26 28 38 Z"
      fill={DETAIL}
    />
    <rect x="24" y="48" width="112" height="6" fill={ACCENT} />
    <rect x="72" y="20" width="16" height="6" fill={DETAIL} />
    <g transform="translate(80 168)">
      <rect x="-38" y="-12" width="76" height="24" fill={DETAIL} />
      <text
        x="0"
        y="6"
        textAnchor="middle"
        fontSize="16"
        fill={ACCENT}
        fontWeight="700"
        className="font-mono-brand"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        {"</>"}
      </text>
    </g>
  </CatHeadBase>
);

export const DevMiniCat = ({ className }: { className?: string } = {}) => (
  <MiniCatBase className={className}>
    <path
      d="M 16 36 L 84 36 L 84 28 Q 84 20 70 20 L 30 20 Q 16 20 16 28 Z"
      fill={DETAIL}
    />
    <rect x="14" y="34" width="72" height="4" fill={ACCENT} />
    <text
      x="50"
      y="58"
      textAnchor="middle"
      fontSize="10"
      fill={DETAIL}
      fontWeight="700"
      className="font-mono-brand"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      {"</>"}
    </text>
  </MiniCatBase>
);
