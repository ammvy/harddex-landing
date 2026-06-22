"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { User } from "../../_types";

const PAGE_SIZE = 6;

export function useUsers() {
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [confirmDel, setConfirmDel] = useState<User | null>(null);

  const {
    data: allUsers = [],
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ data: User[] }>("/users");
        return data.data ?? [];
      } catch (error) {
        throw new Error("Falha ao carregar usuários");
      }
    },
    staleTime: 1000 * 60,
    retry: 1,
  });

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return allUsers.filter(
      (u: User) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term),
    );
  }, [allUsers, q]);

  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginatedUsers = useMemo(() => {
    return filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);
  }, [filtered, curPage]);

  const saveMutation = useMutation({
    mutationFn: async (user: User) => {
      if (user.id) {
        const { data } = await api.put(`/users/${user.id}`, user);
        if (!data.success)
          throw new Error(data.message || "Erro ao atualizar usuário");
        return data.data;
      } else {
        const { data } = await api.post("/users", user);
        if (!data.success)
          throw new Error(data.message || "Erro ao criar usuário");
        return data.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      setEditingUser(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/users/${id}`);
      if (!data.success)
        throw new Error(data.message || "Erro ao deletar usuário");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      setConfirmDel(null);
    },
  });

  return {
    users: paginatedUsers,
    allUsers,
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
    editingUser,
    setEditingUser,
    confirmDel,
    setConfirmDel,
    saveUser: (user: User) => saveMutation.mutate(user),
    deleteUser: (id: number) => deleteMutation.mutate(id),
  };
}

export type UseUsersReturn = ReturnType<typeof useUsers>;
