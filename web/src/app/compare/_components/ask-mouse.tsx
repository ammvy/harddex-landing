import { Textarea } from "@/components/ui/textarea";
import { HeadCircuitIcon } from "@phosphor-icons/react/dist/ssr";

export default function AskMouse() {
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
          Conversar com Mouse
        </h2>
      </div>
      <div className="border border-foreground divide-y divide-foreground/10 bg-background">
        <div className="flex items-stretch p-2 gap-2">
          <Textarea
            name="query"
            className="w-full rounded-none border-solid border-2 border-foreground/10 focus:border-primary focus:outline-primary resize-none"
          />
          <button className="w-fit px-4 bg-primary text-primary-foreground hover:cursor-pointer hover:bg-transparent hover:border-primary hover:text-primary border-transparent border-solid border-2 p-4">
            Enviar
          </button>
          <button className="w-fit flex justify-center items-center gap-2 bg-primary text-primary-foreground hover:cursor-pointer hover:bg-transparent hover:border-primary hover:text-primary border-transparent border-solid border-2 p-4">
            <span className="text-nowrap">Pergunta Rápida</span>
            <HeadCircuitIcon size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
