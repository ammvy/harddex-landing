"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { UseProductsReturn } from "../_hooks/use-products";
import SearchBar from "../../_components/search-bar";
import Pill from "../../_components/pill";
import Pagination from "../../_components/pagination";
import IconBtn from "../../_components/icon-btn";
import SectionHead from "../../_components/section-head";
import Modal from "../../_components/modal";
import ProductEditModal from "./product-edit-modal";

export default function ProductsTable({
  products,
  brands,
  categories,
  q,
  setQ,
  categoryFilter,
  setCategoryFilter,
  page,
  pages,
  setPage,
  editing,
  setEditing,
  confirmDel,
  setConfirmDel,
  saveProduct,
  deleteProduct,
}: UseProductsReturn) {
  const emptyProduct = () => ({
    id: 0,
    name: "",
    description: "",
    averagePrice: 0,
    brandId: brands[0]?.id || null,
    categoryId: categories[0]?.id || null,
  });

  return (
    <div>
      <SectionHead
        kicker="Catálogo"
        title="Produtos"
        action={
          <button
            onClick={() => setEditing(emptyProduct())}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="bg-primary text-primary-foreground px-5 py-3 uppercase tracking-widest text-[11px] flex items-center gap-2 hover:opacity-90 transition-opacity duration-100 cursor-pointer"
          >
            <Plus size={14} strokeWidth={2} /> Novo Produto
          </button>
        }
      />

      <div className="flex items-center gap-2 flex-wrap mb-4">
        <SearchBar
          value={q}
          onChange={setQ}
          placeholder="Buscar produto ou marca"
        />
        <select
          value={categoryFilter}
          onChange={(e) => {
            const v = e.target.value;
            setCategoryFilter(v === "all" ? "all" : Number(v));
          }}
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="bg-input-background border border-border px-3 py-2.5 outline-none uppercase tracking-wider text-[11px] focus:border-primary transition-colors duration-100 text-foreground"
        >
          <option value="all">Todas categorias</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
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
              <th className="px-4 py-3 font-normal">Produto</th>
              <th className="px-4 py-3 font-normal">Categoria</th>
              <th className="px-4 py-3 font-normal">Preço Médio</th>
              <th className="px-4 py-3 font-normal text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-foreground">
            {products.map((p) => {
              const brandName = brands.find((b) => b.id === p.brandId)?.name || "N/A";
              const catName = categories.find((c) => c.id === p.categoryId)?.name || "N/A";

              return (
                <tr
                  key={p.id}
                  className="hover:bg-input-background/40 transition-colors duration-75"
                >
                  <td className="px-4 py-3">
                    <div className="text-[14px] font-medium">{p.name}</div>
                    <div
                      style={{ fontFamily: "'Space Mono', monospace" }}
                      className="text-[11px] opacity-50"
                    >
                      {brandName}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Pill tone="muted">{catName}</Pill>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      style={{ fontFamily: "'Space Mono', monospace" }}
                      className="text-[12px]"
                    >
                      {p.averagePrice
                        ? `R$ ${p.averagePrice.toLocaleString("pt-BR")}`
                        : "Sob consulta"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <IconBtn title="Editar" onClick={() => setEditing(p)}>
                        <Pencil size={14} strokeWidth={1.7} />
                      </IconBtn>
                      <IconBtn
                        title="Excluir"
                        danger
                        onClick={() => setConfirmDel(p)}
                      >
                        <Trash2 size={14} strokeWidth={1.7} />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-[13px] opacity-40"
                >
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pages={pages} onPage={setPage} />

      <AnimatePresence>
        {editing && (
          <ProductEditModal
            product={editing}
            brands={brands}
            categories={categories}
            onClose={() => setEditing(null)}
            onSave={saveProduct}
          />
        )}

        {confirmDel && (
          <Modal
            title="Excluir produto"
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
                  onClick={() => deleteProduct(confirmDel.id)}
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className="flex-1 bg-destructive text-destructive-foreground py-3 uppercase tracking-widest text-[11px] hover:opacity-90 transition-opacity duration-100 cursor-pointer"
                >
                  Excluir
                </button>
              </>
            }
          >
            <p className="text-[14px] leading-relaxed opacity-80 text-foreground">
              Excluir o produto{" "}
              <span
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="text-primary font-bold"
              >
                {confirmDel.name}
              </span>{" "}
              do catálogo?
            </p>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
