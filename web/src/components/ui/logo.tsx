"use client";

import { cn } from "@/lib/utils";
import { Share_Tech } from "next/font/google";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const shareTech = Share_Tech({
  variable: "--font-share-tech",
  weight: "400",
  subsets: ["latin"],
});

type LogoProps = {
  className?: string;
  text?: ReactNode;
};

function Logo({ className, text }: LogoProps) {
  return (
    <div
      className={cn(shareTech.className, "text-[256px] uppercase", className)}
    >
      {text || (
        <>
          Hard <span className="text-primary">Dex</span>
        </>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Logo), { ssr: false });
