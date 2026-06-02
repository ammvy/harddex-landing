import type { FastifyRequest, FastifyReply } from "fastify";
import type { HttpRequest, ControllerMethod } from "@/interfaces/http";

export const adaptRoute = (controllerMethod: ControllerMethod) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    let fileData: HttpRequest["file"] = undefined;

    if (request.isMultipart() && typeof request.file === "function") {
      const data = await request.file();
      if (data) {
        fileData = {
          buffer: await data.toBuffer(),
          mimetype: data.mimetype,
          filename: data.filename,
        };
      }
    }

    // Conversão: Framework → Abstração
    const httpRequest: HttpRequest = {
      body: request.body,
      params: request.params,
      query: request.query,
      headers: request.headers,
      file: fileData,
    };

    // Execução do controller puro
    const httpResponse = await controllerMethod(httpRequest);

    // Conversão: Abstração → Framework
    if (httpResponse.body !== undefined) {
      return reply.status(httpResponse.statusCode).send(httpResponse.body);
    }

    return reply.status(httpResponse.statusCode).send();
  };
};
