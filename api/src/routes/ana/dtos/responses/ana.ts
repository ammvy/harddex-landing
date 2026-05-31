import z from "zod";

export const anaSchema = z.object({
    nome: z.string(),
    age: z.number()
})