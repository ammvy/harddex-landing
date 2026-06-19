"use client";

import { JSX } from "react";
import { CatHeadBase } from "../cat-head-base";
import { MiniCatBase } from "../mini-cat-base";

const BODY = "var(--mouse-body, #e7eaea)";
const ACCENT = "var(--mouse-accent, #3a70f4)";
const DETAIL = "var(--mouse-detail, #0a0a0a)";

export const StudyCat = ({ className }: { className?: string } = {}) => (
  <CatHeadBase className={className}>
    <circle
      cx="62"
      cy="80"
      r="13"
      stroke={DETAIL}
      strokeWidth="2.6"
      fill="none"
    />
    <circle
      cx="98"
      cy="80"
      r="13"
      stroke={DETAIL}
      strokeWidth="2.6"
      fill="none"
    />
    <line
      x1="75"
      y1="80"
      x2="85"
      y2="80"
      stroke={DETAIL}
      strokeWidth="2.6"
    />
    <line
      x1="49"
      y1="78"
      x2="40"
      y2="74"
      stroke={DETAIL}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <line
      x1="111"
      y1="78"
      x2="120"
      y2="74"
      stroke={DETAIL}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <g transform="translate(80 168)">
      <path
        d="M -36 -14 L 0 -10 L 36 -14 L 36 14 L 0 10 L -36 14 Z"
        fill={DETAIL}
      />
      <path d="M -34 -12 L 0 -8 L 0 12 L -34 12 Z" fill={BODY} />
      <path d="M 34 -12 L 0 -8 L 0 12 L 34 12 Z" fill={BODY} />
      <line
        x1="-28"
        y1="-4"
        x2="-6"
        y2="-2"
        stroke={DETAIL}
        strokeWidth="0.8"
      />
      <line
        x1="-28"
        y1="0"
        x2="-6"
        y2="2"
        stroke={DETAIL}
        strokeWidth="0.8"
      />
      <line
        x1="-28"
        y1="4"
        x2="-6"
        y2="6"
        stroke={DETAIL}
        strokeWidth="0.8"
      />
      <line
        x1="6"
        y1="-2"
        x2="28"
        y2="-4"
        stroke={ACCENT}
        strokeWidth="1.4"
      />
      <line x1="6" y1="2" x2="28" y2="0" stroke={DETAIL} strokeWidth="0.8" />
      <line x1="6" y1="6" x2="28" y2="4" stroke={DETAIL} strokeWidth="0.8" />
    </g>
  </CatHeadBase>
);

export const StudyMiniCat = ({ className }: { className?: string } = {}) => (
  <MiniCatBase className={className}>
    <circle
      cx="38"
      cy="60"
      r="8"
      stroke={DETAIL}
      strokeWidth="1.8"
      fill="none"
    />
    <circle
      cx="62"
      cy="60"
      r="8"
      stroke={DETAIL}
      strokeWidth="1.8"
      fill="none"
    />
    <line
      x1="46"
      y1="60"
      x2="54"
      y2="60"
      stroke={DETAIL}
      strokeWidth="1.8"
    />
  </MiniCatBase>
);
