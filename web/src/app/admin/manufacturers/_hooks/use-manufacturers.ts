"use client";

import { useState, useMemo } from "react";
import { Manufacturer } from "../../_types";
import { SEED_MANUFACTURERS } from "../../_data/manufacturers";

export function useManufacturers() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>(SEED_MANUFACTURERS);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Manufacturer | null>(null);
  const [confirmDel, setConfirmDel] = useState<Manufacturer | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return manufacturers.filter((m) => {
      return !query || m.name.toLowerCase().includes(query);
    });
  }, [manufacturers, q]);

  const PAGE_SIZE = 6;
  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginated = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);

  const saveManufacturer = (item: Manufacturer) => {
    if (item.id) {
      setManufacturers((prev) => prev.map((x) => (x.id === item.id ? item : x)));
    } else {
      setManufacturers((prev) => [
        { ...item, id: Date.now() },
        ...prev,
      ]);
    }
    setEditing(null);
  };

  const deleteManufacturer = (id: number) => {
    setManufacturers((prev) => prev.filter((x) => x.id !== id));
    setConfirmDel(null);
  };

  return {
    manufacturers: paginated,
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
    saveManufacturer,
    deleteManufacturer,
  };
}
export type UseManufacturersReturn = ReturnType<typeof useManufacturers>;
