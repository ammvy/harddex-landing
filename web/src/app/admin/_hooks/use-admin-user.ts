"use client";

import { useSession } from "next-auth/react";

export function useAdminUser() {
  const { data: session, status } = useSession();

  return {
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    role: (session?.user as any)?.permission ?? "USER",
    isLoading: status === "loading",
  };
}
