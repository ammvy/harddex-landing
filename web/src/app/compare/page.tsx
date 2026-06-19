"use client";

import { useCompare } from "./_hooks/use-compare";
import Header from "@/components/header";
import { DevicePicker } from "./_components/device-picker";
import { SpecSection } from "./_components/spec-section";
import { shouldShow } from "./_data/spec-builders";
import AskMouse from "./_components/ask-mouse";

export default function ComparePage() {
  const {
    detail,
    pickerA,
    setPickerA,
    pickerB,
    setPickerB,
    devices,
    a,
    b,
    setA,
    setB,
    sections,
  } = useCompare();

  return (
    <div
      className="min-h-screen w-full bg-background text-foreground transition-colors duration-200"
      style={{ fontFamily: "'Inter Tight', sans-serif" }}
    >
      <Header label="§ Comparador / 2026" />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-14">
        {/* Header Title Section */}
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <div
              className="flex items-center gap-2"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <span className="w-1.5 h-1.5 bg-primary" />
              <span className="uppercase tracking-widest text-[10px] opacity-60">
                comparador · v1
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
              className="uppercase text-[clamp(36px,5vw,68px)] mt-4 font-bold"
            >
              Compare hardware
              <br />
              lado a lado<span className="text-primary">.</span>
            </h1>
          </div>
          <p className="max-w-md text-[14px] opacity-70">
            Escolha a categoria, dois aparelhos e o nível de detalhe. Os valores
            destacados na cor principal do tema são os melhores em cada linha.
          </p>
        </div>

        {/* Pickers */}
        <div className="mt-6 flex justify-between gap-4 items-center">
          <DevicePicker
            open={pickerA}
            onOpenChange={(openState) => {
              setPickerA(openState);
              if (openState) setPickerB(false);
            }}
            devices={devices.filter((d) => d.id !== b.id)}
            value={a}
            onPick={setA}
            slot="A"
          />
          <DevicePicker
            open={pickerB}
            onOpenChange={(openState) => {
              setPickerB(openState);
              if (openState) setPickerA(false);
            }}
            devices={devices.filter((d) => d.id !== a.id)}
            value={b}
            onPick={setB}
            slot="B"
          />
        </div>

        {/* Spec Sections */}
        <div className="my-10 space-y-10">
          {sections.map((sec) => {
            const visibleRows = sec.rows
              .filter((r) => shouldShow(r.level, detail))
              .map((r) => ({
                title: r.label,
                value1: r.a.display,
                value2: r.b.display,
              }));

            return (
              <SpecSection
                key={sec.section}
                sectionTitle={sec.section}
                rows={visibleRows}
              />
            );
          })}
        </div>

        <AskMouse deviceA={a} deviceB={b} />
      </main>
    </div>
  );
}
