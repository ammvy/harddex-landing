"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionOptionProps {
  index: number;
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function QuestionOption({
  index,
  label,
  selected,
  onSelect,
}: QuestionOptionProps) {
  const optionLetter = String.fromCharCode(65 + index);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group text-left border p-5 flex items-center gap-5 transition-all duration-100 cursor-pointer select-none",
        selected
          ? "bg-foreground text-background border-primary"
          : "bg-transparent text-foreground border-foreground/20 hover:border-primary"
      )}
    >
      <span
        className={cn(
          "w-9 h-9 border flex items-center justify-center shrink-0 transition-colors duration-100 font-mono-brand",
          selected
            ? "border-primary bg-primary text-background"
            : "border-current bg-transparent text-foreground"
        )}
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <span className="text-[11px] tracking-widest font-bold">
          {optionLetter}
        </span>
      </span>
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          letterSpacing: "-0.01em",
        }}
        className="uppercase text-[14px] sm:text-[15px] flex-1 leading-snug font-mono-brand"
      >
        {label}
      </span>
      <ArrowRight
        size={14}
        strokeWidth={1.6}
        className={cn(
          "transition-opacity duration-100 text-primary",
          selected ? "opacity-0" : "opacity-0 group-hover:opacity-100"
        )}
      />
    </button>
  );
}

export default QuestionOption;
