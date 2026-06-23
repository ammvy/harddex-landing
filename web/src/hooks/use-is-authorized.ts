"use client";

import { useSession } from "./use-session";

export function useIsAuthorized(allowedPermissions: string[] = ["ADMIN", "CURATOR"]) {
  const { user, loading } = useSession();

  if (loading) {
    return { isAuthorized: false, loading };
  }

  if (!user) {
    return { isAuthorized: false, loading };
  }

  const hasPermission = allowedPermissions.includes(user.permission);
  return { isAuthorized: hasPermission, loading };
}
