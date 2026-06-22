import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { authConfig } from "./auth.config";

const API_BASE = process.env.API_URL ?? "http://localhost:3334";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const { data: res } = await axios.post(
            `${API_BASE}/api/v1/users/authenticate`,
            {
              email: credentials.email,
              password: credentials.password,
            },
          );

          if (res.success && res.data) {
            const { token, user } = res.data;

            return {
              id: String(user.id),
              name: user.name,
              email: user.email,
              permission: user.permission,
              style: user.style,
              apiToken: token,
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.permission = (user as any).permission;
        token.style = (user as any).style;
        token.apiToken = (user as any).apiToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId as string;
        (session.user as any).permission = token.permission;
        (session.user as any).style = token.style;
        (session.user as any).apiToken = token.apiToken;
      }
      return session;
    },
  },
});
