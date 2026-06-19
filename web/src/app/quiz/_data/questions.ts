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
