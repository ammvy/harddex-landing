import "next-auth";
import "next-auth/jwt";

type UserPermission = "ADMIN" | "USER" | "CURATOR";
type UserStyle = "BASIC" | "INTERMEDIATE" | "ADVANCED" | "GAMER" | "PROFESSIONAL" 
  | "REMOTE WORK" | "FILE / MEDIA" | "MOBILITY" | "LIGHT TRAVEL";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    permission: UserPermission | null;
    style: UserStyle | null;
    apiToken: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      permission: UserPermission | null;
      style: UserStyle | null;
      apiToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    permission: UserPermission | null;
    style: UserStyle | null;
    apiToken: string;
  }
}
