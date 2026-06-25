"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Component } from "../../_types";
import { toast } from "sonner";

export function useComponents() {
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");
  const [productFilter, setProductFilter] = useState<"all" | number>("all");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Component | null>(null);
  const [confirmDel, setConfirmDel] = useState<Component | null>(null);

  const {
    data: allComponents = [],
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["admin", "components"],
    queryFn: async () => {
      try {
        const { data } = await api<{ data: Component[] }>("/components");
        return data.data ?? [];
      } catch (error) {
        throw new Error("Falha ao carregar componentes");
      }
    },
    staleTime: 1000 * 60,
    retry: 1,
  });

  const { data: products = [] } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/products");
        return data.data ?? [];
      } catch (error) {
        return [];
      }
    },
  });

  const { data: manufacturers = [] } = useQuery({
    queryKey: ["admin", "manufacturers"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/manufacturers");
        return data.data ?? [];
      } catch (error) {
        return [];
      }
    },
  });

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return allComponents.filter((c: Component) => {
      const matchesQuery =
        !query ||
        c.name.toLowerCase().includes(query) ||
        (c.description && c.description.toLowerCase().includes(query));

      const matchesProduct =
        productFilter === "all" || c.productId === Number(productFilter);

      return matchesQuery && matchesProduct;
    });
  }, [allComponents, q, productFilter]);

  const PAGE_SIZE = 6;
  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginated = filtered.slice(
    (curPage - 1) * PAGE_SIZE,
    curPage * PAGE_SIZE,
  );

  const saveMutation = useMutation({
    mutationFn: async (component: Component) => {
      if (component.id) {
        const { data } = await api.put(
          `/components/${component.id}`,
          component,
        );
        if (!data.success)
          throw new Error(data.message || "Erro ao atualizar componente");
        return data.data;
      } else {
        const { data } = await api.post("/components", component);
        if (!data.success)
          throw new Error(data.message || "Erro ao criar componente");
        return data.data;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "components"] });
      setEditing(null);
      toast.success(variables.id ? "Componente atualizado com sucesso!" : "Componente criado com sucesso!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao salvar componente");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/components/${id}`);
      if (!data.success)
        throw new Error(data.message || "Erro ao deletar componente");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "components"] });
      setConfirmDel(null);
      toast.success("Componente excluído com sucesso!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao deletar componente");
    },
  });

  return {
    components: paginated,
    allComponents,
    products,
    manufacturers,
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
    productFilter,
    setProductFilter: (v: "all" | number) => {
      setProductFilter(v);
      setPage(1);
    },
    page: curPage,
    pages,
    setPage,
    editing,
    setEditing,
    confirmDel,
    setConfirmDel,
    saveComponent: (item: Component) => saveMutation.mutate(item),
    deleteComponent: (id: number) => deleteMutation.mutate(id),
  };
}
export type UseComponentsReturn = ReturnType<typeof useComponents>;
