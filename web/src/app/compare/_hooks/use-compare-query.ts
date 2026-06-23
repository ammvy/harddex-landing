"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Device } from "../_data/types";

export function useCompareQuery() {
  return useQuery<Device<any[]>[]>({
    queryKey: ["products-detailed"],
    queryFn: async () => {
      const { data } = await api.get("/products?detailed=true");
      
      const backendProducts = data.data || [];
      return backendProducts.map((p: any) => {
        // Map category
        const categoryName = p.category?.name?.toLowerCase() || "";
        const category: "phone" | "laptop" =
          categoryName.includes("laptop") ||
          categoryName.includes("notebook") ||
          categoryName.includes("prebuilt") ||
          categoryName.includes("hardware") ||
          categoryName.includes("computer")
            ? "laptop"
            : "phone";

        // Mapped accent color
        const accent = p.category?.color || "#E2E8F0";

        // Mapped TDU scores (mock/default values)
        const tdu = {
          GAMER: 80 + (p.id % 15),
          PRO: 70 + (p.id % 20),
          STUDY: 85 + (p.id % 10),
          MOBILE: 60 + (p.id % 30),
          DEV: 75 + (p.id % 25),
        };

        return {
          id: String(p.id),
          category,
          brand: p.brand?.name || "Genérico",
          model: p.name,
          year: 2026,
          price: p.averagePrice || 0,
          overall: 80 + (p.id % 15),
          tdu,
          accent,
          specs: p.components || [],
        };
      });
    },
  });
}
