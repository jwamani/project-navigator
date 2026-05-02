import type { Book, BorrowRecord, Category, Reservation, User } from "./types";

const daysFromNow = (d: number) => {
  const date = new Date();
  date.setDate(date.getDate() + d);
  return date.toISOString();
};

export const seedUsers: User[] = [
  { id: "u-admin", name: "Amelia Chen", email: "admin@olms.app", phone: "+1 555 0100", role: "admin", status: "active", createdAt: daysFromNow(-200) },
  { id: "u-lib1", name: "Marcus Hale", email: "librarian@olms.app", phone: "+1 555 0110", role: "librarian", status: "active", createdAt: daysFromNow(-150) },
  { id: "u-lib2", name: "Priya Natarajan", email: "priya@olms.app", phone: "+1 555 0111", role: "librarian", status: "active", createdAt: daysFromNow(-120) },
  { id: "u-mem1", name: "Jordan Reyes", email: "member@olms.app", phone: "+1 555 0120", role: "member", status: "active", createdAt: daysFromNow(-90) },
  { id: "u-mem2", name: "Sasha Lin", email: "sasha@olms.app", phone: "+1 555 0121", role: "member", status: "active", createdAt: daysFromNow(-60) },
  { id: "u-mem3", name: "Diego Romero", email: "diego@olms.app", phone: "+1 555 0122", role: "member", status: "active", createdAt: daysFromNow(-45) },
  { id: "u-mem4", name: "Hana Otsuka", email: "hana@olms.app", phone: "+1 555 0123", role: "member", status: "inactive", createdAt: daysFromNow(-30) },
  { id: "u-mem5", name: "Liam Walsh", email: "liam@olms.app", phone: "+1 555 0124", role: "member", status: "active", createdAt: daysFromNow(-15) },
];

export const seedCategories: Category[] = [
  { id: "c-fic", name: "Fiction", description: "Novels, short stories and literary works." },
  { id: "c-sci", name: "Science", description: "Pure and applied sciences." },
  { id: "c-his", name: "History", description: "World, regional, and cultural history." },
  { id: "c-tec", name: "Technology", description: "Computing, engineering, and design." },
  { id: "c-bio", name: "Biography", description: "Memoirs and biographies." },
  { id: "c-phi", name: "Philosophy", description: "Thought, ethics, and reasoning." },
];

const palette = ["#12324A", "#2F6F68", "#C48F1D", "#52606D", "#1F4F6B", "#3B7A66"];

export const seedBooks: Book[] = [
  { id: "b-1", title: "The Silent Library", author: "Eleanor Voss", isbn: "978-0-141-03956-9", categoryId: "c-fic", publisher: "North Harbor Press", year: 2021, totalCopies: 4, availableCopies: 2, description: "A literary mystery set in a forgotten archive where every book hides a secret.", coverColor: palette[0] },
  { id: "b-2", title: "Foundations of Modern Physics", author: "Dr. Aiko Tanaka", isbn: "978-0-262-03384-8", categoryId: "c-sci", publisher: "Meridian Academic", year: 2019, totalCopies: 3, availableCopies: 0, description: "A graduate-level survey of quantum mechanics, relativity, and statistical physics.", coverColor: palette[1] },
  { id: "b-3", title: "Tides of Empire", author: "Hugh Marren", isbn: "978-1-846-14478-3", categoryId: "c-his", publisher: "Continental Press", year: 2018, totalCopies: 2, availableCopies: 1, description: "A sweeping account of maritime trade and the rise of colonial powers.", coverColor: palette[2] },
  { id: "b-4", title: "Designing Resilient Systems", author: "Priya Subramanian", isbn: "978-1-491-95035-7", categoryId: "c-tec", publisher: "Bluegrid Publishing", year: 2022, totalCopies: 5, availableCopies: 3, description: "Patterns and practices for building distributed software that survives failure.", coverColor: palette[3] },
  { id: "b-5", title: "Letters From the Archive", author: "Margaret Holloway", isbn: "978-0-307-27787-9", categoryId: "c-bio", publisher: "Linden House", year: 2020, totalCopies: 2, availableCopies: 2, description: "A biographer's discovery of a lost correspondence between two 20th-century writers.", coverColor: palette[4] },
  { id: "b-6", title: "On Quiet Reasoning", author: "Theodor Klein", isbn: "978-0-19-280574-2", categoryId: "c-phi", publisher: "Athenaeum", year: 2017, totalCopies: 2, availableCopies: 1, description: "Essays on humility, doubt, and the practice of careful thought.", coverColor: palette[5] },
  { id: "b-7", title: "Cartography of Memory", author: "Inés Vega", isbn: "978-0-525-43891-0", categoryId: "c-fic", publisher: "North Harbor Press", year: 2023, totalCopies: 3, availableCopies: 0, description: "A novel about a cartographer who maps the cities her grandmother dreamed.", coverColor: palette[0] },
  { id: "b-8", title: "The Genome Atlas", author: "Dr. Ravi Mehta", isbn: "978-0-393-35446-3", categoryId: "c-sci", publisher: "Meridian Academic", year: 2020, totalCopies: 4, availableCopies: 4, description: "An accessible tour of modern genomics, from sequencing to ethics.", coverColor: palette[1] },
  { id: "b-9", title: "Roads Through the Steppe", author: "Anya Volkov", isbn: "978-0-674-08743-1", categoryId: "c-his", publisher: "Continental Press", year: 2016, totalCopies: 2, availableCopies: 1, description: "A history of Central Asian trade networks across two millennia.", coverColor: palette[2] },
  { id: "b-10", title: "Practical Type Systems", author: "Lena Park", isbn: "978-1-718-50019-7", categoryId: "c-tec", publisher: "Bluegrid Publishing", year: 2024, totalCopies: 4, availableCopies: 2, description: "A working programmer's guide to type theory and applied type design.", coverColor: palette[3] },
  { id: "b-11", title: "A Botanist Abroad", author: "Wilhelmina Carr", isbn: "978-1-784-87253-2", categoryId: "c-bio", publisher: "Linden House", year: 2019, totalCopies: 2, availableCopies: 2, description: "The journals of a Victorian-era botanist exploring the Pacific.", coverColor: palette[4] },
  { id: "b-12", title: "The Architecture of Stillness", author: "Yusuke Mori", isbn: "978-0-300-25104-9", categoryId: "c-phi", publisher: "Athenaeum", year: 2021, totalCopies: 3, availableCopies: 0, description: "Reflections on space, attention, and contemplative practice.", coverColor: palette[5] },
];

