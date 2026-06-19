"use client";

import { motion } from "motion/react";
import Logo from "@/app/_components/logo";
import Divider from "@/components/divider";
import LoginForm from "./_components/login-form";
import LoginFooterCta from "./_components/login-footer-cta";
import LoginSidePanel from "./_components/login-side-panel";
import Header from "@/components/header";

export default function Login() {
  return (
    <div
      className="min-h-screen w-full bg-background text-foreground transition-colors duration-200"
      style={{ fontFamily: "'Inter Tight', sans-serif" }}
    >
      <Header label="§ Login / 2026" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-12 min-h-[calc(100vh-66px)]">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-12 lg:col-span-7 lg:border-r border-border pr-0 lg:pr-16 py-12 lg:py-20 flex flex-col justify-center max-lg:mx-auto"
        >
          <div className="max-w-md w-full">
            <Logo size="sm" />

            <div className="mt-10">
              <h1
                style={{
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
                className="uppercase text-[clamp(32px,3.8vw,48px)] text-foreground"
              >
                Entrar<span className="text-primary">.</span>
              </h1>
              <p className="mt-3 text-[13px] text-foreground/70 max-w-sm">
                Acesse seu Index pessoal. Componentes salvos e recomendações sob
                medida.
              </p>
            </div>

            {/* <SocialAuthButtons /> */}

            {/* <Divider label="ou com e-mail" /> */}

            <Divider label="" />

            <LoginForm />

            <LoginFooterCta />
          </div>
        </motion.section>

        <LoginSidePanel />
      </div>
    </div>
  );
}
