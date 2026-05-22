import z from "zod";
import { userResponseDTO } from "./user.schema";

export const userSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: userResponseDTO,
});