# SERVICES Layer (`api/src/services`)

A camada de **Services (Serviços)** é o coração da aplicação, onde residem todas as **regras de negócio**, fluxos de controle e validações operacionais.

## Função

Sua principal função é ditar como a aplicação se comporta perante as regras estabelecidas. Ela é responsável por:
- Validar se um usuário pode ser criado (ex: se o email já existe).
- Garantir a consistência e transações entre diferentes fluxos (ex: deletar a foto de avatar de um storage externo ao deletar um usuário).
- Integrar-se com serviços terceiros e serviços de infraestrutura (como `FirebaseStorage`).
- Lançar exceções específicas de negócio (como `ValidationError` ou `NotFoundError`) que serão capturadas pelo manipulador de erros global.

---

## Interações

### ⬆️ Camada de Cima (Controllers)
* **Como interage**: O **Controller** injeta e invoca métodos expostos na interface do **Service** para processar a ação solicitada pela requisição HTTP.
* **Exemplo**: O `UserController` chama `await this.userService.create(data)` para efetuar o cadastro de um usuário após as validações básicas de HTTP.

### ⬇️ Camada de Baixo (DAO / Infraestrutura)
* **Como interage**: O Service utiliza a camada de **DAO** para interagir com o banco de dados e outros adaptadores de infraestrutura (como `FirebaseStorage`) para persistir arquivos, enviar emails, etc.
* **Exemplo**: O `UserService` chama `this.dao.create(data)` para persistir o usuário no banco de dados e `this.storage.upload(...)` para salvar o avatar do usuário.
