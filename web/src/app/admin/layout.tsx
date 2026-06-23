import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminLayoutClient from "./_components/admin-layout-client";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
