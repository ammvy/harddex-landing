"use client";

import { ArrowRight } from "lucide-react";

interface SignupActionsProps {
  disabled: boolean;
  onSelectTarget: (target: "/quiz" | "/") => void;
}

export default function SignupActions({ disabled, onSelectTarget }: SignupActionsProps) {
  return (
    <div className="mt-6 flex flex-col sm:flex-row items-stretch gap-3">
      <button
        type="submit"
        disabled={disabled}
        onClick={() => onSelectTarget("/quiz")}
        style={{ fontFamily: "'Space Mono', monospace" }}
        className="flex-1 bg-foreground text-background px-6 py-4 uppercase tracking-widest text-[12px] flex items-center justify-center gap-3 hover:bg-primary hover:text-primary-foreground transition-all duration-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span>Criar conta e fazer quiz</span>
        <ArrowRight size={14} strokeWidth={1.6} />
      </button>
      <button
        type="submit"
        disabled={disabled}
        onClick={() => onSelectTarget("/")}
        style={{ fontFamily: "'Space Mono', monospace" }}
        className="px-6 py-4 border border-foreground bg-transparent text-foreground uppercase tracking-widest text-[11px] hover:border-primary hover:text-primary transition-colors duration-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Pular por agora
      </button>
    </div>
  );
}
