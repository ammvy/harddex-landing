export default function CatWelcome({ blink }: { blink: boolean }) {
  return (
    <svg viewBox="0 0 100 120" className="w-full h-auto max-w-[320px]">
      <path d="M 26 26 L 34 10 L 44 28 Z" fill="var(--mouse-body)" />
      <path d="M 74 26 L 66 10 L 56 28 Z" fill="var(--mouse-body)" />
      <path d="M 31 24 L 34 16 L 39 26 Z" fill="var(--mouse-accent)" />
      <path d="M 69 24 L 66 16 L 61 26 Z" fill="var(--mouse-accent)" />
      <path
        d="M 22 28 Q 22 18 32 18 L 68 18 Q 78 18 78 28 L 78 52 Q 78 64 50 64 Q 22 64 22 52 Z"
        fill="var(--mouse-body)"
      />
      {blink ? (
        <>
          <rect
            x="35"
            y="43.5"
            width="6"
            height="1.5"
            fill="var(--mouse-eye)"
          />
          <rect
            x="59"
            y="43.5"
            width="6"
            height="1.5"
            fill="var(--mouse-eye)"
          />
        </>
      ) : (
        <>
          <circle cx="38" cy="44" r="3" fill="var(--mouse-eye)" />
          <circle cx="62" cy="44" r="3" fill="var(--mouse-eye)" />
        </>
      )}
      <path d="M 48 52 L 52 52 L 50 55 Z" fill="var(--mouse-accent)" />
      <path
        d="M 50 55 Q 50 58 47 58 M 50 55 Q 50 58 53 58"
        stroke="var(--mouse-detail)"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 30 70 Q 30 66 34 66 L 66 66 Q 70 66 70 70 L 72 110 Q 72 116 66 116 L 34 116 Q 28 116 28 110 Z"
        fill="var(--mouse-detail)"
      />
      <path
        d="M 50 66 L 50 116"
        stroke="var(--mouse-accent)"
        strokeWidth="2.5"
        opacity="0.9"
      />
      <circle cx="50" cy="80" r="3" fill="var(--mouse-accent)" />
      <circle cx="50" cy="92" r="3" fill="var(--mouse-accent)" />
      <circle cx="50" cy="104" r="3" fill="var(--mouse-accent)" />
      <path
        d="M 75 92 Q 92 88 92 70 Q 92 58 84 58"
        stroke="var(--mouse-body)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
