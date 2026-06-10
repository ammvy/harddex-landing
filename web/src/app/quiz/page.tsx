"use client";

import { JSX, useEffect, useMemo, useState } from "react";
import {
  Sun,
  Moon,
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ACCENT = "#3D7FFF";
const ACCENT_DEEP = "#1B49FF";
const CAT_WHITE = "#F2F2EE";

function Logo({ fg }: { fg: string }) {
  return (
    <div className="relative inline-block select-none">
      <span
        style={{
          fontFamily: "'Blanka', 'Space Mono', monospace",
          letterSpacing: "0.02em",
          color: fg,
        }}
        className="uppercase text-[clamp(28px,3vw,40px)] leading-[0.85] block"
      >
        Hard<span style={{ color: ACCENT }}>dex</span>
      </span>
      <span
        aria-hidden
        style={{ background: ACCENT }}
        className="absolute left-[-3%] right-[-3%] top-[43%] h-[12%] mix-blend-multiply"
      />
    </div>
  );
}

type ProfileId = "gamer" | "pro" | "study" | "creative" | "dev" | "mobile";
type Level = 1 | 2 | 3;
type Weights = Partial<Record<ProfileId, number>>;

interface QOption {
  label: string;
  sub?: string;
  w: Weights;
}
interface Question {
  id: string;
  level: Level;
  prompt: string;
  hint?: string;
  options: QOption[];
}

const LEVELS: {
  code: string;
  level: Level;
  label: string;
  sub: string;
  count: string;
}[] = [
  {
    code: "L-01",
    level: 1,
    label: "Iniciante",
    sub: "Linguagem direta, foco em uso cotidiano.",
    count: "6 perguntas",
  },
  {
    code: "L-02",
    level: 2,
    label: "Intermediário",
    sub: "Cobre carga gráfica, multitarefa e storage.",
    count: "9 perguntas",
  },
  {
    code: "L-03",
    level: 3,
    label: "Avançado",
    sub: "Refresh rate, VRAM, workloads, plataforma.",
    count: "12 perguntas",
  },
];

const QUESTIONS: Question[] = [
  {
    id: "q1",
    level: 1,
    prompt: "O que ocupa mais tempo no seu dia em frente ao computador?",
    options: [
      { label: "Jogos competitivos ou AAA", w: { gamer: 3 } },
      { label: "Reuniões, planilhas e e-mails", w: { pro: 3 } },
      { label: "Aulas, leitura e pesquisa", w: { study: 3 } },
      { label: "Editar foto, vídeo ou design", w: { creative: 3 } },
      { label: "Programar, compilar, rodar serviços", w: { dev: 3 } },
      { label: "Navegar, redes e streaming", w: { mobile: 3 } },
    ],
  },
  {
    id: "q2",
    level: 1,
    prompt: "Quantas horas por dia, em média, você usa o equipamento?",
    options: [
      { label: "Até 2h — uso pontual", w: { mobile: 2, study: 1 } },
      { label: "3 a 5h — uso regular", w: { study: 2, pro: 1, mobile: 1 } },
      {
        label: "6 a 8h — jornada completa",
        w: { pro: 2, dev: 1, creative: 1 },
      },
      {
        label: "Mais de 8h — quase sempre ligado",
        w: { dev: 3, creative: 2, gamer: 1 },
      },
    ],
  },
  {
    id: "q3",
    level: 1,
    prompt: "Você precisa levar o equipamento pra outros lugares?",
    options: [
      {
        label: "Sim, vivo na rua — é meu escritório móvel",
        w: { mobile: 3, study: 1 },
      },
      {
        label: "Às vezes (faculdade, café, cliente)",
        w: { study: 2, mobile: 1, pro: 1 },
      },
      {
        label: "Quase nunca, fico em casa / escritório fixo",
        w: { gamer: 2, creative: 2, dev: 1, pro: 1 },
      },
    ],
  },
  {
    id: "q4",
    level: 1,
    prompt: "Qual é o seu orçamento aproximado?",
    hint: "Não trava nada — só calibra o ponto de partida.",
    options: [
      { label: "Até R$ 4.000", w: { study: 2, mobile: 2 } },
      { label: "R$ 4.000 – 8.000", w: { pro: 2, dev: 1, gamer: 1, mobile: 1 } },
      {
        label: "R$ 8.000 – 15.000",
        w: { gamer: 2, creative: 2, dev: 2, pro: 1 },
      },
      { label: "Acima de R$ 15.000", w: { creative: 3, gamer: 2, dev: 2 } },
    ],
  },
  {
    id: "q5",
    level: 1,
    prompt: "Qual o maior incômodo do seu equipamento atual?",
    options: [
      { label: "Travamentos e queda de FPS em jogos", w: { gamer: 3 } },
      { label: "Programas que demoram a abrir", w: { pro: 2, study: 1 } },
      { label: "Renderização e exportação lentas", w: { creative: 3, dev: 1 } },
      { label: "Bateria que não dura nada", w: { mobile: 3 } },
      { label: "Build / compilação demorada", w: { dev: 3 } },
      { label: "Esquenta e faz barulho", w: { gamer: 1, creative: 1, dev: 1 } },
    ],
  },
  {
    id: "q6",
    level: 1,
    prompt: "Quantos monitores você usa (ou gostaria de usar)?",
    options: [
      { label: "Só a tela do notebook", w: { mobile: 3, study: 2 } },
      { label: "Um monitor externo", w: { pro: 2, study: 1, gamer: 1 } },
      { label: "Dois monitores", w: { dev: 2, pro: 2, creative: 1 } },
      {
        label: "Três ou mais (ou ultrawide grande)",
        w: { dev: 3, creative: 2, gamer: 1 },
      },
    ],
  },
  {
    id: "q7",
    level: 2,
    prompt: "Qual carga gráfica você espera lidar?",
    options: [
      { label: "Jogos 1080p, esports e indies", w: { gamer: 2, mobile: 1 } },
      {
        label: "Jogos AAA em 1440p / ray tracing",
        w: { gamer: 3, creative: 1 },
      },
      { label: "Edição de vídeo 4K, motion ou 3D", w: { creative: 3 } },
      {
        label: "Pouca GPU — só interface e abas",
        w: { pro: 2, study: 2, dev: 1 },
      },
    ],
  },
  {
    id: "q8",
    level: 2,
    prompt: "Como está o seu armazenamento hoje?",
    hint: "Pense no SSD principal, não em nuvem.",
    options: [
      {
        label: "Sempre cheio (vídeos, projetos, libraries)",
        w: { creative: 3, gamer: 1 },
      },
      { label: "Lotado de código, builds, containers", w: { dev: 3 } },
      {
        label: "Suficiente pra docs, apps e jogos leves",
        w: { pro: 2, study: 2, gamer: 1 },
      },
      { label: "Praticamente vazio, vivo na nuvem", w: { mobile: 2, pro: 1 } },
    ],
  },
  {
    id: "q9",
    level: 2,
    prompt:
      "Você roda várias coisas pesadas em paralelo (VMs, IA local, gravação)?",
    options: [
      {
        label: "Constantemente — multi-thread é vida",
        w: { dev: 3, creative: 2 },
      },
      {
        label: "Ocasionalmente, em projetos específicos",
        w: { pro: 1, creative: 1, dev: 1, gamer: 1 },
      },
      {
        label: "Quase nunca, faço uma coisa de cada vez",
        w: { study: 2, mobile: 2, pro: 1 },
      },
    ],
  },
  {
    id: "q10",
    level: 3,
    prompt: "Qual refresh rate você considera adequado pra jogos?",
    options: [
      { label: "60 Hz me serve", w: { study: 1, pro: 1, mobile: 1 } },
      { label: "144 Hz — fluidez confortável", w: { gamer: 2, creative: 1 } },
      { label: "240 Hz+ pra competitivo", w: { gamer: 3 } },
      {
        label: "Não jogo, não importa",
        w: { dev: 1, creative: 1, pro: 1, study: 1 },
      },
    ],
  },
  {
    id: "q11",
    level: 3,
    prompt: "Quanta VRAM você considera o mínimo aceitável?",
    hint: "Memória da placa de vídeo, não a RAM do sistema.",
    options: [
      { label: "Até 6 GB — uso leve", w: { study: 1, mobile: 1, pro: 1 } },
      { label: "8 GB — padrão atual", w: { gamer: 1, dev: 1, pro: 1 } },
      { label: "12 GB — AAA moderno", w: { gamer: 2, creative: 2, dev: 1 } },
      { label: "16 GB+ — IA local, 3D, render", w: { creative: 3, dev: 3 } },
    ],
  },
  {
    id: "q12",
    level: 3,
    prompt: "Qual perfil de workload domina sua rotina?",
    options: [
      {
        label: "Single-thread — apps leves e jogos antigos",
        w: { gamer: 1, pro: 1, study: 1 },
      },
      {
        label: "Multi-thread CPU — compilar, encode, render",
        w: { dev: 3, creative: 3 },
      },
      {
        label: "GPU-bound — render 3D, treino ML, vídeo",
        w: { creative: 2, dev: 2, gamer: 2 },
      },
      {
        label: "I/O e rede — servidores, big data, streaming",
        w: { dev: 2, pro: 1 },
      },
    ],
  },
];

const PROFILES: Record<
  ProfileId,
  { code: string; label: string; tag: string; pitch: string; specs: string[] }
> = {
  gamer: {
    code: "P-01",
    label: "Gamer",
    tag: "Desempenho em jogos",
    pitch:
      "Foco em frame rate alto, latência baixa e GPU forte. Refresh rate gordo e SSD rápido pra cortar loading.",
    specs: [
      "GPU dedicada (8–16 GB VRAM)",
      "CPU 6–8 núcleos de geração atual",
      "Monitor 144 Hz ou mais",
      "SSD NVMe 1 TB+",
    ],
  },
  pro: {
    code: "P-02",
    label: "Produtividade",
    tag: "Trabalho remoto & multitarefa",
    pitch:
      "Equilíbrio entre desempenho, tela boa e silêncio. Memória sobrando pra abas, reuniões e apps de gestão.",
    specs: [
      "CPU 6+ núcleos eficiente",
      "16–32 GB RAM",
      "Tela calibrada + webcam decente",
      "Bateria e uptime confiáveis",
    ],
  },
  study: {
    code: "P-03",
    label: "Estudo",
    tag: "Aulas, leitura e pesquisa",
    pitch:
      "Leveza, bateria longa e custo-benefício. Suficiente pra navegar, escrever e rodar IDEs leves.",
    specs: [
      "CPU econômica de geração atual",
      "8–16 GB RAM",
      "SSD 256–512 GB",
      "Bateria 8 h+",
    ],
  },
  creative: {
    code: "P-04",
    label: "Criativo",
    tag: "Edição, render e design",
    pitch:
      "Cor fiel, GPU competente e armazenamento generoso. Fluxo Adobe, DaVinci e Blender sem travar.",
    specs: [
      "GPU com 12 GB+ VRAM",
      "32 GB RAM",
      "Tela 100% sRGB / DCI-P3",
      "SSD 2 TB NVMe + HD secundário",
    ],
  },
  dev: {
    code: "P-05",
    label: "Dev",
    tag: "Código, containers e VMs",
    pitch:
      "CPU multi-thread, RAM farta e bom suporte Linux. Compilação rápida e vários serviços em paralelo.",
    specs: [
      "CPU 8+ núcleos",
      "32–64 GB RAM",
      "SSD NVMe 1 TB+",
      "Compatibilidade Linux validada",
    ],
  },
  mobile: {
    code: "P-06",
    label: "Mobilidade",
    tag: "Portabilidade & bateria",
    pitch:
      "Ultrafino, bateria longa, robusto. Pensado pra rotina entre cafés, salas e viagens.",
    specs: [
      "Peso < 1,4 kg",
      "Bateria 10 h+",
      "Tela anti-reflexo",
      "Wi-Fi 6E / 5G opcional",
    ],
  },
};

function CatHeadBase({ children }: { children?: React.ReactNode }) {
  return (
    <svg viewBox="0 0 160 200" className="w-full h-auto max-w-[280px]">
      <path d="M 36 50 L 50 14 L 64 54 Z" fill={CAT_WHITE} />
      <path d="M 124 50 L 110 14 L 96 54 Z" fill={CAT_WHITE} />
      <path d="M 44 48 L 50 26 L 58 50 Z" fill={ACCENT} />
      <path d="M 116 48 L 110 26 L 102 50 Z" fill={ACCENT} />
      <path
        d="M 30 60 Q 30 44 50 44 L 110 44 Q 130 44 130 60 L 130 110 Q 130 130 80 130 Q 30 130 30 110 Z"
        fill={CAT_WHITE}
      />
      <circle cx="62" cy="80" r="5" fill="#0A0A0A" />
      <circle cx="98" cy="80" r="5" fill="#0A0A0A" />
      <circle cx="63.5" cy="78" r="1.6" fill={CAT_WHITE} />
      <circle cx="99.5" cy="78" r="1.6" fill={CAT_WHITE} />
      <circle cx="44" cy="92" r="3.4" fill={ACCENT} opacity="0.3" />
      <circle cx="116" cy="92" r="3.4" fill={ACCENT} opacity="0.3" />
      <path d="M 76 96 L 84 96 L 80 102 Z" fill={ACCENT} />
      <path
        d="M 80 102 Q 80 108 76 108 M 80 102 Q 80 108 84 108"
        stroke="#0A0A0A"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      {children}
    </svg>
  );
}

const CATS: Record<ProfileId, () => JSX.Element> = {
  gamer: () => (
    <CatHeadBase>
      <path
        d="M 36 56 Q 80 4 124 56"
        stroke="#0A0A0A"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="18" y="48" width="16" height="26" rx="4" fill="#0A0A0A" />
      <rect x="126" y="48" width="16" height="26" rx="4" fill={ACCENT} />
      <rect x="20" y="54" width="12" height="12" fill={ACCENT} />
      <path
        d="M 18 74 Q 12 92 36 102"
        stroke="#0A0A0A"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="38" cy="104" r="3.6" fill={ACCENT} />
      <g transform="translate(80 160)">
        <path
          d="M -34 -8 Q -34 -16 -26 -16 L 26 -16 Q 34 -16 34 -8 L 34 8 Q 34 16 26 16 L -26 16 Q -34 16 -34 8 Z"
          fill="#0A0A0A"
        />
        <circle cx="-16" cy="0" r="4" fill={ACCENT} />
        <rect x="-22" y="-1" width="4" height="2" fill={CAT_WHITE} />
        <rect x="-14" y="-1" width="4" height="2" fill={CAT_WHITE} />
        <rect x="-17" y="-5" width="2" height="4" fill={CAT_WHITE} />
        <rect x="-17" y="1" width="2" height="4" fill={CAT_WHITE} />
        <circle cx="16" cy="-4" r="3" fill={ACCENT} />
        <circle cx="22" cy="4" r="3" fill={CAT_WHITE} />
        <circle cx="10" cy="4" r="3" fill={CAT_WHITE} />
      </g>
    </CatHeadBase>
  ),
  pro: () => (
    <CatHeadBase>
      <path
        d="M 50 132 L 80 152 L 110 132 L 116 196 L 44 196 Z"
        fill="#0A0A0A"
      />
      <path
        d="M 60 132 L 80 146 L 100 132"
        stroke={CAT_WHITE}
        strokeWidth="1.6"
        fill="none"
      />
      <path d="M 76 146 L 84 146 L 90 162 L 80 196 L 70 162 Z" fill={ACCENT} />
      <rect x="74" y="146" width="12" height="3" fill={ACCENT_DEEP} />
    </CatHeadBase>
  ),
  study: () => (
    <CatHeadBase>
      <circle
        cx="62"
        cy="80"
        r="13"
        stroke="#0A0A0A"
        strokeWidth="2.6"
        fill="none"
      />
      <circle
        cx="98"
        cy="80"
        r="13"
        stroke="#0A0A0A"
        strokeWidth="2.6"
        fill="none"
      />
      <line
        x1="75"
        y1="80"
        x2="85"
        y2="80"
        stroke="#0A0A0A"
        strokeWidth="2.6"
      />
      <line
        x1="49"
        y1="78"
        x2="40"
        y2="74"
        stroke="#0A0A0A"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="111"
        y1="78"
        x2="120"
        y2="74"
        stroke="#0A0A0A"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <g transform="translate(80 168)">
        <path
          d="M -36 -14 L 0 -10 L 36 -14 L 36 14 L 0 10 L -36 14 Z"
          fill="#0A0A0A"
        />
        <path d="M -34 -12 L 0 -8 L 0 12 L -34 12 Z" fill={CAT_WHITE} />
        <path d="M 34 -12 L 0 -8 L 0 12 L 34 12 Z" fill={CAT_WHITE} />
        <line
          x1="-28"
          y1="-4"
          x2="-6"
          y2="-2"
          stroke="#0A0A0A"
          strokeWidth="0.8"
        />
        <line
          x1="-28"
          y1="0"
          x2="-6"
          y2="2"
          stroke="#0A0A0A"
          strokeWidth="0.8"
        />
        <line
          x1="-28"
          y1="4"
          x2="-6"
          y2="6"
          stroke="#0A0A0A"
          strokeWidth="0.8"
        />
        <line
          x1="6"
          y1="-2"
          x2="28"
          y2="-4"
          stroke={ACCENT}
          strokeWidth="1.4"
        />
        <line x1="6" y1="2" x2="28" y2="0" stroke="#0A0A0A" strokeWidth="0.8" />
        <line x1="6" y1="6" x2="28" y2="4" stroke="#0A0A0A" strokeWidth="0.8" />
      </g>
    </CatHeadBase>
  ),
  creative: () => (
    <CatHeadBase>
      <ellipse cx="80" cy="36" rx="52" ry="16" fill="#0A0A0A" />
      <ellipse cx="80" cy="32" rx="44" ry="10" fill="#1A1A1A" />
      <circle cx="116" cy="22" r="6" fill={ACCENT} />
      <g transform="translate(80 168) rotate(-18)">
        <rect x="-36" y="-3" width="42" height="6" fill="#0A0A0A" />
        <rect x="6" y="-4" width="8" height="8" fill={ACCENT} />
        <path
          d="M 14 -6 L 30 -10 L 30 10 L 14 6 Z"
          fill={CAT_WHITE}
          stroke="#0A0A0A"
          strokeWidth="1"
        />
        <circle cx="22" cy="-2" r="1.4" fill={ACCENT} />
      </g>
    </CatHeadBase>
  ),
  dev: () => (
    <CatHeadBase>
      <path
        d="M 28 50 L 132 50 L 132 38 Q 132 26 110 26 L 50 26 Q 28 26 28 38 Z"
        fill="#0A0A0A"
      />
      <rect x="24" y="48" width="112" height="6" fill={ACCENT} />
      <rect x="72" y="20" width="16" height="6" fill="#0A0A0A" />
      <g transform="translate(80 168)">
        <rect x="-38" y="-12" width="76" height="24" fill="#0A0A0A" />
        <text
          x="0"
          y="6"
          textAnchor="middle"
          fontSize="16"
          fill={ACCENT}
          fontWeight="700"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          {"</>"}
        </text>
      </g>
    </CatHeadBase>
  ),
  mobile: () => (
    <CatHeadBase>
      <path
        d="M 46 36 Q 80 -2 122 30"
        stroke="#0A0A0A"
        strokeWidth="3.4"
        fill="none"
      />
      <rect x="116" y="26" width="16" height="22" rx="4" fill={ACCENT} />
      <rect x="118" y="32" width="12" height="3" fill={CAT_WHITE} />
      <g transform="translate(80 168)">
        <path d="M -18 -14 L 18 -14 L 16 16 L -16 16 Z" fill="#0A0A0A" />
        <path
          d="M 18 -8 Q 30 -6 30 4 Q 30 14 18 12"
          stroke="#0A0A0A"
          strokeWidth="2.4"
          fill="none"
        />
        <rect x="-14" y="-18" width="28" height="4" fill={CAT_WHITE} />
        <path
          d="M -6 -22 Q -6 -28 -2 -28"
          stroke={ACCENT}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 2 -22 Q 2 -28 6 -28"
          stroke={ACCENT}
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </CatHeadBase>
  ),
};

function MiniCatBase({ children }: { children?: React.ReactNode }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M 22 38 L 30 10 L 40 40 Z" fill={CAT_WHITE} />
      <path d="M 78 38 L 70 10 L 60 40 Z" fill={CAT_WHITE} />
      <path d="M 27 36 L 30 20 L 35 38 Z" fill={ACCENT} />
      <path d="M 73 36 L 70 20 L 65 38 Z" fill={ACCENT} />
      <path
        d="M 18 46 Q 18 32 32 32 L 68 32 Q 82 32 82 46 L 82 76 Q 82 92 50 92 Q 18 92 18 76 Z"
        fill={CAT_WHITE}
      />
      <circle cx="38" cy="60" r="3" fill="#0A0A0A" />
      <circle cx="62" cy="60" r="3" fill="#0A0A0A" />
      <circle cx="39" cy="59" r="0.9" fill={CAT_WHITE} />
      <circle cx="63" cy="59" r="0.9" fill={CAT_WHITE} />
      <circle cx="28" cy="68" r="2" fill={ACCENT} opacity="0.3" />
      <circle cx="72" cy="68" r="2" fill={ACCENT} opacity="0.3" />
      <path d="M 47 70 L 53 70 L 50 74 Z" fill={ACCENT} />
      <path
        d="M 50 74 Q 50 78 47 78 M 50 74 Q 50 78 53 78"
        stroke="#0A0A0A"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      />
      {children}
    </svg>
  );
}

