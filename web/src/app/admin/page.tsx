"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Users, Package, Factory, Cpu, FolderTree, Tag } from "lucide-react";
import SectionHead from "./_components/section-head";

export default function AdminDashboard() {
  // === Queries para stats ===
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
      <SectionHead title="Painel de Administração" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {stat.label}
              </h3>
              <div className="text-gray-400 dark:text-gray-600">{stat.icon}</div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {stat.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

  return (
    <div className="flex flex-col gap-6">
      <SectionHead kicker="Visão Geral" title="Dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm hover:border-[var(--primary)] transition-colors duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-[var(--muted-foreground)] tracking-wide uppercase">
                {s.label}
              </span>
              <span className="text-[var(--primary)]">{s.icon}</span>
            </div>
            <div className="text-4xl font-light text-[var(--foreground)] tracking-tight">
              {s.value}
            </div>
            <div className="mt-2 text-xs text-[var(--muted-foreground)] tracking-wider uppercase opacity-80">
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm">
          <div className="text-sm font-medium text-[var(--muted-foreground)] tracking-wide uppercase mb-4">
            Atividades Recentes
          </div>
          <div className="text-sm text-[var(--muted-foreground)] text-center py-8">
            Nenhuma atividade registrada ainda.
          </div>
        </div>

        <div className="p-6 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm">
          <div className="text-sm font-medium text-[var(--muted-foreground)] tracking-wide uppercase mb-4">
            Resumo de Cadastros
          </div>
          <ul className="flex flex-col gap-4">
            {stats.map((s) => {
              const max = Math.max(...stats.map((x) => x.value));
              const pct = max === 0 ? 0 : (s.value / max) * 100;
              return (
                <li key={s.label}>
                  <div className="flex items-center justify-between mb-1.5 text-xs text-[var(--foreground)] uppercase tracking-wider">
                    <span>{s.label}</span>
                    <span className="text-[var(--muted-foreground)]">
                      {s.value}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[var(--background)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--primary)] rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div> */}
    </div>
  );
}
