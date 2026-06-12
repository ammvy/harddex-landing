"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Sun,
  Moon,
  ArrowLeft,
  Smartphone,
  Laptop,
  Lock,
  ChevronDown,
  Check,
  Info,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const ACCENT = "#3D7FFF";

type Category = "phone" | "laptop";
type Detail = "basic" | "mid" | "advanced";
type ProfileId = "gamer" | "pro" | "study" | "creative" | "dev" | "mobile";

const PROFILE_LABELS: Record<ProfileId, string> = {
  gamer: "Gamer",
  pro: "Produtividade",
  study: "Estudo",
  creative: "Criativo",
  dev: "Dev",
  mobile: "Mobilidade",
};

interface PhoneSpecs {
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

interface LaptopSpecs {
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

interface Device<S = PhoneSpecs | LaptopSpecs> {
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

const PHONES: Device<PhoneSpecs>[] = [
  {
    id: "nyx-n9p",
    category: "phone",
    brand: "Nyx",
    model: "N9 Pro",
    year: 2026,
    price: 6499,
    overall: 91,
    tdu: { gamer: 94, mobile: 84, creative: 89, pro: 82, study: 74, dev: 70 },
    accent: "#3D7FFF",
    specs: {
      cpu: "Cipher X3 Ultra",
      cpuCores: 8,
      cpuClock: 3.45,
      process: "3 nm",
      gpu: "Cipher GPU U920",
      gpuTflops: 2.9,
      ram: 12,
      ramType: "LPDDR5X",
      ramSpeed: 8533,
      storage: 256,
      storageType: "UFS 4.0",
      read: 4100,
      write: 3850,
      display: {
        size: 6.7,
        res: "1440 × 3200",
        refresh: 144,
        panel: "LTPO AMOLED",
        nits: 2400,
        gamut: 100,
      },
      battery: { capacity: 5200, life: 22, charge: 100, wireless: 50 },
      camera: { main: 50, ultra: 50, tele: 64, videoK: 8 },
      weight: 198,
      dims: "162 × 75 × 8.1 mm",
      wifi: "Wi-Fi 7",
      bt: "5.4",
      os: "Android 15",
      bench: { antutu: 2_180_000, gbSingle: 2680, gbMulti: 8920 },
    },
  },
  {
    id: "aura-e7",
    category: "phone",
    brand: "Aura",
    model: "Edge 7",
    year: 2026,
    price: 5299,
    overall: 87,
    tdu: { creative: 90, pro: 86, mobile: 84, gamer: 82, study: 78, dev: 72 },
    accent: "#9D7FFF",
    specs: {
      cpu: "Halo H8",
      cpuCores: 8,
      cpuClock: 3.2,
      process: "4 nm",
      gpu: "Halo GPU 740",
      gpuTflops: 2.3,
      ram: 12,
      ramType: "LPDDR5",
      ramSpeed: 7500,
      storage: 256,
      storageType: "UFS 4.0",
      read: 3700,
      write: 3300,
      display: {
        size: 6.55,
        res: "1440 × 3120",
        refresh: 120,
        panel: "LTPO AMOLED",
        nits: 2200,
        gamut: 100,
      },
      battery: { capacity: 4900, life: 21, charge: 80, wireless: 30 },
      camera: { main: 64, ultra: 48, tele: 12, videoK: 8 },
      weight: 188,
      dims: "159 × 73 × 7.9 mm",
      wifi: "Wi-Fi 6E",
      bt: "5.4",
      os: "Android 15",
      bench: { antutu: 1_750_000, gbSingle: 2380, gbMulti: 7350 },
    },
  },
  {
    id: "vector-v12",
    category: "phone",
    brand: "Vector",
    model: "V12 Lite",
    year: 2025,
    price: 2899,
    overall: 76,
    tdu: { mobile: 85, study: 82, pro: 74, gamer: 64, creative: 62, dev: 58 },
    accent: "#FF7F50",
    specs: {
      cpu: "Argon 720",
      cpuCores: 8,
      cpuClock: 2.85,
      process: "6 nm",
      gpu: "Argon Mali-720",
      gpuTflops: 1.2,
      ram: 8,
      ramType: "LPDDR5",
      ramSpeed: 6400,
      storage: 128,
      storageType: "UFS 3.1",
      read: 2100,
      write: 1700,
      display: {
        size: 6.4,
        res: "1080 × 2400",
        refresh: 120,
        panel: "AMOLED",
        nits: 1400,
        gamut: 95,
      },
      battery: { capacity: 5500, life: 26, charge: 67, wireless: 0 },
      camera: { main: 48, ultra: 8, tele: 0, videoK: 4 },
      weight: 192,
      dims: "160 × 74 × 8.3 mm",
      wifi: "Wi-Fi 6",
      bt: "5.3",
      os: "Android 14",
      bench: { antutu: 720_000, gbSingle: 1140, gbMulti: 3260 },
    },
  },
  {
    id: "kairo-k3",
    category: "phone",
    brand: "Kairo",
    model: "K3 Air",
    year: 2026,
    price: 4199,
    overall: 81,
    tdu: { mobile: 92, study: 86, pro: 80, creative: 72, gamer: 68, dev: 62 },
    accent: "#22C55E",
    specs: {
      cpu: "Halo H6",
      cpuCores: 8,
      cpuClock: 3.0,
      process: "4 nm",
      gpu: "Halo GPU 620",
      gpuTflops: 1.7,
      ram: 8,
      ramType: "LPDDR5",
      ramSpeed: 6400,
      storage: 256,
      storageType: "UFS 3.1",
      read: 2900,
      write: 2400,
      display: {
        size: 6.1,
        res: "1080 × 2400",
        refresh: 120,
        panel: "LTPO OLED",
        nits: 1800,
        gamut: 100,
      },
      battery: { capacity: 4400, life: 28, charge: 45, wireless: 15 },
      camera: { main: 48, ultra: 13, tele: 0, videoK: 4 },
      weight: 168,
      dims: "147 × 71 × 7.5 mm",
      wifi: "Wi-Fi 6E",
      bt: "5.3",
      os: "Android 15",
      bench: { antutu: 1_180_000, gbSingle: 1850, gbMulti: 5240 },
    },
  },
];

const LAPTOPS: Device<LaptopSpecs>[] = [
  {
    id: "forge-x9",
    category: "laptop",
    brand: "Forge",
    model: "X9",
    year: 2026,
    price: 18999,
    overall: 92,
    tdu: { gamer: 95, creative: 90, dev: 84, pro: 78, study: 64, mobile: 48 },
    accent: "#3D7FFF",
    specs: {
      cpu: "Cipher CX-14 HX",
      cpuCores: 16,
      cpuClock: 5.4,
      process: "3 nm",
      tdp: 65,
      gpu: "Cipher RX 5080 Mobile",
      vram: 16,
      gpuTflops: 32.5,
      ram: 32,
      ramType: "DDR5",
      ramSpeed: 6400,
      storage: 1024,
      storageType: "NVMe Gen4",
      read: 7200,
      write: 6400,
      display: {
        size: 16,
        res: "2560 × 1600",
        refresh: 240,
        panel: "Mini-LED",
        nits: 1000,
        gamut: 100,
        response: 3,
      },
      battery: { capacity: 99, life: 5, charge: 280 },
      webcam: { mp: 2, ir: true },
      weight: 2.4,
      dims: "356 × 264 × 22 mm",
      wifi: "Wi-Fi 7",
      bt: "5.4",
      ports: ["2× Thunderbolt 4", "2× USB-A", "HDMI 2.1", "RJ-45", "SD"],
      os: "Windows 11 Pro",
      bench: { gbSingle: 3120, gbMulti: 21400, threeDmark: 24800 },
    },
  },
  {
    id: "prism-15",
    category: "laptop",
    brand: "Prism",
    model: "15 Studio",
    year: 2026,
    price: 14299,
    overall: 88,
    tdu: { creative: 94, pro: 86, dev: 80, gamer: 74, study: 72, mobile: 64 },
    accent: "#9D7FFF",
    specs: {
      cpu: "Halo HX-12",
      cpuCores: 14,
      cpuClock: 5.1,
      process: "4 nm",
      tdp: 45,
      gpu: "Cipher RX 5070 Mobile",
      vram: 12,
      gpuTflops: 22.4,
      ram: 32,
      ramType: "DDR5",
      ramSpeed: 5600,
      storage: 1024,
      storageType: "NVMe Gen4",
      read: 6800,
      write: 5400,
      display: {
        size: 15.6,
        res: "2880 × 1800",
        refresh: 120,
        panel: "OLED",
        nits: 600,
        gamut: 100,
        response: 1,
      },
      battery: { capacity: 86, life: 9, charge: 140 },
      webcam: { mp: 5, ir: true },
      weight: 1.9,
      dims: "344 × 240 × 17 mm",
      wifi: "Wi-Fi 7",
      bt: "5.3",
      ports: ["2× Thunderbolt 4", "USB-A", "HDMI 2.1", "SD"],
      os: "Windows 11 Pro",
      bench: { gbSingle: 2780, gbMulti: 17600, threeDmark: 16200 },
    },
  },
  {
    id: "stack-pro",
    category: "laptop",
    brand: "Stack",
    model: "Pro 16",
    year: 2026,
    price: 16499,
    overall: 89,
    tdu: { dev: 95, pro: 90, creative: 84, study: 78, gamer: 72, mobile: 60 },
    accent: "#22C55E",
    specs: {
      cpu: "Halo HX-12 Workstation",
      cpuCores: 14,
      cpuClock: 4.9,
      process: "4 nm",
      tdp: 55,
      gpu: "Cipher RX 5060 Mobile",
      vram: 8,
      gpuTflops: 14.8,
      ram: 64,
      ramType: "DDR5 ECC",
      ramSpeed: 5600,
      storage: 2048,
      storageType: "NVMe Gen4",
      read: 7000,
      write: 5800,
      display: {
        size: 16,
        res: "2560 × 1600",
        refresh: 120,
        panel: "IPS",
        nits: 500,
        gamut: 100,
        response: 5,
      },
      battery: { capacity: 90, life: 10, charge: 150 },
      webcam: { mp: 5, ir: true },
      weight: 2.1,
      dims: "358 × 248 × 18 mm",
      wifi: "Wi-Fi 7",
      bt: "5.4",
      ports: ["2× Thunderbolt 4", "2× USB-A", "HDMI 2.1", "RJ-45", "SD"],
      os: "Linux / Win 11 Pro",
      bench: { gbSingle: 2740, gbMulti: 18900, threeDmark: 11800 },
    },
  },
  {
    id: "plane-air",
    category: "laptop",
    brand: "Plane",
    model: "Air 14",
    year: 2026,
    price: 9499,
    overall: 82,
    tdu: { mobile: 94, study: 90, pro: 84, creative: 70, dev: 66, gamer: 52 },
    accent: "#FF7F50",
    specs: {
      cpu: "Argon U-10",
      cpuCores: 10,
      cpuClock: 4.6,
      process: "5 nm",
      tdp: 15,
      gpu: "Argon iGPU 780M",
      vram: 0,
      gpuTflops: 3.4,
      ram: 16,
      ramType: "LPDDR5X",
      ramSpeed: 7500,
      storage: 512,
      storageType: "NVMe Gen4",
      read: 5200,
      write: 4100,
      display: {
        size: 14,
        res: "2240 × 1400",
        refresh: 120,
        panel: "IPS",
        nits: 500,
        gamut: 100,
        response: 5,
      },
      battery: { capacity: 70, life: 18, charge: 65 },
      webcam: { mp: 2, ir: true },
      weight: 1.24,
      dims: "312 × 219 × 14 mm",
      wifi: "Wi-Fi 6E",
      bt: "5.3",
      ports: ["2× USB-C", "USB-A", "HDMI 1.4"],
      os: "Windows 11 Home",
      bench: { gbSingle: 2410, gbMulti: 11800, threeDmark: 3950 },
    },
  },
];

function Logo({ fg }: { fg: string }) {
  return (
    <div className="relative inline-block select-none">
      <span
        style={{
          fontFamily: "'Blanka', 'Space Mono', monospace",
          letterSpacing: "0.02em",
          color: fg,
        }}
        className="uppercase text-[clamp(28px,3vw,40px)] leading-[0.85] block"
      >
        Hard<span style={{ color: ACCENT }}>dex</span>
      </span>
      <span
        aria-hidden
        style={{ background: ACCENT }}
        className="absolute left-[-3%] right-[-3%] top-[43%] h-[12%] mix-blend-multiply"
      />
    </div>
  );
}

function DeviceGlyph({ d }: { d: Device }) {
  if (d.category === "phone") {
    return (
      <svg viewBox="0 0 80 120" className="w-full h-auto max-w-[70px]">
        <rect x="10" y="6" width="60" height="108" rx="10" fill="#0A0A0A" />
        <rect x="14" y="12" width="52" height="92" rx="3" fill="#1A1A1A" />
        <rect
          x="14"
          y="12"
          width="52"
          height="92"
          rx="3"
          fill={d.accent}
          opacity="0.18"
        />
        <rect x="34" y="14" width="12" height="3" rx="1.5" fill="#0A0A0A" />
        <rect
          x="20"
          y="24"
          width="40"
          height="6"
          fill={d.accent}
          opacity="0.85"
        />
        <rect
          x="20"
          y="34"
          width="28"
          height="3"
          fill={d.accent}
          opacity="0.4"
        />
        <rect
          x="20"
          y="40"
          width="22"
          height="3"
          fill={d.accent}
          opacity="0.4"
        />
        <circle cx="40" cy="110" r="1.5" fill="#0A0A0A" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 140 100" className="w-full h-auto max-w-[100px]">
      <path d="M 18 12 L 122 12 L 130 78 L 10 78 Z" fill="#0A0A0A" />
      <rect x="24" y="18" width="92" height="54" fill="#1A1A1A" />
      <rect
        x="24"
        y="18"
        width="92"
        height="54"
        fill={d.accent}
        opacity="0.18"
      />
      <rect
        x="30"
        y="26"
        width="40"
        height="6"
        fill={d.accent}
        opacity="0.85"
      />
      <rect x="30" y="36" width="60" height="3" fill={d.accent} opacity="0.4" />
      <rect x="30" y="42" width="48" height="3" fill={d.accent} opacity="0.4" />
      <rect x="0" y="78" width="140" height="12" rx="2" fill="#0F0F0F" />
      <rect x="58" y="82" width="24" height="3" rx="1.5" fill="#1A1A1A" />
    </svg>
  );
}

function ScoreRing({
  value,
  size,
  color,
  locked = false,
}: {
  value: number;
  size: number;
  color: string;
  locked?: boolean;
}) {
  const r = size / 2 - 5;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="3"
          fill="none"
        />
        {!locked && (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c * (1 - value / 100) }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        {locked ? (
          <Lock size={size * 0.32} strokeWidth={1.6} className="opacity-40" />
        ) : (
          <span
            style={{ fontSize: size * 0.34, lineHeight: 1, color }}
            className="font-bold"
          >
            {value}
          </span>
        )}
      </div>
    </div>
  );
}

function DevicePicker({
  open,
  onOpenChange,
  devices,
  value,
  onPick,
  dark,
  slot,
}: {
  open: boolean;
  onOpenChange: (b: boolean) => void;
  devices: Device[];
  value: Device;
  onPick: (d: Device) => void;
  dark: boolean;
  slot: "A" | "B";
}) {
  const border = dark ? "border-white" : "border-black";
  const surface = dark ? "bg-[#0E0E0E]" : "bg-white";
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        className={`w-full text-left border ${border} px-4 py-3 flex items-center justify-between gap-3 hover:border-[#3D7FFF] transition-colors duration-100`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              background: value.accent,
            }}
            className="w-7 h-7 flex items-center justify-center uppercase tracking-widest text-[10px] text-white shrink-0"
          >
            {slot}
          </span>
          <div className="min-w-0">
            <div
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="uppercase tracking-widest text-[9px] opacity-50 truncate"
            >
              {value.brand}
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "-0.02em",
              }}
              className="uppercase text-[14px] leading-tight truncate"
            >
              {value.model}
            </div>
          </div>
        </div>
        <ChevronDown
          size={14}
          strokeWidth={1.8}
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-30 left-0 right-0 top-full mt-2 border ${border} ${surface} shadow-lg`}
          >
            {devices.map((d) => {
              const active = d.id === value.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    onPick(d);
                    onOpenChange(false);
                  }}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between gap-3 border-b last:border-b-0 ${dark ? "border-white/10" : "border-black/10"} hover:bg-[#3D7FFF]/10 transition-colors duration-100`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-2 h-2 shrink-0"
                      style={{ background: d.accent }}
                    />
                    <div className="min-w-0">
                      <div
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          letterSpacing: "-0.02em",
                        }}
                        className="uppercase text-[13px] leading-tight truncate"
                      >
                        {d.brand} {d.model}
                      </div>
                      <div
                        style={{ fontFamily: "'Space Mono', monospace" }}
                        className="uppercase tracking-widest text-[9px] opacity-50"
                      >
                        R$ {d.price.toLocaleString("pt-BR")} · Overall{" "}
                        {d.overall}
                      </div>
                    </div>
                  </div>
                  {active && (
                    <Check
                      size={14}
                      strokeWidth={2.2}
                      style={{ color: ACCENT }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type Better = "higher" | "lower" | "none";

interface RowSpec {
  label: string;
  hint?: string;
  level: Detail;
  better: Better;
  a: { display: string; raw: number };
  b: { display: string; raw: number };
}

function detailOrder(d: Detail): number {
  return d === "basic" ? 1 : d === "mid" ? 2 : 3;
}

function shouldShow(rowLevel: Detail, currentLevel: Detail): boolean {
  return detailOrder(rowLevel) <= detailOrder(currentLevel);
}

function buildPhoneRows(
  a: Device<PhoneSpecs>,
  b: Device<PhoneSpecs>,
): { section: string; rows: RowSpec[] }[] {
  const sa = a.specs;
  const sb = b.specs;
  return [
    {
      section: "Desempenho",
      rows: [
        {
          label: "Processador",
          hint: "O 'cérebro' do aparelho — quanto mais núcleos e maior o clock, mais coisas ele faz ao mesmo tempo.",
          level: "basic",
          better: "none",
          a: { display: sa.cpu, raw: 0 },
          b: { display: sb.cpu, raw: 0 },
        },
        {
          label: "Núcleos / Clock",
          hint: "Núcleos = quantas tarefas simultâneas; clock (GHz) = velocidade de cada uma.",
          level: "mid",
          better: "higher",
          a: {
            display: `${sa.cpuCores} · ${sa.cpuClock} GHz`,
            raw: sa.cpuClock * sa.cpuCores,
          },
          b: {
            display: `${sb.cpuCores} · ${sb.cpuClock} GHz`,
            raw: sb.cpuClock * sb.cpuCores,
          },
        },
        {
          label: "Processo de fabricação",
          hint: "Nanômetros — quanto menor, mais eficiente em consumo e calor.",
          level: "advanced",
          better: "lower",
          a: { display: sa.process, raw: parseFloat(sa.process) },
          b: { display: sb.process, raw: parseFloat(sb.process) },
        },
        {
          label: "GPU",
          hint: "Placa gráfica — responsável por jogos e efeitos de tela.",
          level: "basic",
          better: "none",
          a: { display: sa.gpu, raw: 0 },
          b: { display: sb.gpu, raw: 0 },
        },
        {
          label: "GPU (TFLOPS)",
          hint: "Trilhões de operações por segundo — métrica bruta de potência gráfica.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.gpuTflops}`, raw: sa.gpuTflops },
          b: { display: `${sb.gpuTflops}`, raw: sb.gpuTflops },
        },
        {
          label: "Memória RAM",
          hint: "Memória de curto prazo — mais RAM = mais apps abertos sem travar.",
          level: "basic",
          better: "higher",
          a: { display: `${sa.ram} GB ${sa.ramType}`, raw: sa.ram },
          b: { display: `${sb.ram} GB ${sb.ramType}`, raw: sb.ram },
        },
        {
          label: "Velocidade RAM",
          hint: "Quanto mais alto o MHz, mais rápida a troca de dados.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.ramSpeed} MHz`, raw: sa.ramSpeed },
          b: { display: `${sb.ramSpeed} MHz`, raw: sb.ramSpeed },
        },
        {
          label: "AnTuTu",
          hint: "Benchmark sintético que mede desempenho geral. Maior = melhor.",
          level: "advanced",
          better: "higher",
          a: {
            display: sa.bench.antutu.toLocaleString("pt-BR"),
            raw: sa.bench.antutu,
          },
          b: {
            display: sb.bench.antutu.toLocaleString("pt-BR"),
            raw: sb.bench.antutu,
          },
        },
        {
          label: "Geekbench (single / multi)",
          hint: "Mede CPU em uma e várias tarefas em paralelo.",
          level: "advanced",
          better: "higher",
          a: {
            display: `${sa.bench.gbSingle} / ${sa.bench.gbMulti}`,
            raw: sa.bench.gbMulti,
          },
          b: {
            display: `${sb.bench.gbSingle} / ${sb.bench.gbMulti}`,
            raw: sb.bench.gbMulti,
          },
        },
      ],
    },
    {
      section: "Tela",
      rows: [
        {
          label: "Tamanho",
          hint: "Diagonal da tela em polegadas.",
          level: "basic",
          better: "none",
          a: { display: `${sa.display.size}"`, raw: sa.display.size },
          b: { display: `${sb.display.size}"`, raw: sb.display.size },
        },
        {
          label: "Resolução",
          hint: "Quantidade de pixels — maior = imagem mais nítida.",
          level: "basic",
          better: "none",
          a: { display: sa.display.res, raw: 0 },
          b: { display: sb.display.res, raw: 0 },
        },
        {
          label: "Taxa de atualização",
          hint: "Hz — quantas vezes a tela atualiza por segundo. Maior = animações mais fluidas.",
          level: "basic",
          better: "higher",
          a: { display: `${sa.display.refresh} Hz`, raw: sa.display.refresh },
          b: { display: `${sb.display.refresh} Hz`, raw: sb.display.refresh },
        },
        {
          label: "Tipo de painel",
          hint: "OLED = pretos perfeitos e contraste maior. LTPO economiza bateria.",
          level: "mid",
          better: "none",
          a: { display: sa.display.panel, raw: 0 },
          b: { display: sb.display.panel, raw: 0 },
        },
        {
          label: "Brilho de pico",
          hint: "Nits — quanto maior, melhor a leitura sob sol forte.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.display.nits} nits`, raw: sa.display.nits },
          b: { display: `${sb.display.nits} nits`, raw: sb.display.nits },
        },
        {
          label: "Cobertura DCI-P3",
          hint: "Quanto do espaço de cor profissional a tela reproduz. Importante pra foto/vídeo.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.display.gamut}%`, raw: sa.display.gamut },
          b: { display: `${sb.display.gamut}%`, raw: sb.display.gamut },
        },
      ],
    },
    {
      section: "Bateria & Carregamento",
      rows: [
        {
          label: "Capacidade",
          hint: "mAh — reserva de energia. Não é uma medida absoluta de duração.",
          level: "basic",
          better: "higher",
          a: {
            display: `${sa.battery.capacity} mAh`,
            raw: sa.battery.capacity,
          },
          b: {
            display: `${sb.battery.capacity} mAh`,
            raw: sb.battery.capacity,
          },
        },
        {
          label: "Duração estimada",
          hint: "Em uso misto (web, vídeo, mensagens).",
          level: "basic",
          better: "higher",
          a: { display: `~${sa.battery.life} h`, raw: sa.battery.life },
          b: { display: `~${sb.battery.life} h`, raw: sb.battery.life },
        },
        {
          label: "Carregamento com fio",
          hint: "Watts — quanto maior, mais rápida a recarga.",
          level: "mid",
          better: "higher",
          a: { display: `${sa.battery.charge} W`, raw: sa.battery.charge },
          b: { display: `${sb.battery.charge} W`, raw: sb.battery.charge },
        },
        {
          label: "Carregamento sem fio",
          hint: "Watts via indução. 0 = não suporta.",
          level: "advanced",
          better: "higher",
          a: {
            display: sa.battery.wireless ? `${sa.battery.wireless} W` : "—",
            raw: sa.battery.wireless,
          },
          b: {
            display: sb.battery.wireless ? `${sb.battery.wireless} W` : "—",
            raw: sb.battery.wireless,
          },
        },
      ],
    },
    {
      section: "Câmera",
      rows: [
        {
          label: "Câmera principal",
          hint: "MP = megapixels. Mais MP não significa foto melhor, mas dá mais resolução.",
          level: "basic",
          better: "higher",
          a: { display: `${sa.camera.main} MP`, raw: sa.camera.main },
          b: { display: `${sb.camera.main} MP`, raw: sb.camera.main },
        },
        {
          label: "Ultra-wide",
          hint: "Lente grande-angular para paisagens e grupos.",
          level: "mid",
          better: "higher",
          a: { display: `${sa.camera.ultra} MP`, raw: sa.camera.ultra },
          b: { display: `${sb.camera.ultra} MP`, raw: sb.camera.ultra },
        },
        {
          label: "Teleobjetiva",
          hint: "Lente de zoom óptico (sem perda).",
          level: "advanced",
          better: "higher",
          a: {
            display: sa.camera.tele ? `${sa.camera.tele} MP` : "—",
            raw: sa.camera.tele,
          },
          b: {
            display: sb.camera.tele ? `${sb.camera.tele} MP` : "—",
            raw: sb.camera.tele,
          },
        },
        {
          label: "Vídeo máximo",
          hint: "Resolução máxima de gravação.",
          level: "mid",
          better: "higher",
          a: { display: `${sa.camera.videoK}K`, raw: sa.camera.videoK },
          b: { display: `${sb.camera.videoK}K`, raw: sb.camera.videoK },
        },
      ],
    },
    {
      section: "Armazenamento",
      rows: [
        {
          label: "Capacidade",
          hint: "Quanto cabe em fotos, vídeos e apps.",
          level: "basic",
          better: "higher",
          a: { display: `${sa.storage} GB`, raw: sa.storage },
          b: { display: `${sb.storage} GB`, raw: sb.storage },
        },
        {
          label: "Tipo",
          hint: "UFS 4.0 é cerca de 2× mais rápido que UFS 3.1.",
          level: "mid",
          better: "none",
          a: { display: sa.storageType, raw: 0 },
          b: { display: sb.storageType, raw: 0 },
        },
        {
          label: "Leitura / Escrita",
          hint: "MB/s sequencial — afeta abertura de apps e cópia de arquivos.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.read} / ${sa.write} MB/s`, raw: sa.read },
          b: { display: `${sb.read} / ${sb.write} MB/s`, raw: sb.read },
        },
      ],
    },
    {
      section: "Conectividade & Físico",
      rows: [
        {
          label: "Wi-Fi",
          hint: "Wi-Fi 7 > 6E > 6, em ordem de velocidade e latência.",
          level: "mid",
          better: "none",
          a: { display: sa.wifi, raw: 0 },
          b: { display: sb.wifi, raw: 0 },
        },
        {
          label: "Bluetooth",
          hint: "5.3+ traz menos consumo e melhor alcance.",
          level: "advanced",
          better: "none",
          a: { display: sa.bt, raw: 0 },
          b: { display: sb.bt, raw: 0 },
        },
        {
          label: "Sistema",
          hint: "Versão do sistema operacional de fábrica.",
          level: "basic",
          better: "none",
          a: { display: sa.os, raw: 0 },
          b: { display: sb.os, raw: 0 },
        },
        {
          label: "Peso",
          hint: "Gramas — quanto menor, mais confortável no bolso/mão.",
          level: "mid",
          better: "lower",
          a: { display: `${sa.weight} g`, raw: sa.weight },
          b: { display: `${sb.weight} g`, raw: sb.weight },
        },
        {
          label: "Dimensões",
          hint: "Altura × largura × espessura.",
          level: "advanced",
          better: "none",
          a: { display: sa.dims, raw: 0 },
          b: { display: sb.dims, raw: 0 },
        },
      ],
    },
  ];
}

function buildLaptopRows(
  a: Device<LaptopSpecs>,
  b: Device<LaptopSpecs>,
): { section: string; rows: RowSpec[] }[] {
  const sa = a.specs;
  const sb = b.specs;
  return [
    {
      section: "Desempenho",
      rows: [
        {
          label: "Processador",
          hint: "O 'cérebro' do notebook — modelo + arquitetura.",
          level: "basic",
          better: "none",
          a: { display: sa.cpu, raw: 0 },
          b: { display: sb.cpu, raw: 0 },
        },
        {
          label: "Núcleos / Clock turbo",
          hint: "Núcleos paralelos × velocidade máxima sob carga.",
          level: "mid",
          better: "higher",
          a: {
            display: `${sa.cpuCores} · ${sa.cpuClock} GHz`,
            raw: sa.cpuCores * sa.cpuClock,
          },
          b: {
            display: `${sb.cpuCores} · ${sb.cpuClock} GHz`,
            raw: sb.cpuCores * sb.cpuClock,
          },
        },
        {
          label: "TDP",
          hint: "Watts dissipados pela CPU — afeta calor e bateria.",
          level: "advanced",
          better: "lower",
          a: { display: `${sa.tdp} W`, raw: sa.tdp },
          b: { display: `${sb.tdp} W`, raw: sb.tdp },
        },
        {
          label: "Processo",
          hint: "Nanômetros — menor = mais eficiente.",
          level: "advanced",
          better: "lower",
          a: { display: sa.process, raw: parseFloat(sa.process) },
          b: { display: sb.process, raw: parseFloat(sb.process) },
        },
        {
          label: "GPU",
          hint: "Placa de vídeo — essencial pra jogos, render e IA.",
          level: "basic",
          better: "none",
          a: { display: sa.gpu, raw: 0 },
          b: { display: sb.gpu, raw: 0 },
        },
        {
          label: "VRAM",
          hint: "Memória da GPU — limita texturas grandes, IA local e edição 3D.",
          level: "mid",
          better: "higher",
          a: {
            display: sa.vram ? `${sa.vram} GB` : "compartilhada",
            raw: sa.vram,
          },
          b: {
            display: sb.vram ? `${sb.vram} GB` : "compartilhada",
            raw: sb.vram,
          },
        },
        {
          label: "GPU (TFLOPS)",
          hint: "Potência bruta gráfica.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.gpuTflops}`, raw: sa.gpuTflops },
          b: { display: `${sb.gpuTflops}`, raw: sb.gpuTflops },
        },
        {
          label: "RAM",
          hint: "Memória — 16 GB é o mínimo confortável, 32 GB ideal pra dev/render.",
          level: "basic",
          better: "higher",
          a: { display: `${sa.ram} GB ${sa.ramType}`, raw: sa.ram },
          b: { display: `${sb.ram} GB ${sb.ramType}`, raw: sb.ram },
        },
        {
          label: "Velocidade RAM",
          hint: "MHz — afeta principalmente iGPUs e compilação pesada.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.ramSpeed} MHz`, raw: sa.ramSpeed },
          b: { display: `${sb.ramSpeed} MHz`, raw: sb.ramSpeed },
        },
        {
          label: "Geekbench (single / multi)",
          hint: "Mede CPU em uma e várias tarefas em paralelo.",
          level: "advanced",
          better: "higher",
          a: {
            display: `${sa.bench.gbSingle} / ${sa.bench.gbMulti}`,
            raw: sa.bench.gbMulti,
          },
          b: {
            display: `${sb.bench.gbSingle} / ${sb.bench.gbMulti}`,
            raw: sb.bench.gbMulti,
          },
        },
        {
          label: "3DMark Time Spy",
          hint: "Benchmark gráfico padrão da indústria.",
          level: "advanced",
          better: "higher",
          a: {
            display: sa.bench.threeDmark.toLocaleString("pt-BR"),
            raw: sa.bench.threeDmark,
          },
          b: {
            display: sb.bench.threeDmark.toLocaleString("pt-BR"),
            raw: sb.bench.threeDmark,
          },
        },
      ],
    },
    {
      section: "Tela",
      rows: [
        {
          label: "Tamanho",
          hint: "Diagonal em polegadas.",
          level: "basic",
          better: "none",
          a: { display: `${sa.display.size}"`, raw: sa.display.size },
          b: { display: `${sb.display.size}"`, raw: sb.display.size },
        },
        {
          label: "Resolução",
          hint: "Mais pixels = imagem mais nítida e mais espaço útil.",
          level: "basic",
          better: "none",
          a: { display: sa.display.res, raw: 0 },
          b: { display: sb.display.res, raw: 0 },
        },
        {
          label: "Taxa de atualização",
          hint: "Hz — 120 Hz+ deixa scroll e jogos muito mais fluidos.",
          level: "basic",
          better: "higher",
          a: { display: `${sa.display.refresh} Hz`, raw: sa.display.refresh },
          b: { display: `${sb.display.refresh} Hz`, raw: sb.display.refresh },
        },
        {
          label: "Tipo de painel",
          hint: "OLED/Mini-LED = mais contraste; IPS = mais barato e durável.",
          level: "mid",
          better: "none",
          a: { display: sa.display.panel, raw: 0 },
          b: { display: sb.display.panel, raw: 0 },
        },
        {
          label: "Brilho",
          hint: "Nits — importante pra ambientes claros.",
          level: "mid",
          better: "higher",
          a: { display: `${sa.display.nits} nits`, raw: sa.display.nits },
          b: { display: `${sb.display.nits} nits`, raw: sb.display.nits },
        },
        {
          label: "Cobertura DCI-P3",
          hint: "Fidelidade de cor — essencial pra edição.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.display.gamut}%`, raw: sa.display.gamut },
          b: { display: `${sb.display.gamut}%`, raw: sb.display.gamut },
        },
        {
          label: "Tempo de resposta",
          hint: "ms — menor = sem ghosting em jogos rápidos.",
          level: "advanced",
          better: "lower",
          a: { display: `${sa.display.response} ms`, raw: sa.display.response },
          b: { display: `${sb.display.response} ms`, raw: sb.display.response },
        },
      ],
    },
    {
      section: "Bateria & Carregamento",
      rows: [
        {
          label: "Capacidade",
          hint: "Wh — quanto maior, mais reserva de energia.",
          level: "basic",
          better: "higher",
          a: { display: `${sa.battery.capacity} Wh`, raw: sa.battery.capacity },
          b: { display: `${sb.battery.capacity} Wh`, raw: sb.battery.capacity },
        },
        {
          label: "Duração estimada",
          hint: "Em uso misto (web + docs + vídeo).",
          level: "basic",
          better: "higher",
          a: { display: `~${sa.battery.life} h`, raw: sa.battery.life },
          b: { display: `~${sb.battery.life} h`, raw: sb.battery.life },
        },
        {
          label: "Carregador",
          hint: "Watts da fonte — afeta tempo total de recarga.",
          level: "mid",
          better: "higher",
          a: { display: `${sa.battery.charge} W`, raw: sa.battery.charge },
          b: { display: `${sb.battery.charge} W`, raw: sb.battery.charge },
        },
      ],
    },
    {
      section: "Armazenamento",
      rows: [
        {
          label: "Capacidade",
          hint: "GB disponíveis pra sistema, projetos e jogos.",
          level: "basic",
          better: "higher",
          a: { display: `${sa.storage} GB`, raw: sa.storage },
          b: { display: `${sb.storage} GB`, raw: sb.storage },
        },
        {
          label: "Tipo",
          hint: "NVMe Gen4 é 2–3× mais rápido que Gen3 e ~10× SSD SATA.",
          level: "mid",
          better: "none",
          a: { display: sa.storageType, raw: 0 },
          b: { display: sb.storageType, raw: 0 },
        },
        {
          label: "Leitura / Escrita",
          hint: "MB/s sequencial — afeta build, edição e carregamento.",
          level: "advanced",
          better: "higher",
          a: { display: `${sa.read} / ${sa.write} MB/s`, raw: sa.read },
          b: { display: `${sb.read} / ${sb.write} MB/s`, raw: sb.read },
        },
      ],
    },
    {
      section: "Webcam & Conectividade",
      rows: [
        {
          label: "Webcam",
          hint: "MP da câmera frontal; IR habilita login facial.",
          level: "basic",
          better: "higher",
          a: {
            display: `${sa.webcam.mp} MP${sa.webcam.ir ? " · IR" : ""}`,
            raw: sa.webcam.mp,
          },
          b: {
            display: `${sb.webcam.mp} MP${sb.webcam.ir ? " · IR" : ""}`,
            raw: sb.webcam.mp,
          },
        },
        {
          label: "Wi-Fi",
          hint: "Wi-Fi 7 > 6E > 6.",
          level: "mid",
          better: "none",
          a: { display: sa.wifi, raw: 0 },
          b: { display: sb.wifi, raw: 0 },
        },
        {
          label: "Bluetooth",
          hint: "5.3+ tem menor consumo e melhor alcance.",
          level: "advanced",
          better: "none",
          a: { display: sa.bt, raw: 0 },
          b: { display: sb.bt, raw: 0 },
        },
        {
          label: "Portas",
          hint: "Conexões físicas — Thunderbolt 4 dá 40 Gbps e display externo.",
          level: "mid",
          better: "none",
          a: { display: sa.ports.join(" · "), raw: sa.ports.length },
          b: { display: sb.ports.join(" · "), raw: sb.ports.length },
        },
        {
          label: "Sistema",
          hint: "SO de fábrica.",
          level: "basic",
          better: "none",
          a: { display: sa.os, raw: 0 },
          b: { display: sb.os, raw: 0 },
        },
      ],
    },
    {
      section: "Físico",
      rows: [
        {
          label: "Peso",
          hint: "kg — quanto menor, melhor pra carregar no dia a dia.",
          level: "basic",
          better: "lower",
          a: { display: `${sa.weight} kg`, raw: sa.weight },
          b: { display: `${sb.weight} kg`, raw: sb.weight },
        },
        {
          label: "Dimensões",
          hint: "Largura × profundidade × altura.",
          level: "mid",
          better: "none",
          a: { display: sa.dims, raw: 0 },
          b: { display: sb.dims, raw: 0 },
        },
      ],
    },
  ];
}

function winner(row: RowSpec): "a" | "b" | "tie" {
  if (row.better === "none") return "tie";
  if (row.a.raw === row.b.raw) return "tie";
  if (row.better === "higher") return row.a.raw > row.b.raw ? "a" : "b";
  return row.a.raw < row.b.raw ? "a" : "b";
}

export default function Compare() {
  const [dark, setDark] = useState(false);
  const [category, setCategory] = useState<Category>("phone");
  const [detail, setDetail] = useState<Detail>("mid");
  const [profile, setProfile] = useState<ProfileId | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [pickerA, setPickerA] = useState(false);
  const [pickerB, setPickerB] = useState(false);
  const [aPhone, setAPhone] = useState(PHONES[0]);
  const [bPhone, setBPhone] = useState(PHONES[1]);
  const [aLaptop, setALaptop] = useState(LAPTOPS[0]);
  const [bLaptop, setBLaptop] = useState(LAPTOPS[1]);

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  const devices = category === "phone" ? PHONES : LAPTOPS;
  const a: Device = category === "phone" ? aPhone : aLaptop;
  const b: Device = category === "phone" ? bPhone : bLaptop;

  const setA = (d: Device) =>
    category === "phone"
      ? setAPhone(d as Device<PhoneSpecs>)
      : setALaptop(d as Device<LaptopSpecs>);
  const setB = (d: Device) =>
    category === "phone"
      ? setBPhone(d as Device<PhoneSpecs>)
      : setBLaptop(d as Device<LaptopSpecs>);

  const sections = useMemo(() => {
    return category === "phone"
      ? buildPhoneRows(a as Device<PhoneSpecs>, b as Device<PhoneSpecs>)
      : buildLaptopRows(a as Device<LaptopSpecs>, b as Device<LaptopSpecs>);
  }, [a, b, category]);

  const bg = dark ? "bg-[#0E0E0E]" : "bg-white";
  const fg = dark ? "text-white" : "text-black";
  const fgHex = dark ? "#FFFFFF" : "#000000";
  const border = dark ? "border-white" : "border-black";
  const borderSoft = dark ? "border-white/15" : "border-black/15";
  const surface = dark ? "bg-white/[0.03]" : "bg-black/[0.02]";

  return (
    <div
      className={`min-h-screen w-full ${bg} ${fg} transition-colors duration-200`}
      style={{ fontFamily: "'Inter Tight', sans-serif" }}
    >
      <div className={`border-b ${borderSoft} sticky top-0 z-30 ${bg}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-4">
            <Logo fg={fgHex} />
          </Link>
          <div
            className="flex items-center gap-3"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            <span className="hidden sm:inline uppercase tracking-widest text-[10px] opacity-50">
              § Comparador / 2026
            </span>
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Alternar tema"
              className={`w-9 h-9 border ${border} flex items-center justify-center hover:text-[#3D7FFF] hover:border-[#3D7FFF] transition-colors duration-100`}
            >
              {dark ? (
                <Sun size={14} strokeWidth={1.6} />
              ) : (
                <Moon size={14} strokeWidth={1.6} />
              )}
            </button>
            <Link
              href="/"
              className={`w-9 h-9 border ${border} flex items-center justify-center hover:text-[#3D7FFF] hover:border-[#3D7FFF] transition-colors duration-100`}
              aria-label="Voltar"
            >
              <ArrowLeft size={14} strokeWidth={1.6} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <div
              className="flex items-center gap-2"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <span className="w-1.5 h-1.5" style={{ background: ACCENT }} />
              <span className="uppercase tracking-widest text-[10px] opacity-60">
                comparador · v1
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
              className="uppercase text-[clamp(36px,5vw,68px)] mt-4"
            >
              Compare hardware
              <br />
              lado a lado<span style={{ color: ACCENT }}>.</span>
            </h1>
          </div>
          <p className="max-w-md text-[14px] opacity-70">
            Escolha a categoria, dois aparelhos e o nível de detalhe. Os valores
            destacados em azul são os melhores em cada linha.
          </p>
        </div>

        {/* Controls bar */}
        <div
          className={`mt-10 border ${border} grid grid-cols-1 lg:grid-cols-3 ${dark ? "divide-white/15" : "divide-black/15"} divide-y lg:divide-y-0 lg:divide-x`}
        >
          {/* Category */}
          <div className="p-5">
            <div
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="uppercase tracking-widest text-[9px] opacity-50 mb-3"
            >
              Categoria
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "phone" as Category, label: "Celular", Icon: Smartphone },
                { id: "laptop" as Category, label: "Notebook", Icon: Laptop },
              ].map(({ id, label, Icon }) => {
                const active = category === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCategory(id)}
                    className={`border ${border} px-3 py-3 flex items-center gap-3 transition-all duration-100`}
                    style={{
                      background: active ? "#0A0A0A" : "transparent",
                      borderColor: active ? ACCENT : undefined,
                      color: active ? "#fff" : undefined,
                    }}
                  >
                    <Icon size={16} strokeWidth={1.6} />
                    <span
                      style={{ fontFamily: "'Space Mono', monospace" }}
                      className="uppercase tracking-widest text-[11px]"
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail */}
          <div className="p-5">
            <div
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="uppercase tracking-widest text-[9px] opacity-50 mb-3"
            >
              Nível de detalhe
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "basic" as Detail, label: "Básico" },
                { id: "mid" as Detail, label: "Intermediário" },
                { id: "advanced" as Detail, label: "Avançado" },
              ].map(({ id, label }) => {
                const active = detail === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setDetail(id)}
                    className={`border ${border} px-2 py-3 text-center transition-all duration-100`}
                    style={{
                      background: active ? ACCENT : "transparent",
                      borderColor: active ? ACCENT : undefined,
                      color: active ? "#fff" : undefined,
                    }}
                  >
                    <span
                      style={{ fontFamily: "'Space Mono', monospace" }}
                      className="uppercase tracking-widest text-[10px]"
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Profile */}
          <div className="p-5 relative">
            <div
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="uppercase tracking-widest text-[9px] opacity-50 mb-3 flex items-center gap-2"
            >
              Perfil TDU{" "}
              <Sparkles size={10} strokeWidth={1.8} style={{ color: ACCENT }} />
            </div>
            <button
              type="button"
              onClick={() => setProfileOpen((o) => !o)}
              className={`border ${border} px-3 py-3 flex items-center justify-between gap-3 w-full hover:border-[#3D7FFF] transition-colors duration-100`}
              style={profile ? { borderColor: ACCENT } : {}}
            >
              <span
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="uppercase tracking-widest text-[11px]"
              >
                {profile ? PROFILE_LABELS[profile] : "Não definido"}
              </span>
              <ChevronDown
                size={14}
                strokeWidth={1.8}
                className={`transition-transform duration-150 ${profileOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute z-20 left-5 right-5 top-full mt-2 border ${border} ${bg} shadow-lg`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setProfile(null);
                      setProfileOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 border-b ${dark ? "border-white/10" : "border-black/10"} hover:bg-[#3D7FFF]/10 flex items-center justify-between`}
                  >
                    <span
                      style={{ fontFamily: "'Space Mono', monospace" }}
                      className="uppercase tracking-widest text-[11px] opacity-70"
                    >
                      Sem perfil (ocultar TDU)
                    </span>
                    {!profile && (
                      <Check
                        size={14}
                        strokeWidth={2.2}
                        style={{ color: ACCENT }}
                      />
                    )}
                  </button>
                  {(Object.keys(PROFILE_LABELS) as ProfileId[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setProfile(p);
                        setProfileOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 border-b last:border-b-0 ${dark ? "border-white/10" : "border-black/10"} hover:bg-[#3D7FFF]/10 flex items-center justify-between`}
                    >
                      <span
                        style={{ fontFamily: "'Space Mono', monospace" }}
                        className="uppercase tracking-widest text-[11px]"
                      >
                        {PROFILE_LABELS[p]}
                      </span>
                      {profile === p && (
                        <Check
                          size={14}
                          strokeWidth={2.2}
                          style={{ color: ACCENT }}
                        />
                      )}
                    </button>
                  ))}
                  <Link
                    href="/quiz"
                    className={`block px-4 py-3 border-t ${dark ? "border-white/10" : "border-black/10"} hover:text-[#3D7FFF]`}
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    <span className="uppercase tracking-widest text-[10px]">
                      Não sabe seu perfil? Faça o quiz ↗
                    </span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Pickers */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <DevicePicker
            open={pickerA}
            onOpenChange={(b) => {
              setPickerA(b);
              if (b) setPickerB(false);
            }}
            devices={devices.filter((d) => d.id !== b.id)}
            value={a}
            onPick={(d) => setA(d)}
            dark={dark}
            slot="A"
          />
          <div className="hidden md:flex items-center justify-center">
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                background: ACCENT,
              }}
              className="text-white uppercase tracking-widest text-[11px] px-3 py-1.5"
            >
              VS
            </span>
          </div>
          <DevicePicker
            open={pickerB}
            onOpenChange={(b) => {
              setPickerB(b);
              if (b) setPickerA(false);
            }}
            devices={devices.filter((d) => d.id !== a.id)}
            value={b}
            onPick={(d) => setB(d)}
            dark={dark}
            slot="B"
          />
        </div>

        {/* Hero compare cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {([a, b] as Device[]).map((d, i) => {
            const tdu = profile ? d.tdu[profile] : undefined;
            const other = i === 0 ? b : a;
            const otherOverall = other.overall;
            const otherTdu = profile ? other.tdu[profile] : undefined;
            const overallWin = d.overall >= otherOverall;
            const tduWin =
              tdu !== undefined && otherTdu !== undefined
                ? tdu >= otherTdu
                : false;
            return (
              <div
                key={d.id}
                className={`border ${border} bg-black text-white p-6 lg:p-8 flex flex-col gap-6`}
                style={{ borderColor: ACCENT }}
              >
                <div
                  className="flex items-center justify-between"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      style={{ background: d.accent }}
                      className="w-8 h-8 flex items-center justify-center uppercase tracking-widest text-[11px]"
                    >
                      {i === 0 ? "A" : "B"}
                    </span>
                    <div>
                      <div className="uppercase tracking-widest text-[9px] opacity-60">
                        {d.brand} · {d.year}
                      </div>
                      <div
                        style={{ letterSpacing: "-0.02em" }}
                        className="uppercase text-[20px] leading-tight"
                      >
                        {d.model}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="uppercase tracking-widest text-[9px] opacity-60">
                      Preço
                    </div>
                    <div
                      style={{ letterSpacing: "-0.01em" }}
                      className="uppercase text-[14px]"
                    >
                      R$ {d.price.toLocaleString("pt-BR")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-[80px] flex items-center justify-center">
                    <DeviceGlyph d={d} />
                  </div>
                  <div className="flex-1 flex gap-6">
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <ScoreRing
                        value={d.overall}
                        size={84}
                        color={overallWin ? ACCENT : "#FFFFFF"}
                      />
                      <div className="text-center">
                        <div
                          style={{ fontFamily: "'Space Mono', monospace" }}
                          className="uppercase tracking-widest text-[9px] text-white/60"
                        >
                          Overall
                        </div>
                        <div
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            color: overallWin
                              ? ACCENT
                              : "rgba(255,255,255,0.6)",
                          }}
                          className="uppercase tracking-widest text-[10px] mt-0.5"
                        >
                          {overallWin ? "↑ líder" : "atrás"}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <ScoreRing
                        value={tdu ?? 0}
                        size={84}
                        color={tduWin ? ACCENT : "#FFFFFF"}
                        locked={tdu === undefined}
                      />
                      <div className="text-center">
                        <div
                          style={{ fontFamily: "'Space Mono', monospace" }}
                          className="uppercase tracking-widest text-[9px] text-white/60"
                        >
                          TDU {profile ? `· ${PROFILE_LABELS[profile]}` : ""}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            color:
                              tdu === undefined
                                ? "rgba(255,255,255,0.4)"
                                : tduWin
                                  ? ACCENT
                                  : "rgba(255,255,255,0.6)",
                          }}
                          className="uppercase tracking-widest text-[10px] mt-0.5"
                        >
                          {tdu === undefined
                            ? "faça o quiz"
                            : tduWin
                              ? "↑ líder"
                              : "atrás"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Spec sections */}
        <div className="mt-10 space-y-10">
          {sections.map((sec) => {
            const visibleRows = sec.rows.filter((r) =>
              shouldShow(r.level, detail),
            );
            if (!visibleRows.length) return null;
            return (
              <section key={sec.section}>
                <div className="flex items-center justify-between mb-4">
                  <h2
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      letterSpacing: "-0.02em",
                    }}
                    className="uppercase text-[18px] leading-none"
                  >
                    {sec.section}
                  </h2>
                  <span
                    style={{ fontFamily: "'Space Mono', monospace" }}
                    className="uppercase tracking-widest text-[10px] opacity-50"
                  >
                    {visibleRows.length}{" "}
                    {visibleRows.length === 1 ? "item" : "itens"}
                  </span>
                </div>
                <div
                  className={`border ${border} divide-y ${dark ? "divide-white/10" : "divide-black/10"}`}
                >
                  {visibleRows.map((row, i) => {
                    const w = winner(row);
                    return (
                      <div
                        key={`${sec.section}-${i}`}
                        className="grid grid-cols-[1fr_1fr_1fr] items-stretch"
                      >
                        <div
                          className={`p-4 lg:p-5 border-r ${dark ? "border-white/10" : "border-black/10"} flex flex-col justify-center`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              style={{
                                fontFamily: "'Space Mono', monospace",
                                letterSpacing: "-0.01em",
                              }}
                              className="uppercase text-[12px] leading-tight"
                            >
                              {row.label}
                            </span>
                            <Info
                              size={11}
                              strokeWidth={1.8}
                              className="opacity-40 shrink-0"
                            />
                          </div>
                          {detail === "basic" && row.hint && (
                            <p className="text-[11px] opacity-60 mt-1.5 leading-snug max-w-xs">
                              {row.hint}
                            </p>
                          )}
                        </div>
                        <div
                          className={`p-4 lg:p-5 border-r ${dark ? "border-white/10" : "border-black/10"} flex items-center justify-center text-center relative ${w === "a" ? (dark ? "bg-[#3D7FFF]/[0.08]" : "bg-[#3D7FFF]/[0.05]") : ""}`}
                        >
                          <span
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              color: w === "a" ? ACCENT : undefined,
                              fontWeight: w === "a" ? 700 : 400,
                            }}
                            className="uppercase tracking-wide text-[12px] leading-snug"
                          >
                            {row.a.display}
                          </span>
                          {w === "a" && (
                            <span
                              className="absolute top-2 right-2"
                              style={{ fontFamily: "'Space Mono', monospace" }}
                            >
                              <span
                                className="text-[9px] uppercase tracking-widest"
                                style={{ color: ACCENT }}
                              >
                                ↑
                              </span>
                            </span>
                          )}
                        </div>
                        <div
                          className={`p-4 lg:p-5 flex items-center justify-center text-center relative ${w === "b" ? (dark ? "bg-[#3D7FFF]/[0.08]" : "bg-[#3D7FFF]/[0.05]") : ""}`}
                        >
                          <span
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              color: w === "b" ? ACCENT : undefined,
                              fontWeight: w === "b" ? 700 : 400,
                            }}
                            className="uppercase tracking-wide text-[12px] leading-snug"
                          >
                            {row.b.display}
                          </span>
                          {w === "b" && (
                            <span
                              className="absolute top-2 right-2"
                              style={{ fontFamily: "'Space Mono', monospace" }}
                            >
                              <span
                                className="text-[9px] uppercase tracking-widest"
                                style={{ color: ACCENT }}
                              >
                                ↑
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer cta */}
        <div
          className={`mt-16 border ${border} ${surface} p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}
        >
          <div>
            <div
              className="flex items-center gap-2"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <Sparkles size={12} strokeWidth={2} style={{ color: ACCENT }} />
              <span className="uppercase tracking-widest text-[10px] opacity-60">
                Quer uma nota personalizada?
              </span>
            </div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "-0.02em",
              }}
              className="uppercase text-[18px] mt-2"
            >
              {profile
                ? "Recalibre seu perfil quando quiser"
                : "Desbloqueie o TDU em 6 perguntas"}
            </div>
          </div>
          <Link
            href="/quiz"
            style={{ fontFamily: "'Space Mono', monospace" }}
            className={`${dark ? "bg-white text-black" : "bg-black text-white"} px-6 py-3.5 uppercase tracking-widest text-[11px] flex items-center gap-3 hover:bg-[#3D7FFF] hover:text-white transition-all duration-100`}
          >
            {profile ? "Refazer quiz" : "Fazer o quiz"} ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
