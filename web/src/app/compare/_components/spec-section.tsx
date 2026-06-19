interface SimpleRow {
  title: string;
  value1: string;
  value2: string;
}

interface SpecSectionProps {
  sectionTitle: string;
  rows: SimpleRow[];
}

export function SpecSection({ sectionTitle, rows }: SpecSectionProps) {
  if (!rows.length) return null;

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2
          style={{
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "-0.02em",
          }}
          className="uppercase text-[40px] leading-none text-foreground font-bold"
        >
          {sectionTitle}
        </h2>
      </div>
      <div className="border border-foreground divide-y divide-foreground/10 bg-background">
        {rows.map((row, i) => (
          <div key={i} className="flex items-stretch">
            {/* Title Column */}
            <div className="flex-1 min-w-0 px-2 py-2 border-r border-foreground/10 flex flex-col justify-center">
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: "-0.01em",
                }}
                className="uppercase text-[14px] leading-tight font-medium"
              >
                {row.title}
              </span>
            </div>

            {/* Value 1 Column */}
            <div className="flex-1 min-w-0 p-4 lg:p-5 border-r border-foreground/10 flex items-center justify-center text-center">
              <span
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="uppercase tracking-wide text-[12px] leading-snug text-foreground"
              >
                {row.value1}
              </span>
            </div>

            {/* Value 2 Column */}
            <div className="flex-1 min-w-0 p-4 lg:p-5 flex items-center justify-center text-center">
              <span
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="uppercase tracking-wide text-[12px] leading-snug text-foreground"
              >
                {row.value2}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
