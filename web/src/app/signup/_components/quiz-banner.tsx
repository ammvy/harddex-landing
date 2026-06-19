"use client";

import { Sparkles } from "lucide-react";

interface QuizBannerProps {
  active?: boolean;
}

export default function QuizBanner({ active = false }: QuizBannerProps) {
  return (
    <div
      className={`mt-8 border p-5 relative overflow-hidden transition-colors duration-200 ${
        active ? "border-primary" : "border-border"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="w-6 h-6 flex items-center justify-center shrink-0 bg-primary">
          <Sparkles size={12} strokeWidth={2} className="text-primary-foreground" />
        </span>
        <div className="flex-1">
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "-0.02em",
            }}
            className="uppercase text-[15px] leading-tight text-foreground"
          >
            Quiz de perfil <span className="text-primary">·</span> opcional
          </div>
          <p className="text-[12px] text-foreground/70 mt-1.5">
            12 perguntas (ou menos) pra mapear seu uso real e calibrar todas as
            comparações. Dá pra fazer agora ou depois.
          </p>
        </div>
      </div>
    </div>
  );
}
