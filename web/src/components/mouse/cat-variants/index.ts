"use client";

import { JSX } from "react";
import { GamerCat, GamerMiniCat } from "./gamer";
import { ProCat, ProMiniCat } from "./pro";
import { StudyCat, StudyMiniCat } from "./study";
import { CreativeCat, CreativeMiniCat } from "./creative";
import { DevCat, DevMiniCat } from "./dev";
import { MobileCat, MobileMiniCat } from "./mobile";

export type ProfileId =
  | "GAMER"
  | "PRO"
  | "STUDY"
  | "CREATIVE"
  | "DEV"
  | "MOBILE";

export const CATS: Record<
  ProfileId,
  (props: { className?: string }) => JSX.Element
> = {
  GAMER: GamerCat,
  PRO: ProCat,
  STUDY: StudyCat,
  CREATIVE: CreativeCat,
  DEV: DevCat,
  MOBILE: MobileCat,
};

export const MINI_CATS: Record<
  ProfileId,
  (props: { className?: string }) => JSX.Element
> = {
  GAMER: GamerMiniCat,
  PRO: ProMiniCat,
  STUDY: StudyMiniCat,
  CREATIVE: CreativeMiniCat,
  DEV: DevMiniCat,
  MOBILE: MobileMiniCat,
};
