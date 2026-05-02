import { useLibrary } from "@/store/library-store";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { BookOpen, BookOpenCheck, AlertOctagon, CalendarClock } from "lucide-react";
import { isOverdue, formatDate } from "@/lib/format";
import { StatusBadge, statusToTone } from "@/components/StatusBadge";
export default function LibrarianDashboard() {
  const { books, borrows, reservations, users } = useLibrary();
  const available = books.filter((b) => !b.deleted && b.availableCopies > 0).length;
  const active = borrows.filter((b) => b.status === "active").length;
  const overdue = borrows.filter((b) => b.status !== "returned" && isOverdue(b.dueDate, b.returnedAt));
  const pendingRes = reservations.filter((r) => r.status === "pending");
  return (
    <div>
      <PageHeader title="Librarian workspace" description="Daily operations at a glance." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Books available" value={available} icon={BookOpen} />
        <StatCard label="Active borrows" value={active} icon={BookOpenCheck} tone="secondary" />
        <StatCard label="Overdue" value={overdue.length} icon={AlertOctagon} tone="danger" />
        <StatCard label="Pending reservations" value={pendingRes.length} icon={CalendarClock} tone="accent" />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="surface-card p-5">
          <h2 className="text-base font-semibold">Today's overdue</h2>
          <ul className="mt-3 space-y-2 text-sm">{overdue.slice(0, 6).map((br) => { const u = users.find((x) => x.id === br.userId); const b = books.find((x) => x.id === br.bookId); return (
            <li key={br.id} className="flex items-center justify-between rounded-lg border border-border bg-danger/5 px-3 py-2"><div><p className="font-medium">{b?.title}</p><p className="text-xs text-muted-foreground">{u?.name} · due {formatDate(br.dueDate)}</p></div><StatusBadge tone="danger">overdue</StatusBadge></li>
          ); })}{overdue.length === 0 && <p className="text-sm text-muted-foreground">Nothing overdue.</p>}</ul>
        </div>
        <div className="surface-card p-5">
          <h2 className="text-base font-semibold">Pending holds</h2>
          <ul className="mt-3 space-y-2 text-sm">{pendingRes.slice(0, 6).map((r) => { const u = users.find((x) => x.id === r.userId); const b = books.find((x) => x.id === r.bookId); return (
            <li key={r.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2"><div><p className="font-medium">{b?.title}</p><p className="text-xs text-muted-foreground">for {u?.name}</p></div><StatusBadge tone={statusToTone("pending")}>pending</StatusBadge></li>
          ); })}{pendingRes.length === 0 && <p className="text-sm text-muted-foreground">No pending reservations.</p>}</ul>
        </div>
      </div>
    </div>
  );
}
