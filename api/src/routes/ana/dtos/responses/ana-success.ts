import z from "zod";
import { anaSchema } from "./ana";

export const anaSuccessResponseDTO = z.object({
  success: z.boolean(),
  data: anaSchema,
});

// {
//   success: true,
//   data: {
//     name: "Ana Tayná",
//     age: 29,
//   }
// }