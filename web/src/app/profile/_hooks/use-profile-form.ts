"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { profileNameSchema, ProfileNameFormValues } from "../_data/profile-name.schema";

interface UseProfileFormProps {
  user: { name: string };
}

export function useProfileForm({ user }: UseProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileNameFormValues>({
    resolver: zodResolver(profileNameSchema),
    mode: "onChange",
    defaultValues: { name: user.name },
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
      console.log("Profile form submitted:", data);
      setIsEditing(false);
    }),
    [form]
  );

  return {
    form,
    isEditing,
    startEdit,
    cancelEdit,
    onSubmit,
  };
}
