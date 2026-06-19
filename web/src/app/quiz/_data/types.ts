import { ProfileId } from "@/components/mouse";

export type Level = 1 | 2 | 3;

export type Weights = Partial<Record<ProfileId, number>>;

export interface QOption {
  label: string;
  sub?: string;
  w: Weights;
}

export interface Question {
  id: string;
  level: Level;
  prompt: string;
  hint?: string;
  options: QOption[];
}

export interface LevelInfo {
  code: string;
  level: Level;
  label: string;
  sub: string;
  count: string;
}

export interface ProfileInfo {
  code: string;
  label: string;
  tag: string;
  pitch: string;
  specs: string[];
}

export type Phase = "intro" | "questions" | "result";
