import { Device, ProfileId } from "../_data/types";
import { DeviceGlyph } from "./device-glyph";
import { ScoreRing } from "./score-ring";
import { PROFILE_LABELS } from "../_data/profiles";

interface HeroCardProps {
  device: Device;
  otherDevice: Device;
  profile: ProfileId | null;
  slotName: "A" | "B";
}

export function HeroCard({
  device,
  otherDevice,
  profile,
  slotName,
}: HeroCardProps) {
  const tdu = profile ? device.tdu[profile] : undefined;
  const otherTdu = profile ? otherDevice.tdu[profile] : undefined;

  const overallWin = device.overall >= otherDevice.overall;
  const tduWin =
    tdu !== undefined && otherTdu !== undefined ? tdu >= otherTdu : false;

  return (
    <div
      className="border border-primary bg-black text-white p-6 lg:p-8 flex flex-col gap-6"
    >
      <div
        className="flex items-center justify-between"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            style={{ background: device.accent }}
            className="w-8 h-8 flex items-center justify-center uppercase tracking-widest text-[11px] font-bold text-white shrink-0"
          >
            {slotName}
          </span>
          <div className="min-w-0">
            <div className="uppercase tracking-widest text-[9px] opacity-60 truncate">
              {device.brand} · {device.year}
            </div>
            <div
              style={{ letterSpacing: "-0.02em" }}
              className="uppercase text-[20px] leading-tight truncate font-bold"
            >
              {device.model}
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="uppercase tracking-widest text-[9px] opacity-60">
            Preço
          </div>
          <div
            style={{ letterSpacing: "-0.01em" }}
            className="uppercase text-[14px] font-bold"
          >
            R$ {device.price.toLocaleString("pt-BR")}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-[80px] flex items-center justify-center shrink-0">
          <DeviceGlyph d={device} />
        </div>
        <div className="flex-1 flex gap-6">
          <div className="flex flex-col items-center gap-2 flex-1">
            <ScoreRing
              value={device.overall}
              size={84}
              color={overallWin ? "var(--primary)" : "#FFFFFF"}
            />
            <div className="text-center">
              <div
                style={{ fontFamily: "'Space Mono', monospace" }}
                className="uppercase tracking-widest text-[9px] text-white/60"
              >
                Overall
              </div>
              <div
                style={{ fontFamily: "'Space Mono', monospace" }}
                className={`uppercase tracking-widest text-[10px] mt-0.5 font-bold ${
                  overallWin ? "text-primary" : "text-white/60"
                }`}
              >
                {overallWin ? "↑ líder" : "atrás"}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 flex-1">
            <ScoreRing
              value={tdu ?? 0}
              size={84}
              color={tduWin ? "var(--primary)" : "#FFFFFF"}
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
                style={{ fontFamily: "'Space Mono', monospace" }}
                className={`uppercase tracking-widest text-[10px] mt-0.5 font-bold ${
                  tdu === undefined
                    ? "text-white/40"
                    : tduWin
                      ? "text-primary"
                      : "text-white/60"
                }`}
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
}
