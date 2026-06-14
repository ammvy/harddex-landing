import { Sparkles } from "lucide-react";
import Link from "next/link";
import { ProfileId } from "../_data/types";

interface FooterCtaProps {
  profile: ProfileId | null;
}

export function FooterCta({ profile }: FooterCtaProps) {
  return (
    <div className="mt-16 border border-foreground bg-foreground/[0.03] p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div
          className="flex items-center gap-2"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <Sparkles size={12} strokeWidth={2} className="text-primary" />
          <span className="uppercase tracking-widest text-[10px] opacity-60 text-foreground">
            Quer uma nota personalizada?
          </span>
        </div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "-0.02em",
          }}
          className="uppercase text-[18px] mt-2 text-foreground font-bold"
        >
          {profile
            ? "Recalibre seu perfil quando quiser"
            : "Desbloqueie o TDU em 6 perguntas"}
        </div>
      </div>
      <Link
        href="/quiz"
        style={{ fontFamily: "'Space Mono', monospace" }}
        className="bg-foreground text-background px-6 py-3.5 uppercase tracking-widest text-[11px] flex items-center gap-3 hover:bg-primary hover:text-primary-foreground transition-all duration-100 font-bold"
      >
        {profile ? "Refazer quiz" : "Fazer o quiz"} ↗
      </Link>
    </div>
  );
}
