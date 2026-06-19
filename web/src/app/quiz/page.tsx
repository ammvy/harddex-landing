"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { useQuiz } from "./_hooks/use-quiz";
import QuizHeader from "./_components/quiz-header";
import IntroPhase from "./_components/intro-phase";
import QuestionPhase from "./_components/question-phase";
import ResultPhase from "./_components/result-phase";

export default function Quiz() {
  const router = useRouter();
  const {
    phase,
    level,
    idx,
    answers,
    total,
    current,
    ranking,
    winner,
    winnerTotal,
    startQuiz,
    answerCurrent,
    prev,
    restart,
  } = useQuiz();

  return (
    <div
      className="min-h-screen w-full bg-background text-foreground transition-colors duration-200"
      style={{ fontFamily: "'Inter Tight', sans-serif" }}
    >
      <QuizHeader
        phase={phase}
        idx={idx}
        total={total}
        hasAnsweredCurrent={current ? answers[current.id] !== undefined : false}
      />

      <main className="max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-12 py-12 lg:py-20">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <IntroPhase onStart={startQuiz} onSkip={() => router.push("/")} />
          )}

          {phase === "questions" && current && (
            <QuestionPhase
              question={current}
              index={idx}
              total={total}
              level={level}
              selectedAnswer={answers[current.id]}
              onAnswer={answerCurrent}
              onPrev={prev}
              onRestart={restart}
            />
          )}

          {phase === "result" && (
            <ResultPhase
              winner={winner}
              ranking={ranking}
              winnerTotal={winnerTotal}
              onRestart={restart}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
