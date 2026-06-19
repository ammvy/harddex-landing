import { ProfileId } from "@/components/mouse";

export type UserPermissionEnum = "ADMIN" | "USER" | "CURATOR";

export interface User {
  id: string;
  name: string;
  email: string;
  style: ProfileId;
  permission: UserPermissionEnum;
}
