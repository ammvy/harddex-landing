"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import QuizBanner from "./quiz-banner";
import SignupActions from "./signup-actions";

const signupSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Insira um e-mail válido"),
  password: z
    .string()
    .min(1, "A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const [target, setTarget] = useState<"/quiz" | "/">("/quiz");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    console.log("Submitting signup form:", data);
    console.log("Redirecting to:", target);
    router.push(target);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <SocialAuthButtons />

      <Divider label="ou com e-mail" /> */}

      <div className="flex flex-col gap-4">
        {/* Campo: Nome */}
        <label className="flex flex-col gap-2">
          <span
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="uppercase tracking-widest text-[10px] text-foreground/60"
          >
            Nome
          </span>
          <input
            type="text"
            placeholder="como devemos chamar você"
            style={{ fontFamily: "'Space Mono', monospace" }}
            className={`bg-input-background border px-4 py-3.5 outline-none uppercase tracking-widest text-[12px] placeholder:text-muted-foreground/50 transition-colors duration-100 ${
              errors.name
                ? "border-destructive focus:border-destructive"
                : "border-foreground focus:border-primary"
            }`}
            {...register("name")}
          />
          {errors.name && (
            <span
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="text-[10px] text-destructive uppercase tracking-wide"
            >
              {errors.name.message}
            </span>
          )}
        </label>

        {/* Campo: E-mail */}
        <label className="flex flex-col gap-2">
          <span
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="uppercase tracking-widest text-[10px] text-foreground/60"
          >
            E-mail
          </span>
          <input
            type="email"
            placeholder="seu@email.com"
            style={{ fontFamily: "'Space Mono', monospace" }}
            className={`bg-input-background border px-4 py-3.5 outline-none uppercase tracking-widest text-[12px] placeholder:text-muted-foreground/50 transition-colors duration-100 ${
              errors.email
                ? "border-destructive focus:border-destructive"
                : "border-foreground focus:border-primary"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <span
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="text-[10px] text-destructive uppercase tracking-wide"
            >
              {errors.email.message}
            </span>
          )}
        </label>

        {/* Campo: Senha */}
        <label className="flex flex-col gap-2">
          <span
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="uppercase tracking-widest text-[10px] text-foreground/60"
          >
            Senha
          </span>
          <input
            type="password"
            placeholder="mínimo 6 caracteres"
            style={{ fontFamily: "'Space Mono', monospace" }}
            className={`bg-input-background border px-4 py-3.5 outline-none uppercase tracking-widest text-[12px] placeholder:text-muted-foreground/50 transition-colors duration-100 ${
              errors.password
                ? "border-destructive focus:border-destructive"
                : "border-foreground focus:border-primary"
            }`}
            {...register("password")}
          />
          {errors.password && (
            <span
              style={{ fontFamily: "'Space Mono', monospace" }}
              className="text-[10px] text-destructive uppercase tracking-wide"
            >
              {errors.password.message}
            </span>
          )}
        </label>
      </div>

      <QuizBanner active={isValid} />

      <SignupActions
        disabled={!isValid || isSubmitting}
        onSelectTarget={(t) => setTarget(t)}
      />
    </form>
  );
}
