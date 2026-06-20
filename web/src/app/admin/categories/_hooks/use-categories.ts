"use client";

import { useState, useMemo } from "react";
import { Category } from "../../_types";
import { SEED_CATEGORIES } from "../../_data/categories";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(SEED_CATEGORIES);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [confirmDel, setConfirmDel] = useState<Category | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return categories.filter((c) => {
      return !query || c.name.toLowerCase().includes(query);
    });
  }, [categories, q]);

  const PAGE_SIZE = 6;
  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginated = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);

  const saveCategory = (item: Category) => {
    if (item.id) {
      setCategories((prev) => prev.map((x) => (x.id === item.id ? item : x)));
    } else {
      setCategories((prev) => [
        { ...item, id: Date.now() },
        ...prev,
      ]);
    }
    setEditingCategory(null);
  };

  const deleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((x) => x.id !== id));
    setConfirmDel(null);
  };

  return {
    categories: paginated,
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
    saveCategory,
    deleteCategory,
  };
}
export type UseCategoriesReturn = ReturnType<typeof useCategories>;
