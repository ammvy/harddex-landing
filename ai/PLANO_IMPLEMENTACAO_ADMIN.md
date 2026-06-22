# 📋 PLANO DE IMPLEMENTAÇÃO - ADMIN HOOKS COM API REAL

## 📊 ESTADO ATUAL

### ✅ Backend (API)
- **Rotas completamente implementadas** com todos os CRUDs
- **Arquitetura em 3 camadas**: Route → Controller → Service → DAO
- **Banco de dados integrado** com Drizzle ORM
- **Autenticação**: NextAuth v5 com suporte a cookies
- **Validação**: Implementada nos services e controllers

### ✅ Frontend (Web)
- **React Query configurado** com QueryClient (cache 60s)
- **Axios configurado** com baseURL `/api/v1`
- **NextAuth integrado** com suporte a cookies
- **Hooks estruturados** em `_hooks/` por seção

### ⚠️ Problema Atual
**Os hooks do admin estão mockados** com dados hardcoded de `SEED_*`:
- `use-brands.ts` - usa `SEED_BRANDS` (useState)
- `use-categories.ts` - usa `SEED_CATEGORIES` (useState)
- `use-components.ts` - usa `SEED_COMPONENTS` (useState)
- `use-manufacturers.ts` - usa `SEED_MANUFACTURERS` (useState)
- `use-products.ts` - usa `SEED_PRODUCTS` (useState)
- `use-users.ts` - usa `SEED_USERS` (useState)
- Dashboard - usa dados mockados para stats

---

## 🔍 ANÁLISE DE GAPS

### Rotas Existentes e Completas
Todas as 8 rotas têm suporte CRUD completo:

| Recurso | GET | GET/:id | POST | PUT/:id | DELETE/:id | Status |
|---------|-----|---------|------|---------|------------|--------|
| `/brands` | ✅ | ✅ | ✅ | ✅ | ✅ | Pronto |
| `/categories` | ✅ | ✅ | ✅ | ✅ | ✅ | Pronto |
| `/components` | ✅ | ✅ | ✅ | ✅ | ✅ | Pronto |
| `/manufacturers` | ✅ | ✅ | ✅ | ✅ | ✅ | Pronto |
| `/products` | ✅ | ✅ | ✅ | ✅ | ✅ | Pronto |
| `/types` | ✅ | ✅ | ✅ | ✅ | ✅ | Pronto |
| `/users` | ✅ | ✅ | ✅ | ✅ | ✅ | Pronto |
| `/reviews` | ✅ | ✅ | ✅ | ✅ | ✅ | Pronto |

### ✅ Sem Gaps de Rotas
Todas as rotas necessárias existem e funcionam com banco de dados real.

### 🔴 Gaps de Frontend

1. **Hooks não usam React Query**
   - Precisam migrar de `useState` para `useQuery/useMutation`
   - Não há cache inteligente

2. **Sem tratamento de erro centralizado**
   - Componentes não tratam erros da API
   - Sem loading states consistentes

3. **Sem tipos TypeScript gerados**
   - Types hardcoded em `_types/index.ts`
   - Não sincronizados com backend

4. **Sem invalidação de cache**
   - Após mutations, cache não é invalidado
   - Dados podem ficar desincronizados

---

## 📈 PLANO DE IMPLEMENTAÇÃO

### FASE 1: Tipos & Tipos Compartilhados
**Objetivo**: Sincronizar tipos entre frontend e backend

#### 1.1 Atualizar `web/src/app/admin/_types/index.ts`
- [ ] Revisar tipos existentes com base no DAO do backend
- [ ] Adicionar tipos de resposta da API (wrapper `{ success, data }`)
- [ ] Adicionar tipos de erro

**Arquivos a atualizar:**
```
web/src/app/admin/_types/index.ts
```

---

### FASE 2: Hooks de Query (GET)
**Objetivo**: Substituir `useState` por `useQuery` para leitura de dados

#### 2.1 Criar Hook Base Reutilizável
Arquivo: `web/src/app/admin/_hooks/use-admin-query.ts` (novo)

