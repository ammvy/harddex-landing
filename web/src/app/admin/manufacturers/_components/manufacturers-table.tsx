"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { UseManufacturersReturn } from "../_hooks/use-manufacturers";
import SearchBar from "../../_components/search-bar";
import Pagination from "../../_components/pagination";
import IconBtn from "../../_components/icon-btn";
import SectionHead from "../../_components/section-head";
import Modal from "../../_components/modal";
import ManufacturerEditModal from "./manufacturer-edit-modal";

export default function ManufacturersTable({
  manufacturers,
  q,
  setQ,
  page,
  pages,
  setPage,
  editing,
  setEditing,
  confirmDel,
  setConfirmDel,
  saveManufacturer,
  deleteManufacturer,
}: UseManufacturersReturn) {
  const emptyManufacturer = () => ({
    id: 0,
    name: "",
  });

  return (
    <div>
      <SectionHead
        kicker="Infraestrutura"
        title="Fabricantes"
        action={
          <button
            onClick={() => setEditing(emptyManufacturer())}
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="bg-primary text-primary-foreground px-5 py-3 uppercase tracking-widest text-[11px] flex items-center gap-2 hover:opacity-90 transition-opacity duration-100 cursor-pointer"
          >
            <Plus size={14} strokeWidth={2} /> Novo Fabricante
          </button>
        }
      />

      <div className="flex items-center gap-2 flex-wrap mb-4">
        <SearchBar
          value={q}
          onChange={setQ}
          placeholder="Buscar fabricante"
        />
      </div>

      <div className="border border-border overflow-x-auto bg-background">
        <table className="w-full min-w-[640px] text-left">
          <thead>
            <tr
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="border-b border-border uppercase tracking-widest text-[9px] opacity-50 text-foreground"
            >
              <th className="px-4 py-3 font-normal">ID</th>
              <th className="px-4 py-3 font-normal">Nome</th>
              <th className="px-4 py-3 font-normal text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-foreground">
            {manufacturers.map((m) => (
              <tr
                key={m.id}
                className="hover:bg-input-background/40 transition-colors duration-75"
              >
                <td className="px-4 py-3">
                  <span
                    style={{ fontFamily: "'Space Mono', monospace" }}
                    className="text-[12px]"
                  >
                    #{m.id}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="text-[14px] font-medium">{m.name}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <IconBtn title="Editar" onClick={() => setEditing(m)}>
                      <Pencil size={14} strokeWidth={1.7} />
                    </IconBtn>
                    <IconBtn
                      title="Excluir"
                      danger
                      onClick={() => setConfirmDel(m)}
                    >
                      <Trash2 size={14} strokeWidth={1.7} />
                    </IconBtn>
                  </div>
                </td>
              </tr>
            ))}
            {manufacturers.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-10 text-center text-[13px] opacity-40"
                >
                  Nenhum fabricante encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={page} pages={pages} onPage={setPage} />

      <AnimatePresence>
        {editing && (
          <ManufacturerEditModal
            manufacturer={editing}
            onClose={() => setEditing(null)}
            onSave={saveManufacturer}
          />
        )}

        {confirmDel && (
          <Modal
            title="Excluir fabricante"
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
                  onClick={() => deleteManufacturer(confirmDel.id)}
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className="flex-1 bg-destructive text-destructive-foreground py-3 uppercase tracking-widest text-[11px] hover:opacity-90 transition-opacity duration-100 cursor-pointer"
                >
                  Excluir
                </button>
              </>
            }
          >
            <p className="text-[14px] leading-relaxed opacity-80 text-foreground">
              Excluir o fabricante{" "}
              <span
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="text-primary font-bold"
              >
                {confirmDel.name}
              </span>
              ? Isso pode afetar componentes associados.
            </p>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
