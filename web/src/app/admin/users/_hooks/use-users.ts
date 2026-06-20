import { useState, useMemo } from "react";
import { User } from "../../_types";
import { SEED_USERS } from "../../_data/users";

export interface UseUsersReturn {
  users: User[];
  q: string;
  setQ: (q: string) => void;
  page: number;
  pages: number;
  setPage: (p: number) => void;
  editingUser: User | null;
  setEditingUser: (u: User | null) => void;
  confirmDel: User | null;
  setConfirmDel: (u: User | null) => void;
  saveUser: (u: User) => void;
  deleteUser: (id: number) => void;
}

const PAGE_SIZE = 6;

export function useUsers(): UseUsersReturn {
  const [allUsers, setAllUsers] = useState<User[]>(SEED_USERS);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [confirmDel, setConfirmDel] = useState<User | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return allUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
  }, [allUsers, q]);

  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginatedUsers = useMemo(() => {
    return filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);
  }, [filtered, curPage]);

  const saveUser = (user: User) => {
    if (user.id === 0) {
      const nextId = Math.max(0, ...allUsers.map((u) => u.id)) + 1;
      setAllUsers((prev) => [...prev, { ...user, id: nextId }]);
    } else {
      setAllUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    }
    setEditingUser(null);
  };

  const deleteUser = (id: number) => {
    setAllUsers((prev) => prev.filter((u) => u.id !== id));
    setConfirmDel(null);
  };

  return {
    users: paginatedUsers,
    q,
    setQ,
    page: curPage,
    pages,
    setPage,
    editingUser,
    setEditingUser,
    confirmDel,
    setConfirmDel,
    saveUser,
    deleteUser,
  };
}
