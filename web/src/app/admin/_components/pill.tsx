import React from "react";

type Tone = "accent" | "ok" | "warn" | "muted";

type PillProps = {
  children: React.ReactNode;
  tone: Tone;
};

export default function Pill({ children, tone }: PillProps) {
  const map: Record<Tone, string> = {
    accent: "bg-primary text-primary-foreground border-primary",
    ok: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    warn: "bg-destructive text-destructive-foreground border-destructive",
    muted: "bg-input-background text-muted-foreground border-border opacity-70",
  };

  return (
    <span
      style={{ fontFamily: "'Space Mono', monospace" }}
      className={`inline-flex items-center border px-2 py-0.5 uppercase tracking-widest text-[8px] ${map[tone]}`}
    >
      {children}
    </span>
  );
}
