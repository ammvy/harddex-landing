import { NextRequest, NextResponse } from "next/server";
import { Device, ProfileId } from "../../compare/_data/types";
import { PROFILE_LABELS } from "../../compare/_data/profiles";
import { getSpecsSummary } from "./specs-formatter";
import { generateSmartFallbackText } from "./fallback-generator";
import { createGeminiStream } from "./gemini-stream";

export async function POST(req: NextRequest) {
  try {
    const { deviceA, deviceB, tdu } = (await req.json()) as {
      deviceA: Device;
      deviceB: Device;
      tdu: ProfileId;
    };

    if (!deviceA || !deviceB || !tdu) {
      return NextResponse.json(
        { error: "Parâmetros deviceA, deviceB e tdu são obrigatórios." },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    const encoder = new TextEncoder();

    if (apiKey) {
      const labelTdu = PROFILE_LABELS[tdu] || tdu;
      const deviceACard = getSpecsSummary(deviceA, deviceA.category);
      const deviceBCard = getSpecsSummary(deviceB, deviceB.category);

      const prompt = `
Você é o Mouse, o carismático e ultra-inteligente mascote de tecnologia do HardDex.
Sua tarefa é dar uma opinião clara, descontraída e extremamente abalizada tecnicamente sobre qual dos dois dispositivos comparados é melhor para o perfil de usuário: "${labelTdu}".

Abaixo estão os dados dos dois dispositivos:

---
DISPOSITIVO A: ${deviceA.brand} ${deviceA.model} (${deviceA.category === "phone" ? "Smartphone" : "Notebook"})
${deviceACard}

---
DISPOSITIVO B: ${deviceB.brand} ${deviceB.model} (${deviceB.category === "phone" ? "Smartphone" : "Notebook"})
${deviceBCard}
---

Instruções importantes:
1. Apresente-se de forma amigável no início como o mascote Mouse ("Oi, aqui é o Mouse! 🐱" ou similar).
2. Analise os aspectos chave mais relevantes especificamente para o perfil de usuário: "${labelTdu}". Ignore specs irrelevantes para este perfil.
3. Compare os valores chave (como velocidade de leitura, TFLOPS, refresh rate, bateria ou preço) justificando por que um se sobressai.
4. Escolha claramente um vencedor no final (ou declare empate técnico se forem extremamente parecidos para este perfil de uso).
5. Escreva de forma conversacional em português (Brasil), usando formatação Markdown (negrito para specs importantes, parágrafos limpos, talvez emojis).
6. Limite a resposta a cerca de 3 parágrafos ou bullet points objetivos para caber em um balão de conversa do chat. Não seja prolixo.
`;

      try {
        const geminiStream = await createGeminiStream(apiKey, prompt, encoder);
        return new Response(geminiStream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      } catch (geminiError) {
        console.warn(
          "Falha ao chamar a API do Gemini. Usando fallback inteligente local...",
          geminiError
        );
      }
    }

    // Fallback: Smart local comparison generated server-side and streamed to look realistic
    const fallbackText = generateSmartFallbackText(deviceA, deviceB, tdu);

    const fallbackStream = new ReadableStream({
      async start(controller) {
        const words = fallbackText.split(" ");
        let i = 0;

        async function sendNextWord() {
          if (i >= words.length) {
            controller.close();
            return;
          }

          const chunk = (i === 0 ? "" : " ") + words[i];
          controller.enqueue(encoder.encode(chunk));
          i++;

          const delay = 25 + Math.random() * 30;
          setTimeout(sendNextWord, delay);
        }

        sendNextWord();
      },
    });

    return new Response(fallbackStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err: any) {
    console.error("Erro no manipulador API Mouse Opinion:", err);
    return NextResponse.json(
      { error: err.message || "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
