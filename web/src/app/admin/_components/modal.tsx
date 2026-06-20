import React from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";

type ModalProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function Modal({ title, onClose, children, footer }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/55"
      />
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md bg-background text-foreground border border-border max-h-[90vh] overflow-auto"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="uppercase tracking-widest text-[12px]"
          >
            {title}
          </span>
          <button
            onClick={onClose}
            className="hover:text-primary transition-colors duration-100 cursor-pointer"
          >
            <X size={16} strokeWidth={1.8} />
          </button>
        </div>
        <div className="p-5">{children}</div>
        {footer && (
          <div className="flex gap-2 border-t border-border p-4 bg-background">
            {footer}
          </div>
        )}
      </motion.div>
    </div>
  );
}
