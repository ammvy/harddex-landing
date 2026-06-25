import { useState } from "react";
import { Product, Brand, Category } from "../../_types";
import Modal from "../../_components/modal";
import Field from "../../_components/field";

type ProductEditModalProps = {
  product: Product;
  brands: Brand[];
  categories: Category[];
  onClose: () => void;
  onSave: (p: Product) => void;
  isSaving: boolean;
};

export default function ProductEditModal({
  product,
  brands,
  categories,
  onClose,
  onSave,
  isSaving,
}: ProductEditModalProps) {
  const [draft, setDraft] = useState<Product>({
    id: product.id || 0,
    name: product.name || "",
    description: product.description || "",
    averagePrice: product.averagePrice || 0,
    brandId: product.brandId || (brands[0]?.id || null),
    categoryId: product.categoryId || (categories[0]?.id || null),
  });

  const valid = draft.name.trim().length >= 2;

  return (
    <Modal
      title={product.id ? "Editar produto" : "Novo produto"}
      onClose={() => !isSaving && onClose()}
      footer={
        <>
          <button
            disabled={isSaving}
            onClick={onClose}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="flex-1 border border-border py-3 uppercase tracking-widest text-[11px] hover:text-primary hover:border-primary transition-colors duration-100 cursor-pointer text-foreground bg-background disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            disabled={!valid || isSaving}
            onClick={() => onSave({ ...draft, name: draft.name.trim() })}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="flex-1 bg-primary text-primary-foreground py-3 uppercase tracking-widest text-[11px] hover:opacity-90 transition-opacity duration-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </>
      }
    >
      <Field label="Nome">
        <input
          disabled={isSaving}
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          className="bg-input-background border border-border px-3 py-2.5 outline-none text-[13px] focus:border-primary transition-colors duration-100 text-foreground placeholder:text-muted-foreground/50 w-full disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Ex: RTX 4070 Super"
        />
      </Field>

      <Field label="Descrição">
        <textarea
          disabled={isSaving}
          value={draft.description || ""}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          className="bg-input-background border border-border px-3 py-2.5 outline-none text-[13px] focus:border-primary transition-colors duration-100 text-foreground placeholder:text-muted-foreground/50 w-full min-h-[80px] disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Descrição do produto..."
        />
      </Field>

      <Field label="Preço Médio (R$)">
        <input
          type="number"
          disabled={isSaving}
          min={0}
          value={draft.averagePrice || 0}
          onChange={(e) => setDraft({ ...draft, averagePrice: Number(e.target.value) })}
          className="bg-input-background border border-border px-3 py-2.5 outline-none text-[13px] focus:border-primary transition-colors duration-100 text-foreground placeholder:text-muted-foreground/50 w-full disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Marca">
          <select
            disabled={isSaving}
            value={draft.brandId || ""}
            onChange={(e) => setDraft({ ...draft, brandId: e.target.value ? Number(e.target.value) : null })}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="bg-input-background border border-border px-3 py-2.5 outline-none text-[11px] focus:border-primary transition-colors duration-100 text-foreground uppercase tracking-wider w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Nenhuma</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Categoria">
          <select
            disabled={isSaving}
            value={draft.categoryId || ""}
            onChange={(e) => setDraft({ ...draft, categoryId: e.target.value ? Number(e.target.value) : null })}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="bg-input-background border border-border px-3 py-2.5 outline-none text-[11px] focus:border-primary transition-colors duration-100 text-foreground uppercase tracking-wider w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Nenhuma</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
      </div>
    </Modal>
  );
}