```typescript
// Pattern para todos os GET
export function useAdminQuery<T>(
  queryKey: string[],
  endpoint: string
) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await api.get(endpoint);
      return data.data as T[];
    }
  });
}
```

#### 2.2 Migrar Cada Hook para useQuery

| Hook | Endpoint | QueryKey | Status |
|------|----------|----------|--------|
| `use-brands.ts` | `/brands` | `['admin', 'brands']` | → Implementar |
| `use-categories.ts` | `/categories` | `['admin', 'categories']` | → Implementar |
| `use-components.ts` | `/components` | `['admin', 'components']` | → Implementar |
| `use-manufacturers.ts` | `/manufacturers` | `['admin', 'manufacturers']` | → Implementar |
| `use-products.ts` | `/products` | `['admin', 'products']` | → Implementar |
| `use-users.ts` | `/users` | `['admin', 'users']` | → Implementar |
| Dashboard | (múltiplos) | `['admin', 'stats']` | → Implementar |

**Padrão de Hook Migrado:**
```typescript
// ANTES (mockado)
export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>(SEED_BRANDS);
  // ... lógica local
}

// DEPOIS (com React Query)
export function useBrands() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  
  const { data: allBrands = [], isLoading, error } = useQuery({
    queryKey: ['admin', 'brands'],
    queryFn: async () => {
      const { data } = await api.get("/brands");
      return data.data; // Acessa o wrapper da API
    }
  });
  
  // Filtro local no frontend (continua igual)
  const filtered = useMemo(() => {
    // ... filtro por query
  }, [allBrands, q]);
  
  return {
    brands: paginated,
    isLoading,
    error,
    // ... resto igual
  };
}
```

---

### FASE 3: Hooks de Mutation (POST, PUT, DELETE)
**Objetivo**: Criar mutations para criar/atualizar/deletar dados

#### 3.1 Criar Hook Base Reutilizável
Arquivo: `web/src/app/admin/_hooks/use-admin-mutation.ts` (novo)

```typescript
// Pattern para mutations
export function useAdminMutation<T, R = T>(
  endpoint: string,
  method: 'post' | 'put' | 'delete'
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: T) => {
      const { data } = await api[method](endpoint, payload);
      return data.data as R;
    },
  });
}
```

#### 3.2 Adicionar Mutations a Cada Hook

**use-brands.ts**
```typescript
// Adicionar dentro do hook
const saveBrandMutation = useMutation({
  mutationFn: async (item: Brand) => {
    if (item.id) {
      const { data } = await api.put(`/brands/${item.id}`, item);
      return data.data;
    } else {
      const { data } = await api.post("/brands", item);
      return data.data;
    }
  },
  onSuccess: (newBrand) => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'brands'] });
    setEditingBrand(null);
  },
  onError: (error) => {
    // Mostrar toast de erro
    toast.error("Erro ao salvar marca");
  }
});

const deleteBrandMutation = useMutation({
  mutationFn: async (id: number) => {
    await api.delete(`/brands/${id}`);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'brands'] });
    setConfirmDel(null);
  },
  onError: (error) => {
    toast.error("Erro ao deletar marca");
  }
});
```

#### 3.3 Padrão a Implementar

| Hook | Create | Update | Delete | Status |
|------|--------|--------|--------|--------|
| Brands | `POST /brands` | `PUT /brands/:id` | `DELETE /brands/:id` | → Implementar |
| Categories | `POST /categories` | `PUT /categories/:id` | `DELETE /categories/:id` | → Implementar |
| Components | `POST /components` | `PUT /components/:id` | `DELETE /components/:id` | → Implementar |
| Manufacturers | `POST /manufacturers` | `PUT /manufacturers/:id` | `DELETE /manufacturers/:id` | → Implementar |
| Products | `POST /products` | `PUT /products/:id` | `DELETE /products/:id` | → Implementar |
| Users | `POST /users` | `PUT /users/:id` | `DELETE /users/:id` | → Implementar |

---

### FASE 4: Loading States e UI
**Objetivo**: Sincronizar UI com estados de loading/erro

