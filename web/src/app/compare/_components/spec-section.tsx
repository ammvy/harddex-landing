import { RowSpec, Detail } from "../_data/types";
import { SpecRow } from "./spec-row";
import { shouldShow } from "../_data/spec-builders";

interface SpecSectionProps {
  sectionTitle: string;
  rows: RowSpec[];
  detail: Detail;
}

export function SpecSection({ sectionTitle, rows, detail }: SpecSectionProps) {
  const visibleRows = rows.filter((r) => shouldShow(r.level, detail));

  if (!visibleRows.length) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2
          style={{
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "-0.02em",
          }}
          className="uppercase text-[18px] leading-none text-foreground font-bold"
        >
          {sectionTitle}
        </h2>
        <span
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="uppercase tracking-widest text-[10px] opacity-50 text-foreground"
        >
          {visibleRows.length}{" "}
          {visibleRows.length === 1 ? "item" : "itens"}
        </span>
      </div>
      <div className="border border-foreground divide-y divide-foreground/10 bg-background">
        {visibleRows.map((row, i) => (
          <SpecRow
            key={`${sectionTitle}-${i}`}
            row={row}
            detail={detail}
            rowIndex={i}
            sectionTitle={sectionTitle}
          />
        ))}
      </div>
    </section>
  );
}
