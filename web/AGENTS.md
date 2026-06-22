<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# HardDex — Padrões do Projeto

## 1. Estrutura de Pastas por Rota

Cada rota segue a convenção de co-localização com subpastas prefixadas por `_` (convenção Next.js para pastas privadas):

```
src/app/<rota>/
├── page.tsx              # Página principal (orquestrador fino)
├── _components/          # Componentes visuais exclusivos da rota
├── _types/               # Tipos e interfaces TypeScript (1 tipo por arquivo + index.ts)
├── _data/                # Dados estáticos, mocks e funções puras de transformação
└── _hooks/               # Custom hooks com lógica de estado da rota
```

### Exemplos existentes
- **`/compare`** → `_components/` (6), `_types/` (tipagens de device/spec), `_data/` (mocks e builders), `_hooks/` (2)
- **`/quiz`** → `_components/` (8), `_types/` (tipagens de quiz/perfil), `_data/` (dados estáticos), `_hooks/` (1)
- **`/login`** → `_components/` (4 componentes de formulário/layout)
- **`/signup`** → `_components/` (6 componentes de formulário/layout)

### Componentes globais
- **`src/components/`** → Componentes reutilizáveis cross-rota: `header.tsx`, `logo.tsx`, `theme-toggle.tsx`, `divider.tsx`, `footer.tsx`, `section-label.tsx`, `scroll-to-bounce.tsx`, `mouse/` (mascote SVG).
- **`src/app/_components/`** → Componentes exclusivos da landing page home.

---

## 2. Padrão de Página (page.tsx)

A página é um **orquestrador fino**: importa o hook de estado, renderiza componentes e faz composição. **Nunca contém lógica de negócio, estado complexo ou JSX extenso inline.**

```tsx
"use client";

import { useXxx } from "./_hooks/use-xxx";
import Header from "@/components/header";
import ComponenteA from "./_components/componente-a";

export default function XxxPage() {
  const { estado, acao } = useXxx();

  return (
    <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-200"
         style={{ fontFamily: "'Inter Tight', sans-serif" }}>
      <Header label="§ Seção / 2026" />
      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <ComponenteA ... />
      </main>
    </div>
  );
}
```

### Regras
- Wrapper `<div>` com classes: `min-h-screen w-full bg-background text-foreground transition-colors duration-200`
- Font-family inline: `'Inter Tight', sans-serif`
- Header via `@/components/header` (reutilizável) com prop `label`
- Main com `max-w-[1400px] mx-auto px-6 lg:px-12` para layout consistente

---

## 3. Design System — Cores e Tema (Tailwind)

### ⚠️ OBRIGATÓRIO: Usar tokens semânticos do Tailwind

O projeto define variáveis CSS em `src/styles/variables.css`, `dark.css` e `light.css`, mapeadas para o Tailwind via `src/styles/theme.css` usando `@theme`.

**NUNCA usar cores hardcoded** (`#3D7FFF`, `bg-[#0E0E0E]`, `text-white`, etc.). Sempre usar os tokens semânticos:

| Token Tailwind         | Uso                                |
|------------------------|------------------------------------|
| `bg-background`        | Fundo principal da página          |
| `text-foreground`      | Texto principal                    |
| `text-primary`         | Destaques, acentos (azul/magenta)  |
| `bg-primary`           | Botões primários, badges           |
| `text-primary-foreground` | Texto sobre bg-primary          |
| `bg-card` / `text-card-foreground` | Cards e containers      |
| `border-border`        | Bordas padrão                      |
| `bg-input-background`  | Fundo de inputs                    |
| `text-muted-foreground`| Texto secundário/opaco             |
| `text-destructive`     | Erros e ações destrutivas          |
| `bg-foreground text-background` | Botões invertidos (CTA)   |

### Fontes do projeto
- **Corpo**: `'Inter Tight', sans-serif` (via style inline)
- **Monospace / Labels / Botões**: `'Space Mono', monospace` (via style inline ou classe `.font-mono-brand`)
- **Logo**: `'Blanka', 'Space Mono', monospace`

### Padrões visuais de estilo
- Labels: `uppercase tracking-widest text-[10px] text-foreground/60` com `font-family: 'Space Mono'`
- Títulos h1: `uppercase text-[clamp(32px,5vw,68px)]` com `letterSpacing: "-0.04em"` e ponto final colorido `<span className="text-primary">.</span>`
- Botões CTA: `bg-foreground text-background hover:bg-primary` com `uppercase tracking-widest text-[12px]`
- Inputs: `bg-input-background border border-foreground px-4 py-3.5 focus:border-primary`
- Bordas suaves: `border-border` (com opacidade via variável CSS)
- Transições: `transition-colors duration-100`

