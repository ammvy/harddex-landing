import React from "react";

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
  size?: "default" | "sm";
}

export function Loading({ text, fullScreen = false, size = "default" }: LoadingProps) {
  const dotClass = size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5";
  const textClass = size === "sm" ? "text-[9px]" : "text-[10px]";
  const containerGap = size === "sm" ? "gap-2 py-6" : "gap-4";

  const displayText = text ? `Carregando ${text}...` : "Carregando...";

  const content = (
    <div className={`flex flex-col items-center justify-center ${containerGap}`}>
      <div className="flex gap-1.5 items-center justify-center">
        <span className={`${dotClass} bg-primary rounded-full animate-dot1`} />
        <span className={`${dotClass} bg-primary rounded-full animate-dot2`} />
        <span className={`${dotClass} bg-primary rounded-full animate-dot3`} />
      </div>
      <span
        style={{ fontFamily: "'Space Mono', monospace" }}
        className={`uppercase ${textClass} tracking-widest opacity-60 animate-pulse`}
      >
        {displayText}
      </span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}
