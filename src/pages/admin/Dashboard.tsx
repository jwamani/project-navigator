import { useLibrary } from "@/store/library-store";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { BookOpen, BookOpenCheck, AlertOctagon, Users } from "lucide-react";
import { isOverdue, formatDate } from "@/lib/format";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatusBadge, statusToTone } from "@/components/StatusBadge";
export default function AdminDashboard() {
  const { books, borrows, reservations, users } = useLibrary();
  const activeBorrows = borrows.filter((b) => b.status === "active");
  const overdue = borrows.filter((b) => b.status !== "returned" && isOverdue(b.dueDate, b.returnedAt));
  return (
    <div>
      <PageHeader title="Admin dashboard" description="Snapshot of library activity." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total books" value={books.filter((b) => !b.deleted).length} icon={BookOpen} hint={books.reduce((s, b) => s + b.totalCopies, 0) + " copies total"} />
        <StatCard label="Active borrows" value={activeBorrows.length} icon={BookOpenCheck} tone="secondary" />
        <StatCard label="Overdue" value={overdue.length} icon={AlertOctagon} tone="danger" />
        <StatCard label="Registered users" value={users.length} icon={Users} tone="accent" />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="surface-card p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between"><h2 className="text-base font-semibold">Recent borrows</h2><Button asChild variant="ghost" size="sm"><Link to="/admin/borrows">View all</Link></Button></div>
          <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-xs uppercase tracking-wider text-muted-foreground"><th className="pb-2">Member</th><th className="pb-2">Book</th><th className="pb-2">Due</th><th className="pb-2">Status</th></tr></thead><tbody>
            {borrows.slice(0, 6).map((br) => { const u = users.find((x) => x.id === br.userId); const b = books.find((x) => x.id === br.bookId); return (
              <tr key={br.id} className="border-t border-border"><td className="py-2.5">{u?.name}</td><td className="py-2.5">{b?.title}</td><td className="py-2.5">{formatDate(br.dueDate)}</td><td className="py-2.5"><StatusBadge tone={statusToTone(br.status)}>{br.status}</StatusBadge></td></tr>
            ); })}
          </tbody></table></div>
        </div>
        <div className="surface-card p-5">
          <h2 className="mb-3 text-base font-semibold">Pending reservations</h2>
          <ul className="space-y-2.5 text-sm">{reservations.filter((r) => r.status === "pending").slice(0, 6).map((r) => { const u = users.find((x) => x.id === r.userId); const b = books.find((x) => x.id === r.bookId); return (
            <li key={r.id} className="flex items-center justify-between rounded-lg border border-border p-2.5"><div><p className="font-medium">{b?.title}</p><p className="text-xs text-muted-foreground">for {u?.name}</p></div><span className="text-xs text-muted-foreground">{formatDate(r.expiresAt)}</span></li>
          ); })}</ul>
        </div>
      </div>
    </div>
  );
}
