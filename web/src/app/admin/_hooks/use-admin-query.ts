"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "@/lib/axios";

/**
 * Hook genérico para queries no admin
 * Padrão: GET /recurso
 *
 * @example
 * const { data } = useAdminQuery(['admin', 'brands'], '/brands', Brand[]);
 */
export function useAdminQuery<T>(
  queryKey: string[],
  endpoint: string,
  options?: Omit<UseQueryOptions<T[], Error>, "queryKey" | "queryFn">
) {
  return useQuery<T[], Error>({
    queryKey,
    queryFn: async () => {
      try {
        const { data } = await api.get(endpoint);
        return data.data ?? [];
      } catch (error) {
        throw new Error(`Falha ao carregar dados de ${endpoint}`);
      }
    },
    staleTime: 1000 * 60, // 1 minuto
    retry: 1,
    ...options,
  });
}
