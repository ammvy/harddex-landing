import { z } from "zod";

export const profileNameSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .max(80, "Nome muito longo"),
});

export type ProfileNameFormValues = z.infer<typeof profileNameSchema>;
