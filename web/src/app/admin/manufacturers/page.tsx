"use client";

import { useManufacturers } from "./_hooks/use-manufacturers";
import ManufacturersTable from "./_components/manufacturers-table";

export default function ManufacturersPage() {
  const hook = useManufacturers();
  return <ManufacturersTable {...hook} />;
}
