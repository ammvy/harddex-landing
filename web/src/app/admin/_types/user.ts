export type UserStyle =
  | "BASIC"
  | "INTERMEDIATE"
  | "ADVANCED"
  | "GAMER"
  | "PROFESSIONAL"
  | "REMOTE WORK"
  | "FILE / MEDIA"
  | "MOBILITY"
  | "LIGHT TRAVEL";

export type Permission = "ADMIN" | "USER" | "CURATOR";

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  style: UserStyle;
  permission: Permission;
}
