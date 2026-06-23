"use client";
import { useSession } from "next-auth/react";

export function useIsAuthorized(
  allowedPermissions: string[] = ["ADMIN", "CURATOR"],
) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return { isAuthorized: false, loading: true };
  }

  if (!session?.user) {
    return { isAuthorized: false, loading: false };
  }

  const hasPermission = allowedPermissions.includes(
    session?.user?.permission as string,
  );
  return { isAuthorized: hasPermission, loading: false };
}
