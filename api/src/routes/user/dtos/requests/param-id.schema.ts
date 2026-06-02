import z from "zod";

export const paramIdDTO = z.object({
  id: z.string().describe("ID do usuário"),
});
