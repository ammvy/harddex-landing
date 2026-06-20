"use client";

import { Users, Package, Factory, Cpu, FolderTree, Tag } from "lucide-react";
import SectionHead from "./_components/section-head";
import { SEED_PRODUCTS } from "./_data/products";
import { SEED_MANUFACTURERS } from "./_data/manufacturers";
import { SEED_COMPONENTS } from "./_data/components";
import { SEED_CATEGORIES } from "./_data/categories";
import { SEED_BRANDS } from "./_data/brands";
import { SEED_USERS } from "./_data/users";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Usuários",
      value: SEED_USERS.length,
      sub: `${SEED_USERS.filter((u) => u.permission === "ADMIN").length} admins`,
      icon: <Users size={18} strokeWidth={1.6} />,
    },
    {
      label: "Produtos",
      value: SEED_PRODUCTS.length,
      sub: "catálogo geral",
      icon: <Package size={18} strokeWidth={1.6} />,
    },
    {
      label: "Fabricantes",
      value: SEED_MANUFACTURERS.length,
      sub: "registrados",
      icon: <Factory size={18} strokeWidth={1.6} />,
    },
    {
      label: "Componentes",
      value: SEED_COMPONENTS.length,
      sub: "peças detalhadas",
      icon: <Cpu size={18} strokeWidth={1.6} />,
    },
    {
      label: "Categorias",
      value: SEED_CATEGORIES.length,
      sub: "organização",
      icon: <FolderTree size={18} strokeWidth={1.6} />,
    },
    {
      label: "Marcas",
      value: SEED_BRANDS.length,
      sub: "registradas",
      icon: <Tag size={18} strokeWidth={1.6} />,
    },
  ];

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
