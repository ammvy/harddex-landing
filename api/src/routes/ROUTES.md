# ROUTES Layer (`api/src/routes`)

A camada de **Routes (Rotas)** é o ponto de entrada público da API, responsável por mapear as requisições HTTP recebidas para os devidos controladores e gerenciar a validação estrutural da requisição.

## Função

Sua principal função é a exposição e a proteção do contrato da API. Ela:
- Define os caminhos (paths) e verbos HTTP (GET, POST, PUT, DELETE, etc.) da API.
- Configura o esquema de validação de dados da requisição (ex: usando `fastify-type-provider-zod` com schemas do Zod para validar `body`, `params` e `querystring`).
- Define as especificações e contratos de documentação (Swagger/OpenAPI), como tags, descrições e formatos de resposta esperados para cada status HTTP.
- Encaminha o fluxo da requisição para o método apropriado do **Controller**.

---

## Interações

### ⬆️ Camada de Cima (Fastify / App / Cliente HTTP)
* **Como interage**: O arquivo `app.ts` registra as rotas usando o Fastify (`app.register(globalRoutes(userController))`). O cliente externo (frontend, mobile, postman) realiza chamadas de rede que coincidem com esses caminhos configurados.

### ⬇️ Camada de Baixo (Controllers)
* **Como interage**: A definição da rota vincula um caminho HTTP a uma função do **Controller** (garantindo que o contexto seja mantido através do `.bind(controller)`).
* **Exemplo**: A rota `POST /users` é vinculada ao manipulador `controller.create.bind(controller)`.
