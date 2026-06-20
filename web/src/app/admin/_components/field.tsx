import React from "react";

type FieldProps = {
  label: string;
  children: React.ReactNode;
};

export default function Field({ label, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 mb-4">
      <span
        style={{ fontFamily: "'Space Mono', monospace" }}
        className="uppercase tracking-widest text-[10px] opacity-60"
      >
        {label}
      </span>
      {children}
    </label>
  );
}
