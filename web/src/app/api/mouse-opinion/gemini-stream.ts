export async function createGeminiStream(
  apiKey: string,
  prompt: string,
  encoder: TextEncoder
): Promise<ReadableStream> {
  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!geminiRes.ok) {
    throw new Error("Erro de conexão com a API do Gemini.");
  }

  return new ReadableStream({
    async start(controller) {
      const reader = geminiRes.body?.getReader();
      if (!reader) {
        controller.close();
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            let cleanLine = trimmed;
            if (cleanLine.startsWith(",")) {
              cleanLine = cleanLine.substring(1).trim();
            }
            if (cleanLine.startsWith("[") || cleanLine.startsWith("]")) {
              continue;
            }

            try {
              const parsed = JSON.parse(cleanLine);
              const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                controller.enqueue(encoder.encode(text));
              }
            } catch (e) {
              // Ignore partial chunk parse errors
            }
          }
        }

        // Process remaining buffer
        if (buffer.trim()) {
          let cleanLine = buffer.trim();
          if (cleanLine.startsWith(",")) {
            cleanLine = cleanLine.substring(1).trim();
          }
          try {
            const parsed = JSON.parse(cleanLine);
            const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          } catch (e) {}
        }
      } catch (err) {
        console.error("Erro ao processar stream do Gemini:", err);
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });
}
