"use client";

import { useSession } from "next-auth/react";
import { User } from "../_types";

export const useIsAuthorized = (
  {
    authorizedRoles,
  }: {
    authorizedRoles: User["permission"][];
  } = {
    authorizedRoles: ["CURATOR", "ADMIN"],
  },
) => {
  const { status, data } = useSession();

  const isAuthorized =
    status === "authenticated" &&
    data?.user?.permission &&
    authorizedRoles.includes(data.user.permission);
  return { isAuthorized };
};
