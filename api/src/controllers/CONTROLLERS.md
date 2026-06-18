# 🎛️ CONTROLLERS Layer (`api/src/controllers`)

A camada de **Controllers (Controladores)** atua como a ponte de comunicação e tradução entre o protocolo de transporte (HTTP/Fastify) e a lógica de negócio pura da aplicação (Services).

---

## 👥 Responsáveis no Projeto

- **Implementação e Manutenção**: **Ana** (Controllers/Routes)
- **Tech Lead / Integração**: **Victor** (Amarrar front e back)

---

## 🎯 Função e Responsabilidades

Sua principal função é receber dados de transporte, delegar o processamento para as regras de negócio e formatar a resposta para o cliente. Ela executa:

1.  **Extração de Parâmetros**: Lê dados de URL (`req.params`), corpo da requisição (`req.body`), cabeçalhos de autenticação e uploads de arquivos (`req.file` ou `req.parts`).
2.  **Validação e Adaptação**: Garante que os formatos de transporte coincidam com o que a camada de serviços espera, efetuando adaptações básicas se necessário.
3.  **Invocação de Serviços**: Invoca os métodos adequados do **Service** injetado para que a regra de negócio seja executada.
4.  **Resposta Uniforme**: Define o código de status HTTP adequado (ex: `201 Created` para post de sucesso, `204 No Content` para exclusão) e envia o payload de resposta em um formato consistente.

---

## 📐 Estrutura de Código Típica

Os controladores são classes TypeScript que injetam os serviços correspondentes no construtor (Injeção de Dependência):

```ts
import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserService } from "@/services/user.service";

export class UserController {
  constructor(private readonly userService: UserService) {}

  async create(req: FastifyRequest, rep: FastifyReply) {
    const { name, email } = req.body as any; // Dados já validados pelo schema do Zod na rota

    // Delegação para a camada de serviços
    const user = await this.userService.create({ name, email });

    // Envio da resposta HTTP formatada com status code correto
    return rep.status(201).send({
      success: true,
      data: user,
    });
  }
}
```

---

## 🔄 Interações e Acoplamento

### ⬆️ Camada Superior (Routes)

- **Como interage**: A camada de **Routes** (mantida por **Ana**) mapeia URLs e métodos HTTP diretamente para os métodos públicos de uma instância do controlador.

### ⬇️ Camada Inferior (Services)

- **Como interage**: O Controller injeta uma interface ou instância do **Service** (mantida por **Mariana**) e chama suas funções assíncronas para processar as regras de negócio. O controlador _nunca_ deve fazer chamadas diretas ao banco de dados ou executar validações que não sejam estritamente ligadas a transporte HTTP.
- **Exemplo**: O `UserController` chama `await this.userService.create(data)` e aguarda o objeto de retorno.
