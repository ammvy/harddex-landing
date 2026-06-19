"use client";

import { useState } from "react";
import { User } from "../_types";
import { INITIAL_USER } from "../_data/mock-user";

export function useProfile() {
  const [user, setUser] = useState<User>(INITIAL_USER);
  return {
    user,
  };
}
