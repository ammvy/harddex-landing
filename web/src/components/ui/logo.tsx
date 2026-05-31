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
      className={cn(
        shareTech.className,
        "logo-bounce inline-block uppercase",
        "text-[64px] sm:text-[96px] md:text-[128px] lg:text-[192px] xl:text-[256px]",
        "-translate-y-4",
        className,
      )}
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
