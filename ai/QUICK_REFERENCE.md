# ⚡ QUICK REFERENCE - ADMIN HOOKS IMPLEMENTATION

## 📋 CHECKLIST RÁPIDO

### PRÉ-IMPLEMENTAÇÃO
- [ ] Confirmar que API está rodando em `http://localhost:3000/api/v1`
- [ ] Testar endpoints com Postman/Insomnia:
  - [ ] `GET /brands` retorna `{ success: true, data: [...] }`
  - [ ] `POST /brands` cria e retorna novo item
  - [ ] `PUT /brands/:id` atualiza e retorna item
  - [ ] `DELETE /brands/:id` deleta e retorna `{ success: true }`
- [ ] Verificar autenticação NextAuth funcionando
- [ ] Confirmar que axios está com `withCredentials: true`

### FASE 1 - TIPOS (30 minutos)
- [ ] Abrir `web/src/app/admin/_types/index.ts`
- [ ] Revisar estrutura com base em `api/src/dao/models`
- [ ] Garantir que tipos correspondem ao backend
- [ ] Adicionar tipos de resposta wrapper se necessário

### FASE 2 - BRANDS (2 horas)
- [ ] Criar novo `use-brands.ts` (copiar template)
- [ ] Substituir `SEED_BRANDS` por `useQuery`
- [ ] Adicionar `saveMutation` (POST/PUT)
- [ ] Adicionar `deleteMutation` (DELETE)
- [ ] Importar no componente `brands-table.tsx`
- [ ] Testar GET (lista carrega da API)
- [ ] Testar POST (criar nova marca)
- [ ] Testar PUT (editar marca)
- [ ] Testar DELETE (deletar marca)
- [ ] Verificar invalidação de cache após mutations
- [ ] Remover `SEED_BRANDS` import

### FASE 3 - RESTANTE (4 horas)
- [ ] Aplicar padrão idêntico a:
  - [ ] `use-categories.ts`
  - [ ] `use-components.ts`
  - [ ] `use-manufacturers.ts`
  - [ ] `use-products.ts`
  - [ ] `use-users.ts`

### FASE 4 - DASHBOARD (1 hora)
- [ ] Remover imports `SEED_*`
- [ ] Adicionar `useQuery` para cada stat
- [ ] Testar carregamento de dados

### FASE 5 - POLISH (2 horas)
- [ ] Adicionar loading spinners
- [ ] Adicionar error boundaries
- [ ] Testar toast notifications
- [ ] Remover arquivos `_data/` (opcional)
- [ ] Limpar console logs

### TESTE COMPLETO (1 hora)
- [ ] GET - Dados carregam da API
- [ ] POST - Novo item criado e aparece na tabela
- [ ] PUT - Edição reflete imediatamente
- [ ] DELETE - Item removido com confirmação
- [ ] ERRO AUTH - Redirecionamento para login em 401
- [ ] ERRO VALIDAÇÃO - Mensagens de erro exibidas
- [ ] OFFLINE - Sem crash

---

## 🚀 QUICK START - IMPLEMENTAR BRANDS

### 1️⃣ Abrir arquivo
```bash
# Arquivo a modificar:
web/src/app/admin/brands/_hooks/use-brands.ts
```

### 2️⃣ Copiar template (substituir tudo)
```typescript
"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Brand } from "../../_types";

export function useBrands() {
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [confirmDel, setConfirmDel] = useState<Brand | null>(null);

  // GET /brands
  const {
    data: allBrands = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['admin', 'brands'],
    queryFn: async () => {
      const { data } = await api.get("/brands");
      return data.data;
    },
  });

  // Filtro local
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return allBrands.filter((b) =>
      !query || b.name.toLowerCase().includes(query)
    );
  }, [allBrands, q]);

  // Paginação
  const PAGE_SIZE = 6;
  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginated = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);

  // POST + PUT
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

### 3️⃣ Testar no navegador
```
http://localhost:3000/admin/brands
```

Deve:
- ✅ Carregar marcas da API (não hardcoded)
- ✅ Criar nova marca
- ✅ Editar marca existente
- ✅ Deletar marca com confirmação
- ✅ Atualizar tabela automaticamente após ações

---

## 📊 MAPEAMENTO EXATO DE ENDPOINTS

### Padrão: `/api/v1/<recurso>`

| Recurso | GET | GET/:id | POST | PUT/:id | DELETE/:id |
|---------|-----|---------|------|---------|------------|
| `/brands` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/categories` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/components` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/manufacturers` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/products` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/types` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/users` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/reviews` | ✅ | ✅ | ✅ | ✅ | ✅ |

### Exemplo Completo: POST /brands

```
REQUEST:
POST /api/v1/brands
Content-Type: application/json
Cookie: next-auth.session-token=...

{
  "name": "Corsair",
  "description": "Periféricos gamer"
}

RESPONSE (Sucesso):
HTTP 200
{
  "success": true,
  "data": {
    "id": 123,
    "name": "Corsair",
    "description": "Periféricos gamer",
    "createdAt": "2024-06-22T10:00:00Z"
  }
}

RESPONSE (Erro):
HTTP 400
{
  "success": false,
  "data": null,
  "message": "Validação falhou",
  "errors": {
    "name": ["Campo obrigatório"]
  }
}
```

