"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Level, LevelInfo } from "../_data/types";
import { LEVELS } from "../_data/questions";
import LevelSelector from "./level-selector";
import ProfilePreviewGrid from "./profile-preview-grid";

const introSchema = z.object({
  level: z.union([z.literal(1), z.literal(2), z.literal(3)], {
    error: "Selecione um nível de quiz para começar.",
  }),
});

type IntroFormValues = z.infer<typeof introSchema>;

interface IntroPhaseProps {
  onStart: (level: Level) => void;
  onSkip: () => void;
}

export function IntroPhase({ onStart, onSkip }: IntroPhaseProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IntroFormValues>({
    resolver: zodResolver(introSchema),
    defaultValues: {
      level: 1,
    },
  });

  const watchLevel = watch("level");

  const onSubmit = (data: IntroFormValues) => {
    onStart(data.level);
  };

  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:flex-[7] min-w-0"
      >
        <div
          className="flex items-center gap-2 font-mono-brand"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <span className="w-1.5 h-1.5 bg-primary" />
          <span className="uppercase tracking-widest text-[10px] opacity-60">
            Q-NEW · onboarding
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
          }}
          className="uppercase text-[clamp(40px,6vw,84px)] mt-6 font-mono-brand font-bold text-foreground"
        >
          Quiz de
          <br />
          perfil<span className="text-primary">.</span>
        </h1>
        <p className="mt-6 text-[15px] leading-relaxed opacity-80 max-w-xl text-foreground">
          Algumas perguntas pra entender como você realmente usa hardware. O
          resultado calibra todas as comparações daqui pra frente — desde
          refresh rate até VRAM mínima.
        </p>
        <p className="mt-3 text-[13px] opacity-50 max-w-xl text-foreground">
          Escolha a intensidade. Você pode refazer quando quiser.
        </p>

        <div className="mt-10 grid sm:grid-cols-3 gap-3">
          {LEVELS.map((l: LevelInfo) => (
            <LevelSelector
              key={l.code}
              levelInfo={l}
              active={watchLevel === l.level}
              onSelect={() => setValue("level", l.level)}
            />
          ))}
        </div>

        {errors.level && (
          <p className="mt-3 text-red-500 text-sm">{errors.level.message}</p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="bg-foreground text-background dark:bg-foreground dark:text-background px-7 py-4 uppercase tracking-widest text-[12px] flex items-center gap-3 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-100 cursor-pointer font-mono-brand font-bold"
          >
            Começar
            <ArrowRight size={14} strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={onSkip}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="px-5 py-4 uppercase tracking-widest text-[11px] opacity-60 hover:opacity-100 hover:text-primary transition-all duration-100 cursor-pointer font-mono-brand font-bold"
          >
            Pular por agora ↗
          </button>
        </div>
      </form>

      <div className="w-full lg:flex-[5] min-w-0">
        <ProfilePreviewGrid />
      </div>
    </motion.div>
  );
}

export default IntroPhase;
