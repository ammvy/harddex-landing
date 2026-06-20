"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { UseComponentsReturn } from "../_hooks/use-components";
import SearchBar from "../../_components/search-bar";
import Pill from "../../_components/pill";
import Pagination from "../../_components/pagination";
import IconBtn from "../../_components/icon-btn";
import SectionHead from "../../_components/section-head";
import Modal from "../../_components/modal";
import ComponentEditModal from "./component-edit-modal";

export default function ComponentsTable({
  components,
  products,
  manufacturers,
  q,
  setQ,
  productFilter,
  setProductFilter,
  page,
  pages,
  setPage,
  editing,
  setEditing,
  confirmDel,
  setConfirmDel,
  saveComponent,
  deleteComponent,
}: UseComponentsReturn) {
  const emptyComponent = () => ({
    id: 0,
    name: "",
    specification: {},
    description: "",
    averagePrice: 0,
    productId: products[0]?.id || 0,
    typeId: null,
    manufacturerId: manufacturers[0]?.id || null,
  });

  return (
    <div>
      <SectionHead
        kicker="Infraestrutura"
        title="Componentes"
        action={
          <button
            onClick={() => setEditing(emptyComponent())}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="bg-primary text-primary-foreground px-5 py-3 uppercase tracking-widest text-[11px] flex items-center gap-2 hover:opacity-90 transition-opacity duration-100 cursor-pointer"
          >
            <Plus size={14} strokeWidth={2} /> Novo Componente
          </button>
        }
      />

      <div className="flex items-center gap-2 flex-wrap mb-4">
        <SearchBar
          value={q}
          onChange={setQ}
          placeholder="Buscar componente"
        />
        <select
          value={productFilter}
          onChange={(e) => {
            const v = e.target.value;
            setProductFilter(v === "all" ? "all" : Number(v));
          }}
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="bg-input-background border border-border px-3 py-2.5 outline-none uppercase tracking-wider text-[11px] focus:border-primary transition-colors duration-100 text-foreground"
        >
          <option value="all">Todos produtos</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="border border-border overflow-x-auto bg-background">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="border-b border-border uppercase tracking-widest text-[9px] opacity-50 text-foreground"
            >
              <th className="px-4 py-3 font-normal">Componente</th>
              <th className="px-4 py-3 font-normal">Produto Pai</th>
              <th className="px-4 py-3 font-normal">Fabricante</th>
              <th className="px-4 py-3 font-normal">Preço Médio</th>
              <th className="px-4 py-3 font-normal text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-foreground">
            {components.map((c) => {
              const productName = products.find((p) => p.id === c.productId)?.name || "N/A";
              const mfgName = manufacturers.find((m) => m.id === c.manufacturerId)?.name || "N/A";

              return (
                <tr
                  key={c.id}
                  className="hover:bg-input-background/40 transition-colors duration-75"
                >
                  <td className="px-4 py-3">
                    <div className="text-[14px] font-medium">{c.name}</div>
                    {c.description && (
                      <div className="text-[11px] opacity-60 max-w-[280px] truncate">
                        {c.description}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Pill tone="muted">{productName}</Pill>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      style={{ fontFamily: "'Space Mono', monospace" }}
                      className="text-[12px]"
                    >
                      {mfgName}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      style={{ fontFamily: "'Space Mono', monospace" }}
                      className="text-[12px]"
                    >
                      {c.averagePrice
                        ? `R$ ${c.averagePrice.toLocaleString("pt-BR")}`
                        : "Sob consulta"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <IconBtn title="Editar" onClick={() => setEditing(c)}>
                        <Pencil size={14} strokeWidth={1.7} />
                      </IconBtn>
                      <IconBtn
                        title="Excluir"
                        danger
                        onClick={() => setConfirmDel(c)}
                      >
                        <Trash2 size={14} strokeWidth={1.7} />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              );
            })}
            {components.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-[13px] opacity-40"
                >
                  Nenhum componente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pages={pages} onPage={setPage} />

      <AnimatePresence>
        {editing && (
          <ComponentEditModal
            component={editing}
            products={products}
            manufacturers={manufacturers}
            onClose={() => setEditing(null)}
            onSave={saveComponent}
          />
        )}

        {confirmDel && (
          <Modal
            title="Excluir componente"
            onClose={() => setConfirmDel(null)}
            footer={
              <>
                <button
                  onClick={() => setConfirmDel(null)}
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className="flex-1 border border-border py-3 uppercase tracking-widest text-[11px] hover:text-primary hover:border-primary transition-colors duration-100 cursor-pointer text-foreground bg-background"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => deleteComponent(confirmDel.id)}
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className="flex-1 bg-destructive text-destructive-foreground py-3 uppercase tracking-widest text-[11px] hover:opacity-90 transition-opacity duration-100 cursor-pointer"
                >
                  Excluir
                </button>
              </>
            }
          >
            <p className="text-[14px] leading-relaxed opacity-80 text-foreground">
              Excluir o componente{" "}
              <span
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="text-primary font-bold"
              >
                {confirmDel.name}
              </span>
              ? Esta ação não pode ser desfeita.
            </p>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
