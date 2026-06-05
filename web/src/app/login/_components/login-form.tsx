"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for authenticating can go here
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="uppercase tracking-widest text-[10px] text-foreground/60"
        >
          E-mail
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="bg-input-background border border-foreground px-4 py-3.5 outline-none uppercase tracking-widest text-[12px] focus:border-primary placeholder:text-muted-foreground/50 transition-colors duration-100"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="uppercase tracking-widest text-[10px] text-foreground/60 flex justify-between"
        >
          <span>Senha</span>
          {/* <a
            href="#"
            className="hover:text-primary transition-colors duration-100"
          >
            Esqueci ↗
          </a> */}
        </span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="bg-input-background border border-foreground px-4 py-3.5 outline-none uppercase tracking-widest text-[12px] focus:border-primary placeholder:text-muted-foreground/50 transition-colors duration-100"
        />
      </label>

      <button
        type="submit"
        style={{ fontFamily: "'Space Mono', monospace" }}
        className="bg-foreground text-background px-5 py-4 uppercase tracking-widest text-[12px] flex items-center justify-between hover:bg-primary transition-colors duration-100 mt-2 cursor-pointer dark:hover:text-foreground"
      >
        <span>Entrar no Sistema</span>
        <ArrowRight size={14} strokeWidth={1.6} />
      </button>
    </form>
  );
}
