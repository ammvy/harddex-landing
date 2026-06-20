"use client";

import { useState } from "react";
import AdminTopbar from "./_components/admin-topbar";
import AdminSidebar from "./_components/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div
      className="min-h-screen w-full bg-background text-foreground transition-colors duration-200"
      style={{ fontFamily: "'Inter Tight', sans-serif" }}
    >
      <AdminTopbar onMenuToggle={() => setNavOpen((o) => !o)} />

      <div className="max-w-[1500px] mx-auto lg:grid lg:grid-cols-[220px_1fr]">
        <AdminSidebar isOpen={navOpen} onClose={() => setNavOpen(false)} />

        <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