export const seedBorrows: BorrowRecord[] = [
  { id: "br-1", userId: "u-mem1", bookId: "b-1", borrowedAt: daysFromNow(-10), dueDate: daysFromNow(4), returnedAt: null, status: "active" },
  { id: "br-2", userId: "u-mem2", bookId: "b-1", borrowedAt: daysFromNow(-6), dueDate: daysFromNow(8), returnedAt: null, status: "active" },
  { id: "br-3", userId: "u-mem1", bookId: "b-3", borrowedAt: daysFromNow(-3), dueDate: daysFromNow(11), returnedAt: null, status: "active" },
  { id: "br-4", userId: "u-mem3", bookId: "b-4", borrowedAt: daysFromNow(-20), dueDate: daysFromNow(-6), returnedAt: null, status: "overdue" },
  { id: "br-5", userId: "u-mem3", bookId: "b-4", borrowedAt: daysFromNow(-18), dueDate: daysFromNow(-4), returnedAt: null, status: "overdue" },
  { id: "br-6", userId: "u-mem5", bookId: "b-9", borrowedAt: daysFromNow(-12), dueDate: daysFromNow(2), returnedAt: null, status: "active" },
  { id: "br-7", userId: "u-mem2", bookId: "b-6", borrowedAt: daysFromNow(-30), dueDate: daysFromNow(-16), returnedAt: daysFromNow(-14), status: "returned" },
  { id: "br-8", userId: "u-mem1", bookId: "b-10", borrowedAt: daysFromNow(-25), dueDate: daysFromNow(-11), returnedAt: daysFromNow(-12), status: "returned" },
  { id: "br-9", userId: "u-mem5", bookId: "b-4", borrowedAt: daysFromNow(-8), dueDate: daysFromNow(6), returnedAt: null, status: "active" },
  { id: "br-10", userId: "u-mem2", bookId: "b-10", borrowedAt: daysFromNow(-5), dueDate: daysFromNow(9), returnedAt: null, status: "active" },
];

export const seedReservations: Reservation[] = [
  { id: "rs-1", userId: "u-mem1", bookId: "b-2", reservedAt: daysFromNow(-2), expiresAt: daysFromNow(5), status: "pending" },
  { id: "rs-2", userId: "u-mem2", bookId: "b-7", reservedAt: daysFromNow(-1), expiresAt: daysFromNow(6), status: "pending" },
  { id: "rs-3", userId: "u-mem5", bookId: "b-12", reservedAt: daysFromNow(-4), expiresAt: daysFromNow(3), status: "pending" },
  { id: "rs-4", userId: "u-mem1", bookId: "b-12", reservedAt: daysFromNow(-15), expiresAt: daysFromNow(-8), status: "fulfilled" },
  { id: "rs-5", userId: "u-mem3", bookId: "b-2", reservedAt: daysFromNow(-12), expiresAt: daysFromNow(-5), status: "cancelled" },
];