#### 4.1 Componentes Precisam Suportar
- Loading spinners durante fetch
- Mensagens de erro do servidor
- Desabilitar botões durante mutation
- Toast notifications (sucesso/erro)

#### 4.2 Provider de Toast (se não existir)
Verificar se existe e adicionar a `providers.tsx` se necessário.

---

### FASE 5: Dashboard Stats Dinâmicas
**Objetivo**: Substituir stats mockadas por dados da API

**Arquivo**: `web/src/app/admin/page.tsx`

```typescript
// ANTES
const stats = [
  { label: "Usuários", value: SEED_USERS.length },
  // ...
];

// DEPOIS
function AdminDashboard() {
  const { data: users = [] } = useQuery({
    queryKey: ['admin', 'stats', 'users'],
    queryFn: async () => {
      const { data } = await api.get("/users");
      return data.data;
    }
  });
  
  const { data: products = [] } = useQuery({/* ... */});
  // ... etc
  
  const stats = [
    { 
      label: "Usuários", 
      value: users.length,
      sub: `${users.filter(u => u.permission === "ADMIN").length} admins`
    },
    // ...
  ];
}
```

---

## 🔧 IMPLEMENTAÇÃO DETALHADA POR HOOK

### use-brands.ts

**Localização**: `web/src/app/admin/brands/_hooks/use-brands.ts`

**Mudanças**:
1. Remove `SEED_BRANDS` import
2. Remove `useState` para dados
3. Adiciona `useQuery` para GET /brands
4. Adiciona `useMutation` para POST/PUT/DELETE
5. Invalidação de cache após mutations

**Novo arquivo será**:
```typescript
"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Brand } from "../../_types";
import { useToast } from "@/hooks/use-toast"; // ou toast library

export function useBrands() {
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [confirmDel, setConfirmDel] = useState<Brand | null>(null);

  // GET /brands
  const { data: allBrands = [], isLoading, error } = useQuery({
    queryKey: ['admin', 'brands'],
    queryFn: async () => {
      const { data } = await api.get("/brands");
      return data.data;
    },
  });

  // Filtro local (continua igual)
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return allBrands.filter((b) => {
      return !query || b.name.toLowerCase().includes(query);
    });
  }, [allBrands, q]);

  const PAGE_SIZE = 6;
  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginated = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);

  // POST (create) + PUT (update)
  const saveMutation = useMutation({
    mutationFn: async (item: Brand) => {
      if (item.id) {
        const { data } = await api.put(`/brands/${item.id}`, item);
        return data.data;
      } else {
        const { data } = await api.post("/brands", item);
        return data.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'brands'] });
      setEditingBrand(null);
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/brands/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'brands'] });
      setConfirmDel(null);
    },
  });

  return {
    brands: paginated,
    isLoading,
    error,
    q,
    setQ: (v: string) => {
      setQ(v);
      setPage(1);
    },
    page: curPage,
    pages,
    setPage,
    editingBrand,
    setEditingBrand,
    confirmDel,
    setConfirmDel,
    saveBrand: (item: Brand) => saveMutation.mutate(item),
    deleteBrand: (id: number) => deleteMutation.mutate(id),
    isSaving: saveMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

export type UseBrandsReturn = ReturnType<typeof useBrands>;
```

### use-categories.ts, use-components.ts, use-manufacturers.ts, use-products.ts, use-users.ts

**Padrão idêntico** ao acima, apenas mudando:
- Endpoint: `/categories`, `/components`, `/manufacturers`, `/products`, `/users`
- QueryKey: `['admin', 'categories']`, etc
- Tipo: `Category`, `Component`, `Manufacturer`, `Product`, `User`

---

## 📁 ESTRUTURA DE DIRETÓRIOS (Após Implementação)

