import { Detail, RowSpec, Device, PhoneSpecs, LaptopSpecs } from "./types";

export function detailOrder(d: Detail): number {
  return d === "basic" ? 1 : d === "mid" ? 2 : 3;
}

export function shouldShow(rowLevel: Detail, currentLevel: Detail): boolean {
  return detailOrder(rowLevel) <= detailOrder(currentLevel);
}

export function winner(row: RowSpec): "a" | "b" | "tie" {
  if (row.better === "none") return "tie";
  if (row.a.raw === row.b.raw) return "tie";
  if (row.better === "higher") return row.a.raw > row.b.raw ? "a" : "b";
  return row.a.raw < row.b.raw ? "a" : "b";
}

export function buildPhoneRows(
  a: Device<PhoneSpecs>,
  b: Device<PhoneSpecs>,
): { section: string; rows: RowSpec[] }[] {
  const sa = a.specs;
  const sb = b.specs;
  return [
    {
      section: "Desempenho",
      rows: [
        {
          label: "Processador",
          hint: "O 'cérebro' do aparelho — quanto mais núcleos e maior o clock, mais coisas ele faz ao mesmo tempo.",
          level: "basic",
          better: "none",
          a: { display: sa.cpu, raw: 0 },
          b: { display: sb.cpu, raw: 0 },
        },
        {
          label: "Núcleos / Clock",
          hint: "Núcleos = quantas tarefas simultâneas; clock (GHz) = velocidade de cada uma.",
          level: "mid",
          better: "higher",
          a: {
            display: `${sa.cpuCores} · ${sa.cpuClock} GHz`,
            raw: sa.cpuClock * sa.cpuCores,
          },
          b: {
            display: `${sb.cpuCores} · ${sb.cpuClock} GHz`,
            raw: sb.cpuClock * sb.cpuCores,
          },
        },
        {
          label: "Processo de fabricação",
          hint: "Nanômetros — quanto menor, mais eficiente em consumo e calor.",
          level: "advanced",
          better: "lower",
          a: { display: sa.process, raw: parseFloat(sa.process) },
          b: { display: sb.process, raw: parseFloat(sb.process) },
        },
        {
          label: "GPU",
          hint: "Placa gráfica — responsável por jogos e efeitos de tela.",
          level: "basic",
          better: "none",
          a: { display: sa.gpu, raw: 0 },
          b: { display: sb.gpu, raw: 0 },
        },
        {
          label: "GPU (TFLOPS)",
          hint: "Trilhões de operações por segundo — métrica bruta de potência gráfica.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.gpuTflops}`, raw: sa.gpuTflops },
          b: { display: `${sb.gpuTflops}`, raw: sb.gpuTflops },
        },
        {
          label: "Memória RAM",
          hint: "Memória de curto prazo — mais RAM = mais apps abertos sem travar.",
          level: "basic",
          better: "higher",
          a: { display: `${sa.ram} GB ${sa.ramType}`, raw: sa.ram },
          b: { display: `${sb.ram} GB ${sb.ramType}`, raw: sb.ram },
        },
        {
          label: "Velocidade RAM",
          hint: "Quanto mais alto o MHz, mais rápida a troca de dados.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.ramSpeed} MHz`, raw: sa.ramSpeed },
          b: { display: `${sb.ramSpeed} MHz`, raw: sb.ramSpeed },
        },
        {
          label: "AnTuTu",
          hint: "Benchmark sintético que mede desempenho geral. Maior = melhor.",
          level: "advanced",
          better: "higher",
          a: {
            display: sa.bench.antutu.toLocaleString("pt-BR"),
            raw: sa.bench.antutu,
          },
          b: {
            display: sb.bench.antutu.toLocaleString("pt-BR"),
            raw: sb.bench.antutu,
          },
        },
        {
          label: "Geekbench (single / multi)",
          hint: "Mede CPU em uma e várias tarefas em paralelo.",
          level: "advanced",
          better: "higher",
          a: {
            display: `${sa.bench.gbSingle} / ${sa.bench.gbMulti}`,
            raw: sa.bench.gbMulti,
          },
          b: {
            display: `${sb.bench.gbSingle} / ${sb.bench.gbMulti}`,
            raw: sb.bench.gbMulti,
          },
        },
      ],
    },
    {
      section: "Tela",
      rows: [
        {
          label: "Tamanho",
          hint: "Diagonal da tela em polegadas.",
          level: "basic",
          better: "none",
          a: { display: `${sa.display.size}"`, raw: sa.display.size },
          b: { display: `${sb.display.size}"`, raw: sb.display.size },
        },
        {
          label: "Resolução",
          hint: "Quantidade de pixels — maior = imagem mais nítida.",
          level: "basic",
          better: "none",
          a: { display: sa.display.res, raw: 0 },
          b: { display: sb.display.res, raw: 0 },
        },
        {
          label: "Taxa de atualização",
          hint: "Hz — quantas vezes a tela atualiza por segundo. Maior = animações mais fluidas.",
          level: "basic",
          better: "higher",
          a: { display: `${sa.display.refresh} Hz`, raw: sa.display.refresh },
          b: { display: `${sb.display.refresh} Hz`, raw: sb.display.refresh },
        },
        {
          label: "Tipo de painel",
          hint: "OLED = pretos perfeitos e contraste maior. LTPO economiza bateria.",
          level: "mid",
          better: "none",
          a: { display: sa.display.panel, raw: 0 },
          b: { display: sb.display.panel, raw: 0 },
        },
        {
          label: "Brilho de pico",
          hint: "Nits — quanto maior, melhor a leitura sob sol forte.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.display.nits} nits`, raw: sa.display.nits },
          b: { display: `${sb.display.nits} nits`, raw: sb.display.nits },
        },
        {
          label: "Cobertura DCI-P3",
          hint: "Quanto do espaço de cor profissional a tela reproduz. Importante pra foto/vídeo.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.display.gamut}%`, raw: sa.display.gamut },
          b: { display: `${sb.display.gamut}%`, raw: sb.display.gamut },
        },
      ],
    },
    {
      section: "Bateria & Carregamento",
      rows: [
        {
          label: "Capacidade",
          hint: "mAh — reserva de energia. Não é uma medida absoluta de duração.",
          level: "basic",
          better: "higher",
          a: {
            display: `${sa.battery.capacity} mAh`,
            raw: sa.battery.capacity,
          },
          b: {
            display: `${sb.battery.capacity} mAh`,
            raw: sb.battery.capacity,
          },
        },
        {
          label: "Duração estimada",
          hint: "Em uso misto (web, vídeo, mensagens).",
          level: "basic",
          better: "higher",
          a: { display: `~${sa.battery.life} h`, raw: sa.battery.life },
          b: { display: `~${sb.battery.life} h`, raw: sb.battery.life },
        },
        {
          label: "Carregamento com fio",
          hint: "Watts — quanto maior, mais rápida a recarga.",
          level: "mid",
          better: "higher",
          a: { display: `${sa.battery.charge} W`, raw: sa.battery.charge },
          b: { display: `${sb.battery.charge} W`, raw: sb.battery.charge },
        },
        {
          label: "Carregamento sem fio",
          hint: "Watts via indução. 0 = não suporta.",
          level: "advanced",
          better: "higher",
          a: {
            display: sa.battery.wireless ? `${sa.battery.wireless} W` : "—",
            raw: sa.battery.wireless,
          },
          b: {
            display: sb.battery.wireless ? `${sb.battery.wireless} W` : "—",
            raw: sb.battery.wireless,
          },
        },
      ],
    },
    {
      section: "Câmera",
      rows: [
        {
          label: "Câmera principal",
          hint: "MP = megapixels. Mais MP não significa foto melhor, mas dá mais resolução.",
          level: "basic",
          better: "higher",
          a: { display: `${sa.camera.main} MP`, raw: sa.camera.main },
          b: { display: `${sb.camera.main} MP`, raw: sb.camera.main },
        },
        {
          label: "Ultra-wide",
          hint: "Lente grande-angular para paisagens e grupos.",
          level: "mid",
          better: "higher",
          a: { display: `${sa.camera.ultra} MP`, raw: sa.camera.ultra },
          b: { display: `${sb.camera.ultra} MP`, raw: sb.camera.ultra },
        },
        {
          label: "Teleobjetiva",
          hint: "Lente de zoom óptico (sem perda).",
          level: "advanced",
          better: "higher",
          a: {
            display: sa.camera.tele ? `${sa.camera.tele} MP` : "—",
            raw: sa.camera.tele,
          },
          b: {
            display: sb.camera.tele ? `${sb.camera.tele} MP` : "—",
            raw: sb.camera.tele,
          },
        },
        {
          label: "Vídeo máximo",
          hint: "Resolução máxima de gravação.",
          level: "mid",
          better: "higher",
          a: { display: `${sa.camera.videoK}K`, raw: sa.camera.videoK },
          b: { display: `${sb.camera.videoK}K`, raw: sb.camera.videoK },
        },
      ],
    },
    {
      section: "Armazenamento",
      rows: [
        {
          label: "Capacidade",
          hint: "Quanto cabe em fotos, vídeos e apps.",
          level: "basic",
          better: "higher",
          a: { display: `${sa.storage} GB`, raw: sa.storage },
          b: { display: `${sb.storage} GB`, raw: sb.storage },
        },
        {
          label: "Tipo",
          hint: "UFS 4.0 é cerca de 2× mais rápido que UFS 3.1.",
          level: "mid",
          better: "none",
          a: { display: sa.storageType, raw: 0 },
          b: { display: sb.storageType, raw: 0 },
        },
        {
          label: "Leitura / Escrita",
          hint: "MB/s sequencial — afeta abertura de apps e cópia de arquivos.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.read} / ${sa.write} MB/s`, raw: sa.read },
          b: { display: `${sb.read} / ${sb.write} MB/s`, raw: sb.read },
        },
      ],
    },
    {
      section: "Conectividade & Físico",
      rows: [
        {
          label: "Wi-Fi",
          hint: "Wi-Fi 7 > 6E > 6, em ordem de velocidade e latência.",
          level: "mid",
          better: "none",
          a: { display: sa.wifi, raw: 0 },
          b: { display: sb.wifi, raw: 0 },
        },
        {
          label: "Bluetooth",
          hint: "5.3+ traz menos consumo e melhor alcance.",
          level: "advanced",
          better: "none",
          a: { display: sa.bt, raw: 0 },
          b: { display: sb.bt, raw: 0 },
        },
        {
          label: "Sistema",
          hint: "Versão do sistema operacional de fábrica.",
          level: "basic",
          better: "none",
          a: { display: sa.os, raw: 0 },
          b: { display: sb.os, raw: 0 },
        },
        {
          label: "Peso",
          hint: "Gramas — quanto menor, mais confortável no bolso/mão.",
          level: "mid",
          better: "lower",
          a: { display: `${sa.weight} g`, raw: sa.weight },
          b: { display: `${sb.weight} g`, raw: sb.weight },
        },
        {
          label: "Dimensões",
          hint: "Altura × largura × espessura.",
          level: "advanced",
          better: "none",
          a: { display: sa.dims, raw: 0 },
          b: { display: sb.dims, raw: 0 },
        },
      ],
    },
  ];
}

