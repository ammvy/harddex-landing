"use client";

import { MINI_CATS, ProfileId } from "@/components/mouse";
import { PROFILE_LABELS } from "../_data/profiles";

interface TduSelectorProps {
  selectedTdu: ProfileId;
  onTduChange: (tdu: ProfileId) => void;
  disabled: boolean;
}

export function TduSelector({
  selectedTdu,
  onTduChange,
  disabled,
}: TduSelectorProps) {
  const profiles: ProfileId[] = [
    "CREATIVE",
    "DEV",
    "GAMER",
    "MOBILE",
    "PRO",
    "STUDY",
  ];

  return (
    <div className="p-4 bg-muted/20">
      <div
        style={{ fontFamily: "'Space Mono', monospace" }}
        className="uppercase tracking-widest text-[10px] opacity-60 mb-3"
      >
        Selecione seu perfil de uso
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {profiles.map((profileId) => {
          const active = selectedTdu === profileId;
          const MiniCat = MINI_CATS[profileId];

          return (
            <button
              key={profileId}
              type="button"
              onClick={() => {
                if (!disabled) {
                  onTduChange(profileId);
                }
              }}
              disabled={disabled}
              className={`flex items-center gap-3 p-2 border transition-all duration-150 cursor-pointer text-left rounded-none ${
                active
                  ? "border-primary bg-primary/5 shadow-[0_0_12px_rgba(58,112,244,0.15)] scale-[1.02]"
                  : "border-foreground/10 hover:border-primary/50 hover:bg-muted/10"
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="w-9 h-9 shrink-0 flex items-center justify-center">
                <MiniCat className="w-full h-full" />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: "-0.02em",
                  }}
                  className="uppercase text-[11px] leading-none font-bold"
                >
                  {PROFILE_LABELS[profileId]}
                </div>
                <span className="text-[8px] opacity-50 uppercase tracking-wide">
                  Ver Opinião
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
