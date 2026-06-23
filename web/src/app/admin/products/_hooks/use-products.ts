"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Brand, Category, Product } from "../../_types";

export function useProducts() {
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | number>("all");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Product | null>(null);
  const [confirmDel, setConfirmDel] = useState<Product | null>(null);

  const {
    data: allProducts = [],
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ data: Product[] }>("/products");
        return data.data ?? [];
      } catch (error) {
        throw new Error("Falha ao carregar produtos");
      }
    },
    staleTime: 1000 * 60,
    retry: 1,
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["admin", "brands"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/brands");
        return data.data ?? [];
      } catch (error) {
        return [];
      }
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: async () => {
      try {
        const { data } = await api.get<{ data: Category[] }>("/categories");
        return data.data ?? [];
      } catch (error) {
        return [];
      }
    },
  });

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return allProducts.filter((p: Product) => {
      const brandName =
        brands.find((b: Brand) => b.id === p.brandId)?.name.toLowerCase() || "";
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query)) ||
        brandName.includes(query);

      const matchesCategory =
        categoryFilter === "all" || p.categoryId === Number(categoryFilter);

      return matchesQuery && matchesCategory;
    });
  }, [allProducts, q, categoryFilter, brands]);

  const PAGE_SIZE = 6;
  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginated = filtered.slice(
    (curPage - 1) * PAGE_SIZE,
    curPage * PAGE_SIZE,
  );

  const saveMutation = useMutation({
    mutationFn: async (product: Product) => {
      if (product.id) {
        const { data } = await api.put(`/products/${product.id}`, product);
        if (!data.success)
          throw new Error(data.message || "Erro ao atualizar produto");
        return data.data;
      } else {
        const { data } = await api.post("/products", product);
        if (!data.success)
          throw new Error(data.message || "Erro ao criar produto");
        return data.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      setEditing(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/products/${id}`);
      if (!data.success)
        throw new Error(data.message || "Erro ao deletar produto");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
      setConfirmDel(null);
    },
  });

  return {
    products: paginated,
    allProducts,
    brands,
    categories,
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
    categoryFilter,
    setCategoryFilter: (v: "all" | number) => {
      setCategoryFilter(v);
      setPage(1);
    },
    page: curPage,
    pages,
    setPage,
    editing,
    setEditing,
    confirmDel,
    setConfirmDel,
    saveProduct: (item: Product) => saveMutation.mutate(item),
    deleteProduct: (id: number) => deleteMutation.mutate(id),
  };
}
export type UseProductsReturn = ReturnType<typeof useProducts>;
