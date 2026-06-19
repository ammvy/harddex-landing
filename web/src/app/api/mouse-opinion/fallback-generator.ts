import { Device, ProfileId } from "../../compare/_data/types";
import { PROFILE_LABELS } from "../../compare/_data/profiles";

export function generateSmartFallbackText(
  deviceA: Device,
  deviceB: Device,
  tdu: ProfileId
): string {
  const ratingA = deviceA.tdu[tdu] || deviceA.overall;
  const ratingB = deviceB.tdu[tdu] || deviceB.overall;

  const category = deviceA.category;
  const specsA = deviceA.specs as any;
  const specsB = deviceB.specs as any;

  let winner = deviceA;
  let loser = deviceB;
  let isTie = false;

  if (ratingA === ratingB) {
    if (deviceA.overall > deviceB.overall) {
      winner = deviceA;
      loser = deviceB;
    } else if (deviceB.overall > deviceA.overall) {
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
    case "gamer":
      analysisIntro = `E aí, jogador! 🎮 Mouse na área. Analisei as specs de peso aqui. Se o foco é rodar jogos pesados e ter a melhor fluidez possível, o foco principal está na GPU, taxa de atualização da tela e gerenciamento térmico (no caso de notebooks).`;
      if (category === "phone") {
        comparisonDetails = `O **${deviceA.brand} ${deviceA.model}** traz a GPU *${specsA.gpu}* com **${specsA.gpuTflops} TFLOPS** e tela de **${specsA.display.refresh}Hz**. Já o **${deviceB.brand} ${deviceB.model}** vem com a *${specsB.gpu}* (**${specsB.gpuTflops} TFLOPS**) e tela de **${specsB.display.refresh}Hz**. O maior poder gráfico e a tela mais rápida dão uma vantagem nítida para a jogabilidade competitiva.`;
      } else {
        comparisonDetails = `Olhando a GPU de notebook: o **${deviceA.brand} ${deviceA.model}** possui a *${specsA.gpu}* com **${specsA.vram}GB de VRAM** e **${specsA.gpuTflops} TFLOPS**. Do outro lado, o **${deviceB.brand} ${deviceB.model}** conta com a *${specsB.gpu}* (**${specsB.vram}GB VRAM** e **${specsB.gpuTflops} TFLOPS**). Essa diferença em TFLOPS é o divisor de águas para rodar jogos AAA em taxas de quadros estáveis.`;
      }
      verdict = isTie
        ? `Os dois entregam o mesmo nível de performance em jogos! Mas recomendo ir no que estiver mais em conta no dia. ⚡`
        : `Sem dúvidas, se você quer a maior taxa de quadros e o melhor desempenho para jogos, a escolha ideal é o **${winner.brand} ${winner.model}**! Ele vai rodar tudo com o pé nas costas. 😎`;
      break;

    case "pro":
      analysisIntro = `Olá! 💼 Mouse aqui. Se você busca produtividade no dia a dia, precisamos focar em multitarefa eficiente (CPU e RAM), bateria estável e uma tela confortável para ler e trabalhar por horas.`;
      if (category === "phone") {
        comparisonDetails = `O **${deviceA.brand} ${deviceA.model}** vem com o processador *${specsA.cpu}* e **${specsA.ram} GB** de RAM, contra o *${specsB.cpu}* e **${specsB.ram} GB** de RAM do **${deviceB.brand} ${deviceB.model}**. Na bateria, temos **${specsA.battery.capacity} mAh** com até **${specsA.battery.life}h** de autonomia no ${deviceA.model}, contra **${specsB.battery.capacity} mAh** and **${specsB.battery.life}h** no ${deviceB.model}.`;
      } else {
        comparisonDetails = `Para o seu fluxo de trabalho: o **${deviceA.brand} ${deviceA.model}** oferece um CPU *${specsA.cpu}* de **${specsA.cpuCores} núcleos** e **${specsA.ram} GB** de RAM. O **${deviceB.brand} ${deviceB.model}** responde com o *${specsB.cpu}* (**${specsB.cpuCores} núcleos**) e **${specsB.ram} GB** de RAM. A duração de bateria do ${deviceA.model} é de **${specsA.battery.life}h**, enquanto o ${deviceB.model} sustenta **${specsB.battery.life}h**.`;
      }
      verdict = isTie
        ? `Temos um empate técnico para produtividade! Qualquer um dos dois dará conta de planilhas complexas e centenas de abas. Vá de acordo com seu gosto estético!`
        : `Pensando em manter a produtividade lá em cima sem lentidões e com maior autonomia de bateria, o **${winner.brand} ${winner.model}** é a ferramenta ideal para você! 🚀`;
      break;

    case "study":
      analysisIntro = `Fala, estudante! 📚 Mouse pronto para economizar seu tempo (e dinheiro!). Aqui o foco é custo-benefício, peso reduzido para carregar na mochila, bateria confiável para aguentar as aulas e uma webcam/câmera decente.`;
      comparisonDetails = `Comparando o investimento: o **${deviceA.brand} ${deviceA.model}** custa **R$ ${deviceA.price.toLocaleString("pt-BR")}** e pesa **${specsA.weight}${category === "phone" ? "g" : "kg"}**, entregando **${specsA.battery.life}h** de bateria. Já o **${deviceB.brand} ${deviceB.model}** custa **R$ ${deviceB.price.toLocaleString("pt-BR")}**, pesando **${specsB.weight}${category === "phone" ? "g" : "kg"}** e durando **${specsB.battery.life}h**.`;
      verdict = isTie
        ? `Os dois aparelhos são incríveis e bem equilibrados para estudos. O desempate fica inteiramente por conta de qual cor te agrada mais!`
        : `Pelo equilíbrio entre preço, portabilidade e bateria que não vai te deixar na mão no meio da aula, eu recomendo fortemente o **${winner.brand} ${winner.model}**. É a compra mais inteligente para seu ano letivo! 🎓`;
      break;

    case "creative":
      analysisIntro = `Saudações artísticas! 🎨 Mouse focado em cores e renderização. Para criadores de conteúdo, designers e fotógrafos, a fidelidade de cores da tela (Gamut e Nitidez), poder de processamento gráfico para renderizar e velocidade do armazenamento são tudo.`;
      comparisonDetails = `No quesito tela, o **${deviceA.brand} ${deviceA.model}** vem com painel **${specsA.display.panel}** de **${specsA.display.nits} nits** de brilho e **${specsA.display.gamut}%** do espectro de cores, além de armazenamento com leitura de **${specsA.read} MB/s**. O **${deviceB.brand} ${deviceB.model}** traz um painel **${specsB.display.panel}** de **${specsB.display.nits} nits**, **${specsB.display.gamut}%** gamut e leitura de **${specsB.read} MB/s**.`;
      verdict = isTie
        ? `Ambas as telas são de nível cinematográfico! O fluxo de trabalho criativo rodará perfeitamente em qualquer um deles.`
        : `Para ver suas criações com a fidelidade de cores máxima e renderizar seus projetos com velocidade imbatível, vá sem medo no **${winner.brand} ${winner.model}**. É o queridinho dos criativos! 🖼️`;
      break;

    case "dev":
      analysisIntro = `Compilando dados... 💻 Mouse focado em desenvolvimento de software! Desenvolvedores precisam de muito poder de processamento multi-core, memória RAM rápida para subir containers e compilação ágil, além de um bom teclado/tela.`;
      if (category === "phone") {
        comparisonDetails = `No mundo mobile, o **${deviceA.brand} ${deviceA.model}** tem o processador *${specsA.cpu}* de **${specsA.cpuCores} cores** com clock de **${specsA.cpuClock} GHz**, enquanto o **${deviceB.brand} ${deviceB.model}** tem o *${specsB.cpu}* de **${specsB.cpuCores} cores** a **${specsB.cpuClock} GHz**. O armazenamento do ${deviceA.model} opera com velocidade de escrita de **${specsA.write} MB/s**, e o ${deviceB.model} com **${specsB.write} MB/s**.`;
      } else {
        comparisonDetails = `Para programar: o **${deviceA.brand} ${deviceA.model}** conta com a CPU *${specsA.cpu}* de **${specsA.cpuCores} núcleos/threads** e velocidade de escrita no SSD de **${specsA.write} MB/s**. O **${deviceB.brand} ${deviceB.model}** tem a CPU *${specsB.cpu}* de **${specsB.cpuCores} núcleos** e escrita de **${specsB.write} MB/s**. A quantidade de portas é outro fator importante: o ${deviceA.model} traz portas como *${specsA.ports.join(", ")}*, contra *${specsB.ports.join(", ")}* do ${deviceB.model}.`;
      }
      verdict = isTie
        ? `Os dois compiladores vão voar baixo! Ambos entregam ótimos tempos de build e estabilidade. Escolha o que couber melhor no bolso.`
        : `Considerando o desempenho bruto de CPU multi-core para acelerar suas compilações e rodar seus ambientes locais de desenvolvimento sem engasgar, o **${winner.brand} ${winner.model}** é a máquina de código que você precisa! ⚡`;
      break;

    case "mobile":
      analysisIntro = `Liberdade sem fios! ✈️ Mouse focado em quem vive em movimento. Para o perfil de alta mobilidade, o dispositivo precisa ser muito leve, fino, ter excelente autonomia de bateria e as tecnologias mais recentes de conexão.`;
      comparisonDetails = `Analisando a portabilidade física: o **${deviceA.brand} ${deviceA.model}** pesa apenas **${specsA.weight}${category === "phone" ? "g" : "kg"}** com espessura compacta, oferecendo bateria de **${specsA.battery.life}h** e suporte a **${specsA.wifi}**. Por sua vez, o **${deviceB.brand} ${deviceB.model}** pesa **${specsB.weight}${category === "phone" ? "g" : "kg"}**, com **${specsB.battery.life}h** de autonomia de bateria e suporte a **${specsB.wifi}**.`;
      verdict = isTie
        ? `Ambos são levíssimos e perfeitos para nômades digitais! A bateria dos dois aguenta facilmente o dia inteiro longe da tomada.`
        : `Para você carregar na mochila sem dores nas costas e ter a certeza de que a bateria vai durar durante todo o seu deslocamento, a escolha certa é o **${winner.brand} ${winner.model}**! 🔋`;
      break;
  }

  return `${analysisIntro}\n\n${comparisonDetails}\n\n${verdict}`;
}
