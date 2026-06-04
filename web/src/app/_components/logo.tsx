"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";

type LogoProps = {};

function Logo({}: LogoProps) {
  return (
    <div className={"relative inline-block select-none mb-20"}>
      <span
        style={{
          fontFamily: "'Blanka', 'Space Mono', monospace",
          letterSpacing: "0.02em",
        }}
        className="uppercase text-[clamp(60px,13vw,200px)] leading-[0.85] block text-foreground"
      >
        Hard<span className="text-primary">dex</span>
      </span>
      <motion.span
        aria-hidden
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1], delay: 0.15 }}
        className="absolute left-[-3%] right-[-3%] top-[43%] h-[12%] mix-blend-multiply bg-primary"
      />
    </div>
  );
}

export default dynamic(() => Promise.resolve(Logo), { ssr: false });
