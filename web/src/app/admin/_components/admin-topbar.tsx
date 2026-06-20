"use client";

import Link from "next/link";
import { ArrowLeft, Menu } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import { useAdminUser } from "../_hooks/use-admin-user";

type AdminTopbarProps = {
  onMenuToggle: () => void;
};

export default function AdminTopbar({ onMenuToggle }: AdminTopbarProps) {
  const user = useAdminUser();

  return (
    <div className="border-b border-border sticky top-0 z-30 bg-background h-[68px]">
      <div className="h-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden w-9 h-9 border border-border flex items-center justify-center hover:text-primary hover:border-primary transition-colors duration-100 cursor-pointer text-foreground"
            aria-label="Menu"
          >
            <Menu size={16} strokeWidth={1.7} />
          </button>
          <Link href="/">
            <div className="relative inline-block select-none">
              <span
                style={{
                  fontFamily: "'Blanka', 'Space Mono', monospace",
                  letterSpacing: "0.02em",
                }}
                className="uppercase text-[clamp(22px,2.4vw,30px)] leading-[0.85] block text-foreground"
              >
                Hard<span className="text-primary">dex</span>
              </span>
              <span
                aria-hidden
                className="absolute left-[-3%] right-[-3%] top-[43%] h-[12%] mix-blend-multiply bg-primary"
              />
            </div>
          </Link>
          <span
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="hidden sm:inline border border-border/40 px-2 py-1 uppercase tracking-widest text-[9px] opacity-60 text-foreground"
          >
            Admin
          </span>
        </div>
        <div
          className="flex items-center gap-2"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <span className="hidden md:flex items-center gap-2 mr-1 uppercase tracking-widest text-[10px] opacity-60 text-foreground">
            <span className="w-1.5 h-1.5 bg-primary" /> {user.name} · {user.role}
          </span>
          <ThemeToggle />
          <Link
            href="/"
            className="w-9 h-9 border border-border flex items-center justify-center hover:text-primary hover:border-primary transition-colors duration-100 cursor-pointer text-foreground"
            aria-label="Voltar"
          >
            <ArrowLeft size={14} strokeWidth={1.6} />
          </Link>
        </div>
      </div>
    </div>
  );
}
