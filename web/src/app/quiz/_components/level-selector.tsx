"use client";

import { Check } from "lucide-react";
import { LevelInfo } from "../_data/types";
import { cn } from "@/lib/utils";

interface LevelSelectorProps {
  levelInfo: LevelInfo;
  active: boolean;
  onSelect: () => void;
}

export function LevelSelector({
  levelInfo,
  active,
  onSelect,
}: LevelSelectorProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "text-left p-5 border transition-all duration-150 cursor-pointer select-none",
        active
          ? "bg-foreground text-background border-primary"
          : "bg-transparent text-foreground border-foreground/20 hover:border-primary",
      )}
    >
      <div
        className="flex items-center justify-between font-mono-brand"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <span className="uppercase tracking-widest text-[9px] opacity-60">
          {levelInfo.code}
        </span>
        {active && (
          <span className="w-4 h-4 flex items-center justify-center bg-primary">
            <Check size={10} strokeWidth={3} className="text-background" />
          </span>
        )}
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          letterSpacing: "-0.02em",
        }}
        className="uppercase text-[18px] mt-3 leading-tight font-mono-brand font-bold"
      >
        {levelInfo.label}
      </div>
      <p className="text-[12px] opacity-70 mt-1.5 leading-snug">
        {levelInfo.sub}
      </p>
      <div
        className="mt-4 pt-3 border-t border-current/15 flex items-center justify-between font-mono-brand"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        {/* <span className="uppercase tracking-widest text-[9px] opacity-50 flex lg:hidden xl:flex">
          duração
        </span> */}
        <span
          className={cn(
            "uppercase tracking-widest text-[10px] text-nowrap",
            active ? "text-primary" : "text-foreground",
          )}
        >
          {levelInfo.count}
        </span>
      </div>
    </button>
  );
}

export default LevelSelector;
