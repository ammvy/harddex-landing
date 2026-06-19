import { ProfileId, ProfileInfo } from "./types";

export const PROFILES: Record<ProfileId, ProfileInfo> = {
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
