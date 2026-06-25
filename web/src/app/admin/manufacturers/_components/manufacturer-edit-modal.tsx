import { useState } from "react";
import { Manufacturer } from "../../_types";
import Modal from "../../_components/modal";
import Field from "../../_components/field";

type ManufacturerEditModalProps = {
  manufacturer: Manufacturer;
  onClose: () => void;
  onSave: (m: Manufacturer) => void;
  isSaving: boolean;
};

export default function ManufacturerEditModal({
  manufacturer,
  onClose,
  onSave,
  isSaving,
}: ManufacturerEditModalProps) {
  const [draft, setDraft] = useState<Manufacturer>({
    id: manufacturer.id || 0,
    name: manufacturer.name || "",
  });

  const valid = draft.name.trim().length >= 2;

  return (
    <Modal
      title={manufacturer.id ? "Editar fabricante" : "Novo fabricante"}
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
          placeholder="Ex: TSMC"
        />
      </Field>
    </Modal>
  );
}
