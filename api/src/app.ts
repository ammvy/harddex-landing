import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { errorHandler } from "@/middlewares/error-handler";
import { env } from "@/config/env";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

import { UserDAO } from "@/dao";
import { UserService } from "@/services";
import { UserController } from "@/controllers";
import { globalRoutes } from "@/routes";

import { createDatabase } from "@infra/database/connection";
import { initFirebase } from "@infra/firebase/admin";
import { FirebaseStorage } from "@infra/firebase/storage";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(cors, { origin: true });
  app.register(multipart);
  app.setErrorHandler(errorHandler);

  app.register(swagger, {
    openapi: {
      info: {
        title: "Harddex API",
        description: "Documentação da API com Clean Architecture",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://localhost:${env.PORT}`,
          description: "Servidor de Desenvolvimento",
        },
      ],
    },
  });

  app.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    staticCSP: true,
  });

  const db = createDatabase(env.DATABASE_URL);

  initFirebase(env.FIREBASE_SERVICE_ACCOUNT_PATH, env.FIREBASE_STORAGE_BUCKET);
  const storage = new FirebaseStorage();

  const userDAO = new UserDAO(db);
  const userService = new UserService(userDAO, storage);
  const userController = new UserController(userService);

  app.register(globalRoutes(userController), { prefix: "/api/v1" });

  return app;
}
