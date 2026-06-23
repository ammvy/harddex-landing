# 🔧 GUIA TÉCNICO - IMPLEMENTAÇÃO DOS HOOKS

## Índice
1. [Estrutura de Hook Completa](#estrutura-de-hook-completa)
2. [Padrão React Query + Axios](#padrão-react-query--axios)
3. [Exemplo: use-brands.ts](#exemplo-use-brandsts)
4. [Tratamento de Erros](#tratamento-de-erros)
5. [Sincronização com Componentes](#sincronização-com-componentes)
6. [Integração com Dashboard](#integração-com-dashboard)

---

## Estrutura de Hook Completa

### Padrão de Resposta da API

Todas as APIs retornam no formato:
```typescript
{
  success: boolean;
  data: T | null;
  message?: string;
  errors?: Record<string, string[]>;
}
```

### Hook Template

```typescript
"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

interface UseResourceOptions {
  enabled?: boolean;
  staleTime?: number;
}

export function useResource(options?: UseResourceOptions) {
  const queryClient = useQueryClient();
  
  // Estados locais para filtro, paginação, etc
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [editingItem, setEditingItem] = useState<Resource | null>(null);
  const [confirmDel, setConfirmDel] = useState<Resource | null>(null);

  // === QUERY: GET ===
  const {
    data: allItems = [],
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['admin', 'resources'],
    queryFn: async () => {
      const { data } = await api.get("/resources");
      return data.data as Resource[];
    },
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 1000 * 60, // 1 minuto
    retry: 1,
  });

  // === FILTRO LOCAL ===
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return allItems;
    
    return allItems.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(query)
      )
    );
  }, [allItems, q]);

  // === PAGINAÇÃO ===
  const PAGE_SIZE = 6;
  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginated = filtered.slice(
    (curPage - 1) * PAGE_SIZE,
    curPage * PAGE_SIZE
  );

  // === MUTATION: POST (CREATE) + PUT (UPDATE) ===
  const saveMutation = useMutation({
    mutationFn: async (item: Resource) => {
      if (item.id) {
        // UPDATE
        const { data } = await api.put(`/resources/${item.id}`, item);
        if (!data.success) {
          throw new Error(data.message || "Erro ao atualizar");
        }
        return data.data;
      } else {
        // CREATE
        const { data } = await api.post("/resources", item);
        if (!data.success) {
          throw new Error(data.message || "Erro ao criar");
        }
        return data.data;
      }
    },
    onSuccess: () => {
      // Invalida cache para refetch automático
      queryClient.invalidateQueries({
        queryKey: ['admin', 'resources'],
      });
      setEditingItem(null);
    },
    onError: (error: Error) => {
      console.error("Erro ao salvar:", error);
      // Toast será disparado no componente
    },
  });

  // === MUTATION: DELETE ===
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/resources/${id}`);
      if (!data.success) {
        throw new Error(data.message || "Erro ao deletar");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'resources'],
      });
      setConfirmDel(null);
    },
    onError: (error: Error) => {
      console.error("Erro ao deletar:", error);
    },
  });

  // === HANDLERS ===
  const handleSearch = (value: string) => {
    setQ(value);
    setPage(1); // Reset paginação ao buscar
  };

  const handleSave = (item: Resource) => {
    saveMutation.mutate(item);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  // === RETURN ===
  return {
    // Dados
    items: paginated,
    allItems,
    
    // Estados de loading
    isLoading,
    isFetching,
    isSaving: saveMutation.isPending,
    isDeleting: deleteMutation.isPending,
    
    // Erros
    error,
    saveError: saveMutation.error,
    deleteError: deleteMutation.error,
    
    // Filtro
    q,
    setQ: handleSearch,
    
    // Paginação
    page: curPage,
    pages,
    setPage,
    
    // Edição/Deleção
    editingItem,
    setEditingItem,
    confirmDel,
    setConfirmDel,
    
    // Ações
    saveBrand: handleSave,
    deleteItem: handleDelete,
  };
}

