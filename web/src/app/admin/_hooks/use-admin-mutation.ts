"use client";

import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";

interface ApiErrorResponse {
  success: boolean;
  data: null;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Hook genérico para mutations no admin
 * Suporta POST, PUT e DELETE
 *
 * @example
 * const mutation = useAdminMutation('brand', '/brands', 'post', ['admin', 'brands']);
 */
export function useAdminMutation<T, R = T>(
  resourceName: string,
  endpoint: string,
  method: "post" | "put" | "delete" = "post",
  queryKeyToInvalidate?: string[],
  options?: Omit<UseMutationOptions<R, AxiosError<ApiErrorResponse>, T>, "mutationFn">
) {
  const queryClient = useQueryClient();

  return useMutation<R, AxiosError<ApiErrorResponse>, T>({
    mutationFn: async (payload: T) => {
      try {
        if (method === "delete") {
          // Para DELETE, a payload é o ID
          const { data } = await api.delete(endpoint);
          return data.data ?? ({} as R);
        }

        const { data } = await api[method](endpoint, payload);

        if (!data.success) {
          throw new Error(data.message || `Erro ao ${method === "post" ? "criar" : "atualizar"} ${resourceName}`);
        }

        return data.data as R;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw error;
        }
        throw new AxiosError((error as Error).message);
      }
    },
    onSuccess: () => {
      if (queryKeyToInvalidate) {
        queryClient.invalidateQueries({
          queryKey: queryKeyToInvalidate,
        });
      }
    },
    ...options,
  });
}
