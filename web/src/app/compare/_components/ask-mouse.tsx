"use client";

import { useMouseOpinion } from "../_hooks/use-mouse-opinion";
import { TduSelector } from "./tdu-selector";
import { MouseAvatar } from "./mouse-avatar";
import { ChatBubble } from "./chat-bubble";
import { Device } from "../_data/types";
import { HeadCircuitIcon } from "@phosphor-icons/react/dist/ssr";

interface AskMouseProps {
  deviceA: Device;
  deviceB: Device;
}

export default function AskMouse({ deviceA, deviceB }: AskMouseProps) {
  const {
    state,
    response,
    error,
    tdu,
    setTdu,
    askOpinion,
    reset,
  } = useMouseOpinion();

  const handleAsk = () => {
    if (state === "loading" || state === "streaming") return;
    askOpinion(deviceA, deviceB);
  };

  const isAnimating = state === "loading" || state === "streaming";

  return (
    <section className="mt-14">


      <div className="flex items-center justify-between mb-6">
        <h2
          style={{
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "-0.02em",
          }}
          className="uppercase text-[32px] md:text-[40px] leading-none text-foreground font-bold"
        >
          Conversar com Mouse
        </h2>
      </div>

      <div className="border border-foreground bg-background divide-y divide-foreground/10">
        {/* TDU Profile Selector */}
        <TduSelector
          selectedTdu={tdu}
          onTduChange={setTdu}
          disabled={isAnimating}
        />

        {/* Chat / Interaction Area */}
        <div className="flex flex-col md:flex-row items-start gap-6 p-6">
          {/* Mouse Persona Avatar */}
          <MouseAvatar tdu={tdu} isAnimating={isAnimating} />

          {/* Chat Bubble */}
          <ChatBubble
            state={state}
            response={response}
            error={error}
            tdu={tdu}
            deviceA={deviceA}
            deviceB={deviceB}
            onReset={reset}
          />
        </div>

        {/* Ask Opinion Button Area */}
        <div className="flex justify-end p-4 bg-muted/10">
          <button
            type="button"
            onClick={handleAsk}
            disabled={isAnimating}
            className={`w-full sm:w-auto flex justify-center items-center gap-2 bg-primary text-primary-foreground hover:cursor-pointer hover:bg-transparent hover:border-primary hover:text-primary border-transparent border-solid border-2 p-3 px-6 transition-all duration-150 uppercase tracking-wider font-bold text-[12px] ${
              isAnimating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span>
              {state === "loading" || state === "streaming"
                ? "Analisando..."
                : state === "done"
                ? "Analisar Novamente"
                : "Pedir Opinião"}
            </span>
            <HeadCircuitIcon size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
