import { useState } from "react";
import { Component, Product, Manufacturer } from "../../_types";
import Modal from "../../_components/modal";
import Field from "../../_components/field";

type ComponentEditModalProps = {
  component: Component;
  products: Product[];
  manufacturers: Manufacturer[];
  onClose: () => void;
  onSave: (c: Component) => void;
  isSaving: boolean;
};

export default function ComponentEditModal({
  component,
  products,
  manufacturers,
  onClose,
  onSave,
  isSaving,
}: ComponentEditModalProps) {
  const [draft, setDraft] = useState<Component>({
    id: component.id || 0,
    name: component.name || "",
    specification: component.specification || {},
    description: component.description || "",
    averagePrice: component.averagePrice || 0,
    productId: component.productId || (products[0]?.id || 0),
    typeId: component.typeId || null,
    manufacturerId: component.manufacturerId || (manufacturers[0]?.id || null),
  });

  const [specText, setSpecText] = useState(JSON.stringify(draft.specification || {}, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);

  const handleSpecChange = (text: string) => {
    setSpecText(text);
    try {
      const parsed = JSON.parse(text);
      setDraft((prev) => ({ ...prev, specification: parsed }));
      setJsonError(null);
    } catch (e) {
      setJsonError("JSON inválido");
    }
  };

  const valid = draft.name.trim().length >= 2 && draft?.productId && draft.productId > 0 && !jsonError;

  return (
    <Modal
      title={component.id ? "Editar componente" : "Novo componente"}
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
          placeholder="Ex: Chip Gráfico AD104"
        />
      </Field>

      <Field label="Especificação (JSON)">
        <textarea
          disabled={isSaving}
          value={specText}
          onChange={(e) => handleSpecChange(e.target.value)}
          className={`bg-input-background border ${
            jsonError ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
          } px-3 py-2.5 outline-none text-[12px] font-mono transition-colors duration-100 text-foreground w-full min-h-[100px] disabled:opacity-50 disabled:cursor-not-allowed`}
          placeholder='{\n  "Cores": "8",\n  "Clock": "3.5GHz"\n}'
        />
        {jsonError && <span className="text-[10px] text-destructive font-mono uppercase">{jsonError}</span>}
      </Field>

      <Field label="Descrição">
        <textarea
          disabled={isSaving}
          value={draft.description || ""}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          className="bg-input-background border border-border px-3 py-2.5 outline-none text-[13px] focus:border-primary transition-colors duration-100 text-foreground placeholder:text-muted-foreground/50 w-full min-h-[80px] disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Descrição do componente..."
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
        <Field label="Produto Pai">
          <select
            disabled={isSaving}
            value={draft.productId}
            onChange={(e) => setDraft({ ...draft, productId: Number(e.target.value) })}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="bg-input-background border border-border px-3 py-2.5 outline-none text-[11px] focus:border-primary transition-colors duration-100 text-foreground uppercase tracking-wider w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Fabricante">
          <select
            disabled={isSaving}
            value={draft.manufacturerId || ""}
            onChange={(e) => setDraft({ ...draft, manufacturerId: e.target.value ? Number(e.target.value) : null })}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="bg-input-background border border-border px-3 py-2.5 outline-none text-[11px] focus:border-primary transition-colors duration-100 text-foreground uppercase tracking-wider w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Nenhum</option>
            {manufacturers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </Field>
      </div>
    </Modal>
  );
}
