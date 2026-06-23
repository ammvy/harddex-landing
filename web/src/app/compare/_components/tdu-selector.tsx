"use client";

import { MINI_CATS, ProfileId } from "@/components/mouse";
import { PROFILE_LABELS, STYLE_TO_PROFILE } from "../_data/profiles";
import { useSession } from "next-auth/react";
import { PushPinIcon } from "@phosphor-icons/react/dist/ssr";

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
  const { data: session } = useSession();
  const userStyle = session?.user?.style;
  const userProfileId = userStyle ? STYLE_TO_PROFILE[userStyle] : undefined;

  let profiles: ProfileId[] = [
    "CREATIVE",
    "DEV",
    "GAMER",
    "MOBILE",
    "PRO",
    "STUDY",
  ];

  if (userProfileId) {
    profiles = [userProfileId, ...profiles.filter((p) => p !== userProfileId)];
  }

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
          const isUserProfile = profileId === userProfileId;

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
              className={`relative flex items-center gap-3 p-2 border transition-all duration-150 cursor-pointer text-left rounded-none ${
                active
                  ? "border-primary bg-primary/5 shadow-[0_0_12px_rgba(58,112,244,0.15)] scale-[1.02]"
                  : isUserProfile
                    ? "border-primary/40 bg-primary/[0.03] hover:border-primary/60 hover:bg-primary/[0.05]"
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
                  className="uppercase text-[11px] leading-none font-bold flex items-center gap-1"
                >
                  <span>{PROFILE_LABELS[profileId]}</span>
                  {isUserProfile && (
                    <PushPinIcon
                      size={11}
                      weight="fill"
                      className="text-primary shrink-0 rotate-45"
                      // title="Seu perfil de uso"
                    />
                  )}
                </div>
                {isUserProfile ? (
                  <span className="text-[8px] text-primary font-bold uppercase tracking-wide">
                    Seu Perfil
                  </span>
                ) : (
                  <span className="text-[8px] opacity-50 uppercase tracking-wide">
                    Ver Opinião
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
