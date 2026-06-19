import { ProfileId } from "@/components/mouse";

export type Category = "phone" | "laptop";
export type Detail = "basic" | "mid" | "advanced";

export interface PhoneSpecs {
  cpu: string;
  cpuCores: number;
  cpuClock: number;
  process: string;
  gpu: string;
  gpuTflops: number;
  ram: number;
  ramType: string;
  ramSpeed: number;
  storage: number;
  storageType: string;
  read: number;
  write: number;
  display: {
    size: number;
    res: string;
    refresh: number;
    panel: string;
    nits: number;
    gamut: number;
  };
  battery: { capacity: number; life: number; charge: number; wireless: number };
  camera: { main: number; ultra: number; tele: number; videoK: number };
  weight: number;
  dims: string;
  wifi: string;
  bt: string;
  os: string;
  bench: { antutu: number; gbSingle: number; gbMulti: number };
}

export interface LaptopSpecs {
  cpu: string;
  cpuCores: number;
  cpuClock: number;
  process: string;
  tdp: number;
  gpu: string;
  vram: number;
  gpuTflops: number;
  ram: number;
  ramType: string;
  ramSpeed: number;
  storage: number;
  storageType: string;
  read: number;
  write: number;
  display: {
    size: number;
    res: string;
    refresh: number;
    panel: string;
    nits: number;
    gamut: number;
    response: number;
  };
  battery: { capacity: number; life: number; charge: number };
  webcam: { mp: number; ir: boolean };
  weight: number;
  dims: string;
  wifi: string;
  bt: string;
  ports: string[];
  os: string;
  bench: { gbSingle: number; gbMulti: number; threeDmark: number };
}

export interface Device<S = PhoneSpecs | LaptopSpecs> {
  id: string;
  category: Category;
  brand: string;
  model: string;
  year: number;
  price: number;
  overall: number;
  tdu: Partial<Record<ProfileId, number>>;
  accent: string;
  specs: S;
}

export type Better = "higher" | "lower" | "none";

export interface RowSpec {
  label: string;
  hint?: string;
  level: Detail;
  better: Better;
  a: { display: string; raw: number };
  b: { display: string; raw: number };
}
