import React from "react";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div
      style={{ fontFamily: "'Space Mono', monospace" }}
      className={`uppercase tracking-widest text-[10px] text-muted-foreground ${className}`}
    >
      {children}
    </div>
  );
}
