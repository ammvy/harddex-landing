"use client";

import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { ProfileId } from "../_data/types";
import { toast } from "sonner";

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
  const queryClient = useQueryClient();

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
        },
      );

      await update({ style });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Estilo de uso atualizado!");
    },
    onError: (err: any) => {
      const message = err.response?.data?.message || err.message || "Erro ao atualizar estilo de uso";
      toast.error(message);
    },
  });
}
