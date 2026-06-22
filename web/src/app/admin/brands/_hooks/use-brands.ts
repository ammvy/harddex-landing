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

  // === QUERY: GET /brands ===
  const {
    data: allBrands = [],
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["admin", "brands"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/brands");
        return data.data ?? [];
      } catch (error) {
        throw new Error("Falha ao carregar marcas");
      }
    },
    staleTime: 1000 * 60,
    retry: 1,
  });

  // === FILTRO LOCAL ===
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return allBrands.filter((b) => {
      return !query || b.name.toLowerCase().includes(query);
    });
  }, [allBrands, q]);

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
    mutationFn: async (brand: Brand) => {
      if (brand.id) {
        // UPDATE
        const { data } = await api.put(`/brands/${brand.id}`, brand);
        if (!data.success) {
          throw new Error(data.message || "Erro ao atualizar marca");
        }
        return data.data;
      } else {
        // CREATE
        const { data } = await api.post("/brands", brand);
        if (!data.success) {
          throw new Error(data.message || "Erro ao criar marca");
        }
        return data.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "brands"],
      });
      setEditingBrand(null);
    },
  });

  // === MUTATION: DELETE ===
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/brands/${id}`);
      if (!data.success) {
        throw new Error(data.message || "Erro ao deletar marca");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "brands"],
      });
      setConfirmDel(null);
    },
  });

  // === HANDLERS ===
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

  // === RETURN ===
  return {
    // Dados paginados
    brands: paginated,
    allBrands,

    // Estados de loading
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
export type UseBrandsReturn = ReturnType<typeof useBrands>;
