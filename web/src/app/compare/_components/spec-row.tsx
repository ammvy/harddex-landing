import { Info } from "lucide-react";
import { RowSpec, Detail } from "../_data/types";
import { winner } from "../_data/spec-builders";

interface SpecRowProps {
  row: RowSpec;
  detail: Detail;
  rowIndex: number;
  sectionTitle: string;
}

export function SpecRow({ row, detail, rowIndex, sectionTitle }: SpecRowProps) {
  const w = winner(row);

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] items-stretch">
      <div className="p-4 lg:p-5 border-r border-foreground/10 flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "-0.01em",
            }}
            className="uppercase text-[12px] leading-tight font-medium"
          >
            {row.label}
          </span>
          {row.hint && (
            <Info
              size={11}
              strokeWidth={1.8}
              className="opacity-40 shrink-0"
            />
          )}
        </div>
        {detail === "basic" && row.hint && (
          <p className="text-[11px] opacity-60 mt-1.5 leading-snug max-w-xs">
            {row.hint}
          </p>
        )}
      </div>

      <div
        className={`p-4 lg:p-5 border-r border-foreground/10 flex items-center justify-center text-center relative transition-colors duration-150 ${
          w === "a" ? "bg-primary/[0.08]" : ""
        }`}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
          }}
          className={`uppercase tracking-wide text-[12px] leading-snug ${
            w === "a" ? "text-primary font-bold" : "text-foreground font-normal"
          }`}
        >
          {row.a.display}
        </span>
        {w === "a" && (
          <span
            className="absolute top-2 right-2 select-none"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span className="text-[9px] uppercase tracking-widest text-primary font-bold">
              ↑
            </span>
          </span>
        )}
      </div>

      <div
        className={`p-4 lg:p-5 flex items-center justify-center text-center relative transition-colors duration-150 ${
          w === "b" ? "bg-primary/[0.08]" : ""
        }`}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
          }}
          className={`uppercase tracking-wide text-[12px] leading-snug ${
            w === "b" ? "text-primary font-bold" : "text-foreground font-normal"
          }`}
        >
          {row.b.display}
        </span>
        {w === "b" && (
          <span
            className="absolute top-2 right-2 select-none"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span className="text-[9px] uppercase tracking-widest text-primary font-bold">
              ↑
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
