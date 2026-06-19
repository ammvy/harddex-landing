"use client";

import {
  ArrowUpRightIcon,
  BinocularsIcon,
  FlagBannerFoldIcon,
  GitDiffIcon,
} from "@phosphor-icons/react/dist/ssr";
import { motion } from "motion/react";
import Container from "@/components/ui/container";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

function HeroNavigations() {
  const cards = [
    {
      title: "Compare",
      desc: "Lado a lado, especificação por especificação.",
      Art: GitDiffIcon,
      code: "§ 01",
      href: "/compare",
    },
    {
      title: "Descubra",
      desc: "Catálogo curado, sem ruído, sem patrocínio.",
      Art: BinocularsIcon,
      code: "§ 02",
      href: "/#",
    },
    {
      title: "Resolva",
      desc: "Recomendação técnica para o seu uso real.",
      Art: FlagBannerFoldIcon,
      code: "§ 03",
      href: "/#",
    },
  ];

  return (
    <Container className="max-w-7xl mt-72 md:mt-64 lg:-mt-10 flex-col md:px-10 lg:px-8 w-fit mx-auto">
      <header
        className="flex flex-col items-start justify-start w-full mb-10 md:mb-16"
        style={{
          fontFamily: "'Space Mono', monospace",
          letterSpacing: "-0.03em",
          lineHeight: 0.95,
        }}
      >
        <h2 className="text-6xl uppercase text-left max-[375px]:text-4xl w-full">
          Do que você
          <br />
          <span className="text-primary">precisa?</span>
        </h2>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 w-fit px-10">
        {cards.map((c, i) => {
          return (
            <motion.a
              key={c.title}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.15 }}
              className={cn(
                `group border aspect-square flex flex-col relative overflow-hidden transition-colors duration-250`,
                `hover:bg-primary light:hover:text-background text-left`,
              )}
              href={c.href}
            >
              <div
                className={`flex items-center justify-between px-5 pt-4`}
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                <span className="uppercase tracking-widest text-[10px] opacity-70">
                  {c.code}
                </span>
                <ArrowUpRightIcon
                  size={16}
                  strokeWidth={1.6}
                  className="transition-transform duration-150 group-hover:rotate-12"
                />
              </div>
              <div className={`flex-1 flex items-center justify-center my-2`}>
                <c.Art className="max-[375px]:size-20 size-32" />
              </div>
              <div className={`px-5 pb-5`}>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: "-0.02em",
                  }}
                  className={`uppercase text-[30px] lg:text-[40px] leading-none`}
                >
                  {c.title}
                </div>
                <p
                  className={`mt-2 text-[12px] leading-snug max-[375px]:hidden`}
                >
                  {c.desc}
                </p>
              </div>
            </motion.a>
          );
        })}
      </div>
    </Container>
  );
}

export default dynamic(() => Promise.resolve(HeroNavigations), { ssr: false });
