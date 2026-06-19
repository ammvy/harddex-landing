"use client";

import { motion } from "motion/react";
import { MouseAvatar } from "@/app/compare/_components/mouse-avatar";
import { ProfileId } from "@/components/mouse";

interface ProfilePhotoProps {
  tdu: ProfileId;
}

export default function ProfilePhoto({ tdu }: ProfilePhotoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 }}
      className="border-8 border-foreground h-full w-full bg-foreground/5 relative flex items-center justify-center overflow-hidden "
    >
      <MouseAvatar tdu={tdu} isAnimating={false} />
    </motion.div>
  );
}
