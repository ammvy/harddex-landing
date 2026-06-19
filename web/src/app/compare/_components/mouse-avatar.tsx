"use client";

import { CATS, ProfileId } from "@/components/mouse";

interface MouseAvatarProps {
  tdu: ProfileId;
  isAnimating: boolean;
}

export function MouseAvatar({ tdu, isAnimating }: MouseAvatarProps) {
  return (
    <div className="flex flex-col items-center gap-2 w-full md:w-fit shrink-0">
      <div
        className={`w-28 h-28 md:w-32 md:h-32 shrink-0 ${
          isAnimating ? "animate-wobble-mouse-fast" : "animate-wobble-mouse"
        }`}
      >
        {(() => {
          const CatComponent = CATS[tdu];
          return CatComponent ? <CatComponent /> : null;
        })()}
      </div>
      {/* <div
        style={{ fontFamily: "'Space Mono', monospace" }}
        className="uppercase tracking-widest text-[9px] bg-foreground text-background px-2 py-0.5 font-bold"
      >
        Mouse Bot
      </div> */}
    </div>
  );
}