---

## 4. Padrão de Hooks (_hooks/)

Custom hooks encapsulam **toda a lógica de estado** da feature. A página apenas desestrutura o retorno.

### Convenção de nome
- Arquivo: `use-<feature>.ts` (kebab-case)
- Export: `export function use<Feature>() { ... }`

### Estrutura típica

```ts
"use client";
import { useState, useMemo } from "react";
import { TipoX } from "../_types";
import { DADOS } from "../_data/dados";

export function useFeature() {
  const [estado, setEstado] = useState<Tipo>(valorInicial);
  
  const derivado = useMemo(() => ..., [estado]);

  const acao = () => { /* lógica */ };

  return { estado, derivado, acao };
}
```

---

## 5. Padrão de Tipos (_types/)

Tipos e interfaces TypeScript ficam em uma pasta dedicada `_types/`, separados dos dados.

### Estrutura
```
_types/
├── index.ts              # Barrel: export * from "./user"; export * from "./toast"; ...
├── user.ts               # export interface User { ... }
├── toast.ts              # export type Toast = ...
└── device.ts             # export interface Device { ... }
```

### Regras
- **1 tipo/interface por arquivo** — nome do arquivo = nome do tipo em kebab-case
- **`index.ts` como barrel** — apenas `export * from "./xxx"`, sem lógica
- Importar sempre pelo barrel: `import { User, Toast } from "./_types"`
- Sem valores, funções ou constantes — apenas definições de tipo

---

## 6. Padrão de Dados (_data/)

### Estrutura
- **`<entidade>.ts`** — Arrays/objetos de dados estáticos (mock ou constantes)
- **`spec-builders.ts`** ou similar — Funções puras de transformação de dados

### Regras
- Dados como `const` exportadas (`export const ITEMS = [...]`)
- Tipos importados de `../_types` (nunca definidos aqui)
- Sem lógica de estado — apenas definições e transformações puras

---

## 7. Padrão de Componentes (_components/)

### Regras
- Cada componente em arquivo separado, kebab-case
- Props tipadas via `interface` ou `type` no topo do arquivo
- Sem estado global — recebem tudo via props
- Usam os tokens do tema (nunca cores hardcoded)
- Framer Motion (`motion/react`) para animações
- Lucide React para ícones

### Animações padrão
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
>
```

---

## 8. Tema (Dark/Light)

- O tema é controlado por classe CSS no `<html>` (`dark` ou `light`)
- Persistido via cookie `harddex-theme`
- Toggle via componente `@/components/theme-toggle`
- Layout (`layout.tsx`) lê o cookie server-side e aplica a classe
- **NUNCA implementar tema manualmente** com useState local — usar o sistema existente

### Cores mudam automaticamente
- Light: `--primary: #3a70f4` (azul)
- Dark: `--primary: #c408a7` (magenta)
- Background, foreground, border etc. todos adaptam via variáveis

---

## 9. Header Reutilizável

Componente em `src/components/header.tsx`:
- Props: `{ label: string }`
- Inclui: link "Voltar" (→ `/`), label de seção, ThemeToggle
- Estilo: `border-b border-border`, layout `max-w-[1400px] mx-auto`

**Usar este header em todas as páginas internas**, não criar headers customizados.

---

## 10. Formulários

- Validação: `react-hook-form` + `zod` + `@hookform/resolvers`
- Schema definido no componente do formulário
- Erros exibidos com `text-destructive`
- Inputs seguem o padrão visual do projeto (ver seção 3)

---

## 11. Resumo de Anti-Patterns a Evitar

| ❌ Anti-Pattern | ✅ Padrão Correto |
|---|---|
| Cores hardcoded (`#3D7FFF`, `bg-white`) | Tokens semânticos (`text-primary`, `bg-background`) |
| Lógica de estado na page.tsx | Custom hook em `_hooks/` |
| JSX extenso monolítico na page | Componentes em `_components/` |
| Tema manual com `useState(dark)` | `@/components/theme-toggle` + classes CSS |
| Componentes sem tipagem | Props tipadas com `interface`/`type` |
| Logo/Header duplicados | Componentes de `@/components/` |
| Dados inline no componente | Arquivos em `_data/` |
| `types.ts` dentro de `_data/` | Pasta dedicada `_types/` com 1 tipo por arquivo |
| Múltiplos tipos num único arquivo | 1 tipo/interface por arquivo + barrel `index.ts` |

---

## 12. Tooling Obrigatório

