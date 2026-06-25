"use client";

import { useState } from "react";
import { User, UserStyle, Permission } from "../../_types";
import Modal from "../../_components/modal";
import Field from "../../_components/field";

type UserEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (u: User) => void;
  user: User | null;
  isSaving: boolean;
};

export function UserEditModal({
  isOpen,
  onClose,
  onSave,
  user,
  isSaving,
}: UserEditModalProps) {
  const [draft, setDraft] = useState<User>({
    id: user?.id || 0,
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    style: user?.style || "BASIC",
    permission: user?.permission || "USER",
  });

  const isNewUser = !user;
  const isPasswordValid = isNewUser
    ? (draft.password && draft.password.trim().length >= 6)
    : (!draft.password || draft.password.trim().length >= 6);

  const valid =
    draft.name.trim().length >= 2 &&
    draft.email.trim().includes("@") &&
    isPasswordValid;

  const handleSave = () => {
    if (!valid) return;
    onSave({
      ...draft,
      name: draft.name.trim(),
      email: draft.email.trim(),
      password: draft.password?.trim() || undefined,
    });
  };

  if (!isOpen) return null;

  return (
    <Modal
      title={user ? "Editar usuário" : "Novo usuário"}
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
            onClick={handleSave}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="flex-1 bg-primary text-primary-foreground py-3 uppercase tracking-widest text-[11px] hover:opacity-90 transition-opacity duration-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Field label="Nome">
          <input
            disabled={isSaving}
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            className="bg-input-background border border-border px-3 py-2.5 outline-none text-[13px] focus:border-primary transition-colors duration-100 text-foreground placeholder:text-muted-foreground/50 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Ex: Marina Tavares"
          />
        </Field>

        <Field label="Email">
          <input
            type="email"
            disabled={isSaving}
            value={draft.email}
            onChange={(e) => setDraft({ ...draft, email: e.target.value })}
            className="bg-input-background border border-border px-3 py-2.5 outline-none text-[13px] focus:border-primary transition-colors duration-100 text-foreground placeholder:text-muted-foreground/50 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Ex: marina@harddex.io"
          />
        </Field>

        <Field label="Senha">
          <input
            type="password"
            disabled={isSaving}
            value={draft.password || ""}
            onChange={(e) => setDraft({ ...draft, password: e.target.value })}
            className="bg-input-background border border-border px-3 py-2.5 outline-none text-[13px] focus:border-primary transition-colors duration-100 text-foreground placeholder:text-muted-foreground/50 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder={user ? "Em branco para não alterar" : "Senha obrigatória"}
          />
        </Field>

        <Field label="Estilo de Usuário">
          <select
            disabled={isSaving}
            value={draft.style}
            onChange={(e) => setDraft({ ...draft, style: e.target.value as UserStyle })}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="bg-input-background border border-border px-3 py-2.5 outline-none uppercase tracking-wider text-[11px] focus:border-primary transition-colors duration-100 text-foreground w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="BASIC">BASIC</option>
            <option value="INTERMEDIATE">INTERMEDIATE</option>
            <option value="ADVANCED">ADVANCED</option>
            <option value="GAMER">GAMER</option>
            <option value="PROFESSIONAL">PROFESSIONAL</option>
            <option value="REMOTE WORK">REMOTE WORK</option>
            <option value="FILE / MEDIA">FILE / MEDIA</option>
            <option value="MOBILITY">MOBILITY</option>
            <option value="LIGHT TRAVEL">LIGHT TRAVEL</option>
          </select>
        </Field>

        <Field label="Permissão">
          <select
            disabled={isSaving}
            value={draft.permission}
            onChange={(e) => setDraft({ ...draft, permission: e.target.value as Permission })}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="bg-input-background border border-border px-3 py-2.5 outline-none uppercase tracking-wider text-[11px] focus:border-primary transition-colors duration-100 text-foreground w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
            <option value="CURATOR">CURATOR</option>
          </select>
        </Field>
      </div>
    </Modal>
  );
}
