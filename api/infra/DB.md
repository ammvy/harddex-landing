# 🏗️ Infraestrutura & Banco de Dados (`api/infra`)

Camada responsável por toda a infraestrutura física e de persistência externa da API: containerização (Docker), banco de dados relacional, ORM (Drizzle), conexão física e serviços de armazenamento em nuvem (Firebase).

---

## 👥 Responsáveis no Projeto
*   **Modelagem, Drizzle & Docker**: **Mirela** (Estruturação do Banco de Dados e Líder Interno)
*   **Integração e Orquestração Geral**: **Victor** (Tech Lead)

---

## 📁 Estrutura de Diretórios da Infraestrutura

```
infra/
├── docker-compose.yml        # PostgreSQL 16 + Firebase Emulator (Containers local)
├── package.json
├── database/
│   ├── connection.ts          # Factory de conexão Drizzle + pg.Pool
│   └── models/
│       ├── index.ts           # Barrel export dos schemas do banco
│       └── user.schema.ts     # Schema e definição de tabela do Drizzle
└── firebase/
    ├── admin.ts               # Inicialização do Firebase Admin SDK
    └── storage.ts             # Adaptador de integração para upload de arquivos
```

---

## 🗄️ Banco de Dados / ORM (Drizzle)

### Conexão (`database/connection.ts`)

Cria e exporta a instância do Drizzle ORM conectada ao PostgreSQL via `pg.Pool`, estabelecendo o connection pooling ideal para a API Fastify.

```ts
createDatabase(connectionString: string): NodePgDatabase<any>
```

### Models (`database/models/`)

Cada arquivo `*.schema.ts` define **uma tabela** do PostgreSQL usando a API do Drizzle, servindo de base tanto para a criação física das tabelas quanto para a tipagem dos dados na API.

#### `user.schema.ts` — Tabela `users`

| Coluna       | Tipo SQL                    | Restrições                    |
|--------------|-----------------------------|-------------------------------|
| `id`         | `UUID`                      | PK, `defaultRandom()`        |
| `name`       | `VARCHAR(255)`              | `NOT NULL`                    |
| `email`      | `VARCHAR(255)`              | `NOT NULL`, `UNIQUE`          |
| `avatarUrl`  | `VARCHAR(1024)`             | nullable                      |
| `createdAt`  | `TIMESTAMP WITH TIME ZONE`  | `NOT NULL`, `defaultNow()`    |
| `updatedAt`  | `TIMESTAMP WITH TIME ZONE`  | `NOT NULL`, `defaultNow()`    |

**Tipos exportados:**

| Tipo          | Uso                                        |
|---------------|--------------------------------------------|
| `UserSelect`  | Retorno de queries (`select`)              |
| `UserInsert`  | Dados para inserção (`insert`)             |
| `UserUpdate`  | Atualização parcial (`Partial<UserInsert>`) |

---

## ⚡ Comandos Drizzle & Setup (Desenvolvimento)

### Configuração (`api/drizzle.config.ts`)

O arquivo de configuração do Drizzle Kit fica na raiz de `api/` e aponta para os schemas e o diretório de migrações:

```ts
export default defineConfig({
  schema: './infra/database/models/index.ts',  // onde estão os schemas
  out: './infra/database/migrations',          // onde as migrações são salvas
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,            // string de conexão via .env
  },
});
```

### Scripts disponíveis (`api/package.json`)

Todos os comandos abaixo devem ser executados a partir da pasta `api/`:

```bash
cd api
```

| Comando | Script | O que faz |
|---------|--------|-----------|
| `pnpm db:generate` | `drizzle-kit generate` | Lê os schemas e gera arquivos SQL de migração em `infra/database/migrations/`. |
| `pnpm db:migrate` | `drizzle-kit migrate` | Aplica as migrações SQL pendentes no banco de dados. |
| `pnpm db:push` | `drizzle-kit push` | Sincroniza o schema direto no banco **sem gerar arquivos de migração** (útil em dev local). |
| `pnpm db:studio` | `drizzle-kit studio` | Abre o Drizzle Studio (GUI web) para visualizar e editar dados no navegador. |
| `pnpm docker:up` | `docker compose -f ./infra/docker-compose.yml up -d` | Sobe os containers (PostgreSQL + Firebase Emulator). |
| `pnpm docker:down` | `docker compose -f ./infra/docker-compose.yml down` | Derruba os containers. |

### Fluxo típico de setup (primeira vez)

```bash
# 1. Suba o banco de dados e emulador
pnpm docker:up

# 2. Sincronize o schema no banco (dev rápido)
pnpm db:push

# 3. (Opcional) Abra o Studio para verificar
pnpm db:studio
```

---

## 🐳 Docker (`docker-compose.yml`)

| Serviço      | Imagem                      | Porta(s) exposta(s)                   |
|--------------|-----------------------------|---------------------------------------|
| `postgres`   | `postgres:16-alpine`        | `5433 → 5432`                         |
| `firebase`   | `spine3/firebase-emulator`  | `4000`, `9099`, `8080`, `9199`, etc.  |

---

## 🔥 Firebase (`firebase/`)

Utilizado para a gestão e armazenamento de arquivos de mídia (como avatares dos perfis de usuário).
*   **`admin.ts`** — Inicializa o Firebase Admin SDK utilizando a service account do emulador ou de produção.
*   **`storage.ts`** — Adaptador com métodos utilitários para fazer o upload e remoção de mídias direto no bucket.
