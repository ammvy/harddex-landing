"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

type HeaderProps = {
  label: string;
};

export default function Header({ label }: HeaderProps) {
  return (
    <div className="border-b border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        <Link
          href="/"
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="flex items-center gap-2 uppercase tracking-widest text-[11px] text-foreground hover:text-primary transition-colors duration-100"
        >
          <ArrowLeft size={12} strokeWidth={1.8} />
          Voltar
        </Link>
        {label && (
          <span
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="uppercase tracking-widest text-[10px] text-foreground/50"
          >
            {label}
          </span>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
}
