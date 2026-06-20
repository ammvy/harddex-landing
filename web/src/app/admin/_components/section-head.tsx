import React from "react";

type SectionHeadProps = {
  kicker: string;
  title: string;
  action?: React.ReactNode;
};

export default function SectionHead({ kicker, title, action }: SectionHeadProps) {
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
      <div>
        <div
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="uppercase tracking-widest text-[10px] opacity-50"
        >
          {kicker}
        </div>
        <h2
          style={{
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
          className="uppercase text-[clamp(26px,3.4vw,40px)] mt-1.5"
        >
          {title}
          <span className="text-primary">.</span>
        </h2>
      </div>
      {action}
    </div>
  );
}