### Package Manager: pnpm
O projeto utiliza **pnpm** como package manager exclusivo. Nunca usar `npm` ou `yarn`.
- Instalar dependências: `pnpm add <pkg>`
- Dev dependencies: `pnpm add -D <pkg>`
- Rodar scripts: `pnpm <script>` ou `pnpm run <script>`

### HTTP Client: Axios
Todo consumo HTTP (client e server-side) utiliza **axios** — nunca `fetch` nativo.
- A instância base já inclui `baseURL` com prefixo `/api/v1`
- Hooks e server fetchers passam apenas o path relativo (ex: `/users`, `/products`)

| ❌ Proibido | ✅ Correto |
|---|---|
| `npm install` | `pnpm add` |
| `fetch("/api/v1/users")` | `api.get("/users")` |
| `yarn add` | `pnpm add` |
| URL completa no hook | Path relativo no axios instance |

---

## 13. Consumo de Dados — Prioridade Server-Side

### Regra de ouro: Server-Side First
Sempre que possível, consumir dados no **server-side** (Server Components, `generateMetadata`, etc.) chamando a API via axios no backend do Next.js. Isso evita waterfalls no client e melhora SEO/performance.

### Quando usar client-side (React Query)
Usar React Query (`@tanstack/react-query`) apenas quando:
- O dado depende de **interação do usuário** (filtros, paginação, busca)
- Precisa de **cache client-side** com revalidação automática
- É uma **mutação** (POST, PUT, DELETE) que exige feedback imediato

### Estrutura do API Client
```
src/lib/
├── axios.ts               # Instância axios com baseURL (inclui /api/v1)
├── api-server.ts          # Wrapper server-side axios (injeta cookies/auth)
└── query-client.ts        # Configuração do QueryClient
```

### Instância Axios (src/lib/axios.ts)
```ts
import axios from "axios";

export const api = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333") + "/api/v1",
  headers: { "Content-Type": "application/json" },
});
```

### Server-Side Axios (src/lib/api-server.ts)
```ts
import axios from "axios";

const API_BASE = process.env.API_URL ?? "http://localhost:3333";

const serverApi = axios.create({
  baseURL: API_BASE + "/api/v1",
  headers: { "Content-Type": "application/json" },
});

export async function serverFetch<T>(path: string): Promise<T> {
  const { data } = await serverApi.get<{ success: boolean; data: T }>(path);
  return data.data;
}
```

### Padrão de Hooks com React Query
Hooks de dados ficam em `_hooks/` da rota, usando React Query + axios:

```ts
// src/app/admin/users/_hooks/use-users.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { User } from "../_types";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await api.get<{ success: boolean; data: User[] }>("/users");
      return data.data;
    },
  });
}
```

### Padrão de Mutations
```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateUserInput) => {
      const { data } = await api.post("/users", payload);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
}
```

---

## 14. Autenticação (NextAuth v5 / Auth.js)

### Arquitetura
- **Provider**: Credentials (email + senha contra API Fastify via axios)
- **Estratégia de sessão**: JWT (stateless, sem banco no Next.js)
- **Middleware**: `middleware.ts` na raiz do `src/` para proteção de rotas

### Arquivos de auth
```
src/
├── auth.ts                # Config NextAuth (providers, callbacks)
├── auth.config.ts         # Config edge-compatible (sem deps Node.js)
├── middleware.ts          # Proteção de rotas + role-based access
└── app/api/auth/[...nextauth]/route.ts  # Route handler
```

### Uso server-side
```ts
import { auth } from "@/auth";

export default async function AdminPage() {
  const session = await auth();
  // session.user → { id, name, email, permission, style }
}
```

### Uso client-side
```ts
"use client";
import { useSession } from "next-auth/react";

export function UserMenu() {
  const { data: session } = useSession();
}
```

### Login/Logout
```ts
import { signIn, signOut } from "next-auth/react";

await signIn("credentials", { email, password, redirectTo: "/" });
await signOut({ redirectTo: "/login" });
```

---

## 15. Anti-Patterns de Auth e Dados

| ❌ Anti-Pattern | ✅ Padrão Correto |
|---|---|
| `fetch()` nativo para API | `api.get()` / `api.post()` via axios |
| `npm install` / `yarn add` | `pnpm add` |
| URL completa no hook (`/api/v1/users`) | Path relativo (`/users`) via instância axios |
| Expor token JWT no client | Token fica no cookie httpOnly via NextAuth |
| Verificar permissão só no client | Middleware.ts bloqueia no server |
| `useEffect` + `fetch` para dados iniciais | Server Component com `serverFetch` |
| Guardar sessão em `useState` | `useSession()` do NextAuth |
| Criar header/provider de auth custom | Usar SessionProvider do NextAuth |

