"use client";

import { useProducts } from "./_hooks/use-products";
import ProductsTable from "./_components/products-table";

export default function ProductsPage() {
  const hook = useProducts();
  return <ProductsTable {...hook} />;
}
