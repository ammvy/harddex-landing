"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Sparkles, Check, RotateCcw, ArrowRight } from "lucide-react";
import { ProfileId } from "../_data/types";
import { PROFILES } from "../_data/profiles";
import { CATS } from "@/components/mouse";
import ScoreDistribution from "./score-distribution";

interface ResultPhaseProps {
  winner: ProfileId;
  ranking: [ProfileId, number][];
  winnerTotal: number;
  onRestart: () => void;
}

export function ResultPhase({
  winner,
  ranking,
  winnerTotal,
  onRestart,
}: ResultPhaseProps) {
  const profile = PROFILES[winner];

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45 }}
      className="grid grid-cols-12 gap-8 lg:gap-12 items-start text-foreground"
    >
      <div className="col-span-12 lg:col-span-5">
        <div className="border border-foreground bg-black text-white aspect-[4/5] flex flex-col transition-colors duration-200">
          <div
            className="px-6 pt-6 flex items-center justify-between font-mono-brand"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span className="uppercase tracking-widest text-[10px] opacity-60">
              {profile.code}
            </span>
            <span className="uppercase tracking-widest text-[10px] text-primary font-bold">
              Match
            </span>
          </div>
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            className="flex-1 flex items-center justify-center px-8"
          >
            {(() => {
              const CatComp = CATS[winner];
              return CatComp ? <CatComp /> : null;
            })()}
          </motion.div>
          <div
            className="px-6 pb-6 border-t border-white/15 pt-5 font-mono-brand"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <div className="uppercase tracking-widest text-[9px] text-white/50">
              Você é
            </div>
            <div
              className="uppercase text-[28px] leading-none mt-2 font-bold"
              style={{ letterSpacing: "-0.03em" }}
            >
              {profile.label}
              <span className="text-primary">.</span>
            </div>
            <div className="text-[11px] text-white/60 uppercase tracking-widest mt-2">
              {profile.tag}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-7">
        <div
          className="flex items-center gap-2 font-mono-brand"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <Sparkles size={12} strokeWidth={2} className="text-primary" />
          <span className="uppercase tracking-widest text-[10px] opacity-60">
            Resultado calibrado
          </span>
        </div>
        <h2
          style={{
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
          }}
          className="uppercase text-[clamp(34px,5vw,64px)] mt-5 font-mono-brand font-bold text-foreground"
        >
          Seu perfil é<br />
          <span className="text-primary">{profile.label}.</span>
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed opacity-80 max-w-2xl text-foreground">
          {profile.pitch}
        </p>

        <div className="mt-8">
          <div
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="uppercase tracking-widest text-[10px] opacity-60 mb-3 font-mono-brand"
          >
            Recomendação base
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {profile.specs.map((s) => (
              <div
                key={s}
                className="border border-foreground/20 px-4 py-3 flex items-center gap-3 transition-colors duration-200"
              >
                <span className="w-5 h-5 flex items-center justify-center shrink-0 bg-primary">
                  <Check size={11} strokeWidth={3} className="text-white" />
                </span>
                <span
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className="uppercase tracking-widest text-[11px] font-mono-brand"
                >
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="uppercase tracking-widest text-[10px] opacity-60 mb-3 font-mono-brand"
          >
            Distribuição
          </div>
          <ScoreDistribution
            ranking={ranking}
            winner={winner}
            winnerTotal={winnerTotal}
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="bg-foreground text-background px-7 py-4 uppercase tracking-widest text-[12px] flex items-center gap-3 hover:bg-primary hover:text-white transition-all duration-100 font-mono-brand font-bold cursor-pointer"
          >
            Comparar hardware
            <ArrowRight size={14} strokeWidth={1.6} />
          </Link>
          <button
            type="button"
            onClick={onRestart}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="border border-foreground px-5 py-4 uppercase tracking-widest text-[11px] flex items-center gap-2 hover:text-primary hover:border-primary transition-colors duration-100 font-mono-brand font-bold cursor-pointer"
          >
            <RotateCcw size={12} strokeWidth={1.8} />
            Refazer quiz
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ResultPhase;
