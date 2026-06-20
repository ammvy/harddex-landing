"use client";

import { useUsers } from "./_hooks/use-users";
import UsersTable from "./_components/users-table";

export default function UsersPage() {
  const hook = useUsers();
  return <UsersTable {...hook} />;
}
