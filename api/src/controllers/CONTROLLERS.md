# CONTROLLERS Layer (`api/src/controllers`)

A camada de **Controllers (Controladores)** atua como o intermediário de comunicação entre o protocolo de transporte (HTTP) e a lógica de negócio do sistema (Services).

## Função

Sua principal função é gerenciar a requisição HTTP e formatar a resposta. Ela se encarrega de:
- Extrair parâmetros de URL (`req.params`), corpo da requisição (`req.body`), cabeçalhos e arquivos (`req.file`).
- Validar e sanitizar a entrada usando DTOs/Schemas (ex: parsing com Zod) para garantir que apenas dados válidos avancem.
- Chamar a camada de **Services** apropriada para executar a ação desejada.
- Retornar o status code HTTP adequado (ex: `201 Created`, `204 No Content`, `200 OK`) e o payload da resposta formatado de maneira uniforme (`{ success: true, data: ... }`).

---

## Interações

### ⬆️ Camada de Cima (Routes)
* **Como interage**: A camada de **Routes** registra os endpoints HTTP e delega a execução para os respectivos métodos do Controller.
* **Exemplo**: Nas definições de rotas do Fastify, mapeia-se a rota `POST /users` para o método `userController.create`.

### ⬇️ Camada de Baixo (Services)
* **Como interage**: O Controller injeta um **Service** e chama suas funções assíncronas para processar as regras de negócio. Ele não executa regras de negócio diretamente nem faz acesso direto ao banco de dados.
* **Exemplo**: O `UserController` chama `await this.service.create(data)` para salvar um usuário e aguarda o objeto de retorno.
