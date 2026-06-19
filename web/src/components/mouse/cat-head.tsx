"use client";

export function CatHead() {
  const body = "var(--mouse-body, #e7eaea)";
  const accent = "var(--mouse-accent, #3a70f4)";
  const detail = "var(--mouse-detail, #0a0a0a)";
  const eye = "var(--mouse-eye, #040404)";

  return (
    <g>
      <path d="M 26 26 L 34 10 L 44 28 Z" fill={body} />
      <path d="M 74 26 L 66 10 L 56 28 Z" fill={body} />
      <path d="M 31 24 L 34 16 L 39 26 Z" fill={accent} />
      <path d="M 69 24 L 66 16 L 61 26 Z" fill={accent} />
      <path
        d="M 22 28 Q 22 18 32 18 L 68 18 Q 78 18 78 28 L 78 52 Q 78 64 50 64 Q 22 64 22 52 Z"
        fill={body}
      />
      <circle cx="38" cy="44" r="3" fill={eye} />
      <circle cx="62" cy="44" r="3" fill={eye} />
      <path d="M 48 52 L 52 52 L 50 55 Z" fill={accent} />
      <path
        d="M 50 55 Q 50 58 47 58 M 50 55 Q 50 58 53 58"
        stroke={detail}
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}