```
web/src/app/admin/
├── _hooks/
│   ├── use-admin-query.ts          ✨ NEW - Hook genérico de query
│   ├── use-admin-mutation.ts       ✨ NEW - Hook genérico de mutation
│   ├── use-admin-user.ts           ✅ EXISTENTE
│   ├── brands/
│   │   └── use-brands.ts           📝 MODIFICAR - usar React Query
│   ├── categories/
│   │   └── use-categories.ts       📝 MODIFICAR - usar React Query
│   ├── components/
│   │   └── use-components.ts       📝 MODIFICAR - usar React Query
│   ├── manufacturers/
│   │   └── use-manufacturers.ts    📝 MODIFICAR - usar React Query
│   ├── products/
│   │   └── use-products.ts         📝 MODIFICAR - usar React Query
│   └── users/
│       └── use-users.ts            📝 MODIFICAR - usar React Query
├── _data/                          🗑️ Pode ser removido (não mais necessário)
├── _types/
│   └── index.ts                    ✅ REVISAR - confirmar tipos
└── page.tsx                        📝 MODIFICAR - dashboard com queries
```

---

## 🎯 ORDEM DE IMPLEMENTAÇÃO (Recomendada)

1. **Tipos** (FASE 1)
   - Revisar `_types/index.ts` com backend

2. **Hook Base** (FASE 2 - Preparação)
   - Criar `use-admin-query.ts`
   - Criar `use-admin-mutation.ts`

3. **Brands** (FASE 2 - Teste)
   - Implementar `use-brands.ts` com React Query
   - Testar GET, POST, PUT, DELETE

4. **Restante** (FASE 2 - Bulk)
   - Aplicar padrão a `categories`, `components`, `manufacturers`, `products`, `users`

5. **Dashboard** (FASE 5)
   - Migrar stats para queries dinâmicas

6. **Polish** (FASE 4)
   - Loading states
   - Error handling
   - Toast notifications

---

## ⚙️ CHECKLIST DE IMPLEMENTAÇÃO

### Pré-requisitos
- [ ] Revisar tipos em `web/src/app/admin/_types/index.ts`
- [ ] Confirmar que API está rodando
- [ ] Confirmar que NextAuth está funcionando

### FASE 1: Hooks Base
- [ ] Criar `use-admin-query.ts`
- [ ] Criar `use-admin-mutation.ts`

### FASE 2: Brands
- [ ] Migrar `use-brands.ts` para useQuery
- [ ] Adicionar useMutation para save/delete
- [ ] Testar com componente

### FASE 3: Restante
- [ ] Migrar `use-categories.ts`
- [ ] Migrar `use-components.ts`
- [ ] Migrar `use-manufacturers.ts`
- [ ] Migrar `use-products.ts`
- [ ] Migrar `use-users.ts`

### FASE 4: UI Updates
- [ ] Adicionar loading states aos componentes
- [ ] Adicionar error handling
- [ ] Adicionar toast notifications

### FASE 5: Dashboard
- [ ] Migrar dashboard para queries

### Teste Completo
- [ ] Testar GET (load data)
- [ ] Testar POST (create)
- [ ] Testar PUT (update)
- [ ] Testar DELETE (delete)
- [ ] Testar erro de autenticação
- [ ] Testar erro de validação
- [ ] Testar offline

---

## 📌 NOTAS IMPORTANTES

### 1. Autenticação
- NextAuth está configurado
- Cookies são enviados automaticamente pelo Axios
- Verificar se API valida permissão de ADMIN

### 2. Validação
- Backend valida dados com Zod
- Erros de validação vêm no payload da resposta
- Frontend deve exibir erros em forms

### 3. Cache
- React Query com 60s default
- Usar `invalidateQueries` após mutations
- Stale-while-revalidate é padrão

### 4. Tipos
- Considerar gerar types com `trpc` ou `openapi-codegen` (futuro)
- Por enquanto, manter tipos sincronizados manualmente

### 5. Performance
- Paginação no frontend (não alterar)
- Considerar lazy loading para produtos grandes
- Considerar virtualization se >1000 items

---

## 🚀 PRÓXIMOS PASSOS

1. **Iniciar implementação** com hooks base
2. **Testar com Brands** primeiro
3. **Escalar para restante**
4. **Validar no banco de dados** que dados estão sendo salvos
5. **Remover dados mockados** (`SEED_*`)

