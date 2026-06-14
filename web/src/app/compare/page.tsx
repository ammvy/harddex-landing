"use client";

import { useCompare } from "./_hooks/use-compare";
import Header from "@/components/header";
import { DevicePicker } from "./_components/device-picker";
import { ControlsBar } from "./_components/controls-bar";
import { HeroCard } from "./_components/hero-card";
import { SpecSection } from "./_components/spec-section";
import { FooterCta } from "./_components/footer-cta";

export default function ComparePage() {
  const {
    category,
    setCategory,
    detail,
    setDetail,
    profile,
    setProfile,
    profileOpen,
    setProfileOpen,
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

        {/* Controls Bar */}
        <ControlsBar
          category={category}
          setCategory={setCategory}
          detail={detail}
          setDetail={setDetail}
          profile={profile}
          setProfile={setProfile}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
        />

        {/* Pickers */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
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
          <div className="hidden md:flex items-center justify-center">
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
              }}
              className="bg-primary text-primary-foreground uppercase tracking-widest text-[11px] px-3 py-1.5 font-bold"
            >
              VS
            </span>
          </div>
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

        {/* Hero Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <HeroCard
            device={a}
            otherDevice={b}
            profile={profile}
            slotName="A"
          />
          <HeroCard
            device={b}
            otherDevice={a}
            profile={profile}
            slotName="B"
          />
        </div>

        {/* Spec Sections */}
        <div className="mt-10 space-y-10">
          {sections.map((sec) => (
            <SpecSection
              key={sec.section}
              sectionTitle={sec.section}
              rows={sec.rows}
              detail={detail}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <FooterCta profile={profile} />
      </main>
    </div>
  );
}
