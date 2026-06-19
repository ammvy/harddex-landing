import { Question, LevelInfo } from "./types";

export const LEVELS: LevelInfo[] = [
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

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    level: 1,
    prompt: "O que ocupa mais tempo no seu dia em frente ao computador?",
    options: [
      { label: "Jogos competitivos ou AAA", w: { GAMER: 3 } },
      { label: "Reuniões, planilhas e e-mails", w: { PRO: 3 } },
      { label: "Aulas, leitura e pesquisa", w: { STUDY: 3 } },
      { label: "Editar foto, vídeo ou design", w: { CREATIVE: 3 } },
      { label: "Programar, compilar, rodar serviços", w: { DEV: 3 } },
      { label: "Navegar, redes e streaming", w: { MOBILE: 3 } },
    ],
  },
  {
    id: "q2",
    level: 1,
    prompt: "Quantas horas por dia, em média, você usa o equipamento?",
    options: [
      { label: "Até 2h — uso pontual", w: { MOBILE: 2, STUDY: 1 } },
      { label: "3 a 5h — uso regular", w: { STUDY: 2, PRO: 1, MOBILE: 1 } },
      {
        label: "6 a 8h — jornada completa",
        w: { PRO: 2, DEV: 1, CREATIVE: 1 },
      },
      {
        label: "Mais de 8h — quase sempre ligado",
        w: { DEV: 3, CREATIVE: 2, GAMER: 1 },
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
        w: { MOBILE: 3, STUDY: 1 },
      },
      {
        label: "Às vezes (faculdade, café, cliente)",
        w: { STUDY: 2, MOBILE: 1, PRO: 1 },
      },
      {
        label: "Quase nunca, fico em casa / escritório fixo",
        w: { GAMER: 2, CREATIVE: 2, DEV: 1, PRO: 1 },
      },
    ],
  },
  {
    id: "q4",
    level: 1,
    prompt: "Qual é o seu orçamento aproximado?",
    hint: "Não trava nada — só calibra o ponto de partida.",
    options: [
      { label: "Até R$ 4.000", w: { STUDY: 2, MOBILE: 2 } },
      { label: "R$ 4.000 – 8.000", w: { PRO: 2, DEV: 1, GAMER: 1, MOBILE: 1 } },
      {
        label: "R$ 8.000 – 15.000",
        w: { GAMER: 2, CREATIVE: 2, DEV: 2, PRO: 1 },
      },
      { label: "Acima de R$ 15.000", w: { CREATIVE: 3, GAMER: 2, DEV: 2 } },
    ],
  },
  {
    id: "q5",
    level: 1,
    prompt: "Qual o maior incômodo do seu equipamento atual?",
    options: [
      { label: "Travamentos e queda de FPS em jogos", w: { GAMER: 3 } },
      { label: "Programas que demoram a abrir", w: { PRO: 2, STUDY: 1 } },
      { label: "Renderização e exportação lentas", w: { CREATIVE: 3, DEV: 1 } },
      { label: "Bateria que não dura nada", w: { MOBILE: 3 } },
      { label: "Build / compilação demorada", w: { DEV: 3 } },
      { label: "Esquenta e faz barulho", w: { GAMER: 1, CREATIVE: 1, DEV: 1 } },
    ],
  },
  {
    id: "q6",
    level: 1,
    prompt: "Quantos monitores você usa (ou gostaria de usar)?",
    options: [
      { label: "Só a tela do notebook", w: { MOBILE: 3, STUDY: 2 } },
      { label: "Um monitor externo", w: { PRO: 2, STUDY: 1, GAMER: 1 } },
      { label: "Dois monitores", w: { DEV: 2, PRO: 2, CREATIVE: 1 } },
      {
        label: "Três ou mais (ou ultrawide grande)",
        w: { DEV: 3, CREATIVE: 2, GAMER: 1 },
      },
    ],
  },
  {
    id: "q7",
    level: 2,
    prompt: "Qual carga gráfica você espera lidar?",
    options: [
      { label: "Jogos 1080p, esports e indies", w: { GAMER: 2, MOBILE: 1 } },
      {
        label: "Jogos AAA em 1440p / ray tracing",
        w: { GAMER: 3, CREATIVE: 1 },
      },
      { label: "Edição de vídeo 4K, motion ou 3D", w: { CREATIVE: 3 } },
      {
        label: "Pouca GPU — só interface e abas",
        w: { PRO: 2, STUDY: 2, DEV: 1 },
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
        w: { CREATIVE: 3, GAMER: 1 },
      },
      { label: "Lotado de código, builds, containers", w: { DEV: 3 } },
      {
        label: "Suficiente pra docs, apps e jogos leves",
        w: { PRO: 2, STUDY: 2, GAMER: 1 },
      },
      { label: "Praticamente vazio, vivo na nuvem", w: { MOBILE: 2, PRO: 1 } },
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
        w: { DEV: 3, CREATIVE: 2 },
      },
      {
        label: "Ocasionalmente, em projetos específicos",
        w: { PRO: 1, CREATIVE: 1, DEV: 1, GAMER: 1 },
      },
      {
        label: "Quase nunca, faço uma coisa de cada vez",
        w: { STUDY: 2, MOBILE: 2, PRO: 1 },
      },
    ],
  },
  {
    id: "q10",
    level: 3,
    prompt: "Qual refresh rate você considera adequado pra jogos?",
    options: [
      { label: "60 Hz me serve", w: { STUDY: 1, PRO: 1, MOBILE: 1 } },
      { label: "144 Hz — fluidez confortável", w: { GAMER: 2, CREATIVE: 1 } },
      { label: "240 Hz+ pra competitivo", w: { GAMER: 3 } },
      {
        label: "Não jogo, não importa",
        w: { DEV: 1, CREATIVE: 1, PRO: 1, STUDY: 1 },
      },
    ],
  },
  {
    id: "q11",
    level: 3,
    prompt: "Quanta VRAM você considera o mínimo aceitável?",
    hint: "Memória da placa de vídeo, não a RAM do sistema.",
    options: [
      { label: "Até 6 GB — uso leve", w: { STUDY: 1, MOBILE: 1, PRO: 1 } },
      { label: "8 GB — padrão atual", w: { GAMER: 1, DEV: 1, PRO: 1 } },
      { label: "12 GB — AAA moderno", w: { GAMER: 2, CREATIVE: 2, DEV: 1 } },
      { label: "16 GB+ — IA local, 3D, render", w: { CREATIVE: 3, DEV: 3 } },
    ],
  },
  {
    id: "q12",
    level: 3,
    prompt: "Qual perfil de workload domina sua rotina?",
    options: [
      {
        label: "Single-thread — apps leves e jogos antigos",
        w: { GAMER: 1, PRO: 1, STUDY: 1 },
      },
      {
        label: "Multi-thread CPU — compilar, encode, render",
        w: { DEV: 3, CREATIVE: 3 },
      },
      {
        label: "GPU-bound — render 3D, treino ML, vídeo",
        w: { CREATIVE: 2, DEV: 2, GAMER: 2 },
      },
      {
        label: "I/O e rede — servidores, big data, streaming",
        w: { DEV: 2, PRO: 1 },
      },
    ],
  },
];
