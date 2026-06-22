import { ProfileId } from "@/components/mouse";

export const PROFILE_LABELS: Record<ProfileId, string> = {
  GAMER: "Gamer",
  PRO: "Produtividade",
  STUDY: "Estudo",
  CREATIVE: "Criativo",
  DEV: "Dev",
  MOBILE: "Mobilidade",
};

export const STYLE_TO_PROFILE: Record<string, ProfileId> = {
  GAMER: "GAMER",
  PROFESSIONAL: "PRO",
  BASIC: "STUDY",
  INTERMEDIATE: "MOBILE",
  ADVANCED: "DEV",
  "REMOTE WORK": "PRO",
  "FILE / MEDIA": "CREATIVE",
  MOBILITY: "MOBILE",
  "LIGHT TRAVEL": "MOBILE",
};

