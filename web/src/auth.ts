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
});
