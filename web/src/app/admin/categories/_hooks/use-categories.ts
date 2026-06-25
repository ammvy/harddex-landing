"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Category } from "../../_types";
import { toast } from "sonner";

export function useCategories() {
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [confirmDel, setConfirmDel] = useState<Category | null>(null);

  const {
    data: allCategories = [],
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ data: Category[] }>("/categories");
        return data.data ?? [];
      } catch (error) {
        throw new Error("Falha ao carregar categorias");
      }
    },
    staleTime: 1000 * 60,
    retry: 1,
  });

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return allCategories.filter(
      (c: Category) => !query || c.name.toLowerCase().includes(query),
    );
  }, [allCategories, q]);

  const PAGE_SIZE = 6;
  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginated = filtered.slice(
    (curPage - 1) * PAGE_SIZE,
    curPage * PAGE_SIZE,
  );

  const saveMutation = useMutation({
    mutationFn: async (category: Category) => {
      try {
        if (category.id) {
          const { data } = await api.put(`/categories/${category.id}`, category);
          if (!data.success)
            throw new Error(data.error || data.message || "Erro ao atualizar categoria");
          return data.data;
        } else {
          const { data } = await api.post("/categories", category);
          if (!data.success)
            throw new Error(data.error || data.message || "Erro ao criar categoria");
          return data.data;
        }
      } catch (err: any) {
        const message = err.response?.data?.error || err.response?.data?.message || err.message || "Erro ao salvar categoria";
        throw new Error(message);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      setEditingCategory(null);
      toast.success(variables.id ? "Categoria atualizada com sucesso!" : "Categoria criada com sucesso!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao salvar categoria");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      try {
        const { data } = await api.delete(`/categories/${id}`);
        if (!data.success)
          throw new Error(data.error || data.message || "Erro ao deletar categoria");
      } catch (err: any) {
        const message = err.response?.data?.error || err.response?.data?.message || err.message || "Erro ao deletar categoria";
        throw new Error(message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
      setConfirmDel(null);
      toast.success("Categoria excluída com sucesso!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao deletar categoria");
    },
  });

  return {
    categories: paginated,
    allCategories,
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
    editingCategory,
    setEditingCategory,
    confirmDel,
    setConfirmDel,
    saveCategory: (item: Category) => saveMutation.mutate(item),
    deleteCategory: (id: number) => deleteMutation.mutate(id),
  };
}

export type UseCategoriesReturn = ReturnType<typeof useCategories>;
