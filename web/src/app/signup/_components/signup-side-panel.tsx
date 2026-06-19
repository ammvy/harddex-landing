"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import CatSignup from "@/components/mouse/cat-signup";

export default function SignupSidePanel() {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="hidden lg:flex col-span-5 bg-foreground text-background relative overflow-hidden flex-col justify-between"
    >
      <div
        className="px-10 pt-10 flex items-center justify-between"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-1.5 h-1.5 block bg-primary"
          />
          <span className="uppercase tracking-widest text-[10px] text-background/70">
            Onboarding
            {/* · 01/02 */}
          </span>
        </div>
        {/* <span className="uppercase tracking-widest text-[10px] text-background/40">
          P-NEW
        </span> */}
      </div>

      <div className="flex-1 flex items-center justify-center px-10">
        <CatSignup blink={blink} />
      </div>

      <div
        className="border-t border-background/15 px-10 py-6"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <div className="uppercase tracking-widest text-[9px] text-background/50 mb-3">
          Próximos passos
        </div>
        <ol className="text-[11px] grid gap-2">
          <li className="flex items-center gap-3">
            <span className="w-5 h-5 flex items-center justify-center text-[9px] bg-primary text-primary-foreground">
              01
            </span>
            <span className="uppercase tracking-widest">Conta criada</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-5 h-5 flex items-center justify-center text-[9px] border border-background/30">
              02
            </span>
            <span className="uppercase tracking-widest opacity-70">
              Quiz de perfil (opcional)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-5 h-5 flex items-center justify-center text-[9px] border border-background/30">
              03
            </span>
            <span className="uppercase tracking-widest opacity-70">
              Comparar hardware
            </span>
          </li>
        </ol>
      </div>
    </motion.section>
  );
}
