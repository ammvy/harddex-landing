import { Lock } from "lucide-react";
import { motion } from "motion/react";

interface ScoreRingProps {
  value: number;
  size: number;
  color: string;
  locked?: boolean;
}

export function ScoreRing({ value, size, color, locked = false }: ScoreRingProps) {
  const r = size / 2 - 5;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="3"
          fill="none"
        />
        {!locked && (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c * (1 - value / 100) }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        {locked ? (
          <Lock size={size * 0.32} strokeWidth={1.6} className="opacity-40" />
        ) : (
          <span
            style={{ fontSize: size * 0.34, lineHeight: 1, color }}
            className="font-bold"
          >
            {value}
          </span>
        )}
      </div>
    </div>
  );
}
