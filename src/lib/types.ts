export type Role = "admin" | "librarian" | "member";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: "active" | "inactive";
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  categoryId: string;
  publisher: string;
  year: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  deleted?: boolean;
}

export interface BorrowRecord {
  id: string;
  userId: string;
  bookId: string;
  borrowedAt: string;
  dueDate: string;
  returnedAt?: string | null;
  status: "active" | "returned" | "overdue";
}

export interface Reservation {
  id: string;
  userId: string;
  bookId: string;
  reservedAt: string;
  expiresAt: string;
  status: "pending" | "fulfilled" | "cancelled";
}