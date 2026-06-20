"use client";

import { motion } from "motion/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Mail, UserStar, ChessQueen } from "lucide-react";
import { User } from "../_types";
import EditableField from "./editable-field";

interface ProfileFieldsProps {
  user: User;
  isEditing: boolean;
  register: UseFormRegisterReturn;
  error?: string;
  onCancelEdit: () => void;
  onSubmit: () => void;
}

export default function ProfileFields({
  user,
  isEditing,
  register,
  error,
  onCancelEdit,
  onSubmit,
}: ProfileFieldsProps) {
  const Mono = { fontFamily: "'Space Mono', monospace" } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.12 }}
      className="border border-border divide-y divide-border bg-card/5"
    >
      {/* Name */}
      <div className="p-5 sm:p-6">
        <div
          style={Mono}
          className="uppercase tracking-widest text-[10px] text-foreground/50 mb-3"
        >
          Nome completo
        </div>
        <EditableField
          value={user.name}
          isEditing={isEditing}
          register={register}
          error={error}
          onCancel={onCancelEdit}
          onSubmit={onSubmit}
        />
      </div>

      {/* Email (read-only) */}
      <div className="p-5 sm:p-6">
        <div
          style={Mono}
          className="uppercase tracking-widest text-[10px] text-foreground/50 mb-3 flex items-center gap-2"
        >
          <Mail size={12} strokeWidth={1.8} /> E-mail
        </div>
        <div
          style={Mono}
          className="text-[14px] flex items-center gap-3 flex-wrap text-foreground"
        >
          <span className="break-all">{user.email}</span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div
          style={Mono}
          className="uppercase tracking-widest text-[10px] text-foreground/50 mb-3 flex items-center gap-2"
        >
          <UserStar size={12} strokeWidth={1.8} />
          <span>Tipo de Uso</span>
        </div>
        <p className="text-[14px] leading-relaxed text-foreground/80 max-w-xl">
          {user.style}
        </p>
      </div>

      <div className="p-5 sm:p-6">
        <div
          style={Mono}
          className="uppercase tracking-widest text-[10px] text-foreground/50 mb-3 flex items-center gap-2"
        >
          <ChessQueen size={12} strokeWidth={1.8} />
          <span>Permissão</span>
        </div>
        <div style={Mono} className="text-[14px] text-foreground">
          {user.permission}
        </div>
      </div>
    </motion.div>
  );
}