export function buildLaptopRows(
  a: Device<LaptopSpecs>,
  b: Device<LaptopSpecs>,
): { section: string; rows: RowSpec[] }[] {
  const sa = a.specs;
  const sb = b.specs;
  return [
    {
      section: "Desempenho",
      rows: [
        {
          label: "Processador",
          hint: "O 'cérebro' do notebook — modelo + arquitetura.",
          level: "basic",
          better: "none",
          a: { display: sa.cpu, raw: 0 },
          b: { display: sb.cpu, raw: 0 },
        },
        {
          label: "Núcleos / Clock turbo",
          hint: "Núcleos paralelos × velocidade máxima sob carga.",
          level: "mid",
          better: "higher",
          a: {
            display: `${sa.cpuCores} · ${sa.cpuClock} GHz`,
            raw: sa.cpuCores * sa.cpuClock,
          },
          b: {
            display: `${sb.cpuCores} · ${sb.cpuClock} GHz`,
            raw: sb.cpuCores * sb.cpuClock,
          },
        },
        {
          label: "TDP",
          hint: "Watts dissipados pela CPU — afeta calor e bateria.",
          level: "advanced",
          better: "lower",
          a: { display: `${sa.tdp} W`, raw: sa.tdp },
          b: { display: `${sb.tdp} W`, raw: sb.tdp },
        },
        {
          label: "Processo",
          hint: "Nanômetros — menor = mais eficiente.",
          level: "advanced",
          better: "lower",
          a: { display: sa.process, raw: parseFloat(sa.process) },
          b: { display: sb.process, raw: parseFloat(sb.process) },
        },
        {
          label: "GPU",
          hint: "Placa de vídeo — essencial pra jogos, render e IA.",
          level: "basic",
          better: "none",
          a: { display: sa.gpu, raw: 0 },
          b: { display: sb.gpu, raw: 0 },
        },
        {
          label: "VRAM",
          hint: "Memória da GPU — limita texturas grandes, IA local e edição 3D.",
          level: "mid",
          better: "higher",
          a: {
            display: sa.vram ? `${sa.vram} GB` : "compartilhada",
            raw: sa.vram,
          },
          b: {
            display: sb.vram ? `${sb.vram} GB` : "compartilhada",
            raw: sb.vram,
          },
        },
        {
          label: "GPU (TFLOPS)",
          hint: "Potência bruta gráfica.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.gpuTflops}`, raw: sa.gpuTflops },
          b: { display: `${sb.gpuTflops}`, raw: sb.gpuTflops },
        },
        {
          label: "RAM",
          hint: "Memória — 16 GB é o mínimo confortável, 32 GB ideal pra dev/render.",
          level: "basic",
          better: "higher",
          a: { display: `${sa.ram} GB ${sa.ramType}`, raw: sa.ram },
          b: { display: `${sb.ram} GB ${sb.ramType}`, raw: sb.ram },
        },
        {
          label: "Velocidade RAM",
          hint: "MHz — afeta principalmente iGPUs e compilação pesada.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.ramSpeed} MHz`, raw: sa.ramSpeed },
          b: { display: `${sb.ramSpeed} MHz`, raw: sb.ramSpeed },
        },
        {
          label: "Geekbench (single / multi)",
          hint: "Mede CPU em uma e várias tarefas em paralelo.",
          level: "advanced",
          better: "higher",
          a: {
            display: `${sa.bench.gbSingle} / ${sa.bench.gbMulti}`,
            raw: sa.bench.gbMulti,
          },
          b: {
            display: `${sb.bench.gbSingle} / ${sb.bench.gbMulti}`,
            raw: sb.bench.gbMulti,
          },
        },
        {
          label: "3DMark Time Spy",
          hint: "Benchmark gráfico padrão da indústria.",
          level: "advanced",
          better: "higher",
          a: {
            display: sa.bench.threeDmark.toLocaleString("pt-BR"),
            raw: sa.bench.threeDmark,
          },
          b: {
            display: sb.bench.threeDmark.toLocaleString("pt-BR"),
            raw: sb.bench.threeDmark,
          },
        },
      ],
    },
    {
      section: "Tela",
      rows: [
        {
          label: "Tamanho",
          hint: "Diagonal em polegadas.",
          level: "basic",
          better: "none",
          a: { display: `${sa.display.size}"`, raw: sa.display.size },
          b: { display: `${sb.display.size}"`, raw: sb.display.size },
        },
        {
          label: "Resolução",
          hint: "Mais pixels = imagem mais nítida e mais espaço útil.",
          level: "basic",
          better: "none",
          a: { display: sa.display.res, raw: 0 },
          b: { display: sb.display.res, raw: 0 },
        },
        {
          label: "Taxa de atualização",
          hint: "Hz — 120 Hz+ deixa scroll e jogos muito mais fluidos.",
          level: "basic",
          better: "higher",
          a: { display: `${sa.display.refresh} Hz`, raw: sa.display.refresh },
          b: { display: `${sb.display.refresh} Hz`, raw: sb.display.refresh },
        },
        {
          label: "Tipo de painel",
          hint: "OLED/Mini-LED = mais contraste; IPS = mais barato e durável.",
          level: "mid",
          better: "none",
          a: { display: sa.display.panel, raw: 0 },
          b: { display: sb.display.panel, raw: 0 },
        },
        {
          label: "Brilho",
          hint: "Nits — importante pra ambientes claros.",
          level: "mid",
          better: "higher",
          a: { display: `${sa.display.nits} nits`, raw: sa.display.nits },
          b: { display: `${sb.display.nits} nits`, raw: sb.display.nits },
        },
        {
          label: "Cobertura DCI-P3",
          hint: "Fidelidade de cor — essencial pra edição.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.display.gamut}%`, raw: sa.display.gamut },
          b: { display: `${sb.display.gamut}%`, raw: sb.display.gamut },
        },
        {
          label: "Tempo de resposta",
          hint: "ms — menor = sem ghosting em jogos rápidos.",
          level: "advanced",
          better: "lower",
          a: { display: `${sa.display.response} ms`, raw: sa.display.response },
          b: { display: `${sb.display.response} ms`, raw: sb.display.response },
        },
      ],
    },
    {
      section: "Bateria & Carregamento",
      rows: [
        {
          label: "Capacidade",
          hint: "Wh — quanto maior, mais reserva de energia.",
          level: "basic",
          better: "higher",
          a: { display: `${sa.battery.capacity} Wh`, raw: sa.battery.capacity },
          b: { display: `${sb.battery.capacity} Wh`, raw: sb.battery.capacity },
        },
        {
          label: "Duração estimada",
          hint: "Em uso misto (web + docs + vídeo).",
          level: "basic",
          better: "higher",
          a: { display: `~${sa.battery.life} h`, raw: sa.battery.life },
          b: { display: `~${sb.battery.life} h`, raw: sb.battery.life },
        },
        {
          label: "Carregador",
          hint: "Watts da fonte — afeta tempo total de recarga.",
          level: "mid",
          better: "higher",
          a: { display: `${sa.battery.charge} W`, raw: sa.battery.charge },
          b: { display: `${sb.battery.charge} W`, raw: sb.battery.charge },
        },
      ],
    },
    {
      section: "Armazenamento",
      rows: [
        {
          label: "Capacidade",
          hint: "GB disponíveis pra sistema, projetos e jogos.",
          level: "basic",
          better: "higher",
          a: { display: `${sa.storage} GB`, raw: sa.storage },
          b: { display: `${sb.storage} GB`, raw: sb.storage },
        },
        {
          label: "Tipo",
          hint: "NVMe Gen4 é 2–3× mais rápido que Gen3 e ~10× SSD SATA.",
          level: "mid",
          better: "none",
          a: { display: sa.storageType, raw: 0 },
          b: { display: sb.storageType, raw: 0 },
        },
        {
          label: "Leitura / Escrita",
          hint: "MB/s sequencial — afeta build, edição e carregamento.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.read} / ${sa.write} MB/s`, raw: sa.read },
          b: { display: `${sb.read} / ${sb.write} MB/s`, raw: sb.read },
        },
      ],
    },
    {
      section: "Webcam & Conectividade",
      rows: [
        {
          label: "Webcam",
          hint: "MP da câmera frontal; IR habilita login facial.",
          level: "basic",
          better: "higher",
          a: {
            display: `${sa.webcam.mp} MP${sa.webcam.ir ? " · IR" : ""}`,
            raw: sa.webcam.mp,
          },
          b: {
            display: `${sb.webcam.mp} MP${sb.webcam.ir ? " · IR" : ""}`,
            raw: sb.webcam.mp,
          },
        },
        {
          label: "Wi-Fi",
          hint: "Wi-Fi 7 > 6E > 6.",
          level: "mid",
          better: "none",
          a: { display: sa.wifi, raw: 0 },
          b: { display: sb.wifi, raw: 0 },
        },
        {
          label: "Bluetooth",
          hint: "5.3+ tem menor consumo e melhor alcance.",
          level: "advanced",
          better: "none",
          a: { display: sa.bt, raw: 0 },
          b: { display: sb.bt, raw: 0 },
        },
        {
          label: "Portas",
          hint: "Conexões físicas — Thunderbolt 4 dá 40 Gbps e display externo.",
          level: "mid",
          better: "none",
          a: { display: sa.ports.join(" · "), raw: sa.ports.length },
          b: { display: sb.ports.join(" · "), raw: sb.ports.length },
        },
        {
          label: "Sistema",
          hint: "SO de fábrica.",
          level: "basic",
          better: "none",
          a: { display: sa.os, raw: 0 },
          b: { display: sb.os, raw: 0 },
        },
      ],
    },
    {
      section: "Físico",
      rows: [
        {
          label: "Peso",
          hint: "kg — quanto menor, melhor pra carregar no dia a dia.",
          level: "basic",
          better: "lower",
          a: { display: `${sa.weight} kg`, raw: sa.weight },
          b: { display: `${sb.weight} kg`, raw: sb.weight },
        },
        {
          label: "Dimensões",
          hint: "Largura × profundidade × altura.",
          level: "mid",
          better: "none",
          a: { display: sa.dims, raw: 0 },
          b: { display: sb.dims, raw: 0 },
        },
      ],
    },
  ];
}
