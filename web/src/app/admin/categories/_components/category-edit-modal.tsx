import { useState } from "react";
import { Category } from "../../_types";
import Modal from "../../_components/modal";
import Field from "../../_components/field";

type CategoryEditModalProps = {
  category: Category;
  onClose: () => void;
  onSave: (c: Category) => void;
  isSaving: boolean;
};

export default function CategoryEditModal({
  category,
  onClose,
  onSave,
  isSaving,
}: CategoryEditModalProps) {
  const [draft, setDraft] = useState<Category>({
    id: category.id || 0,
    name: category.name || "",
    color: category.color || "#3D7FFF",
  });

  const valid = draft.name.trim().length >= 2;

  return (
    <Modal
      title={category.id ? "Editar categoria" : "Nova categoria"}
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
          placeholder="Ex: GPU"
        />
      </Field>

      <Field label="Cor (Hex)">
        <div className="flex gap-2 items-center">
          <input
            type="color"
            disabled={isSaving}
            value={draft.color || "#3D7FFF"}
            onChange={(e) => setDraft({ ...draft, color: e.target.value })}
            className="w-10 h-10 border border-border bg-input-background p-1 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <input
            type="text"
            disabled={isSaving}
            value={draft.color || ""}
            onChange={(e) => setDraft({ ...draft, color: e.target.value })}
            className="bg-input-background border border-border px-3 py-2.5 outline-none text-[13px] focus:border-primary transition-colors duration-100 text-foreground w-full font-mono disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="#3D7FFF"
          />
        </div>
      </Field>
    </Modal>
  );
}
