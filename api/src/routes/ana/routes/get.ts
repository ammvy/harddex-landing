import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { paramIdDTO } from "../../user/dtos/requests";
import { errorResponseDTO } from "../../user/dtos/responses";
import { anaSuccessResponseDTO } from "../dtos/responses/ana-success";
import { AnaController } from "@/controllers/ana.controller";

export function getAna({ controller }: { controller: AnaController }) {
    return async (app: FastifyInstance) => {
        app.withTypeProvider<ZodTypeProvider>().get(
            "/banana",
            {
                schema: {
                    description: "Recupera um usuário chamado ana",
                    tags: ["Ana"],
                    response: {
                        200: anaSuccessResponseDTO,
                        404: errorResponseDTO,
                    },
                },
            },
            controller.getAna.bind(controller),
        );
    };
}