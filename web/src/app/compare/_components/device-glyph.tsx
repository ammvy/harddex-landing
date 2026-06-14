import { Device } from "../_data/types";

interface DeviceGlyphProps {
  d: Device;
}

export function DeviceGlyph({ d }: DeviceGlyphProps) {
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
