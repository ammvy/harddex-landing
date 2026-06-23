"use client";

import { useState, useRef } from "react";
import { Device } from "../_data/types";
import { ProfileId } from "@/components/mouse";

export type OpinionState = "idle" | "loading" | "streaming" | "done" | "error";

export function useMouseOpinion() {
  const [state, setState] = useState<OpinionState>("idle");
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [tdu, setTdu] = useState<ProfileId>("GAMER");
  const animationIdRef = useRef<number>(0);

  const reset = () => {
    animationIdRef.current++;
    setState("idle");
    setResponse("");
    setError(null);
  };

  const askOpinion = async (deviceA: Device, deviceB: Device) => {
    if (!deviceA || !deviceB) return;

    animationIdRef.current++;
    const currentAnimationId = animationIdRef.current;

    setState("loading");
    setResponse("");
    setError(null);

    try {
      const res = await fetch("/api/mouse-opinion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceA,
          deviceB,
          tdu,
        }),
      });

      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.statusText}`);
      }

      const data = await res.json();
      const fullText = data.text || "";

      if (currentAnimationId !== animationIdRef.current) return;

      setState("streaming");

      const words = fullText.split(" ");
      let accumulatedText = "";

      for (let i = 0; i < words.length; i++) {
        if (currentAnimationId !== animationIdRef.current) return;
        accumulatedText += (i === 0 ? "" : " ") + words[i];
        setResponse(accumulatedText);
        // Pequeno atraso para simular digitação natural
        await new Promise((resolve) => setTimeout(resolve, 20 + Math.random() * 20));
      }

      if (currentAnimationId !== animationIdRef.current) return;
      setState("done");
    } catch (err: any) {
      if (currentAnimationId === animationIdRef.current) {
        console.error(err);
        setError(err.message || "Ocorreu um erro desconhecido.");
        setState("error");
      }
    }
  };

  return {
    state,
    response,
    error,
    tdu,
    setTdu,
    askOpinion,
    reset,
  };
}

