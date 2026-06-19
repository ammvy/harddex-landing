"use client";

import { motion } from "motion/react";
import { ProfileId } from "../_data/types";
import { PROFILES } from "../_data/profiles";
import { cn } from "@/lib/utils";

interface ScoreDistributionProps {
  ranking: [ProfileId, number][];
  winner: ProfileId;
  winnerTotal: number;
}

export function ScoreDistribution({
  ranking,
  winner,
  winnerTotal,
}: ScoreDistributionProps) {
  return (
    <div className="grid gap-2">
      {ranking.map(([pid, val]) => {
        const pct = Math.round((val / winnerTotal) * 100);
        const main = pid === winner;
        return (
          <div key={pid} className="flex items-center gap-4 text-foreground">
            <span
              style={{ fontFamily: "'Space Mono', monospace" }}
              className={cn(
                "uppercase tracking-widest text-[10px] w-28 font-mono-brand",
                main ? "text-primary font-bold" : "opacity-60"
              )}
            >
              {PROFILES[pid].label}
            </span>
            <div className="flex-1 h-2 bg-foreground/10 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1,
                }}
                className={cn(
                  "h-full",
                  main ? "bg-primary" : "bg-foreground/40"
                )}
              />
            </div>
            <span
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="uppercase tracking-widest text-[10px] w-10 text-right opacity-70 font-mono-brand"
            >
              {pct}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default ScoreDistribution;
