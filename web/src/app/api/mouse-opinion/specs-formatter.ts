import { Device } from "../../compare/_data/types";

export function getSpecsSummary(device: Device, category: string): string {
  const specs = device?.specs || ({} as any);
  const display = specs.display || {};
  const battery = specs.battery || {};
  const camera = specs.camera || {};
  const webcam = specs.webcam || {};
  const ports = specs.ports || [];
  const tdu = device?.tdu || {};

  if (category === "phone") {
    return `
- CPU: ${specs.cpu || "N/A"} (${specs.cpuCores || "N/A"} núcleos, ${specs.cpuClock || "N/A"} GHz, ${specs.process || "N/A"})
- GPU: ${specs.gpu || "N/A"} (${specs.gpuTflops || "N/A"} TFLOPS)
- RAM: ${specs.ram || "N/A"} GB ${specs.ramType || "N/A"} (${specs.ramSpeed || "N/A"} MHz)
- Armazenamento: ${specs.storage || "N/A"} GB ${specs.storageType || "N/A"} (Leitura: ${specs.read || "N/A"} MB/s, Escrita: ${specs.write || "N/A"} MB/s)
- Tela: ${display.size || "N/A"}", ${display.res || "N/A"}, ${display.refresh || "N/A"}Hz, ${display.panel || "N/A"}, ${display.nits || "N/A"} nits, ${display.gamut || "N/A"}% gamut
- Bateria: ${battery.capacity || "N/A"} mAh, ${battery.life || "N/A"}h de uso, Recarga ${battery.charge || "N/A"}W (Sem fio: ${battery.wireless || "N/A"}W)
- Câmeras: Principal de ${camera.main || "N/A"}MP, Ultra-wide ${camera.ultra || "N/A"}MP, Teleobjetiva ${camera.tele || "N/A"}MP, Gravação ${camera.videoK || "N/A"}K
- Peso/Dimensões: ${specs.weight || "N/A"}g, ${specs.dims || "N/A"}
- Conectividade: ${specs.wifi || "N/A"}, Bluetooth ${specs.bt || "N/A"}
- Preço: R$ ${(device?.price || 0).toLocaleString("pt-BR")}
- Pontuação Geral: ${device?.overall || "N/A"}/100
- Adequação para o Perfil: ${tdu.GAMER ?? 50}% Gamer, ${tdu.PRO ?? 50}% Produtividade, ${tdu.STUDY ?? 50}% Estudo, ${tdu.CREATIVE ?? 50}% Criativo, ${tdu.DEV ?? 50}% Dev, ${tdu.MOBILE ?? 50}% Mobilidade
`;
  } else {
    return `
- CPU: ${specs.cpu || "N/A"} (${specs.cpuCores || "N/A"} núcleos, ${specs.cpuClock || "N/A"} GHz, ${specs.process || "N/A"}, TDP: ${specs.tdp || "N/A"}W)
- GPU: ${specs.gpu || "N/A"} (${specs.vram || "N/A"}GB VRAM, ${specs.gpuTflops || "N/A"} TFLOPS)
- RAM: ${specs.ram || "N/A"} GB ${specs.ramType || "N/A"} (${specs.ramSpeed || "N/A"} MHz)
- Armazenamento: ${specs.storage || "N/A"} GB ${specs.storageType || "N/A"} (Leitura: ${specs.read || "N/A"} MB/s, Escrita: ${specs.write || "N/A"} MB/s)
- Tela: ${display.size || "N/A"}", ${display.res || "N/A"}, ${display.refresh || "N/A"}Hz, ${display.panel || "N/A"}, ${display.nits || "N/A"} nits, ${display.gamut || "N/A"}% gamut, Resposta: ${display.response || "N/A"}ms
- Bateria: ${battery.capacity || "N/A"} Wh, ${battery.life || "N/A"}h de uso, Recarga ${battery.charge || "N/A"}W
- Webcam: ${webcam.mp || "N/A"}MP, Infravermelho: ${webcam.ir ? "Sim" : "Não"}
- Peso/Dimensões: ${specs.weight || "N/A"}kg, ${specs.dims || "N/A"}
- Portas: ${ports.join(", ") || "N/A"}
- Conectividade: ${specs.wifi || "N/A"}, Bluetooth ${specs.bt || "N/A"}
- Preço: R$ ${(device?.price || 0).toLocaleString("pt-BR")}
- Pontuação Geral: ${device?.overall || "N/A"}/100
- Adequação para o Perfil: ${tdu.GAMER ?? 50}% Gamer, ${tdu.PRO ?? 50}% Produtividade, ${tdu.STUDY ?? 50}% Estudo, ${tdu.CREATIVE ?? 50}% Criativo, ${tdu.DEV ?? 50}% Dev, ${tdu.MOBILE ?? 50}% Mobilidade
`;
  }
}
