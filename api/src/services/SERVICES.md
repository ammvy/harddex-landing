# 🧠 SERVICES Layer (`api/src/services`)

A camada de **Services (Serviços)** é o núcleo lógico do sistema, onde residem todas as **regras de negócio**, fluxos de controle transacionais, validações de domínio e integrações externas.

---

## 👥 Responsáveis no Projeto

- **Implementação e Manutenção**: **Mariana** (DAOs/Services)
- **Modelagem e Banco de Dados**: **Mirela** (Líder Interno)

---

## 🎯 Função e Responsabilidades

Sua principal função é garantir a integridade dos dados e ditar o comportamento operacional da aplicação. Ela executa:

1.  **Regras de Negócio e Validações de Domínio**: Verifica a consistência dos dados que vão além de tipos básicos (ex: checar se o email que está tentando se cadastrar já existe no banco de dados, verificar se um usuário possui permissão para realizar determinada ação).
2.  **Integração com Adaptadores de Infraestrutura**: Consome serviços de infraestrutura externa, como o `FirebaseStorage` para salvar ou remover arquivos de mídia.
3.  **Lançamento de Erros e Exceções**: Quando uma regra de negócio é violada, o serviço lança exceções especializadas (ex: `ConflictError`, `ValidationError` ou `NotFoundError`), que são interceptadas pelo middleware global de erros do Fastify para retornar o status HTTP correto.
4.  **Desacoplamento por Inversão de Dependência**: O serviço não sabe qual banco de dados físico está sendo usado; ele apenas consome uma interface abstrata (`IUserDAO`), permitindo flexibilidade técnica e facilitando a escrita de testes unitários.

---

## 📐 Estrutura de Código Típica

Os serviços expõem classes que recebem dependências via injeção de construtor (DAOs e adaptadores de infraestrutura):

```ts
import type { IUserDAO } from "@/interfaces/user-dao.interface";
import type { FirebaseStorage } from "@/infra/firebase/storage";
import { ConflictError } from "@/errors/conflict-error";

export class UserService {
  constructor(
    private readonly userDAO: IUserDAO, // Dependência de Persistência via Interface
    private readonly storage: FirebaseStorage, // Dependência de Armazenamento de Arquivos
  ) {}

  async create(data: { name: string; email: string }) {
    // 1. Regra de Negócio: Verificar se o email já está cadastrado
    const existingUser = await this.userDAO.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError(
        "Este e-mail já está sendo utilizado por outro usuário.",
      );
    }

    // 2. Persistência
    return this.userDAO.create(data);
  }
}
```

---

## 🔄 Interações e Acoplamento

### ⬆️ Camada Superior (Controllers)

- **Como interage**: Os controladores (mantidos por **Ana**) invocam os métodos do Service, tratando apenas os dados HTTP e capturando possíveis exceções para respondê-las ao cliente.

### ⬇️ Camada Inferior (DAO & Infra)

- **Como interage**: O Service consome diretamente a interface do **DAO** (mantido por **Mariana** com modelagem da **Mirela**) para manipulação de banco de dados e os adaptadores de **Infraestrutura** (como `FirebaseStorage` mantido por **Mirela**) para salvar mídias em nuvem.
- **Exemplo**: O `UserService` invoca `this.userDAO.findById(id)` para consultar o registro no banco de dados PostgreSQL.