export type UseResourceReturn = ReturnType<typeof useResource>;
```

---

## Padrão React Query + Axios

### Configuração Base (já existente)

**web/src/lib/axios.ts**
```typescript
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true, // Envia cookies (auth)
});
```

**web/src/components/providers.tsx**
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minuto
      gcTime: 1000 * 60 * 5, // 5 minutos (antigo: cacheTime)
    },
  },
});

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

---

## Exemplo: use-brands.ts

### Implementação Completa

**web/src/app/admin/brands/_hooks/use-brands.ts**

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

  // Query: Fetch all brands
  const {
    data: allBrands = [],
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['admin', 'brands'],
    queryFn: async () => {
      try {
        const { data } = await api.get("/brands");
        return data.data as Brand[];
      } catch (error) {
        throw new Error("Falha ao carregar marcas");
      }
    },
    staleTime: 1000 * 60, // 1 minuto
    retry: 1,
  });

  // Filtro local (no cliente)
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return allBrands;
    
    return allBrands.filter((b) =>
      b.name.toLowerCase().includes(query) ||
      (b.description?.toLowerCase().includes(query) ?? false)
    );
  }, [allBrands, q]);

  // Paginação
  const PAGE_SIZE = 6;
  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginated = filtered.slice(
    (curPage - 1) * PAGE_SIZE,
    curPage * PAGE_SIZE
  );

  // Mutation: Create or Update
  const saveMutation = useMutation({
    mutationFn: async (brand: Brand) => {
      if (brand.id) {
        // Update
        const { data } = await api.put(`/brands/${brand.id}`, {
          name: brand.name,
          description: brand.description,
        });
        
        if (!data.success) {
          throw new Error(
            data.message || 
            data.errors?.name?.[0] ||
            "Erro ao atualizar marca"
          );
        }
        
        return data.data as Brand;
      } else {
        // Create
        const { data } = await api.post("/brands", {
          name: brand.name,
          description: brand.description,
        });
        
        if (!data.success) {
          throw new Error(
            data.message || 
            data.errors?.name?.[0] ||
            "Erro ao criar marca"
          );
        }
        
        return data.data as Brand;
      }
    },
    onSuccess: (newBrand) => {
      // Invalida e refetch automático
      queryClient.invalidateQueries({
        queryKey: ['admin', 'brands'],
      });
      
      // Limpa estado de edição
      setEditingBrand(null);
    },
    onError: (error: Error) => {
      console.error("Erro ao salvar marca:", error);
      // Toast será mostrado no componente
    },
  });

  // Mutation: Delete
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/brands/${id}`);
      
      if (!data.success) {
        throw new Error(data.message || "Erro ao deletar marca");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin', 'brands'],
      });
      setConfirmDel(null);
    },
    onError: (error: Error) => {
      console.error("Erro ao deletar marca:", error);
    },
  });

  // Handlers
  const handleSearch = (value: string) => {
    setQ(value);
    setPage(1);
  };

  const saveBrand = (brand: Brand) => {
    saveMutation.mutate(brand);
  };

  const deleteBrand = (id: number) => {
    deleteMutation.mutate(id);
  };

  // Retorno
  return {
    // Dados paginados
    brands: paginated,
    allBrands,
    
    // Estados
    isLoading,
    isFetching,
    isSaving: saveMutation.isPending,
    isDeleting: deleteMutation.isPending,
    
    // Erros
    error,
    saveError: saveMutation.error,
    deleteError: deleteMutation.error,
    
    // Filtro/Busca
    q,
    setQ: handleSearch,
    
    // Paginação
    page: curPage,
    pages,
    setPage,
    
    // Edição
    editingBrand,
    setEditingBrand,
    
    // Confirmação de deleção
    confirmDel,
    setConfirmDel,
    
    // Ações
    saveBrand,
    deleteBrand,
  };
}

