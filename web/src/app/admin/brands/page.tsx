"use client";

import { useBrands } from "./_hooks/use-brands";
import BrandsTable from "./_components/brands-table";

export default function BrandsPage() {
  const hook = useBrands();
  return <BrandsTable {...hook} />;
}
