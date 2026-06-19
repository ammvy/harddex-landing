# 🗄️ DAO Layer (`api/src/dao`)

A camada **DAO (Data Access Object)** é responsável pelo acesso direto ao banco de dados e pela execução das operações de persistência pura (CRUD), funcionando como a barreira que protege o resto da aplicação dos detalhes físicos do banco.

---

## 👥 Responsáveis no Projeto
*   **Implementação e Manutenção**: **Mariana** (DAOs/Services)
*   **Modelagem de Dados e Schemas**: **Mirela** (Líder Interno)

---

## 🎯 Função e Responsabilidades

Sua principal função é isolar completamente a lógica de queries SQL / Drizzle ORM das regras de negócio. Ela executa:
1.  **Isolamento Tecnológico**: Recebe a instância ativa do banco de dados (Drizzle Database Client) e executa as queries. Se amanhã trocarmos o Drizzle por outro ORM (ou SQL puro), apenas essa camada é alterada.
2.  **Operações CRUD**: Executa criação, leitura, atualização e deleção no banco de dados.
3.  **Contrato via Interfaces**: Implementa interfaces (como `IUserDAO`) para permitir injeção de dependência e desacoplamento na camada de Services, facilitando a criação de dublês de testes (mocks).

---

## 📐 Estrutura de Código Típica

Os DAOs são implementados como classes TypeScript que implementam uma interface comum de acesso a dados:

```ts
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { IUserDAO } from "@/interfaces/user-dao.interface";
import { users } from "@infra/database/models/user.schema";
import { eq } from "drizzle-orm";

export class UserDAO implements IUserDAO {
  constructor(private readonly db: NodePgDatabase<any>) {}

  async create(data: any) {
    const [inserted] = await this.db.insert(users).values(data).returning();
    return inserted;
  }

  async findByEmail(email: string) {
    const [user] = await this.db.select().from(users).where(eq(users.email, email));
    return user || null;
  }

  async findById(id: string) {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user || null;
  }
}
```

---

## 🔄 Interações e Acoplamento

### ⬆️ Camada Superior (Services)
*   **Como interage**: A camada de **Services** (mantida por **Mariana**) recebe uma instância do DAO via injeção de dependência (usando a interface correspondente). O Service invoca os métodos do DAO para salvar ou recuperar informações necessárias para as validações.
*   **Exemplo**: O `UserService` injeta `IUserDAO` e chama `this.userDAO.findById(id)` para carregar os dados de um usuário e realizar validações de negócio.

### ⬇️ Camada Inferior (Models / Database Schemas)
*   **Como interage**: O DAO consome diretamente a camada de **Models** (estruturada por **Mirela** em `infra/database/models`) para saber quais tabelas, colunas e tipos utilizar ao construir queries.
*   **Exemplo**: O `UserDAO` executa consultas Drizzle como `this.db.select().from(users)` (onde `users` vem de `@infra/database/models/user.schema.ts`).
