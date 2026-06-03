import Container from "@/components/ui/container";
import { GamerPersona } from "@/components/mouse/personas/gamer";
import { StudyPersona } from "@/components/mouse/personas/study";
import { ProPersona } from "@/components/mouse/personas/pro";

export default function HeroPersonas() {
  return (
    <Container className="flex-row gap-20 mt-48 md:mt-50 grid grid-cols-1 sm:grid sm:grid-cols-2 sm:col-span-3 lg:mt-0 lg:flex lg:flex-row">
      <div
        className="flex flex-col items-start sm:items-end gap-4"
        style={{
          fontFamily: "'Space Mono', monospace",
          letterSpacing: "-0.03em",
          lineHeight: 0.95,
        }}
      >
        <h1 className="text-4xl uppercase tracking-widest">
          Compare<span className="text-primary">.</span>
        </h1>
        <h1 className="text-4xl uppercase tracking-widest">
          Descubra<span className="text-primary">.</span>
        </h1>
        <h1 className="text-4xl uppercase tracking-widest text-primary">
          Resolva<span className="text-foreground">.</span>
        </h1>
      </div>
      <div className="bg-foreground p-10 relative group">
        <StudyPersona className="w-full max-w-[200px] group-hover:scale-105 transition-all duration-300 ease-in-out" />
        <span className="uppercase tracking-widest text-[.8rem] text-foreground absolute -bottom-8 left-2">
          Estudo
        </span>
      </div>
      <div className="bg-foreground p-10 relative group">
        <GamerPersona className="w-full max-w-[200px] group-hover:scale-105 transition-all duration-300 ease-in-out" />
        <span className="uppercase tracking-widest text-[.8rem] text-foreground absolute -bottom-8 left-2">
          Gamer
        </span>
      </div>
      <div className="bg-foreground p-10 relative group">
        <ProPersona className="w-full max-w-[200px] group-hover:scale-105 transition-all duration-300 ease-in-out" />
        <span className="uppercase tracking-widest text-[.8rem] text-foreground absolute -bottom-8 left-2">
          Pro
        </span>
      </div>
    </Container>
  );
}
