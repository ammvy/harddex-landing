import { Device } from "../../compare/_data/types";
import { ProfileId } from "@/components/mouse";

export function generateSmartFallbackText(
  deviceA: Device,
  deviceB: Device,
  tdu: ProfileId,
): string {
  const ratingA = (deviceA?.tdu || {})[tdu] || deviceA?.overall || 50;
  const ratingB = (deviceB?.tdu || {})[tdu] || deviceB?.overall || 50;

  const category = deviceA?.category || "phone";
  const specsA = deviceA?.specs || ({} as any);
  const specsB = deviceB?.specs || ({} as any);

  const displayA = specsA.display || {};
  const displayB = specsB.display || {};
  const batteryA = specsA.battery || {};
  const batteryB = specsB.battery || {};
  const portsA = specsA.ports || [];
  const portsB = specsB.ports || [];

  let winner = deviceA;
  let loser = deviceB;
  let isTie = false;

  if (ratingA === ratingB) {
    if ((deviceA?.overall || 0) > (deviceB?.overall || 0)) {
      winner = deviceA;
      loser = deviceB;
    } else if ((deviceB?.overall || 0) > (deviceA?.overall || 0)) {
      winner = deviceB;
      loser = deviceA;
    } else {
      isTie = true;
    }
  } else if (ratingB > ratingA) {
    winner = deviceB;
    loser = deviceA;
  }

  // Persona comments based on TDU
  let analysisIntro = "";
  let comparisonDetails = "";
  let verdict = "";

  switch (tdu) {
    case "GAMER":
      analysisIntro = `E aí, jogador! 🎮 Mouse na área. Analisei as specs de peso aqui. Se o foco é rodar jogos pesados e ter a melhor fluidez possível, o foco principal está na GPU, taxa de atualização da tela e gerenciamento térmico (no caso de notebooks).`;
      if (category === "phone") {
        comparisonDetails = `O **${deviceA?.brand || "Sem Marca"} ${deviceA?.model || "Sem Modelo"}** traz a GPU *${specsA.gpu || "N/A"}* com **${specsA.gpuTflops || "N/A"} TFLOPS** e tela de **${displayA.refresh || "N/A"}Hz**. Já o **${deviceB?.brand || "Sem Marca"} ${deviceB?.model || "Sem Modelo"}** vem com a *${specsB.gpu || "N/A"}* (**${specsB.gpuTflops || "N/A"} TFLOPS**) e tela de **${displayB.refresh || "N/A"}Hz**. O maior poder gráfico e a tela mais rápida dão uma vantagem nítida para a jogabilidade competitiva.`;
      } else {
        comparisonDetails = `Olhando a GPU de notebook: o **${deviceA?.brand || "Sem Marca"} ${deviceA?.model || "Sem Modelo"}** possui a *${specsA.gpu || "N/A"}* com **${specsA.vram || "N/A"}GB de VRAM** e **${specsA.gpuTflops || "N/A"} TFLOPS**. Do outro lado, o **${deviceB?.brand || "Sem Marca"} ${deviceB?.model || "Sem Modelo"}** conta com a *${specsB.gpu || "N/A"}* (**${specsB.vram || "N/A"}GB VRAM** e **${specsB.gpuTflops || "N/A"} TFLOPS**). Essa diferença em TFLOPS é o divisor de águas para rodar jogos AAA em taxas de quadros estáveis.`;
      }
      verdict = isTie
        ? `Os dois entregam o mesmo nível de performance em jogos! Mas recomendo ir no que estiver mais em conta no dia. ⚡`
        : `Sem dúvidas, se você quer a maior taxa de quadros e o melhor desempenho para jogos, a escolha ideal é o **${winner?.brand || "Sem Marca"} ${winner?.model || "Sem Modelo"}**! Ele vai rodar tudo com o pé nas costas. 😎`;
      break;

    case "PRO":
      analysisIntro = `Olá! 💼 Mouse aqui. Se você busca produtividade no dia a dia, precisamos focar em multitarefa eficiente (CPU e RAM), bateria estável e uma tela confortável para ler e trabalhar por horas.`;
      if (category === "phone") {
        comparisonDetails = `O **${deviceA?.brand || "Sem Marca"} ${deviceA?.model || "Sem Modelo"}** vem com o processador *${specsA.cpu || "N/A"}* e **${specsA.ram || "N/A"} GB** de RAM, contra o *${specsB.cpu || "N/A"}* e **${specsB.ram || "N/A"} GB** de RAM do **${deviceB?.brand || "Sem Marca"} ${deviceB?.model || "Sem Modelo"}**. Na bateria, temos **${batteryA.capacity || "N/A"} mAh** com até **${batteryA.life || "N/A"}h** de autonomia no ${deviceA?.model || "Modelo A"}, contra **${batteryB.capacity || "N/A"} mAh** and **${batteryB.life || "N/A"}h** no ${deviceB?.model || "Modelo B"}.`;
      } else {
        comparisonDetails = `Para o seu fluxo de trabalho: o **${deviceA?.brand || "Sem Marca"} ${deviceA?.model || "Sem Modelo"}** oferece um CPU *${specsA.cpu || "N/A"}* de **${specsA.cpuCores || "N/A"} núcleos** e **${specsA.ram || "N/A"} GB** de RAM. O **${deviceB?.brand || "Sem Marca"} ${deviceB?.model || "Sem Modelo"}** responde com o *${specsB.cpu || "N/A"}* (**${specsB.cpuCores || "N/A"} núcleos**) e **${specsB.ram || "N/A"} GB** de RAM. A duração de bateria do ${deviceA?.model || "Modelo A"} é de **${batteryA.life || "N/A"}h**, enquanto o ${deviceB?.model || "Modelo B"} sustenta **${batteryB.life || "N/A"}h**.`;
      }
      verdict = isTie
        ? `Temos um empate técnico para produtividade! Qualquer um dos dois dará conta de planilhas complexas e centenas de abas. Vá de acordo com seu gosto estético!`
        : `Pensando em manter a produtividade lá em cima sem lentidões e com maior autonomia de bateria, o **${winner?.brand || "Sem Marca"} ${winner?.model || "Sem Modelo"}** é a ferramenta ideal para você! 🚀`;
      break;

    case "STUDY":
      analysisIntro = `Fala, estudante! 📚 Mouse pronto para economizar seu tempo (e dinheiro!). Aqui o foco é custo-benefício, peso reduzido para carregar na mochila, bateria confiável para aguentar as aulas e uma webcam/câmera decente.`;
      comparisonDetails = `Comparando o investimento: o **${deviceA?.brand || "Sem Marca"} ${deviceA?.model || "Sem Modelo"}** custa **R$ ${(deviceA?.price || 0).toLocaleString("pt-BR")}** e pesa **${specsA.weight || "N/A"}${category === "phone" ? "g" : "kg"}**, entregando **${batteryA.life || "N/A"}h** de bateria. Já o **${deviceB?.brand || "Sem Marca"} ${deviceB?.model || "Sem Modelo"}** custa **R$ ${(deviceB?.price || 0).toLocaleString("pt-BR")}**, pesando **${specsB.weight || "N/A"}${category === "phone" ? "g" : "kg"}** e durando **${batteryB.life || "N/A"}h**.`;
      verdict = isTie
        ? `Os dois aparelhos são incríveis e bem equilibrados para estudos. O desempate fica inteiramente por conta de qual cor te agrada mais!`
        : `Pelo equilíbrio entre preço, portabilidade e bateria que não vai te deixar na mão no meio da aula, eu recomendo fortemente o **${winner?.brand || "Sem Marca"} ${winner?.model || "Sem Modelo"}**. É a compra mais inteligente para seu ano letivo! 🎓`;
      break;

    case "CREATIVE":
      analysisIntro = `Saudações artísticas! 🎨 Mouse focado em cores e renderização. Para criadores de conteúdo, designers e fotógrafos, a fidelidade de cores da tela (Gamut e Nitidez), poder de processamento gráfico para renderizar e velocidade do armazenamento são tudo.`;
      comparisonDetails = `No quesito tela, o **${deviceA?.brand || "Sem Marca"} ${deviceA?.model || "Sem Modelo"}** vem com painel **${displayA.panel || "N/A"}** de **${displayA.nits || "N/A"} nits** de brilho e **${displayA.gamut || "N/A"}%** do espectro de cores, além de armazenamento com leitura de **${specsA.read || "N/A"} MB/s**. O **${deviceB?.brand || "Sem Marca"} ${deviceB?.model || "Sem Modelo"}** traz um painel **${displayB.panel || "N/A"}** de **${displayB.nits || "N/A"} nits**, **${displayB.gamut || "N/A"}%** gamut e leitura de **${specsB.read || "N/A"} MB/s**.`;
      verdict = isTie
        ? `Ambas as telas são de nível cinematográfico! O fluxo de trabalho criativo rodará perfeitamente em qualquer um deles.`
        : `Para ver suas criações com a fidelidade de cores máxima e renderizar seus projetos com velocidade imbatível, vá sem medo no **${winner?.brand || "Sem Marca"} ${winner?.model || "Sem Modelo"}**. É o queridinho dos criativos! 🖼️`;
      break;

    case "DEV":
      analysisIntro = `Compilando dados... 💻 Mouse focado em desenvolvimento de software! Desenvolvedores precisam de muito poder de processamento multi-core, memória RAM rápida para subir containers e compilação ágil, além de um bom teclado/tela.`;
      if (category === "phone") {
        comparisonDetails = `No mundo mobile, o **${deviceA?.brand || "Sem Marca"} ${deviceA?.model || "Sem Modelo"}** tem o processador *${specsA.cpu || "N/A"}* de **${specsA.cpuCores || "N/A"} cores** com clock de **${specsA.cpuClock || "N/A"} GHz**, enquanto o **${deviceB?.brand || "Sem Marca"} ${deviceB?.model || "Sem Modelo"}** tem o *${specsB.cpu || "N/A"}* de **${specsB.cpuCores || "N/A"} cores** a **${specsB.cpuClock || "N/A"} GHz**. O armazenamento do ${deviceA?.model || "Modelo A"} opera com velocidade de escrita de **${specsA.write || "N/A"} MB/s**, e o ${deviceB?.model || "Modelo B"} com **${specsB.write || "N/A"} MB/s**.`;
      } else {
        comparisonDetails = `Para programar: o **${deviceA?.brand || "Sem Marca"} ${deviceA?.model || "Sem Modelo"}** conta com a CPU *${specsA.cpu || "N/A"}* de **${specsA.cpuCores || "N/A"} núcleos/threads** e velocidade de escrita no SSD de **${specsA.write || "N/A"} MB/s**. O **${deviceB?.brand || "Sem Marca"} ${deviceB?.model || "Sem Modelo"}** tem a CPU *${specsB.cpu || "N/A"}* de **${specsB.cpuCores || "N/A"} núcleos** e escrita de **${specsB.write || "N/A"} MB/s**. A quantidade de portas é outro fator importante: o ${deviceA?.model || "Modelo A"} traz portas como *${portsA.join(", ") || "N/A"}*, contra *${portsB.join(", ") || "N/A"}* do ${deviceB?.model || "Modelo B"}.`;
      }
      verdict = isTie
        ? `Os dois compiladores vão voar baixo! Ambos entregam ótimos tempos de build e estabilidade. Escolha o que couber melhor no bolso.`
        : `Considerando o desempenho bruto de CPU multi-core para acelerar suas compilações e rodar seus ambientes locais de desenvolvimento sem engasgar, o **${winner?.brand || "Sem Marca"} ${winner?.model || "Sem Modelo"}** é a máquina de código que você precisa! ⚡`;
      break;

    case "MOBILE":
      analysisIntro = `Liberdade sem fios! ✈️ Mouse focado em quem vive em movimento. Para o perfil de alta mobilidade, o dispositivo precisa ser muito leve, fino, ter excelente autonomia de bateria e as tecnologias mais recentes de conexão.`;
      comparisonDetails = `Analisando a portabilidade física: o **${deviceA?.brand || "Sem Marca"} ${deviceA?.model || "Sem Modelo"}** pesa apenas **${specsA.weight || "N/A"}${category === "phone" ? "g" : "kg"}** com espessura compacta, oferecendo bateria de **${batteryA.life || "N/A"}h** e suporte a **${specsA.wifi || "N/A"}**. Por sua vez, o **${deviceB?.brand || "Sem Marca"} ${deviceB?.model || "Sem Modelo"}** pesa **${specsB.weight || "N/A"}${category === "phone" ? "g" : "kg"}**, com **${batteryB.life || "N/A"}h** de autonomia de bateria e suporte a **${specsB.wifi || "N/A"}**.`;
      verdict = isTie
        ? `Ambos são levíssimos e perfeitos para nômades digitais! A bateria dos dois aguenta facilmente o dia inteiro longe da tomada.`
        : `Para você carregar na mochila sem dores nas costas e ter a certeza de que a bateria vai durar durante todo o seu deslocamento, a escolha certa é o **${winner?.brand || "Sem Marca"} ${winner?.model || "Sem Modelo"}**! 🔋`;
      break;
  }

  return `${analysisIntro}\n\n${comparisonDetails}\n\n${verdict}`;
}

