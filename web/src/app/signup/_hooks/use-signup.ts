"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export function useSignupMutation() {
  return useMutation({
    mutationFn: async (payload: SignupPayload) => {
      const { data } = await api.post("/users", payload);
      return data;
    },
  });
}