---

## 🔑 KEY FILES TO MODIFY

```
web/src/app/admin/
├── _types/
│   └── index.ts                ← VERIFICAR tipos
├── page.tsx                    ← SUBSTITUIR stats mockadas
├── brands/
│   ├── _hooks/
│   │   └── use-brands.ts       ← REESCREVER com useQuery
│   └── _components/
│       └── brands-table.tsx    ← JÁ PRONTO (recebe hook)
├── categories/
│   ├── _hooks/
│   │   └── use-categories.ts   ← REESCREVER com useQuery
│   └── _components/
│       └── categories-table.tsx
├── components/
│   ├── _hooks/
│   │   └── use-components.ts   ← REESCREVER com useQuery
│   └── _components/
│       └── components-table.tsx
├── manufacturers/
│   ├── _hooks/
│   │   └── use-manufacturers.ts ← REESCREVER com useQuery
│   └── _components/
│       └── manufacturers-table.tsx
├── products/
│   ├── _hooks/
│   │   └── use-products.ts     ← REESCREVER com useQuery
│   └── _components/
│       └── products-table.tsx
└── users/
    ├── _hooks/
    │   └── use-users.ts        ← REESCREVER com useQuery
    └── _components/
        └── users-table.tsx
```

---

## ⚙️ PADRÃO UNIVERSAL

Todos os 6 hooks seguem este pattern:

```typescript
// 1. Imports
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

// 2. Hook
export function use[Resource]() {
  const queryClient = useQueryClient();
  
  // 3. Local state (filtro, paginação, edit)
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [editing..., setEditing...] = useState<... | null>(null);
  
  // 4. Query GET
  const { data: all... = [], isLoading, error } = useQuery({
    queryKey: ['admin', '...'],
    queryFn: async () => {
      const { data } = await api.get("/...");
      return data.data;
    },
  });
  
  // 5. Filtro + Paginação (lógica local)
  const filtered = useMemo(() => { ... }, [all..., q]);
  const paginated = filtered.slice(...);
  
  // 6. Mutation Save (POST/PUT)
  const saveMutation = useMutation({
    mutationFn: async (item) => {
      if (item.id) {
        const { data } = await api.put(`/.../${item.id}`, item);
        return data.data;
      } else {
        const { data } = await api.post("/...", item);
        return data.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', '...'] });
    },
  });
  
  // 7. Mutation Delete
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/.../${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', '...'] });
    },
  });
  
  // 8. Return tudo
  return {
    items: paginated,
    isLoading,
    error,
    q, setQ,
    page, pages, setPage,
    editing..., setEditing...,
    save...Mutation,
    delete...Mutation,
  };
}
```

---

## 🧪 TESTE COM CURL

### Verificar API Antes
```bash
# Get all
curl http://localhost:3000/api/v1/brands

# Create
curl -X POST http://localhost:3000/api/v1/brands \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test brand"}'

# Update
curl -X PUT http://localhost:3000/api/v1/brands/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated","description":"Updated brand"}'

# Delete
curl -X DELETE http://localhost:3000/api/v1/brands/1
```

---

## 🐛 TROUBLESHOOTING

### Erro: "Unauthorized" (401)
- NextAuth não está funcionando
- Verificar cookies em DevTools
- Confirmar que API está validando token

### Erro: "Not Found" (404)
- Endpoint não existe na API
- Verificar rota em `api/src/routes/`
- Criar rota se necessário

### Dados não carregam
- Verificar se API está rodando
- Abrir DevTools → Network → checar requisição
- Verificar se retorna `{ success: true, data: [...] }`

### Mutation não atualiza tabela
- Verificar se `queryClient.invalidateQueries()` está sendo chamado
- Verificar se queryKey está correto: `['admin', 'recursos']`
- Testar refetch manual

### TypeScript errors
- Verificar tipos em `_types/index.ts`
- Ensure import paths estão corretas
- Remover imports de `SEED_*`

---

## ✨ NICE TO HAVE (Depois)

Após base funcionando:

1. **Validação em Tempo Real**
   - Implementar Zod schemas no frontend
   - Validar antes de enviar

2. **Otimistic Updates**
   - Atualizar UI antes da resposta
   - Reverter se erro

3. **Paginação no Backend**
   - Passar `?page=1&limit=10` em query
   - Reduzir payload

4. **Search no Backend**
   - Passar `?q=search` em query
   - Servidor filtra

5. **Soft Delete**
   - Marcar como deletado em vez de remover
   - Adicionar `?includeDeleted=true`

6. **Auditoria**
   - Rastrear quem criou/editou
   - Mostrar `createdAt`, `updatedBy`

---

## 📞 SUPORTE

Problemas encontrados?

1. Verificar GUIA_TECNICO_HOOKS.md para detalhes
2. Verificar PLANO_IMPLEMENTACAO_ADMIN.md para contexto
3. Consultar API routes em api/src/routes/
4. Verificar tipos em web/src/app/admin/_types/

