"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  // Próprio do next-themes, se não estiver configurado perfeitamente, usa fallback light/dark por padrão
  let theme = "dark";
  try {
    const themeContext = useTheme();
    theme = themeContext.theme || "dark";
  } catch (e) {
    // Caso useTheme seja usado fora de ThemeProvider
  }

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        style: {
          fontFamily: "'Space Mono', monospace",
        },
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-none group-[.toaster]:uppercase group-[.toaster]:tracking-widest group-[.toaster]:text-[11px] group-[.toaster]:px-5 group-[.toaster]:py-3.5 group-[.toaster]:flex group-[.toaster]:items-center group-[.toaster]:gap-3",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:border-primary group-[.toaster]:bg-primary group-[.toaster]:text-white",
          error: "group-[.toaster]:border-destructive group-[.toaster]:bg-destructive group-[.toaster]:text-white",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
