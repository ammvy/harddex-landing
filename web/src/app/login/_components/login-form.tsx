"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Insira um e-mail válido"),
  password: z
    .string()
    .min(1, "A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        setError("Credenciais inválidas. Verifique seu e-mail e senha.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Ocorreu um erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

      <label className="flex flex-col gap-2">
        <span
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="uppercase tracking-widest text-[10px] text-foreground/60 flex justify-between"
        >
          <span>Senha</span>
        </span>
        <input
          type="password"
          placeholder="••••••••"
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

      {error && (
        <div
          style={{ fontFamily: "'Space Mono', monospace" }}
          className="text-[11px] text-destructive uppercase tracking-wide text-center bg-destructive/10 py-2 border border-destructive/20"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{ fontFamily: "'Space Mono', monospace" }}
        className="bg-foreground text-background px-5 py-4 uppercase tracking-widest text-[12px] flex items-center justify-between hover:bg-primary transition-colors duration-100 mt-2 cursor-pointer dark:hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{isSubmitting ? "Entrando..." : "Entrar no Sistema"}</span>
        <ArrowRight size={14} strokeWidth={1.6} />
      </button>
    </form>
  );
}

