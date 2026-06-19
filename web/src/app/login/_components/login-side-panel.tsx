"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import CatWelcome from "@/components/mouse/cat-welcome";

export default function LoginSidePanel() {
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
      <div className="flex-1 flex items-center justify-center px-10">
        <CatWelcome blink={blink} />
      </div>

      <div
        className="border-t border-background/15 px-10 py-6 grid grid-cols-2 gap-6"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <div>
          <div className="uppercase tracking-widest text-[11px] mt-1.5">
            Compare. <span className="text-primary">Descubra.</span> Resolva.
          </div>
        </div>
      </div>
    </motion.section>
  );
}
