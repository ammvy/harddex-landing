"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "motion/react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Question, Level } from "../_data/types";
import { LEVELS } from "../_data/questions";
import QuestionOption from "./question-option";

const questionSchema = z.object({
  selectedOption: z.number({
    error: "Selecione uma opção.",
  }),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

interface QuestionPhaseProps {
  question: Question;
  index: number;
  total: number;
  level: Level;
  selectedAnswer?: number;
  onAnswer: (optionIndex: number) => void;
  onPrev: () => void;
  onRestart: () => void;
}

export function QuestionPhase({
  question,
  index,
  total,
  level,
  selectedAnswer,
  onAnswer,
  onPrev,
  onRestart,
}: QuestionPhaseProps) {
  const { handleSubmit, setValue, watch, reset } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
  });

  const watchSelected = watch("selectedOption");

  useEffect(() => {
    reset({
      selectedOption: selectedAnswer !== undefined ? selectedAnswer : undefined,
    });
  }, [question.id, selectedAnswer, reset]);

  const onSubmit = (data: QuestionFormValues) => {
    onAnswer(data.selectedOption);
  };

  const handleSelect = (optionIndex: number) => {
    setValue("selectedOption", optionIndex);
    handleSubmit(onSubmit)();
  };

  const currentLevelLabel = LEVELS.find((l) => l.level === level)?.label;

  return (
    <motion.div
      key={`q-${question.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto text-foreground"
    >
      <div
        className="flex items-center justify-between mb-8 font-mono-brand"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <div className="flex items-center gap-3">
          <span className="uppercase tracking-widest text-[10px] opacity-50">
            Pergunta
          </span>
          <span className="uppercase tracking-widest text-[12px] text-primary">
            {String(index + 1).padStart(2, "0")}
            <span className="opacity-40">
              {" "}
              / {String(total).padStart(2, "0")}
            </span>
          </span>
        </div>
        <span className="uppercase tracking-widest text-[10px] opacity-50">
          Nível {question.level} · {currentLevelLabel}
        </span>
      </div>

      <h2
        style={{
          fontFamily: "'Space Mono', monospace",
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
        }}
        className="uppercase text-[clamp(26px,3.4vw,40px)] font-mono-brand font-bold"
      >
        {question.prompt}
      </h2>
      {question.hint && (
        <p className="mt-3 text-[13px] opacity-60 max-w-xl text-foreground">
          {question.hint}
        </p>
      )}

      <div className="mt-10 grid gap-2.5">
        {question.options.map((o, i) => (
          <QuestionOption
            key={i}
            index={i}
            label={o.label}
            selected={watchSelected === i}
            onSelect={() => handleSelect(i)}
          />
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          disabled={index === 0}
          style={{ fontFamily: "'Space Mono', monospace" }}
          className={`flex items-center gap-2 uppercase tracking-widest text-[11px] transition-opacity duration-100 cursor-pointer font-mono-brand font-bold ${
            index === 0 ? "opacity-25 cursor-not-allowed" : "hover:text-primary"
          }`}
        >
          <ArrowLeft size={12} strokeWidth={1.8} />
          Anterior
        </button>
        <button
          type="button"
          onClick={onRestart}
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="flex items-center gap-2 uppercase tracking-widest text-[10px] opacity-50 hover:opacity-100 hover:text-primary transition-all duration-100 cursor-pointer font-mono-brand font-bold"
        >
          <RotateCcw size={11} strokeWidth={1.8} />
          Recomeçar
        </button>
      </div>
    </motion.div>
  );
}

export default QuestionPhase;
