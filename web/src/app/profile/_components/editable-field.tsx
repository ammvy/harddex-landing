"use client";

import { motion, AnimatePresence } from "motion/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { useEffect, useRef } from "react";

interface EditableFieldProps {
  value: string;
  isEditing: boolean;
  register: UseFormRegisterReturn;
  error?: string;
  onCancel: () => void;
  onSubmit: () => void;
}

export default function EditableField({
  value,
  isEditing,
  register,
  error,
  onCancel,
  onSubmit,
}: EditableFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Combine react-hook-form's ref with our own ref to auto-focus
  const { ref: registerRef, ...registerRest } = register;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Select the text when entering edit mode so they can type immediately
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
    }
  };

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {!isEditing ? (
          <motion.div
            key="display"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="text-[20px] sm:text-[22px] font-medium text-foreground py-1"
          >
            {value}
          </motion.div>
        ) : (
          <motion.div
            key="edit"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="w-full flex flex-col gap-1.5"
          >
            <input
              type="text"
              className="w-full text-[20px] sm:text-[22px] font-medium text-foreground bg-transparent border-b border-primary py-1 outline-none transition-colors duration-100"
              onKeyDown={handleKeyDown}
              {...registerRest}
              ref={(element) => {
                registerRef(element);
                inputRef.current = element;
              }}
            />
            {error && (
              <span
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="text-[10px] text-destructive uppercase tracking-wide mt-1"
              >
                {error}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