export type UseBrandsReturn = ReturnType<typeof useBrands>;
```

---

## Tratamento de Erros

### Padrão de Erro da API

```typescript
// Erro de validação
{
  success: false,
  data: null,
  message: "Validação falhou",
  errors: {
    name: ["Campo obrigatório"],
    email: ["Email inválido"]
  }
}

// Erro geral
{
  success: false,
  data: null,
  message: "Erro interno do servidor"
}

// Erro de autenticação (HTTP 401)
// Erro de autorização (HTTP 403)
// Erro não encontrado (HTTP 404)
```

### Interceptor de Erro (adicionar em axios.ts)

```typescript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratamento de erro 401 (não autenticado)
    if (error.response?.status === 401) {
      // Redirecionar para login
      window.location.href = '/login';
    }
    
    // Tratamento de erro 403 (não autorizado)
    if (error.response?.status === 403) {
      console.error("Você não tem permissão para acessar isso");
    }
    
    return Promise.reject(error);
  }
);
```

### Usar Erro no Componente

```typescript
import { useToast } from "@/hooks/use-toast";

function BrandsTable({ saveError, deleteError, ...props }: UseBrandsReturn) {
  const { toast } = useToast();

  useEffect(() => {
    if (saveError) {
      toast({
        title: "Erro",
        description: saveError.message,
        variant: "destructive",
      });
    }
  }, [saveError, toast]);

  useEffect(() => {
    if (deleteError) {
      toast({
        title: "Erro ao deletar",
        description: deleteError.message,
        variant: "destructive",
      });
    }
  }, [deleteError, toast]);

  return (
    // ... componente
  );
}
```

---

## Sincronização com Componentes

### Componente com Loading States

```typescript
// web/src/app/admin/brands/_components/brands-table.tsx

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseBrandsReturn } from "../_hooks/use-brands";

