import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Book, BorrowRecord, Category, Reservation, User, Role } from "@/lib/types";
import { seedBooks, seedBorrows, seedCategories, seedReservations, seedUsers } from "@/lib/mock-data";

interface LibraryState {
  users: User[];
  books: Book[];
  categories: Category[];
  borrows: BorrowRecord[];
  reservations: Reservation[];
  // current session
  currentUser: User | null;
  login: (email: string) => User | null;
  logout: () => void;
  setRole: (role: Role) => void;
  // user CRUD
  addUser: (u: Omit<User, "id" | "createdAt">) => void;
  updateUser: (id: string, patch: Partial<User>) => void;
  deleteUser: (id: string) => void;
  // book CRUD
  addBook: (b: Omit<Book, "id" | "availableCopies"> & { availableCopies?: number }) => void;
  updateBook: (id: string, patch: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  // category CRUD
  addCategory: (c: Omit<Category, "id">) => void;
  updateCategory: (id: string, patch: Partial<Category>) => void;
  deleteCategory: (id: string) => { ok: boolean; reason?: string };
  // borrow
  createBorrow: (userId: string, bookId: string, dueInDays?: number) => { ok: boolean; reason?: string };
  returnBorrow: (id: string) => void;
  // reservation
  createReservation: (userId: string, bookId: string) => { ok: boolean; reason?: string };
  cancelReservation: (id: string) => void;
  fulfilReservation: (id: string) => void;
}

const LibraryContext = createContext<LibraryState | null>(null);

const uid = (p: string) => `${p}-${Math.random().toString(36).slice(2, 8)}`;

const addDays = (d: number) => {
  const x = new Date();
  x.setDate(x.getDate() + d);
  return x.toISOString();
};

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(seedUsers);
  const [books, setBooks] = useState<Book[]>(seedBooks);
  const [categories, setCategories] = useState<Category[]>(seedCategories);
  const [borrows, setBorrows] = useState<BorrowRecord[]>(seedBorrows);
  const [reservations, setReservations] = useState<Reservation[]>(seedReservations);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = useCallback((email: string) => {
    const u = users.find((x) => x.email.toLowerCase() === email.toLowerCase()) ?? null;
    if (u) setCurrentUser(u);
    return u;
  }, [users]);

  const logout = useCallback(() => setCurrentUser(null), []);

  const setRole = useCallback((role: Role) => {
    const u = users.find((x) => x.role === role && x.status === "active");
    if (u) setCurrentUser(u);
  }, [users]);

  const value: LibraryState = useMemo(() => ({
    users, books, categories, borrows, reservations, currentUser,
    login, logout, setRole,
    addUser: (u) => setUsers((prev) => [...prev, { ...u, id: uid("u"), createdAt: new Date().toISOString() }]),
    updateUser: (id, patch) => setUsers((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x))),
    deleteUser: (id) => setUsers((prev) => prev.filter((x) => x.id !== id)),
    addBook: (b) => setBooks((prev) => [...prev, { ...b, id: uid("b"), availableCopies: b.availableCopies ?? b.totalCopies }]),
    updateBook: (id, patch) => setBooks((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x))),
    deleteBook: (id) => setBooks((prev) => prev.map((x) => (x.id === id ? { ...x, deleted: true } : x))),
    addCategory: (c) => setCategories((prev) => [...prev, { ...c, id: uid("c") }]),
    updateCategory: (id, patch) => setCategories((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x))),
    deleteCategory: (id) => {
      const inUse = books.some((b) => b.categoryId === id && !b.deleted);
      if (inUse) return { ok: false, reason: "Category has books attached." };
      setCategories((prev) => prev.filter((x) => x.id !== id));
      return { ok: true };
    },
    createBorrow: (userId, bookId, dueInDays = 14) => {
      const user = users.find((u) => u.id === userId);
      const book = books.find((b) => b.id === bookId);
      if (!user || !book) return { ok: false, reason: "Invalid user or book." };
      if (user.status !== "active") return { ok: false, reason: "User is not active." };
      if (user.role !== "member") return { ok: false, reason: "Only members can borrow." };
      if (book.availableCopies <= 0) return { ok: false, reason: "No copies available." };
      const userActive = borrows.filter((b) => b.userId === userId && b.status !== "returned").length;
      if (userActive >= 5) return { ok: false, reason: "User has reached 5-book limit." };
      setBorrows((prev) => [...prev, { id: uid("br"), userId, bookId, borrowedAt: new Date().toISOString(), dueDate: addDays(dueInDays), returnedAt: null, status: "active" }]);
      setBooks((prev) => prev.map((b) => (b.id === bookId ? { ...b, availableCopies: b.availableCopies - 1 } : b)));
      return { ok: true };
    },
    returnBorrow: (id) => {
      const rec = borrows.find((b) => b.id === id);
      if (!rec || rec.status === "returned") return;
      const now = new Date();
      const overdue = new Date(rec.dueDate).getTime() < now.getTime();
      setBorrows((prev) => prev.map((b) => (b.id === id ? { ...b, returnedAt: now.toISOString(), status: overdue ? "overdue" : "returned" } : b)));
      setBooks((prev) => prev.map((b) => (b.id === rec.bookId ? { ...b, availableCopies: b.availableCopies + 1 } : b)));
    },
    createReservation: (userId, bookId) => {
      const dup = reservations.find((r) => r.userId === userId && r.bookId === bookId && r.status === "pending");
      if (dup) return { ok: false, reason: "You already have a pending reservation for this book." };
      setReservations((prev) => [...prev, { id: uid("rs"), userId, bookId, reservedAt: new Date().toISOString(), expiresAt: addDays(7), status: "pending" }]);
      return { ok: true };
    },
    cancelReservation: (id) => setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status: "cancelled" } : r))),
    fulfilReservation: (id) => setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status: "fulfilled" } : r))),
  }), [users, books, categories, borrows, reservations, currentUser, login, logout, setRole]);

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used within LibraryProvider");
  return ctx;
}