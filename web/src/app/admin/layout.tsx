import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminLayoutClient from "./_components/admin-layout-client";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const permission = (session.user as any).permission;
  if (!["ADMIN", "CURATOR"].includes(permission)) {
    redirect("/");
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
