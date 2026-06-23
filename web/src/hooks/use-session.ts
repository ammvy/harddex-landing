"use client";

import { useEffect, useState } from "react";

export interface SessionUser {
  id: string | number;
  name: string;
  email: string;
  permission: "ADMIN" | "CURATOR" | "USER";
  style?: string;
  [key: string]: any;
}

export interface Session {
  user: SessionUser | null;
  loading: boolean;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const nameLenPlus = name.length + 1;
  return (
    document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((cookie) => cookie.substring(0, nameLenPlus) === `${name}=`)
      .map((cookie) => decodeURIComponent(cookie.substring(nameLenPlus)))[0] || null
  );
}

function decodeJwt(token: string): any {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = payloadBase64 + "=".repeat((4 - (payloadBase64.length % 4)) % 4);
    const decoded = atob(padded);
    return JSON.parse(decoded);
  } catch (e) {
    console.error("Failed to decode token:", e);
    return null;
  }
}

export function useSession(): Session {
  const [session, setSession] = useState<Session>({ user: null, loading: true });

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      setSession({ user: null, loading: false });
      return;
    }

    const payload = decodeJwt(token);
    if (payload) {
      const user: SessionUser = {
        id: payload.id || payload.sub || "",
        name: payload.name || "",
        email: payload.email || "",
        permission: payload.permission || payload.role || "USER",
        style: payload.style,
      };
      setSession({ user, loading: false });
    } else {
      setSession({ user: null, loading: false });
    }
  }, []);

  return session;
}
