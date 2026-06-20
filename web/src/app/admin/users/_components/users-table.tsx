"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { UseUsersReturn } from "../_hooks/use-users";
import SearchBar from "../../_components/search-bar";
import Pill from "../../_components/pill";
import Pagination from "../../_components/pagination";
import IconBtn from "../../_components/icon-btn";
import SectionHead from "../../_components/section-head";
import Modal from "../../_components/modal";
import { UserEditModal } from "./user-edit-modal";

export default function UsersTable({
  users,
  q,
  setQ,
  page,
  pages,
  setPage,
  editingUser,
  setEditingUser,
  confirmDel,
  setConfirmDel,
  saveUser,
  deleteUser,
}: UseUsersReturn) {
  const emptyUser = () => ({
    id: 0,
    name: "",
    email: "",
    style: "BASIC" as const,
    permission: "USER" as const,
  });

  return (
    <div>
      <SectionHead
        kicker="Controle"
        title="Usuários"
        action={
          <button
            onClick={() => setEditingUser(emptyUser())}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="bg-primary text-primary-foreground px-5 py-3 uppercase tracking-widest text-[11px] flex items-center gap-2 hover:opacity-90 transition-opacity duration-100 cursor-pointer"
          >
            <Plus size={14} strokeWidth={2} /> Novo Usuário
          </button>
        }
      />

      <div className="flex items-center gap-2 flex-wrap mb-4">
        <SearchBar
          value={q}
          onChange={setQ}
          placeholder="Buscar usuário por nome ou email"
        />
      </div>

      <div className="border border-border overflow-x-auto bg-background">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="border-b border-border uppercase tracking-widest text-[9px] opacity-50 text-foreground"
            >
              <th className="px-4 py-3 font-normal">Nome / Email</th>
              <th className="px-4 py-3 font-normal">Estilo</th>
              <th className="px-4 py-3 font-normal">Permissão</th>
              <th className="px-4 py-3 font-normal text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-foreground">
            {users.map((u) => (
              <tr
                key={u.id}
                className="hover:bg-input-background/40 transition-colors duration-75"
              >
                <td className="px-4 py-3">
                  <div className="text-[14px] font-medium">{u.name}</div>
                  <div
                    style={{ fontFamily: "'Space Mono', monospace" }}
                    className="text-[11px] opacity-50"
                  >
                    {u.email}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Pill tone="muted">{u.style}</Pill>
                </td>
                <td className="px-4 py-3">
                  <Pill tone={u.permission === "ADMIN" ? "accent" : "muted"}>
                    {u.permission}
                  </Pill>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <IconBtn title="Editar" onClick={() => setEditingUser(u)}>
                      <Pencil size={14} strokeWidth={1.7} />
                    </IconBtn>
                    <IconBtn
                      title="Excluir"
                      danger
                      onClick={() => setConfirmDel(u)}
                    >
                      <Trash2 size={14} strokeWidth={1.7} />
                    </IconBtn>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-[13px] opacity-40"
                >
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pages={pages} onPage={setPage} />

      <AnimatePresence>
        {editingUser && (
          <UserEditModal
            isOpen={!!editingUser}
            onClose={() => setEditingUser(null)}
            onSave={saveUser}
            user={editingUser.id === 0 ? null : editingUser}
          />
        )}

        {confirmDel && (
          <Modal
            title="Excluir usuário"
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
                  onClick={() => deleteUser(confirmDel.id)}
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className="flex-1 bg-destructive text-destructive-foreground py-3 uppercase tracking-widest text-[11px] hover:opacity-90 transition-opacity duration-100 cursor-pointer"
                >
                  Excluir
                </button>
              </>
            }
          >
            <p className="text-[14px] leading-relaxed opacity-80 text-foreground">
              Excluir o usuário{" "}
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
