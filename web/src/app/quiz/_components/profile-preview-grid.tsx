"use client";

import { Sparkles } from "lucide-react";
import { PROFILES } from "../_data/profiles";
import { MINI_CATS } from "@/components/mouse";
import { ProfileId } from "../_data/types";
import { QUESTIONS } from "../_data/questions";

export function ProfilePreviewGrid() {
  return (
    <div className="border border-foreground/20 bg-foreground/[0.02] p-8 transition-colors duration-200">
      <div
        className="flex items-center gap-2 font-mono-brand"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <Sparkles size={12} strokeWidth={2} className="text-primary" />
        <span className="uppercase tracking-widest text-[10px] opacity-60">
          6 perfis possíveis
        </span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {(Object.keys(PROFILES) as ProfileId[]).map((pid) => (
          <div
            key={pid}
            className="aspect-square bg-black text-white flex flex-col items-center justify-between p-3 relative group hover:ring-2 hover:ring-primary transition-all duration-150"
          >
            <span
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="absolute top-2 left-2 uppercase tracking-widest text-[8px] text-white/50 font-mono-brand"
            >
              {PROFILES[pid].code}
            </span>
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
            <div className="w-full flex-1 flex items-center justify-center pt-3">
              <div className="w-[82%]">
                {(() => {
                  const MiniCatComp = MINI_CATS[pid];
                  return MiniCatComp ? <MiniCatComp /> : null;
                })()}
              </div>
            </div>
            <span
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="uppercase tracking-widest text-[9px] mt-1 text-white/85 group-hover:text-primary transition-colors duration-100 font-mono-brand"
            >
              {PROFILES[pid].label}
            </span>
          </div>
        ))}
      </div>
      <div
        className="mt-6 pt-5 border-t border-foreground/15 grid gap-2 font-mono-brand"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <div className="flex justify-between text-[11px]">
          <span className="uppercase tracking-widest opacity-60">Perfis</span>
          <span className="uppercase tracking-widest">06</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="uppercase tracking-widest opacity-60">Banco</span>
          <span className="uppercase tracking-widest">
            {QUESTIONS.length} perguntas
          </span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="uppercase tracking-widest opacity-60">
            Algoritmo
          </span>
          <span className="uppercase tracking-widest text-primary">
            weighted-score v2
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfilePreviewGrid;
