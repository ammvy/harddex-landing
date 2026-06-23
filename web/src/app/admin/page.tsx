"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Users, Package, Factory, Cpu, FolderTree, Tag } from "lucide-react";
import SectionHead from "./_components/section-head";

export default function AdminDashboard() {
  const { data: users = [] } = useQuery({
    queryKey: ["admin", "stats", "users"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/users");
        return data.data ?? [];
      } catch (error) {
        return [];
      }
    },
  });

  const { data: products = [] } = useQuery({
    queryKey: ["admin", "stats", "products"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/products");
        return data.data ?? [];
      } catch (error) {
        return [];
      }
    },
  });

  const { data: manufacturers = [] } = useQuery({
    queryKey: ["admin", "stats", "manufacturers"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/manufacturers");
        return data.data ?? [];
      } catch (error) {
        return [];
      }
    },
  });

  const { data: components = [] } = useQuery({
    queryKey: ["admin", "stats", "components"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/components");
        return data.data ?? [];
      } catch (error) {
        return [];
      }
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["admin", "stats", "categories"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/categories");
        return data.data ?? [];
      } catch (error) {
        return [];
      }
    },
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["admin", "stats", "brands"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/brands");
        return data.data ?? [];
      } catch (error) {
        return [];
      }
    },
  });

  // === Build stats ===
  const stats = [
    {
      label: "Usuários",
      value: users.length,
      sub: `${users.filter((u: any) => u.permission === "ADMIN").length} admins`,
      icon: <Users size={18} strokeWidth={1.6} />,
    },
    {
      label: "Produtos",
      value: products.length,
      sub: "catálogo geral",
      icon: <Package size={18} strokeWidth={1.6} />,
    },
    {
      label: "Fabricantes",
      value: manufacturers.length,
      sub: "registrados",
      icon: <Factory size={18} strokeWidth={1.6} />,
    },
    {
      label: "Componentes",
      value: components.length,
      sub: "peças detalhadas",
      icon: <Cpu size={18} strokeWidth={1.6} />,
    },
    {
      label: "Categorias",
      value: categories.length,
      sub: "organização",
      icon: <FolderTree size={18} strokeWidth={1.6} />,
    },
    {
      label: "Marcas",
      value: brands.length,
      sub: "registradas",
      icon: <Tag size={18} strokeWidth={1.6} />,
    },
  ];

  return (
    <div>
      <SectionHead title="Painel de Administração" kicker="" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border p-6 rounded-lg transition-all duration-300 hover:shadow-md hover:border-primary/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">
                {stat.label}
              </h3>
              <div className="text-primary">
                {stat.icon}
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {stat.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
