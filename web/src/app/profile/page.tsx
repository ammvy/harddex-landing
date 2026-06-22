"use client";

import { useProfile } from "./_hooks/use-profile";
import { useProfileForm } from "./_hooks/use-profile-form";
import Header from "@/components/header";
import ProfileHeaderTitle from "./_components/profile-header-title";
import ProfilePhoto from "./_components/profile-photo";
import ProfileFields from "./_components/profile-fields";

export default function ProfilePage() {
  const { user, isLoading, isError } = useProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center">
        <p className="text-lg">Carregando perfil...</p>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center">
        <p className="text-lg text-red-500">Erro ao carregar perfil.</p>
      </div>
    );
  }

  return <ProfileContent user={user} />;
}

interface ProfileContentProps {
  user: Exclude<ReturnType<typeof useProfile>["user"], null>;
}

function ProfileContent({ user }: ProfileContentProps) {
  const { form, isEditing, startEdit, cancelEdit, onSubmit, isPending } = useProfileForm({ user });

  return (
    <div
      className="min-h-screen w-full bg-background text-foreground transition-colors duration-200"
      style={{ fontFamily: "'Inter Tight', sans-serif" }}
    >
      <Header label="§ Perfil / 2026" />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <ProfileHeaderTitle
          isEditing={isEditing}
          onStartEdit={startEdit}
          onCancelEdit={cancelEdit}
          onSubmit={onSubmit}
          isPending={isPending}
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-8">
          {/* Photo column */}
          <ProfilePhoto tdu={user.style} />

          {/* Fields column */}
          <ProfileFields
            user={user}
            isEditing={isEditing}
            register={form.register("name")}
            error={form.formState.errors.name?.message}
            onCancelEdit={cancelEdit}
            onSubmit={onSubmit}
          />
        </div>
      </main>
    </div>
  );
}

