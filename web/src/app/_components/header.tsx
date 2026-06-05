import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";

export default function LandingHeader() {
  return (
    <header className="flex items-center justify-end gap-3">
      <ThemeToggle />
      <Link
        href="/login"
        style={{ fontFamily: "'Space Mono', monospace" }}
        className={`bg-foreground text-background px-5 py-2 uppercase tracking-widest text-[12px] hover:bg-primary hover:text-background dark:hover:text-foreground transition-colors duration-100`}
      >
        Entrar
      </Link>
    </header>
  );
}
