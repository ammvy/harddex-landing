import type { FastifyInstance } from "fastify";
import { getAna } from "./routes/get";
import { AnaController } from "@/controllers/ana.controller";

export function anaRoutes({ controller }: { controller: AnaController }) {
  return async (app: FastifyInstance) => {
    app.register(getAna({ controller }));
  };
}