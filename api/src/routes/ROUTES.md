# 🛣️ ROUTES Layer (`api/src/routes`)

A camada de **Routes (Rotas)** é o ponto de entrada público da API, responsável por mapear as requisições HTTP recebidas para os devidos controladores e gerenciar a validação estrutural da requisição.

---

## 👥 Responsáveis no Projeto
*   **Implementação e Manutenção**: **Ana** (Controllers/Routes)
*   **Tech Lead / Integração**: **Victor** (Amarrar front e back)

---

## 🎯 Função e Responsabilidades

Sua principal função é a exposição e a proteção do contrato da API. Ela executa as seguintes tarefas:
1.  **Mapeamento de Rotas HTTP**: Define os caminhos (paths) e verbos HTTP (GET, POST, PUT, DELETE, etc.) da API.
2.  **Validação Estrutural (DTOs / Schemas)**: Configura o esquema de validação de dados da requisição (ex: usando `fastify-type-provider-zod` com schemas do Zod para validar `body`, `params` e `querystring`). Isso impede que payloads mal formatados sobrecarreguem as camadas inferiores.
3.  **Contrato e Documentação (Swagger/OpenAPI)**: Define as especificações e metadados de documentação (como tags, descrições, sumários e formatos de resposta esperados para cada status HTTP), alimentando o Swagger UI em `/docs`.
4.  **Delegação**: Encaminha o fluxo da requisição com contexto amarrado (`.bind(controller)`) para o método apropriado do **Controller**.

---

## 📐 Estrutura de Código Típica

As rotas são modularizadas por domínio. No subdiretório `api/src/routes/user/routes/`, cada arquivo expõe uma rota específica (ex: `create-user.route.ts`), estruturada assim:

```ts
import type { FastifyInstance } from "fastify";
import type { UserController } from "@/controllers/user.controller";
import { createUserBodySchema, createUserResponseSchema } from "../dtos";

export function createUserRoute({ controller }: { controller: UserController }) {
  return async (app: FastifyInstance) => {
    app.post(
      "/",
      {
        schema: {
          description: "Cadastra um novo usuário no sistema",
          tags: ["Users"],
          body: createUserBodySchema, // Validação Zod do Payload de entrada
          response: {
            201: createUserResponseSchema, // Validação Zod da Resposta de sucesso
          },
        },
      },
      controller.create.bind(controller) // Delegação para o Controller
    );
  };
}
```

---

## 🔄 Interações e Acoplamento

### ⬆️ Camada Superior (Fastify App / Cliente HTTP)
*   **Como interage**: O arquivo [app.ts](../app.ts) registra as rotas usando o Fastify (`app.register(globalRoutes(userController))`). O cliente externo (Next.js frontend gerenciado por **Victor** e **Yago**) realiza chamadas de rede HTTP que batem nesses caminhos configurados.

### ⬇️ Camada Inferior (Controllers)
*   **Como interage**: A definição da rota vincula um caminho HTTP a uma função do **Controller** (garantindo que o contexto seja mantido através do `.bind(controller)`).
*   **Exemplo**: A rota `POST /users` é vinculada ao manipulador `controller.create.bind(controller)`.
