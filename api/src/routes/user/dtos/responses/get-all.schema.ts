import z from "zod";
import { userResponseDTO } from "./user.schema";

export const getAllUsersResponseDTO = z.object({
  success: z.boolean(),
  data: z.array(userResponseDTO),
});
