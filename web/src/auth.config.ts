import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isPrivateRoute =
        nextUrl.pathname.startsWith("/profile") ||
        nextUrl.pathname.startsWith("/compare") ||
        nextUrl.pathname.startsWith("/quiz");
      const isAuthPage = ["/login", "/signup"].includes(nextUrl.pathname);

      if (isAdminRoute) {
        if (!isLoggedIn) return false;
        const permission = (auth.user as any).permission;
        if (!["ADMIN", "CURATOR"].includes(permission)) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      if (isPrivateRoute) {
        if (!isLoggedIn) return false; // Redirect to /login
        return true;
      }

      // Redirect logged-in users away from auth pages (login/signup)
      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
