"use client";

import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Device } from "../_data/types";

interface DevicePickerProps {
  open: boolean;
  onOpenChange: (b: boolean) => void;
  devices: Device[];
  value: Device;
  onPick: (d: Device) => void;
  slot: "A" | "B";
}

export function DevicePicker({
  open,
  onOpenChange,
  devices,
  value,
  onPick,
  slot,
}: DevicePickerProps) {
  return (
    <div className="relative flex-1">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        className="w-full text-left border border-foreground px-4 py-3 flex items-center justify-between gap-3 hover:border-primary transition-colors duration-100 bg-background text-foreground cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* <span
            style={{
              fontFamily: "'Space Mono', monospace",
              background: value.accent,
            }}
            className="w-7 h-7 flex items-center justify-center uppercase tracking-widest text-[10px] text-white shrink-0 font-bold"
          >
            {slot}
          </span> */}
          <div className="min-w-0">
            <div
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="uppercase tracking-widest text-[9px] opacity-50 truncate"
            >
              {value.brand}
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "-0.02em",
              }}
              className="uppercase text-[14px] leading-tight truncate font-medium"
            >
              {value.model}
            </div>
          </div>
        </div>
        <ChevronDown
          size={14}
          strokeWidth={1.8}
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 left-0 right-0 top-full mt-2 border border-foreground bg-background shadow-lg"
          >
            {devices.map((d) => {
              const active = d.id === value.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    onPick(d);
                    onOpenChange(false);
                  }}
                  className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 border-b last:border-b-0 border-foreground/10 hover:bg-primary/10 transition-colors duration-100 bg-background text-foreground cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-2 h-2 shrink-0"
                      style={{ background: d.accent }}
                    />
                    <div className="min-w-0">
                      <div
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          letterSpacing: "-0.02em",
                        }}
                        className="uppercase text-[13px] leading-tight truncate"
                      >
                        {d.brand} {d.model}
                      </div>
                      <div
                        style={{ fontFamily: "'Space Mono', monospace" }}
                        className="uppercase tracking-widest text-[9px] opacity-50"
                      >
                        R$ {d.price.toLocaleString("pt-BR")} · Overall{" "}
                        {d.overall}
                      </div>
                    </div>
                  </div>
                  {active && (
                    <Check
                      size={14}
                      strokeWidth={2.2}
                      className="text-primary"
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
