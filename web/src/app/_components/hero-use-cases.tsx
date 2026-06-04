"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRightIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import Container from "@/components/ui/container";

function HeroUseCases() {
  const useCases = [
    {
      code: "U-01",
      label: "Trabalho remoto",
      sub: "Produtividade, multitarefa, videoconferência",
      shape: (active: boolean) => (
        <svg viewBox="0 0 64 64" className="w-full h-full p-3">
          <rect
            x="10"
            y="12"
            width="44"
            height="30"
            opacity={0.9}
            fill={active ? "var(--foreground)" : "var(--background)"}
          />
          <rect
            x="16"
            y="18"
            width="32"
            height="18"
            opacity={0.9}
            fill={active ? "var(--background)" : "var(--foreground)"}
          />
          <rect
            x="4"
            y="44"
            width="56"
            height="6"
            opacity={0.9}
            fill={active ? "var(--foreground)" : "var(--background)"}
          />
        </svg>
      ),
      specs: ["CPU 8c / 16t", "16–32 GB RAM", "SSD 512 GB+"],
    },
    {
      code: "U-02",
      label: "Arquivo / Mídia",
      sub: "Edição, render, fotos em alta resolução",
      shape: (active: boolean) => (
        <svg viewBox="0 0 64 64" className="w-full h-full p-3">
          <rect
            x="8"
            y="12"
            width="48"
            height="10"
            opacity={0.9}
            fill={active ? "var(--foreground)" : "var(--background)"}
          />
          <rect
            x="10"
            y="22"
            width="44"
            height="32"
            opacity={0.9}
            fill={active ? "var(--foreground)" : "var(--background)"}
          />
          <rect
            x="26"
            y="32"
            width="12"
            height="4"
            opacity={0.9}
            fill={active ? "var(--background)" : "var(--foreground)"}
          />
        </svg>
      ),
      specs: ["GPU dedicada", "32 GB RAM", "SSD NVMe 1 TB"],
    },
    {
      code: "U-03",
      label: "Mobilidade",
      sub: "Portabilidade, bateria longa, leve",
      shape: (active: boolean) => (
        <svg viewBox="0 0 64 64" className="w-full h-full p-3">
          <rect
            x="20"
            y="8"
            width="24"
            height="48"
            opacity={0.9}
            fill={active ? "var(--foreground)" : "var(--background)"}
          />
          <rect
            x="24"
            y="14"
            width="16"
            height="32"
            opacity={0.9}
            fill={active ? "var(--background)" : "var(--foreground)"}
          />
          <circle
            cx="32"
            cy="51"
            r="2"
            opacity={0.9}
            fill={active ? "var(--background)" : "var(--foreground)"}
          />
        </svg>
      ),
      specs: ['Tela ≤ 14"', "Peso < 1.4 kg", "Bateria 10h+"],
    },
    {
      code: "U-04",
      label: "Viagem leve",
      sub: "Compacto, robusto, plug-and-play",
      shape: (active: boolean) => (
        <svg viewBox="0 0 64 64" className="w-full h-full p-3">
          <polygon
            points="30,6 34,6 38,28 58,40 58,44 36,40 36,52 42,56 42,58 32,56 22,58 22,56 28,52 28,40 6,44 6,40 26,28"
            fill={active ? "var(--foreground)" : "var(--background)"}
          />
        </svg>
      ),
      specs: ["≤ 1 kg", "USB-C universal", "Conectividade 5G"],
    },
  ];

  const [useIdx, setUseIdx] = useState(0);
  const selected = useCases[useIdx];

  return (
    <Container>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-sm:mt-72 mt-28 lg:mt-40 mb-20"
      >
        <div className="bg-foreground/90 text-background relative overflow-hidden">
          <div className="grid grid-cols-12 border-b border-background/15">
            <div className="col-span-12 md:col-span-7 border-r border-background/15 px-8 lg:px-12 py-6 flex items-center justify-between">
              <h3
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="lowercase text-[clamp(28px,3.4vw,42px)]"
              >
                tipo de uso
              </h3>
              <div
                className="flex items-center gap-2"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                <span className="w-1.5 h-1.5 block animate-pulse bg-primary" />
                <span className="uppercase tracking-widest text-[10px] opacity-70">
                  live recommender
                </span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 px-8 lg:px-12 py-6 flex items-center justify-between">
              <span
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="uppercase tracking-widest text-[10px] opacity-50"
              >
                Selecionado
              </span>
              <motion.span
                key={selected.code}
                initial={{ opacity: 0, x: 4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="uppercase tracking-widest text-[11px] text-primary"
              >
                {selected.code}
              </motion.span>
            </div>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-7 border-r border-background/15 p-8 lg:p-12">
              <div className="grid max-sm:grid-cols-2 grid-cols-4 gap-3">
                {useCases.map((u, i) => {
                  const active = useIdx === i;
                  return (
                    <button
                      key={u.code}
                      onMouseEnter={() => setUseIdx(i)}
                      onClick={() => setUseIdx(i)}
                      className={`aspect-square border relative transition-colors duration-75 hover:border-background/60 cursor-pointer ${
                        active
                          ? "bg-primary border-primary"
                          : "bg-transparent border-background/18"
                      }`}
                    >
                      {u.shape(active)}
                      <span
                        style={{ fontFamily: "'Space Mono', monospace" }}
                        className="absolute bottom-1.5 left-2 text-[9px] uppercase tracking-widest opacity-70"
                      >
                        {u.code}
                      </span>
                      {active && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-foreground/90 flex items-center justify-center">
                          <CheckIcon
                            size={10}
                            strokeWidth={3}
                            className="text-background"
                          />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex items-baseline gap-4">
                <motion.div
                  key={selected.label}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: "-0.025em",
                  }}
                  className="uppercase text-[28px] lg:text-[38px] leading-none"
                >
                  {selected.label}.
                </motion.div>
              </div>
              <motion.p
                key={selected.sub}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.25 }}
                className="mt-3 text-[13px] max-w-md"
              >
                {selected.sub}
              </motion.p>
            </div>

            <div
              className="col-span-12 md:col-span-5 p-8 lg:p-12 flex flex-col justify-between gap-8"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <div>
                <span className="uppercase tracking-widest text-[10px] opacity-50">
                  Recomendação técnica
                </span>
                <ul className="mt-5 divide-y divide-background/15 border-y border-background/15">
                  {selected.specs.map((s, i) => (
                    <motion.li
                      key={s}
                      initial={{ opacity: 0, x: 4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.18 }}
                      className="py-3 flex items-center justify-between"
                    >
                      <span className="uppercase tracking-widest text-[10px] opacity-50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="uppercase tracking-widest text-[12px]">
                        {s}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <button className="bg-background hover:bg-primary hover:text-foreground/90 light:hover:text-background text-foreground/90 px-6 py-4 uppercase tracking-widest text-[11px] flex items-center justify-between transition-colors duration-100 cursor-pointer">
                <span>Iniciar diagnóstico</span>
                <ArrowUpRightIcon size={14} strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </Container>
  );
}

export default dynamic(() => Promise.resolve(HeroUseCases), { ssr: false });