export default function BrandsTable({
  brands,
  isLoading,
  isSaving,
  isDeleting,
  error,
  ...props
}: UseBrandsReturn) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-700">
        Erro ao carregar marcas: {error.message}
      </div>
    );
  }

  return (
    <table>
      <tbody>
        {brands.map((brand) => (
          <tr key={brand.id}>
            <td>{brand.name}</td>
            <td>{brand.description}</td>
            <td>
              <Button
                onClick={() => props.setEditingBrand(brand)}
                disabled={isSaving || isDeleting}
              >
                Editar
              </Button>
              
              <Button
                onClick={() => props.setConfirmDel(brand)}
                disabled={isSaving || isDeleting}
                variant="destructive"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Deletando...
                  </>
                ) : (
                  "Deletar"
                )}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

## Integração com Dashboard

### Dashboard com Multiple Queries

```typescript
// web/src/app/admin/page.tsx

"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Users, Package, Factory, Cpu, FolderTree, Tag } from "lucide-react";
import SectionHead from "./_components/section-head";

export default function AdminDashboard() {
  // === Queries para stats ===
  const { data: users = [] } = useQuery({
    queryKey: ['admin', 'stats', 'users'],
    queryFn: async () => {
      const { data } = await api.get("/users");
      return data.data ?? [];
    },
  });

  const { data: products = [] } = useQuery({
    queryKey: ['admin', 'stats', 'products'],
    queryFn: async () => {
      const { data } = await api.get("/products");
      return data.data ?? [];
    },
  });

  const { data: manufacturers = [] } = useQuery({
    queryKey: ['admin', 'stats', 'manufacturers'],
    queryFn: async () => {
      const { data } = await api.get("/manufacturers");
      return data.data ?? [];
    },
  });

  const { data: components = [] } = useQuery({
    queryKey: ['admin', 'stats', 'components'],
    queryFn: async () => {
      const { data } = await api.get("/components");
      return data.data ?? [];
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['admin', 'stats', 'categories'],
    queryFn: async () => {
      const { data } = await api.get("/categories");
      return data.data ?? [];
    },
  });

  const { data: brands = [] } = useQuery({
    queryKey: ['admin', 'stats', 'brands'],
    queryFn: async () => {
      const { data } = await api.get("/brands");
      return data.data ?? [];
    },
  });

  // === Build stats ===
  const stats = [
    {
      label: "Usuários",
      value: users.length,
      sub: `${users.filter((u: any) => u.permission === "ADMIN").length} admins`,
      icon: <Users size={18} strokeWidth={1.6} />,
    },
    {
      label: "Produtos",
      value: products.length,
      sub: "catálogo geral",
      icon: <Package size={18} strokeWidth={1.6} />,
    },
    {
      label: "Fabricantes",
      value: manufacturers.length,
      sub: "registrados",
      icon: <Factory size={18} strokeWidth={1.6} />,
    },
    {
      label: "Componentes",
      value: components.length,
      sub: "peças detalhadas",
      icon: <Cpu size={18} strokeWidth={1.6} />,
    },
    {
      label: "Categorias",
      value: categories.length,
      sub: "organização",
      icon: <FolderTree size={18} strokeWidth={1.6} />,
    },
    {
      label: "Marcas",
      value: brands.length,
      sub: "registradas",
      icon: <Tag size={18} strokeWidth={1.6} />,
    },
  ];

  // === Render ===
  return (
    <div>
      <SectionHead title="Painel de Administração" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{stat.label}</h3>
              {stat.icon}
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Otimizações e Considerações

### 1. Refetch Manual
```typescript
const { refetch } = useQuery({
  queryKey: ['admin', 'brands'],
  queryFn: async () => {
    const { data } = await api.get("/brands");
    return data.data;
  },
});

// Refetch manual
refetch();
```

### 2. Queries Paralelas (Multiple)
```typescript
// Batching automático - React Query agrupa em uma requisição
const [brands, categories] = useQueries({
  queries: [
    {
      queryKey: ['admin', 'brands'],
      queryFn: () => api.get("/brands"),
    },
    {
      queryKey: ['admin', 'categories'],
      queryFn: () => api.get("/categories"),
    },
  ],
});
```

### 3. Dependent Queries
```typescript
const { data: user } = useQuery({
  queryKey: ['admin', 'user', userId],
  queryFn: () => api.get(`/users/${userId}`),
});

const { data: userOrders } = useQuery({
  queryKey: ['admin', 'user', userId, 'orders'],
  queryFn: () => api.get(`/users/${userId}/orders`),
  enabled: !!user, // Só roda quando user está disponível
});
```

### 4. Desabilitar Query
```typescript
const { data } = useQuery({
  queryKey: ['admin', 'brands'],
  queryFn: async () => {
    const { data } = await api.get("/brands");
    return data.data;
  },
  enabled: false, // Não roda automaticamente
});

// Disparar manualmente quando necessário
const { refetch } = useQuery(...);
refetch();
```

### 5. Mutation Otimista (Update imediato)
```typescript
const saveMutation = useMutation({
  mutationFn: async (brand: Brand) => {
    const { data } = await api.put(`/brands/${brand.id}`, brand);
    return data.data;
  },
  
  // Update imediato no UI
  onMutate: async (newBrand) => {
    // Cancelar queries em andamento
    await queryClient.cancelQueries({
      queryKey: ['admin', 'brands'],
    });

    // Salvar estado anterior
    const previousBrands = queryClient.getQueryData(['admin', 'brands']);

    // Update otimista
    queryClient.setQueryData(['admin', 'brands'], (old: Brand[]) =>
      old.map(b => b.id === newBrand.id ? newBrand : b)
    );

    return { previousBrands };
  },
  
  // Reverter se falhar
  onError: (err, newBrand, context) => {
    if (context?.previousBrands) {
      queryClient.setQueryData(['admin', 'brands'], context.previousBrands);
    }
  },
});
```

