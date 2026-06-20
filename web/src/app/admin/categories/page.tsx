"use client";

import { useCategories } from "./_hooks/use-categories";
import CategoriesTable from "./_components/categories-table";

export default function CategoriesPage() {
  const hook = useCategories();
  return <CategoriesTable {...hook} />;
}
