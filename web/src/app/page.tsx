import { ScrollToBounce } from "@/components/scroll-to-bounce";
import Container from "@/components/ui/container";
import Logo from "@/components/logo";
import { GamerPersona } from "@/components/mouse/personas/gamer";
import { StudyPersona } from "@/components/mouse/personas/study";
import { ProPersona } from "@/components/mouse/personas/pro";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-background">
      <Container className="relative">
        <Logo />
        <ScrollToBounce
          direction="bottom"
          containerClassName="absolute bottom-4 left-1/2 -translate-x-1/2"
        />
      </Container>
      <Container className="flex-row gap-20 mt-32 md:mt-50 grid grid-cols-1 sm:grid sm:grid-cols-2 sm:col-span-3 lg:mt-0 lg:flex lg:flex-row">
        <div className="flex flex-col items-start sm:items-end gap-4">
          <h1 className="text-4xl uppercase tracking-widest">
            Compare<span className="text-primary">.</span>
          </h1>
          <h1 className="text-4xl uppercase tracking-widest text-primary">
            Descubra<span className="text-foreground">.</span>
          </h1>
          <h1 className="text-4xl uppercase tracking-widest">
            Resolva<span className="text-primary">.</span>
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
    </div>
  );
}
