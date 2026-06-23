import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/:path*"],
};

export default function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const payloadBase64 = parts[1];
      const normalizedBase64 = payloadBase64
        .replace(/-/g, "+")
        .replace(/_/g, "/");
      const paddedBase64 =
        normalizedBase64 + "=".repeat((4 - (normalizedBase64.length % 4)) % 4);
      const decodedPayload = atob(paddedBase64);
      const payload = JSON.parse(decodedPayload);

      const role = payload.permission || payload.role;

      if (role !== "ADMIN" && role !== "CURATOR") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch (e) {
      console.error("Error validating token in proxy middleware:", e);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}
