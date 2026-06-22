import z from "zod";
import { userResponseDTO } from "./user.schema";

export const authenticateResponseDTO = z.object({
  success: z.boolean(),
  data: z.object({
    token: z.string(),
    user: userResponseDTO,
  }),
});

export type AuthenticateResponse = z.infer<typeof authenticateResponseDTO>;
