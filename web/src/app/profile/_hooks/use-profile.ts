"use client";

import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { User } from "../_types";
import { ProfileId } from "@/components/mouse";
import { useRouter } from "next/navigation";

const REVERSE_STYLE_MAPPING: Record<string, ProfileId> = {
  GAMER: "GAMER",
  PROFESSIONAL: "PRO",
  BASIC: "STUDY",
  INTERMEDIATE: "MOBILE",
  ADVANCED: "DEV",
};

export function useProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User | null>({
    queryKey: ["me"],
    queryFn: async () => {
      if (!session?.user?.apiToken) {
        return null;
      }
      const { data } = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${session.user.apiToken}`,
        },
      });

      const backendUser = data.data;
      const mappedStyle = backendUser.style
        ? (REVERSE_STYLE_MAPPING[backendUser.style] ?? "PRO")
        : "PRO";

      return {
        id: String(backendUser.id),
        name: backendUser.name,
        email: backendUser.email,
        style: mappedStyle,
        permission: backendUser.permission ?? "USER",
      };
    },
    enabled: !!session?.user?.apiToken,
  });

  if (!user?.id && status === "authenticated") {
    signOut({ callbackUrl: "/login" });
    return {
      user: null,
      isLoading: true,
      isError: false,
    };
  }

  return {
    user: user ?? null,
    isLoading: isLoading || !session,
    isError,
  };
}
