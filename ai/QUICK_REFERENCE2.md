# 🎯 QUICK REFERENCE - USAR OS HOOKS MIGRADOS

Copie e cole esses exemplos para usar os hooks no seu código.

---

## 1️⃣ Usar Hook em Component

### Exemplo: BrandsTable.tsx

```typescript
'use client';

import { useBrands } from './_hooks/use-brands';

export function BrandsTable() {
  const {
    brands,              // Dados paginados da API
    isLoading,           // Loading inicial
    isFetching,          // Refetch background
    isSaving,            // Salvando
    isDeleting,          // Deletando
    error,               // Erro da query
    saveError,           // Erro do save
    q,                   // Query de search
    setQ,                // Mudar search
    page,                // Página atual
    pages,               // Total de páginas
    setPage,             // Mudar página
    editing,             // Item sendo editado
    setEditing,          // Mudar edit
    saveBrand,           // Salvar (POST/PUT)
    deleteBrand,         // Deletar (DELETE)
    confirmDel,          // Item pendente delete
    setConfirmDel,       // Mudar confirmação
  } = useBrands();

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      {/* Search Input */}
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar marca..."
      />

      {/* Table */}
      <table>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id}>
              <td>{brand.name}</td>
              <td>
                <button onClick={() => setEditing(brand)}>Editar</button>
                <button onClick={() => setConfirmDel(brand)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div>
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i + 1}
            disabled={page === i + 1}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Edit Form */}
      {editing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveBrand(editing);
          }}
        >
          <input
            value={editing.name}
            onChange={(e) =>
              setEditing({ ...editing, name: e.target.value })
            }
            disabled={isSaving}
          />
          <button type="submit" disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar'}
          </button>
          <button type="button" onClick={() => setEditing(null)}>
            Cancelar
          </button>
        </form>
      )}

      {/* Delete Confirmation */}
      {confirmDel && (
        <dialog>
          <p>Tem certeza que quer deletar "{confirmDel.name}"?</p>
          <button
            onClick={() => deleteBrand(confirmDel.id!)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deletando...' : 'Sim, deletar'}
          </button>
          <button onClick={() => setConfirmDel(null)}>Cancelar</button>
        </dialog>
      )}
    </div>
  );
}
```

---

## 2️⃣ Hook Genérico - Usar useAdminQuery

Se você quer criar um hook novo para um recurso sem CRUD:

```typescript
// _hooks/use-my-resource.ts
'use client';

import { useAdminQuery } from '../_hooks/use-admin-query';

export function useMyResource() {
  const { data, isLoading, error, isFetching } = useAdminQuery(
    ['admin', 'myresource'],  // Cache key (único)
    '/myresource'             // Endpoint
  );

  return {
    items: data,
    isLoading,
    isFetching,
    error,
  };
}
```

---

## 3️⃣ Hook Genérico - Usar useAdminMutation

Se você quer criar mutations para um novo recurso:

```typescript
// Dentro de um hook
const { mutate, isPending, error } = useAdminMutation(
  '/brands',              // Endpoint base
  ['admin', 'brands']     // Cache key para invalidar
);

// Usar
mutate({
  method: 'POST',  // ou 'PUT', 'DELETE'
  id: 1,           // Obrigatório para PUT/DELETE
  data: { name: 'Corsair' },  // Obrigatório para POST/PUT
});
```

---

## 4️⃣ Padrão Completo - Novo Hook

Se quer criar um novo hook do zero (ex: reviews):

