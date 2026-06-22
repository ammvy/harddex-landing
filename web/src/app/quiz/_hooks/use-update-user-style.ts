"use client";

import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { ProfileId } from "../_data/types";

const STYLE_MAPPING: Record<ProfileId, string> = {
  GAMER: "GAMER",
  PRO: "PROFESSIONAL",
  STUDY: "BASIC",
  MOBILE: "INTERMEDIATE",
  DEV: "ADVANCED",
  CREATIVE: "ADVANCED",
};

export function useUpdateUserStyleMutation() {
  const { data: session, update } = useSession();

  return useMutation({
    mutationFn: async (profileId: ProfileId) => {
      if (!session?.user?.id || !session?.user?.apiToken) {
        return null;
      }

      const style = STYLE_MAPPING[profileId];

      const { data } = await api.put(
        `/users/${session.user.id}`,
        { style },
        {
          headers: {
            Authorization: `Bearer ${session.user.apiToken}`,
          },
        }
      );

      // Atualiza a sessão do next-auth localmente para refletir o novo style
      await update({ style });

      return data;
    },
  });
}
