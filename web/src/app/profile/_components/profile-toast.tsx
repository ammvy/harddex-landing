"use client";

import { motion, AnimatePresence } from "motion/react";
import { Check, X } from "lucide-react";
import { Toast } from "../_types";

interface ProfileToastProps {
  toast: Toast;
}

export default function ProfileToast({ toast }: ProfileToastProps) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
        >
          <div
            style={{ fontFamily: "'Space Mono', monospace" }}
            className={`flex items-center gap-3 px-5 py-3.5 uppercase tracking-widest text-[11px] text-white shadow-lg ${
              toast.kind === "ok" ? "bg-primary" : "bg-destructive"
            }`}
          >
            {toast.kind === "ok" ? (
              <Check size={14} strokeWidth={2} />
            ) : (
              <X size={14} strokeWidth={2} />
            )}
            {toast.msg}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
