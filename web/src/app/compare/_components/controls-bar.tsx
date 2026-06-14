"use client";

import { Smartphone, Laptop, ChevronDown, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Category, Detail, ProfileId } from "../_data/types";
import { PROFILE_LABELS } from "../_data/profiles";

interface ControlsBarProps {
  category: Category;
  setCategory: (c: Category) => void;
  detail: Detail;
  setDetail: (d: Detail) => void;
  profile: ProfileId | null;
  setProfile: (p: ProfileId | null) => void;
  profileOpen: boolean;
  setProfileOpen: (b: boolean) => void;
}

export function ControlsBar({
  category,
  setCategory,
  detail,
  setDetail,
  profile,
  setProfile,
  profileOpen,
  setProfileOpen,
}: ControlsBarProps) {
  return (
    <div className="mt-10 border border-foreground grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-foreground/15">
      {/* Category */}
      <div className="p-5">
        <div
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="uppercase tracking-widest text-[9px] opacity-50 mb-3"
        >
          Categoria
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "phone" as Category, label: "Celular", Icon: Smartphone },
            { id: "laptop" as Category, label: "Notebook", Icon: Laptop },
          ].map(({ id, label, Icon }) => {
            const active = category === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setCategory(id)}
                className={`border px-3 py-3 flex items-center gap-3 transition-all duration-100 cursor-pointer ${
                  active
                    ? "bg-foreground text-background border-foreground font-bold"
                    : "border-foreground text-foreground bg-transparent hover:border-primary"
                }`}
              >
                <Icon size={16} strokeWidth={1.6} />
                <span
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className="uppercase tracking-widest text-[11px]"
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail */}
      <div className="p-5">
        <div
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="uppercase tracking-widest text-[9px] opacity-50 mb-3"
        >
          Nível de detalhe
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "basic" as Detail, label: "Básico" },
            { id: "mid" as Detail, label: "Intermediário" },
            { id: "advanced" as Detail, label: "Avançado" },
          ].map(({ id, label }) => {
            const active = detail === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setDetail(id)}
                className={`border px-2 py-3 text-center transition-all duration-100 cursor-pointer ${
                  active
                    ? "bg-primary border-primary text-primary-foreground font-bold"
                    : "border-foreground text-foreground bg-transparent hover:border-primary"
                }`}
              >
                <span
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className="uppercase tracking-widest text-[10px]"
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Profile */}
      <div className="p-5 relative">
        <div
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="uppercase tracking-widest text-[9px] opacity-50 mb-3 flex items-center gap-2"
        >
          Perfil TDU{" "}
          <Sparkles size={10} strokeWidth={1.8} className="text-primary" />
        </div>
        <button
          type="button"
          onClick={() => setProfileOpen(!profileOpen)}
          className={`border px-3 py-3 flex items-center justify-between gap-3 w-full hover:border-primary transition-colors duration-100 bg-transparent text-foreground cursor-pointer ${
            profile ? "border-primary" : "border-foreground"
          }`}
        >
          <span
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="uppercase tracking-widest text-[11px]"
          >
            {profile ? PROFILE_LABELS[profile] : "Não definido"}
          </span>
          <ChevronDown
            size={14}
            strokeWidth={1.8}
            className={`transition-transform duration-150 ${profileOpen ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute z-25 left-5 right-5 top-full mt-2 border border-foreground bg-background text-foreground shadow-lg"
            >
              <button
                type="button"
                onClick={() => {
                  setProfile(null);
                  setProfileOpen(false);
                }}
                className="w-full text-left px-4 py-3 border-b border-foreground/10 hover:bg-primary/10 flex items-center justify-between cursor-pointer bg-background text-foreground"
              >
                <span
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className="uppercase tracking-widest text-[11px] opacity-70"
                >
                  Sem perfil (ocultar TDU)
                </span>
                {!profile && (
                  <Check
                    size={14}
                    strokeWidth={2.2}
                    className="text-primary"
                  />
                )}
              </button>
              {(Object.keys(PROFILE_LABELS) as ProfileId[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setProfile(p);
                    setProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 border-b last:border-b-0 border-foreground/10 hover:bg-primary/10 flex items-center justify-between cursor-pointer bg-background text-foreground"
                >
                  <span
                    style={{ fontFamily: "'Space Mono', monospace" }}
                    className="uppercase tracking-widest text-[11px]"
                  >
                    {PROFILE_LABELS[p]}
                  </span>
                  {profile === p && (
                    <Check
                      size={14}
                      strokeWidth={2.2}
                      className="text-primary"
                    />
                  )}
                </button>
              ))}
              <Link
                href="/quiz"
                className="block px-4 py-3 border-t border-foreground/10 hover:text-primary bg-background"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                <span className="uppercase tracking-widest text-[10px]">
                  Não sabe seu perfil? Faça o quiz ↗
                </span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
