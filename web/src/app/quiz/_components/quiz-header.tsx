"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { X } from "lucide-react";
import Logo from "@/components/logo";
import ThemeToggle from "@/components/theme-toggle";
import { Phase } from "../_data/types";

interface QuizHeaderProps {
  phase: Phase;
  idx: number;
  total: number;
  hasAnsweredCurrent: boolean;
}

export function QuizHeader({
  phase,
  idx,
  total,
  hasAnsweredCurrent,
}: QuizHeaderProps) {
  return (
    <header className="border-b border-foreground/20 sticky top-0 z-20 bg-background text-foreground transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between gap-4">
        <Logo size="xs" />
        <div
          className="hidden sm:flex items-center gap-3 font-mono-brand"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <span className="uppercase tracking-widest text-[10px] opacity-50">
            {phase === "intro"
              ? "§ Quiz / Início"
              : phase === "questions"
                ? `§ Quiz · ${idx + 1}/${total}`
                : "§ Quiz / Resultado"}
          </span>
          <ThemeToggle />
          <Link
            href="/"
            className="w-9 h-9 border border-foreground flex items-center justify-center hover:text-primary hover:border-primary transition-colors duration-100 cursor-pointer"
            aria-label="Sair do quiz"
          >
            <X size={14} strokeWidth={1.6} />
          </Link>
        </div>
      </div>
      {phase === "questions" && (
        <div className="h-[3px] bg-foreground/10 relative overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            animate={{
              width: `${((idx + (hasAnsweredCurrent ? 1 : 0)) / total) * 100}%`,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}
    </header>
  );
}
export default QuizHeader;
