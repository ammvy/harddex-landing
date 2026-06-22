"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { profileNameSchema, ProfileNameFormValues } from "../_data/profile-name.schema";

interface UseProfileFormProps {
  user: { id: string; name: string };
}

export function useProfileForm({ user }: UseProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session, update } = useSession();
  const queryClient = useQueryClient();

  const form = useForm<ProfileNameFormValues>({
    resolver: zodResolver(profileNameSchema),
    mode: "onChange",
    defaultValues: { name: user.name },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (newName: string) => {
      if (!session?.user?.apiToken) {
        throw new Error("Não autenticado");
      }

      await api.put(
        `/users/${user.id}`,
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${session.user.apiToken}`,
          },
        }
      );
    },
    onSuccess: async (_, newName) => {
      // Invalida a query do perfil
      queryClient.invalidateQueries({ queryKey: ["me"] });

      // Atualiza a sessão NextAuth
      await update({ name: newName });

      setIsEditing(false);
    },
  });

  const startEdit = useCallback(() => {
    form.reset({ name: user.name });
    setIsEditing(true);
  }, [form, user.name]);

  const cancelEdit = useCallback(() => {
    form.reset({ name: user.name });
    setIsEditing(false);
  }, [form, user.name]);

  const onSubmit = useCallback(
    form.handleSubmit((data: ProfileNameFormValues) => {
      updateProfileMutation.mutate(data.name);
    }),
    [form, updateProfileMutation]
  );

  return {
    form,
    isEditing,
    startEdit,
    cancelEdit,
    onSubmit,
    isPending: updateProfileMutation.isPending,
  };
}