const MINI_CATS: Record<ProfileId, () => JSX.Element> = {
  gamer: () => (
    <MiniCatBase>
      <path
        d="M 22 40 Q 50 6 78 40"
        stroke="#0A0A0A"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="12" y="34" width="10" height="16" rx="2.5" fill="#0A0A0A" />
      <rect x="78" y="34" width="10" height="16" rx="2.5" fill={ACCENT} />
      <rect x="13.5" y="38" width="7" height="8" fill={ACCENT} />
    </MiniCatBase>
  ),
  pro: () => (
    <MiniCatBase>
      <path d="M 32 92 L 50 100 L 68 92 L 68 100 L 32 100 Z" fill="#0A0A0A" />
      <path d="M 47 92 L 53 92 L 55 98 L 50 100 L 45 98 Z" fill={ACCENT} />
    </MiniCatBase>
  ),
  study: () => (
    <MiniCatBase>
      <circle
        cx="38"
        cy="60"
        r="8"
        stroke="#0A0A0A"
        strokeWidth="1.8"
        fill="none"
      />
      <circle
        cx="62"
        cy="60"
        r="8"
        stroke="#0A0A0A"
        strokeWidth="1.8"
        fill="none"
      />
      <line
        x1="46"
        y1="60"
        x2="54"
        y2="60"
        stroke="#0A0A0A"
        strokeWidth="1.8"
      />
    </MiniCatBase>
  ),
  creative: () => (
    <MiniCatBase>
      <ellipse cx="50" cy="26" rx="30" ry="9" fill="#0A0A0A" />
      <ellipse cx="50" cy="23" rx="24" ry="6" fill="#1A1A1A" />
      <circle cx="72" cy="18" r="3.5" fill={ACCENT} />
    </MiniCatBase>
  ),
  dev: () => (
    <MiniCatBase>
      <path
        d="M 16 36 L 84 36 L 84 28 Q 84 20 70 20 L 30 20 Q 16 20 16 28 Z"
        fill="#0A0A0A"
      />
      <rect x="14" y="34" width="72" height="4" fill={ACCENT} />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontSize="10"
        fill="#0A0A0A"
        fontWeight="700"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        {"</>"}
      </text>
    </MiniCatBase>
  ),
  mobile: () => (
    <MiniCatBase>
      <path
        d="M 28 26 Q 50 -4 76 22"
        stroke="#0A0A0A"
        strokeWidth="2.2"
        fill="none"
      />
      <rect x="72" y="20" width="10" height="14" rx="2.5" fill={ACCENT} />
      <rect x="73.5" y="24" width="7" height="2" fill={CAT_WHITE} />
    </MiniCatBase>
  ),
};

