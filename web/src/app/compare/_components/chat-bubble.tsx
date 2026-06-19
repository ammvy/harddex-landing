"use client";

import { Sparkles, AlertCircle, RotateCcw } from "lucide-react";
import { ProfileId } from "@/components/mouse";
import { PROFILE_LABELS } from "../_data/profiles";
import { Device } from "../_data/types";
import { OpinionState } from "../_hooks/use-mouse-opinion";

interface ChatBubbleProps {
  state: OpinionState;
  response: string;
  error: string | null;
  tdu: ProfileId;
  deviceA: Device;
  deviceB: Device;
  onReset: () => void;
}

export function ChatBubble({
  state,
  response,
  error,
  tdu,
  deviceA,
  deviceB,
  onReset,
}: ChatBubbleProps) {
  const renderInlineFormatting = (text: string) => {
    const parts = text.split(/\*\*([^*]+)\*\*/g);
    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        return (
          <strong key={idx} className="font-bold text-primary">
            {part}
          </strong>
        );
      }
      return part;
    });
  };

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    return text.split("\n\n").map((paragraph, pIdx) => {
      if (
        paragraph.trim().startsWith("- ") ||
        paragraph.trim().startsWith("* ")
      ) {
        const items = paragraph
          .split("\n")
          .map((line) => line.replace(/^[-*]\s+/, ""));
        return (
          <ul
            key={pIdx}
            className="list-disc pl-5 mb-4 space-y-1.5 text-[13px] md:text-[14px]"
            style={{ fontFamily: "'Inter Tight', sans-serif" }}
          >
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>{renderInlineFormatting(item)}</li>
            ))}
          </ul>
        );
      }
      return (
        <p
          key={pIdx}
          className="mb-3 text-[13px] md:text-[14px] leading-relaxed text-foreground/90 last:mb-0"
          style={{ fontFamily: "'Inter Tight', sans-serif" }}
        >
          {renderInlineFormatting(paragraph)}
        </p>
      );
    });
  };

  return (
    <div className="relative flex-1 w-full border border-foreground/10 bg-muted/5 p-4 md:p-5">
      {/* speech bubble tail (rotated square) */}
      <div className="absolute left-[-6px] top-12 w-2.5 h-2.5 bg-background border-l border-b border-foreground/10 rotate-45 hidden md:block" />

      <div className="min-h-[90px] flex flex-col justify-center">
        {state === "idle" && (
          <div>
            <p
              className="text-[13px] md:text-[14px] leading-relaxed text-foreground/75"
              style={{ fontFamily: "'Inter Tight', sans-serif" }}
            >
              Olá! Sou o <strong>Mouse</strong>, seu especialista de hardware
              oficial no HardDex.
              <br />
              <br />
              Selecione o seu perfil de uso acima (ex: Gamer, Produtividade,
              Estudo...) e clique em <strong>Pedir Opinião</strong>. Vou
              analisar as especificações técnicas do{" "}
              <strong>
                {deviceA.brand} {deviceA.model}
              </strong>{" "}
              e do{" "}
              <strong>
                {deviceB.brand} {deviceB.model}
              </strong>{" "}
              para te dar o veredito definitivo!
            </p>
          </div>
        )}

        {state === "loading" && (
          <div className="flex flex-col items-center justify-center py-6 gap-2">
            <div className="flex gap-1.5 items-center justify-center">
              <span className="w-2 h-2 bg-primary rounded-full animate-dot1" />
              <span className="w-2 h-2 bg-primary rounded-full animate-dot2" />
              <span className="w-2 h-2 bg-primary rounded-full animate-dot3" />
            </div>
            <span
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="uppercase text-[9px] tracking-widest opacity-60 animate-pulse"
            >
              Analisando hardware...
            </span>
          </div>
        )}

        {(state === "streaming" || state === "done") && (
          <div className="prose prose-sm max-w-none text-foreground">
            <div
              className="flex items-center gap-1.5 mb-3 text-primary text-[10px] tracking-wider uppercase font-bold"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <Sparkles size={11} className="animate-spin-slow" />
              <span>Opinião do Mouse ({PROFILE_LABELS[tdu]})</span>
            </div>
            {renderFormattedText(response)}
            {state === "streaming" && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-primary align-middle animate-cursor-blink" />
            )}
          </div>
        )}

        {state === "error" && (
          <div className="flex items-start gap-3 text-destructive border border-destructive/20 bg-destructive/5 p-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <div
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="uppercase text-[11px] font-bold leading-none mb-1"
              >
                Ocorreu um erro
              </div>
              <p className="text-[12px] opacity-90">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Bubble Action footer */}
      <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-foreground/5">
        {(state === "done" || state === "error") && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-[10px] md:text-[11px] uppercase tracking-wider font-bold hover:text-primary transition-colors cursor-pointer"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <RotateCcw size={13} />
            <span>Limpar</span>
          </button>
        )}
      </div>
    </div>
  );
}
