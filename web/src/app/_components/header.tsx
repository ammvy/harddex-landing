"use client";

import ThemeToggle from "@/components/theme-toggle";
import { LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useIsAuthorized } from "../profile/_hooks/use-auth";

export default function LandingHeader() {
  const { status } = useSession();

  const isLoaded = status !== "loading";
  const isAuthenticated = status === "authenticated";

  const { isAuthorized } = useIsAuthorized();

  return (
    <header className="flex items-center justify-end gap-3 z-10">
      <ThemeToggle />
      {isLoaded && (
        <>
          {isAuthorized ? (
            <Link
              href="/admin"
              aria-label="admin"
              title="admin"
              style={{ fontFamily: "'Space Mono', monospace" }}
              className={`h-9 border border-foreground flex items-center justify-center gap-2 px-2.5 sm:px-3.5 hover:text-primary hover:border-primary transition-colors duration-100`}
            >
              <LayoutDashboard size={14} strokeWidth={1.6} />
              <span className="hidden sm:inline uppercase tracking-widest text-[12px]">
                Admin
              </span>
            </Link>
          ) : null}
          {isAuthenticated ? (
            <Link
              href="/profile"
              aria-label="Meu perfil"
              title="Meu perfil"
              style={{ fontFamily: "'Space Mono', monospace" }}
              className={`h-9 border border-foreground flex items-center justify-center gap-2 px-2.5 sm:px-3.5 hover:text-primary hover:border-primary transition-colors duration-100`}
            >
              <User size={14} strokeWidth={1.6} />
              <span className="hidden sm:inline uppercase tracking-widest text-[12px]">
                Meu perfil
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              style={{ fontFamily: "'Space Mono', monospace" }}
              className={`bg-foreground text-background px-5 py-2 uppercase tracking-widest text-[12px] hover:bg-primary hover:text-background dark:hover:text-foreground transition-colors duration-100`}
            >
              Entrar
            </Link>
          )}
        </>
      )}
    </header>
  );
}
