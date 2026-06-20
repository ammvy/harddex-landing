"use client";

import { useComponents } from "./_hooks/use-components";
import ComponentsTable from "./_components/components-table";

export default function ComponentsPage() {
  const hook = useComponents();
  return <ComponentsTable {...hook} />;
}
