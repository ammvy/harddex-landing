import z from "zod";

export const paramIdDTO = z.object({
  id: z.coerce.number().int().positive().describe("ID do usuário"),
});
