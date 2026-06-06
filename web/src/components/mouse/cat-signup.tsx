"use client";

import { motion } from "motion/react";

interface CatSignupProps {
  blink: boolean;
}

export default function CatSignup({ blink }: CatSignupProps) {
  return (
    <motion.svg
      viewBox="0 0 120 150"
      className="w-full h-auto max-w-[320px]"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.path
        d="M 92 110 Q 110 100 112 78 Q 113 64 104 60"
        stroke="var(--mouse-body)"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        animate={{
          d: [
            "M 92 110 Q 110 100 112 78 Q 113 64 104 60",
            "M 92 110 Q 114 96 110 74 Q 108 60 100 58",
            "M 92 110 Q 110 100 112 78 Q 113 64 104 60",
          ],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <path d="M 36 36 L 44 18 L 54 38 Z" fill="var(--mouse-body)" />
      <path d="M 84 36 L 76 18 L 66 38 Z" fill="var(--mouse-body)" />
      <path d="M 41 34 L 44 24 L 49 36 Z" fill="var(--mouse-accent)" />
      <path d="M 79 34 L 76 24 L 71 36 Z" fill="var(--mouse-accent)" />

      <path
        d="M 32 38 Q 32 28 42 28 L 78 28 Q 88 28 88 38 L 88 62 Q 88 74 60 74 Q 32 74 32 62 Z"
        fill="var(--mouse-body)"
      />

      {blink ? (
        <>
          <rect x="45" y="53.5" width="6" height="1.5" fill="var(--mouse-eye)" />
          <rect x="69" y="53.5" width="6" height="1.5" fill="var(--mouse-eye)" />
        </>
      ) : (
        <>
          <circle cx="48" cy="54" r="3.2" fill="var(--mouse-eye)" />
          <circle cx="72" cy="54" r="3.2" fill="var(--mouse-eye)" />
          <circle cx="48.8" cy="52.8" r="1" fill="var(--mouse-body)" />
          <circle cx="72.8" cy="52.8" r="1" fill="var(--mouse-body)" />
        </>
      )}

      <circle cx="38" cy="58" r="2.4" fill="var(--mouse-accent)" opacity="0.35" />
      <circle cx="82" cy="58" r="2.4" fill="var(--mouse-accent)" opacity="0.35" />

      <path d="M 58 62 L 62 62 L 60 65 Z" fill="var(--mouse-accent)" />
      <path
        d="M 60 65 Q 56 70 55 67 M 60 65 Q 64 70 65 67 M 56 68 Q 60 72 64 68"
        stroke="var(--mouse-detail)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M 40 74 Q 40 72 44 72 L 76 72 Q 80 72 80 74 L 80 116 Q 80 122 74 122 L 46 122 Q 40 122 40 116 Z"
        fill="var(--mouse-detail)"
      />
      <path
        d="M 60 72 L 60 122"
        stroke="var(--mouse-accent)"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <circle cx="60" cy="84" r="2.4" fill="var(--mouse-accent)" />
      <circle cx="60" cy="96" r="2.4" fill="var(--mouse-accent)" />
      <circle cx="60" cy="108" r="2.4" fill="var(--mouse-accent)" />

      <motion.g
        style={{ originX: "30px", originY: "78px" }}
        animate={{ rotate: [-18, 18, -18] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="22" y="74" width="14" height="20" rx="6" fill="var(--mouse-body)" />
        <circle cx="29" cy="74" r="3.5" fill="var(--mouse-body)" />
        <circle cx="26" cy="78" r="1" fill="var(--mouse-eye)" />
        <circle cx="32" cy="78" r="1" fill="var(--mouse-eye)" />
      </motion.g>

      <motion.g
        key="bubble"
        initial={{ opacity: 0, y: 4, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        style={{ fontFamily: "'Inter Tight', sans-serif" }}
      >
        <rect x="6" y="2" width="92" height="16" rx="2" fill="var(--mouse-accent)" />
        <text
          x="52"
          y="13"
          textAnchor="middle"
          fontSize="8"
          fill="var(--mouse-body)"
          fontWeight="600"
        >
          Olá, eu sou o Mouse!
        </text>
        <path d="M 40 18 L 50 18 L 44 24 Z" fill="var(--mouse-accent)" />
      </motion.g>
    </motion.svg>
  );
}
