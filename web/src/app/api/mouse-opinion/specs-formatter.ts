import { Device } from "../../compare/_data/types";

export function getSpecsSummary(device: Device, category: string): string {
  const specs = device.specs as any;
  if (category === "phone") {
    return `
- CPU: ${specs.cpu} (${specs.cpuCores} núcleos, ${specs.cpuClock} GHz, ${specs.process})
- GPU: ${specs.gpu} (${specs.gpuTflops} TFLOPS)
- RAM: ${specs.ram} GB ${specs.ramType} (${specs.ramSpeed} MHz)
- Armazenamento: ${specs.storage} GB ${specs.storageType} (Leitura: ${specs.read} MB/s, Escrita: ${specs.write} MB/s)
- Tela: ${specs.display.size}", ${specs.display.res}, ${specs.display.refresh}Hz, ${specs.display.panel}, ${specs.display.nits} nits, ${specs.display.gamut}% gamut
- Bateria: ${specs.battery.capacity} mAh, ${specs.battery.life}h de uso, Recarga ${specs.battery.charge}W (Sem fio: ${specs.battery.wireless}W)
- Câmeras: Principal de ${specs.camera.main}MP, Ultra-wide ${specs.camera.ultra}MP, Teleobjetiva ${specs.camera.tele}MP, Gravação ${specs.camera.videoK}K
- Peso/Dimensões: ${specs.weight}g, ${specs.dims}
- Conectividade: ${specs.wifi}, Bluetooth ${specs.bt}
- Preço: R$ ${device.price.toLocaleString("pt-BR")}
- Pontuação Geral: ${device.overall}/100
- Adequação para o Perfil: ${device.tdu.gamer ?? 50}% Gamer, ${device.tdu.pro ?? 50}% Produtividade, ${device.tdu.study ?? 50}% Estudo, ${device.tdu.creative ?? 50}% Criativo, ${device.tdu.dev ?? 50}% Dev, ${device.tdu.mobile ?? 50}% Mobilidade
`;
  } else {
    return `
- CPU: ${specs.cpu} (${specs.cpuCores} núcleos, ${specs.cpuClock} GHz, ${specs.process}, TDP: ${specs.tdp}W)
- GPU: ${specs.gpu} (${specs.vram}GB VRAM, ${specs.gpuTflops} TFLOPS)
- RAM: ${specs.ram} GB ${specs.ramType} (${specs.ramSpeed} MHz)
- Armazenamento: ${specs.storage} GB ${specs.storageType} (Leitura: ${specs.read} MB/s, Escrita: ${specs.write} MB/s)
- Tela: ${specs.display.size}", ${specs.display.res}, ${specs.display.refresh}Hz, ${specs.display.panel}, ${specs.display.nits} nits, ${specs.display.gamut}% gamut, Resposta: ${specs.display.response}ms
- Bateria: ${specs.battery.capacity} Wh, ${specs.battery.life}h de uso, Recarga ${specs.battery.charge}W
- Webcam: ${specs.webcam.mp}MP, Infravermelho: ${specs.webcam.ir ? "Sim" : "Não"}
- Peso/Dimensões: ${specs.weight}kg, ${specs.dims}
- Portas: ${specs.ports.join(", ")}
- Conectividade: ${specs.wifi}, Bluetooth ${specs.bt}
- Preço: R$ ${device.price.toLocaleString("pt-BR")}
- Pontuação Geral: ${device.overall}/100
- Adequação para o Perfil: ${device.tdu.gamer ?? 50}% Gamer, ${device.tdu.pro ?? 50}% Produtividade, ${device.tdu.study ?? 50}% Estudo, ${device.tdu.creative ?? 50}% Criativo, ${device.tdu.dev ?? 50}% Dev, ${device.tdu.mobile ?? 50}% Mobilidade
`;
  }
}
