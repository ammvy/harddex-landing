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
        const permission = auth.user?.permission;
        if (!permission || !["ADMIN", "CURATOR"].includes(permission)) {
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
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.permission = user.permission;
        token.style = user.style;
        token.apiToken = user.apiToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId;
        session.user.permission = token.permission;
        session.user.style = token.style;
        session.user.apiToken = token.apiToken;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
