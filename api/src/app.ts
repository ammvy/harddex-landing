import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { errorHandler } from '@/middlewares/error-handler';
import { env } from '@/config/env';

// Infra
import { createDatabase } from '@infra/database/connection';
import { initFirebase } from '@infra/firebase/admin';
import { FirebaseStorage } from '@infra/firebase/storage';

// Camadas
import { UserDAO } from '@/dao/user.dao';
import { UserRepository } from '@/repositories/user.repository';
import { UserService } from '@/services/user.service';
import { UserController } from '@/controllers/user.controller';
import { userRoutes } from '@/routes/user.routes';

export function buildApp() {
  const app = Fastify({ logger: true });

  // Plugins
  app.register(cors, { origin: true });
  app.register(multipart);
  app.setErrorHandler(errorHandler);

  // Swagger
  app.register(swagger, {
    openapi: {
      info: {
        title: 'Harddex API',
        description: 'Documentação da API com Clean Architecture',
        version: '1.0.0',
      },
      servers: [
        {
          url: `http://localhost:${env.PORT}`,
          description: 'Servidor de Desenvolvimento',
        },
      ],
    },
  });

  app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
    staticCSP: true,
  });

  // DI — composição
  const db = createDatabase(env.DATABASE_URL);
  initFirebase(env.FIREBASE_SERVICE_ACCOUNT_PATH, env.FIREBASE_STORAGE_BUCKET);
  const storage = new FirebaseStorage();

  const userDAO = new UserDAO(db);
  const userRepository = new UserRepository(userDAO);
  const userService = new UserService(userRepository, storage);
  const userController = new UserController(userService);

  // Rotas
  app.register(userRoutes(userController), { prefix: '/api/v1' });

  return app;
}
