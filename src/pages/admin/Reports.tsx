import { useLibrary } from "@/store/library-store";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { isOverdue } from "@/lib/format";
export default function Reports() {
  const { books, borrows, users } = useLibrary();
  const popularity = books.map((b) => ({ book: b, count: borrows.filter((br) => br.bookId === b.id).length })).sort((a, b) => b.count - a.count).slice(0, 6);
  const userActivity = users.map((u) => ({ user: u, active: borrows.filter((b) => b.userId === u.id && b.status !== "returned").length, total: borrows.filter((b) => b.userId === u.id).length })).filter((x) => x.total > 0).sort((a, b) => b.total - a.total).slice(0, 6);
  const overdue = borrows.filter((b) => b.status !== "returned" && isOverdue(b.dueDate, b.returnedAt));
  return (
    <div>
      <PageHeader title="Reports" description="Snapshot of library activity." />
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface-card p-5">
          <h2 className="text-base font-semibold">Popular books</h2>
          <ul className="mt-4 space-y-2">{popularity.map(({ book, count }, i) => (
            <li key={book.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
              <div className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{i + 1}</span><div><p className="text-sm font-medium">{book.title}</p><p className="text-xs text-muted-foreground">{book.author}</p></div></div>
              <StatusBadge tone="info">{count} borrows</StatusBadge>
            </li>
          ))}</ul>
        </section>
        <section className="surface-card p-5">
          <h2 className="text-base font-semibold">User activity</h2>
          <ul className="mt-4 space-y-2">{userActivity.map(({ user, active, total }) => (
            <li key={user.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
              <div><p className="text-sm font-medium">{user.name}</p><p className="text-xs text-muted-foreground capitalize">{user.role}</p></div>
              <div className="flex gap-2"><StatusBadge tone="info">{active} active</StatusBadge><StatusBadge tone="neutral">{total} total</StatusBadge></div>
            </li>
          ))}</ul>
        </section>
        <section className="surface-card p-5 lg:col-span-2">
          <h2 className="text-base font-semibold">Overdue summary</h2>
          <p className="mt-1 text-sm text-muted-foreground">{overdue.length} borrows past due date.</p>
          <ul className="mt-4 space-y-2">{overdue.slice(0, 8).map((br) => { const u = users.find((x) => x.id === br.userId); const b = books.find((x) => x.id === br.bookId); return (
            <li key={br.id} className="flex items-center justify-between rounded-lg border border-border px-3 py-2"><span className="text-sm">{u?.name} — <span className="text-muted-foreground">{b?.title}</span></span><StatusBadge tone="danger">overdue</StatusBadge></li>
          ); })}</ul>
        </section>
      </div>
    </div>
  );
}
