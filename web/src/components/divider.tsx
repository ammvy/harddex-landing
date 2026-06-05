import React from "react";

type DividerProps = {
  label: string;
};

export default function Divider({ label }: DividerProps) {
  return (
    <div className="my-6 flex items-center gap-4">
      <div className="flex-1 h-px bg-border" />
      <span
        style={{ fontFamily: "'Space Mono', monospace" }}
        className="uppercase tracking-widest text-[9px] text-muted-foreground"
      >
        {label}
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
