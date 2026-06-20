import React from "react";

type DetailRowProps = {
  label: string;
  value: string;
  accent?: boolean;
};

export default function DetailRow({ label, value, accent }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/40 pb-2">
      <span
        style={{ fontFamily: "'Space Mono', monospace" }}
        className="uppercase tracking-widest text-[10px] opacity-50"
      >
        {label}
      </span>
      <span
        style={{ fontFamily: "'Space Mono', monospace" }}
        className={`text-[12px] ${accent ? "text-primary" : ""} text-right break-all`}
      >
        {value}
      </span>
    </div>
  );
}