type Phase = "intro" | "questions" | "result";

export default function Quiz() {
  const [dark, setDark] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [level, setLevel] = useState<Level>(1);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  // const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  const active = useMemo(
    () => QUESTIONS.filter((q) => q.level <= level),
    [level],
  );
  const total = active.length;
  const current = active[idx];

  const scores = useMemo(() => {
    const s: Record<ProfileId, number> = {
      gamer: 0,
      pro: 0,
      study: 0,
      creative: 0,
      dev: 0,
      mobile: 0,
    };
    Object.entries(answers).forEach(([qid, oi]) => {
      const q = QUESTIONS.find((x) => x.id === qid);
      if (!q) return;
      const w = q.options[oi]?.w || {};
      (Object.keys(w) as ProfileId[]).forEach((k) => {
        s[k] += w[k] || 0;
      });
    });
    return s;
  }, [answers]);

  const ranking = useMemo(() => {
    return (Object.entries(scores) as [ProfileId, number][]).sort(
      (a, b) => b[1] - a[1],
    );
  }, [scores]);

  const winner = ranking[0]?.[0] || "pro";
  const winnerTotal = ranking.reduce((acc, [, v]) => acc + v, 0) || 1;

  const bg = dark ? "bg-[#0E0E0E]" : "bg-white";
  const fg = dark ? "text-white" : "text-black";
  const fgHex = dark ? "#FFFFFF" : "#000000";
  const border = dark ? "border-white" : "border-black";
  const borderSoft = dark ? "border-white/20" : "border-black/20";
  const surface = dark ? "bg-white/[0.03]" : "bg-black/[0.02]";

  const answerCurrent = (i: number) => {
    if (!current) return;
    setAnswers((a) => ({ ...a, [current.id]: i }));
    setTimeout(() => {
      if (idx + 1 >= total) setPhase("result");
      else setIdx((x) => x + 1);
    }, 220);
  };

  const restart = () => {
    setPhase("intro");
    setIdx(0);
    setAnswers({});
  };

  return (
    <div
      className={`min-h-screen w-full ${bg} ${fg} transition-colors duration-200`}
      style={{ fontFamily: "'Inter Tight', sans-serif" }}
    >
      <div className={`border-b ${borderSoft} sticky top-0 z-20 ${bg}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between gap-4">
          <Logo fg={fgHex} />
          <div
            className="hidden sm:flex items-center gap-3"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span className="uppercase tracking-widest text-[10px] opacity-50">
              {phase === "intro"
                ? "§ Quiz / Início"
                : phase === "questions"
                  ? `§ Quiz · ${idx + 1}/${total}`
                  : "§ Quiz / Resultado"}
            </span>
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Alternar tema"
              className={`w-9 h-9 border ${border} flex items-center justify-center hover:text-[#3D7FFF] hover:border-[#3D7FFF] transition-colors duration-100`}
            >
              {dark ? (
                <Sun size={14} strokeWidth={1.6} />
              ) : (
                <Moon size={14} strokeWidth={1.6} />
              )}
            </button>
            <Link
              href="/"
              className={`w-9 h-9 border ${border} flex items-center justify-center hover:text-[#3D7FFF] hover:border-[#3D7FFF] transition-colors duration-100`}
              aria-label="Sair do quiz"
            >
              <X size={14} strokeWidth={1.6} />
            </Link>
          </div>
        </div>
        {phase === "questions" && (
          <div
            className={`h-[3px] ${dark ? "bg-white/10" : "bg-black/10"} relative overflow-hidden`}
          >
            <motion.div
              className="h-full"
              style={{ background: ACCENT }}
              animate={{
                width: `${((idx + (answers[current?.id || ""] !== undefined ? 1 : 0)) / total) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        )}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              <div className="col-span-12 lg:col-span-7">
                <div
                  className="flex items-center gap-2"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  <span
                    className="w-1.5 h-1.5"
                    style={{ background: ACCENT }}
                  />
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
                  className="uppercase text-[clamp(40px,6vw,84px)] mt-6"
                >
                  Quiz de
                  <br />
                  perfil<span style={{ color: ACCENT }}>.</span>
                </h1>
                <p className="mt-6 text-[15px] leading-relaxed opacity-80 max-w-xl">
                  Algumas perguntas pra entender como você realmente usa
                  hardware. O resultado calibra todas as comparações daqui pra
                  frente — desde refresh rate até VRAM mínima.
                </p>
                <p className="mt-3 text-[13px] opacity-50 max-w-xl">
                  Escolha a intensidade. Você pode refazer quando quiser.
                </p>

                <div className="mt-10 grid sm:grid-cols-3 gap-3">
                  {LEVELS.map((l) => {
                    const active = level === l.level;
                    return (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => setLevel(l.level)}
                        className={`text-left p-5 border transition-all duration-150 ${active ? "" : border}`}
                        style={{
                          background: active ? "#0A0A0A" : "transparent",
                          borderColor: active ? ACCENT : undefined,
                          color: active ? "#fff" : undefined,
                        }}
                      >
                        <div
                          className="flex items-center justify-between"
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          <span className="uppercase tracking-widest text-[9px] opacity-60">
                            {l.code}
                          </span>
                          {active && (
                            <span
                              className="w-4 h-4 flex items-center justify-center"
                              style={{ background: ACCENT }}
                            >
                              <Check
                                size={10}
                                strokeWidth={3}
                                className="text-white"
                              />
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            letterSpacing: "-0.02em",
                          }}
                          className="uppercase text-[18px] mt-3 leading-tight"
                        >
                          {l.label}
                        </div>
                        <p className="text-[12px] opacity-70 mt-1.5 leading-snug">
                          {l.sub}
                        </p>
                        <div
                          className="mt-4 pt-3 border-t border-current/15 flex items-center justify-between"
                          style={{ fontFamily: "'Space Mono', monospace" }}
                        >
                          <span className="uppercase tracking-widest text-[9px] opacity-50">
                            duração
                          </span>
                          <span
                            className="uppercase tracking-widest text-[10px]"
                            style={active ? { color: ACCENT } : {}}
                          >
                            {l.count}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setPhase("questions");
                      setIdx(0);
                      setAnswers({});
                    }}
                    style={{ fontFamily: "'Space Mono', monospace" }}
                    className={`${dark ? "bg-white text-black" : "bg-black text-white"} px-7 py-4 uppercase tracking-widest text-[12px] flex items-center gap-3 hover:bg-[#3D7FFF] hover:text-white transition-all duration-100`}
                  >
                    Começar
                    <ArrowRight size={14} strokeWidth={1.6} />
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    style={{ fontFamily: "'Space Mono', monospace" }}
                    className="px-5 py-4 uppercase tracking-widest text-[11px] opacity-60 hover:opacity-100 hover:text-[#3D7FFF] transition-all duration-100"
                  >
                    Pular por agora ↗
                  </button>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-5">
                <div className={`border ${border} ${surface} p-8`}>
                  <div
                    className="flex items-center gap-2"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    <Sparkles
                      size={12}
                      strokeWidth={2}
                      style={{ color: ACCENT }}
                    />
                    <span className="uppercase tracking-widest text-[10px] opacity-60">
                      6 perfis possíveis
                    </span>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {(Object.keys(PROFILES) as ProfileId[]).map((pid) => (
                      <div
                        key={pid}
                        className="aspect-square bg-black text-white flex flex-col items-center justify-between p-3 relative group hover:ring-2 hover:ring-[#3D7FFF] transition-all duration-150"
                      >
                        <span
                          style={{ fontFamily: "'Space Mono', monospace" }}
                          className="absolute top-2 left-2 uppercase tracking-widest text-[8px] text-white/50"
                        >
                          {PROFILES[pid].code}
                        </span>
                        <span
                          style={{ background: ACCENT }}
                          className="absolute top-2 right-2 w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                        />
                        <div className="w-full flex-1 flex items-center justify-center pt-3">
                          <div className="w-[82%]">{MINI_CATS[pid]()}</div>
                        </div>
                        <span
                          style={{ fontFamily: "'Space Mono', monospace" }}
                          className="uppercase tracking-widest text-[9px] mt-1 text-white/85 group-hover:text-[#3D7FFF] transition-colors duration-100"
                        >
                          {PROFILES[pid].label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div
                    className={`mt-6 pt-5 border-t ${borderSoft} grid gap-2`}
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    <div className="flex justify-between text-[11px]">
                      <span className="uppercase tracking-widest opacity-60">
                        Perfis
                      </span>
                      <span className="uppercase tracking-widest">06</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="uppercase tracking-widest opacity-60">
                        Banco
                      </span>
                      <span className="uppercase tracking-widest">
                        {QUESTIONS.length} perguntas
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="uppercase tracking-widest opacity-60">
                        Algoritmo
                      </span>
                      <span
                        className="uppercase tracking-widest"
                        style={{ color: ACCENT }}
                      >
                        weighted-score v2
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {phase === "questions" && current && (
            <motion.div
              key={`q-${current.id}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <div
                className="flex items-center justify-between mb-8"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                <div className="flex items-center gap-3">
                  <span className="uppercase tracking-widest text-[10px] opacity-50">
                    Pergunta
                  </span>
                  <span
                    className="uppercase tracking-widest text-[12px]"
                    style={{ color: ACCENT }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                    <span className="opacity-40">
                      {" "}
                      / {String(total).padStart(2, "0")}
                    </span>
                  </span>
                </div>
                <span className="uppercase tracking-widest text-[10px] opacity-50">
                  Nível {current.level} ·{" "}
                  {LEVELS.find((l) => l.level === level)?.label}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
                className="uppercase text-[clamp(26px,3.4vw,40px)]"
              >
                {current.prompt}
              </h2>
              {current.hint && (
                <p className="mt-3 text-[13px] opacity-60 max-w-xl">
                  {current.hint}
                </p>
              )}

              <div className="mt-10 grid gap-2.5">
                {current.options.map((o, i) => {
                  const selected = answers[current.id] === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => answerCurrent(i)}
                      className={`group text-left border p-5 flex items-center gap-5 transition-all duration-100 ${selected ? "" : `${border} hover:border-[#3D7FFF]`}`}
                      style={{
                        background: selected ? "#0A0A0A" : "transparent",
                        borderColor: selected ? ACCENT : undefined,
                        color: selected ? "#fff" : undefined,
                      }}
                    >
                      <span
                        className="w-9 h-9 border flex items-center justify-center shrink-0 transition-colors duration-100"
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          borderColor: selected ? ACCENT : "currentColor",
                          background: selected ? ACCENT : "transparent",
                          color: selected ? "#fff" : undefined,
                        }}
                      >
                        <span className="text-[11px] tracking-widest">
                          {String.fromCharCode(65 + i)}
                        </span>
                      </span>
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          letterSpacing: "-0.01em",
                        }}
                        className="uppercase text-[14px] sm:text-[15px] flex-1 leading-snug"
                      >
                        {o.label}
                      </span>
                      <ArrowRight
                        size={14}
                        strokeWidth={1.6}
                        className={`opacity-0 ${selected ? "" : "group-hover:opacity-100"} transition-opacity duration-100`}
                        style={{ color: ACCENT }}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIdx((x) => Math.max(0, x - 1))}
                  disabled={idx === 0}
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className={`flex items-center gap-2 uppercase tracking-widest text-[11px] transition-opacity duration-100 ${idx === 0 ? "opacity-25 cursor-not-allowed" : "hover:text-[#3D7FFF]"}`}
                >
                  <ArrowLeft size={12} strokeWidth={1.8} />
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={restart}
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className="flex items-center gap-2 uppercase tracking-widest text-[10px] opacity-50 hover:opacity-100 hover:text-[#3D7FFF] transition-all duration-100"
                >
                  <RotateCcw size={11} strokeWidth={1.8} />
                  Recomeçar
                </button>
              </div>
            </motion.div>
          )}

          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
              className="grid grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              <div className="col-span-12 lg:col-span-5">
                <div
                  className={`border ${border} relative bg-black text-white aspect-[4/5] flex flex-col`}
                >
                  <div
                    className="px-6 pt-6 flex items-center justify-between"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    <span className="uppercase tracking-widest text-[10px] opacity-60">
                      {PROFILES[winner as ProfileId].code}
                    </span>
                    <span
                      className="uppercase tracking-widest text-[10px]"
                      style={{ color: ACCENT }}
                    >
                      Match
                    </span>
                  </div>
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.15,
                    }}
                    className="flex-1 flex items-center justify-center px-8"
                  >
                    {CATS[winner as ProfileId]()}
                  </motion.div>
                  <div
                    className="px-6 pb-6 border-t border-white/15 pt-5"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    <div className="uppercase tracking-widest text-[9px] text-white/50">
                      Você é
                    </div>
                    <div
                      className="uppercase text-[28px] leading-none mt-2"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      {PROFILES[winner as ProfileId].label}
                      <span style={{ color: ACCENT }}>.</span>
                    </div>
                    <div className="text-[11px] text-white/60 uppercase tracking-widest mt-2">
                      {PROFILES[winner as ProfileId].tag}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-7">
                <div
                  className="flex items-center gap-2"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  <Sparkles
                    size={12}
                    strokeWidth={2}
                    style={{ color: ACCENT }}
                  />
                  <span className="uppercase tracking-widest text-[10px] opacity-60">
                    Resultado calibrado
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: "-0.04em",
                    lineHeight: 0.95,
                  }}
                  className="uppercase text-[clamp(34px,5vw,64px)] mt-5"
                >
                  Seu perfil é<br />
                  <span style={{ color: ACCENT }}>
                    {PROFILES[winner as ProfileId].label}.
                  </span>
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed opacity-80 max-w-2xl">
                  {PROFILES[winner as ProfileId].pitch}
                </p>

                <div className="mt-8">
                  <div
                    style={{ fontFamily: "'Space Mono', monospace" }}
                    className="uppercase tracking-widest text-[10px] opacity-60 mb-3"
                  >
                    Recomendação base
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {PROFILES[winner as ProfileId].specs.map((s) => (
                      <div
                        key={s}
                        className={`border ${border} px-4 py-3 flex items-center gap-3`}
                      >
                        <span
                          className="w-5 h-5 flex items-center justify-center shrink-0"
                          style={{ background: ACCENT }}
                        >
                          <Check
                            size={11}
                            strokeWidth={3}
                            className="text-white"
                          />
                        </span>
                        <span
                          style={{ fontFamily: "'Space Mono', monospace" }}
                          className="uppercase tracking-widest text-[11px]"
                        >
                          {s}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <div
                    style={{ fontFamily: "'Space Mono', monospace" }}
                    className="uppercase tracking-widest text-[10px] opacity-60 mb-3"
                  >
                    Distribuição
                  </div>
                  <div className="grid gap-2">
                    {ranking.map(([pid, val]) => {
                      const pct = Math.round((val / winnerTotal) * 100);
                      const main = pid === winner;
                      return (
                        <div key={pid} className="flex items-center gap-4">
                          <span
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              color: main ? ACCENT : undefined,
                            }}
                            className={`uppercase tracking-widest text-[10px] w-28 ${main ? "" : "opacity-60"}`}
                          >
                            {PROFILES[pid].label}
                          </span>
                          <div
                            className={`flex-1 h-2 ${dark ? "bg-white/10" : "bg-black/10"} relative overflow-hidden`}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{
                                duration: 0.7,
                                ease: [0.22, 1, 0.36, 1],
                                delay: 0.1,
                              }}
                              className="h-full"
                              style={{
                                background: main
                                  ? ACCENT
                                  : dark
                                    ? "rgba(255,255,255,0.4)"
                                    : "rgba(0,0,0,0.5)",
                              }}
                            />
                          </div>
                          <span
                            style={{ fontFamily: "'Space Mono', monospace" }}
                            className="uppercase tracking-widest text-[10px] w-10 text-right opacity-70"
                          >
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link
                    href="/"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                    className={`${dark ? "bg-white text-black" : "bg-black text-white"} px-7 py-4 uppercase tracking-widest text-[12px] flex items-center gap-3 hover:bg-[#3D7FFF] hover:text-white transition-all duration-100`}
                  >
                    Comparar hardware
                    <ArrowRight size={14} strokeWidth={1.6} />
                  </Link>
                  <button
                    type="button"
                    onClick={restart}
                    style={{ fontFamily: "'Space Mono', monospace" }}
                    className={`border ${border} px-5 py-4 uppercase tracking-widest text-[11px] flex items-center gap-2 hover:border-[#3D7FFF] hover:text-[#3D7FFF] transition-colors duration-100`}
                  >
                    <RotateCcw size={12} strokeWidth={1.8} />
                    Refazer quiz
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
