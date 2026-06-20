"use client";

import { motion } from "motion/react";
import { MouseAvatar } from "@/app/compare/_components/mouse-avatar";
import { ProfileId } from "@/components/mouse";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfilePhotoProps {
  tdu: ProfileId;
}

export default function ProfilePhoto({ tdu }: ProfilePhotoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 }}
      className={cn(
        "h-full w-full min-h-48 bg-foreground/5 relative flex flex-col items-center justify-center overflow-hidden",
        // "border-2 border-foreground",
      )}
    >
      <MouseAvatar tdu={tdu} isAnimating={false} />
      <Link
        href="/quiz"
        className="absolute max-lg:right-8 bottom-8 text-sm cursor-pointer text-foreground/80 flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Refazer quiz</span>
      </Link>
    </motion.div>
  );
}
