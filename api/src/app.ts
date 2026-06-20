import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { errorHandler } from "@/middlewares/error-handler";
import { env } from "@/config/env";
import {
  serializerCompiler,
  validatorCompiler,
  createJsonSchemaTransform,
} from "fastify-type-provider-zod";

import { UserDAO, ProductDAO, BrandDAO, CategoryDAO, ComponentDAO, ManufacturerDAO, ReviewDAO, TypeDAO } from "@/dao";
import { UserService, ProductService, BrandService, CategoryService, ComponentService, ManufacturerService, ReviewService, TypeService } from "@/services";
import { UserController, ProductController, BrandController, CategoryController, ComponentController, ManufacturerController, ReviewController, TypeController } from "@/controllers";
import { globalRoutes } from "@/routes";

import { createDatabase } from "@infra/database/connection";
import { initFirebase } from "@infra/firebase/admin";
import { FirebaseStorage } from "@infra/firebase/storage";
import { AnaController } from "./controllers/ana.controller";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(cors, { origin: true, methods: ["GET", "POST", "PUT", "PATCH", "DELETE"] });
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
    transform: createJsonSchemaTransform({
      skipList: [
        "/docs",
        "/docs/",
        "/docs/json",
        "/docs/yaml",
        "/docs/initOAuth",
        "/docs/uiConfig",
        "/docs/*",
        "/docs/static/*",
      ],
    }),
  });

  app.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    staticCSP: false,
  });

  const db = createDatabase(env.DATABASE_URL);

  initFirebase(env.FIREBASE_SERVICE_ACCOUNT_PATH, env.FIREBASE_STORAGE_BUCKET);
  const storage = new FirebaseStorage();

  const userDAO = new UserDAO(db);
  const userService = new UserService(userDAO);
  const userController = new UserController(userService);
  const anaController = new AnaController(userService);

  const productDAO = new ProductDAO(db);
  const productService = new ProductService(productDAO);
  const productController = new ProductController(productService);

  const brandDAO = new BrandDAO(db);
  const brandService = new BrandService(brandDAO);
  const brandController = new BrandController(brandService);

  const categoryDAO = new CategoryDAO(db);
  const categoryService = new CategoryService(categoryDAO);
  const categoryController = new CategoryController(categoryService);

  const componentDAO = new ComponentDAO(db);
  const componentService = new ComponentService(componentDAO);
  const componentController = new ComponentController(componentService);

  const manufacturerDAO = new ManufacturerDAO(db);
  const manufacturerService = new ManufacturerService(manufacturerDAO);
  const manufacturerController = new ManufacturerController(manufacturerService);

  const reviewDAO = new ReviewDAO(db);
  const reviewService = new ReviewService(reviewDAO);
  const reviewController = new ReviewController(reviewService);

  const typeDAO = new TypeDAO(db);
  const typeService = new TypeService(typeDAO);
  const typeController = new TypeController(typeService);

  app.register(
    globalRoutes({
      userController,
      anaController,
      productController,
      brandController,
      categoryController,
      componentController,
      manufacturerController,
      reviewController,
      typeController,
    }),
    { prefix: "/api/v1" }
  );

  return app;
}