```typescript
// _hooks/use-reviews.ts
'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Review } from '../../_types';

export function useReviews() {
  const queryClient = useQueryClient();
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Review | null>(null);
  const [confirmDel, setConfirmDel] = useState<Review | null>(null);

  // ✅ Query
  const { data: allReviews = [], isLoading, error, isFetching } = useQuery({
    queryKey: ['admin', 'reviews'],
    queryFn: async () => {
      const { data } = await api.get('/reviews');
      return data.data ?? [];
    },
    staleTime: 1000 * 60,
    retry: 1,
  });

  // ✅ Filtro local
  const filtered = useMemo(() => {
    return allReviews.filter((r) =>
      r.productName.toLowerCase().includes(q.toLowerCase())
    );
  }, [allReviews, q]);

  // ✅ Paginação
  const PAGE_SIZE = 6;
  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginated = filtered.slice(
    (curPage - 1) * PAGE_SIZE,
    curPage * PAGE_SIZE
  );

  // ✅ Save Mutation
  const saveMutation = useMutation({
    mutationFn: async (review: Review) => {
      if (review.id) {
        const { data } = await api.put(`/reviews/${review.id}`, review);
        if (!data.success) throw new Error(data.message);
        return data.data;
      } else {
        const { data } = await api.post('/reviews', review);
        if (!data.success) throw new Error(data.message);
        return data.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'reviews'] });
      setEditing(null);
    },
  });

  // ✅ Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/reviews/${id}`);
      if (!data.success) throw new Error(data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'reviews'] });
      setConfirmDel(null);
    },
  });

  // ✅ Return
  return {
    reviews: paginated,
    allReviews,
    isLoading,
    isFetching,
    isSaving: saveMutation.isPending,
    isDeleting: deleteMutation.isPending,
    error,
    saveError: saveMutation.error,
    deleteError: deleteMutation.error,
    q,
    setQ: (v: string) => {
      setQ(v);
      setPage(1);
    },
    page: curPage,
    pages,
    setPage,
    editing,
    setEditing,
    confirmDel,
    setConfirmDel,
    saveReview: (r: Review) => saveMutation.mutate(r),
    deleteReview: (id: number) => deleteMutation.mutate(id),
  };
}

export type UseReviewsReturn = ReturnType<typeof useReviews>;
```

---

## 5️⃣ Diferentes Cenários

### Cenário A: Só Ler Dados (Read-Only)

```typescript
const { data: items, isLoading, error } = useAdminQuery(
  ['admin', 'items'],
  '/items'
);

// Use data sem fazer mutations
```

### Cenário B: Listar + Filtrar

```typescript
const { brands, q, setQ, page, setPage } = useBrands();

// Já vem com search, pagination
```

### Cenário C: Listar + Criar

```typescript
const { brands, saveBrand, isSaving } = useBrands();

// Criar novo
saveBrand({ name: 'Corsair' }); // id será undefined, backend gera
```

### Cenário D: Listar + Editar + Deletar

```typescript
const {
  brands,
  editing,
  setEditing,
  saveBrand,
  deleteBrand,
  isSaving,
  isDeleting,
} = useBrands();

// Editar
const brand = brands[0];
setEditing(brand);
// ... mudar editing.name
saveBrand(editing); // id existe, vai ser PUT

// Deletar
deleteBrand(brand.id!);
```

### Cenário E: Dashboard com Múltiplas Queries

```typescript
const { data: users = [] } = useQuery({
  queryKey: ['admin', 'stats', 'users'],
  queryFn: () => api.get('/users').then(r => r.data.data),
});

const { data: products = [] } = useQuery({
  queryKey: ['admin', 'stats', 'products'],
  queryFn: () => api.get('/products').then(r => r.data.data),
});

// Renderizar stats
<div>Users: {users.length}</div>
<div>Products: {products.length}</div>
```

---

## 🔑 Key Points

### ✅ Sempre Fazer
```typescript
// 1. Use 'use client' no topo
'use client';

// 2. Desestruture o que precisa do hook
const { data, isLoading, error } = useAdminQuery(...);

// 3. Handle loading
if (isLoading) return <Skeleton />;

// 4. Handle error
if (error) return <ErrorMessage error={error} />;

// 5. Render data
return <Table data={data} />;
```

### ❌ Nunca Fazer
```typescript
// ❌ Não chame hook condicionalmente
if (condition) {
  const { data } = useBrands(); // ERRADO!
}

// ❌ Não use com useState no lugar
const [brands, setBrands] = useState(SEED_BRANDS); // ERRADO!

// ❌ Não ignore loading state
<Table data={brands} /> // Se isLoading === true, será vazio!

// ❌ Não faça mutations sem hook
const response = await api.post('/brands', data); // Use saveMutation!
```

---

## 🐛 Debugging

### Ver o que está na cache
```typescript
// No DevTools console
const queryClient = useQueryClient();
queryClient.getQueryCache().getAll(); // Ver todas queries
queryClient.getQueryData(['admin', 'brands']); // Ver dados específicos
```

### Ver requisições
```
DevTools → Network → Filter by XHR
Procure por:
- GET /api/v1/brands
- POST /api/v1/brands
- PUT /api/v1/brands/1
- DELETE /api/v1/brands/1
```

### Ver erros
```typescript
if (error) {
  console.error('Query error:', error);
  console.error('Status:', error.status);
  console.error('Message:', error.message);
}
```

---

**Dúvidas?** Veja IMPLEMENTACAO_COMPLETA.md ou TESTE_E_VALIDACAO.md
