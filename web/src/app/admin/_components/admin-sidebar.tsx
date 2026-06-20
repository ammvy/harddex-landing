"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Package,
  Factory,
  Cpu,
  Tag,
  Award,
  Users,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: <LayoutGrid size={16} strokeWidth={1.7} />,
  },
  {
    href: "/admin/products",
    label: "Produtos",
    icon: <Package size={16} strokeWidth={1.7} />,
  },
  {
    href: "/admin/manufacturers",
    label: "Fabricantes",
    icon: <Factory size={16} strokeWidth={1.7} />,
  },
  {
    href: "/admin/components",
    label: "Componentes",
    icon: <Cpu size={16} strokeWidth={1.7} />,
  },
  {
    href: "/admin/categories",
    label: "Categorias",
    icon: <Tag size={16} strokeWidth={1.7} />,
  },
  {
    href: "/admin/brands",
    label: "Marcas",
    icon: <Award size={16} strokeWidth={1.7} />,
  },
  {
    href: "/admin/users",
    label: "Usuários",
    icon: <Users size={16} strokeWidth={1.7} />,
  },
];

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const navList = (
    <nav
      className="flex flex-col"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      {NAV_ITEMS.map((n) => {
        const active = pathname === n.href;
        return (
          <Link
            key={n.href}
            href={n.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-5 py-4 border-b border-border/40 uppercase tracking-widest text-[11px] text-left transition-colors duration-100 ${
              active
                ? "bg-primary text-primary-foreground border-primary"
                : "hover:text-primary text-foreground"
            }`}
          >
            {n.icon}
            {n.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block border-r border-border sticky top-[68px] self-start h-[calc(100vh-68px)] w-[220px]">
        {navList}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/55"
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-0 bottom-0 w-[260px] bg-background border-r border-border"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <span
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className="uppercase tracking-widest text-[11px] text-foreground"
                >
                  Menu
                </span>
                <button
                  onClick={onClose}
                  className="hover:text-primary text-foreground cursor-pointer"
                >
                  <X size={16} strokeWidth={1.8} />
                </button>
              </div>
              {navList}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
