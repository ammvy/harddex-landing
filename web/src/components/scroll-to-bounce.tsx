"use client";

import { cn } from '@/lib/utils';
import { ArrowUpIcon, ArrowDownIcon } from '@phosphor-icons/react';

type ScrollToProps = {
  direction: "top" | "bottom";
  containerClassName?: string;
  textClassName?: string;
  iconClassName?: string;
};

export function ScrollToBounce({ direction, containerClassName, textClassName, iconClassName }: ScrollToProps) {
  const translate = {
    top: "cima",
    bottom: "baixo",
  };
  return (
    <div className={cn("flex flex-col items-center gap-2 animate-bounce", containerClassName)}>
      <p className={cn("text-gray-400 uppercase text-sm", textClassName)}>Role para {translate[direction]}</p>
      {direction === "top" ? <ArrowUpIcon className={cn("text-gray-400", iconClassName)} /> : <ArrowDownIcon className={cn("text-gray-400", iconClassName)} />}
    </div>
  );
}
