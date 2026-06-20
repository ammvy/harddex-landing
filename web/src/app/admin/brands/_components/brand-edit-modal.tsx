import { useState } from "react";
import { Brand } from "../../_types";
import Modal from "../../_components/modal";
import Field from "../../_components/field";

type BrandEditModalProps = {
  brand: Brand;
  onClose: () => void;
  onSave: (b: Brand) => void;
};

export default function BrandEditModal({
  brand,
  onClose,
  onSave,
}: BrandEditModalProps) {
  const [draft, setDraft] = useState<Brand>({
    id: brand.id || 0,
    name: brand.name || "",
  });

  const valid = draft.name.trim().length >= 2;

  return (
    <Modal
      title={brand.id ? "Editar marca" : "Nova marca"}
      onClose={onClose}
      footer={
        <>
          <button
            onClick={onClose}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="flex-1 border border-border py-3 uppercase tracking-widest text-[11px] hover:text-primary hover:border-primary transition-colors duration-100 cursor-pointer text-foreground bg-background"
          >
            Cancelar
          </button>
          <button
            disabled={!valid}
            onClick={() => onSave({ ...draft, name: draft.name.trim() })}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="flex-1 bg-primary text-primary-foreground py-3 uppercase tracking-widest text-[11px] hover:opacity-90 transition-opacity duration-100 disabled:opacity-40 cursor-pointer"
          >
            Salvar
          </button>
        </>
      }
    >
      <Field label="Nome">
        <input
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          className="bg-input-background border border-border px-3 py-2.5 outline-none text-[13px] focus:border-primary transition-colors duration-100 text-foreground placeholder:text-muted-foreground/50 w-full"
          placeholder="Ex: NVIDIA"
        />
      </Field>
    </Modal>
  );
}
