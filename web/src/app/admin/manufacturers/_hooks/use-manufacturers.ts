"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Manufacturer } from "../../_types";
import { toast } from "sonner";

export function useManufacturers() {
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Manufacturer | null>(null);
  const [confirmDel, setConfirmDel] = useState<Manufacturer | null>(null);

  const {
    data: allManufacturers = [],
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["admin", "manufacturers"],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ data: Manufacturer[] }>(
          "/manufacturers",
        );
        return data.data ?? [];
      } catch (error) {
        throw new Error("Falha ao carregar fabricantes");
      }
    },
    staleTime: 1000 * 60,
    retry: 1,
  });

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return allManufacturers.filter(
      (m: Manufacturer) => !query || m.name.toLowerCase().includes(query),
    );
  }, [allManufacturers, q]);

  const PAGE_SIZE = 6;
  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginated = filtered.slice(
    (curPage - 1) * PAGE_SIZE,
    curPage * PAGE_SIZE,
  );

  const saveMutation = useMutation({
    mutationFn: async (manufacturer: Manufacturer) => {
      if (manufacturer.id) {
        const { data } = await api.put(
          `/manufacturers/${manufacturer.id}`,
          manufacturer,
        );
        if (!data.success)
          throw new Error(data.message || "Erro ao atualizar fabricante");
        return data.data;
      } else {
        const { data } = await api.post("/manufacturers", manufacturer);
        if (!data.success)
          throw new Error(data.message || "Erro ao criar fabricante");
        return data.data;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "manufacturers"] });
      setEditing(null);
      toast.success(variables.id ? "Fabricante atualizado com sucesso!" : "Fabricante criado com sucesso!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao salvar fabricante");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/manufacturers/${id}`);
      if (!data.success)
        throw new Error(data.message || "Erro ao deletar fabricante");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "manufacturers"] });
      setConfirmDel(null);
      toast.success("Fabricante excluído com sucesso!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao deletar fabricante");
    },
  });

  return {
    manufacturers: paginated,
    allManufacturers,
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
    saveManufacturer: (item: Manufacturer) => saveMutation.mutate(item),
    deleteManufacturer: (id: number) => deleteMutation.mutate(id),
  };
}

export type UseManufacturersReturn = ReturnType<typeof useManufacturers>;
