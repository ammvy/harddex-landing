"use client";

import Link from "next/link";
import SectionLabel from "@/components/section-label";

export default function LoginFooterCta() {
  return (
    <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
      <SectionLabel className="text-foreground/50">
        Sem cadastro?
      </SectionLabel>
      <Link
        href="/signup"
        style={{ fontFamily: "'Space Mono', monospace" }}
        className="uppercase tracking-widest text-[11px] text-foreground hover:text-primary transition-colors duration-100"
      >
        Solicitar acesso ↗
      </Link>
    </div>
  );
}
