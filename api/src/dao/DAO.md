# DAO Layer (`api/src/dao`)

A camada **DAO (Data Access Object)** é responsável pelo acesso direto ao banco de dados e pela execução das operações de persistência (CRUD).

## Função

Sua principal função é isolar completamente a lógica de queries SQL / Drizzle ORM das regras de negócio. Ela:
- Recebe a instância ativa do banco de dados (Drizzle Database Client).
- Executa operações de criação, leitura, atualização e deleção (CRUD).
- Utiliza interfaces (`IUserDAO`) para permitir inversão de dependência e facilitar a criação de mocks para testes.

---

## Interações

### ⬆️ Camada de Cima (Services)
* **Como interage**: A camada de **Services** recebe uma instância do DAO via injeção de dependência (usando a interface correspondente). O Service chama os métodos do DAO para salvar ou recuperar informações.
* **Exemplo**: O `UserService` injeta `IUserDAO` e chama `this.dao.findById(id)` para carregar os dados de um usuário e realizar validações de negócio.

### ⬇️ Camada de Baixo (Models)
* **Como interage**: O DAO consome diretamente a camada de **Models** para saber quais tabelas e tipos utilizar ao construir queries.
* **Exemplo**: O `UserDAO` executa consultas Drizzle como `this.db.select().from(users)` (onde `users` vem de `models/user.schema.ts`).
