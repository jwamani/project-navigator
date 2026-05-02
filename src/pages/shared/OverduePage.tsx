import { useLibrary } from "@/store/library-store";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate, isOverdue, daysUntil } from "@/lib/format";
import { EmptyState } from "@/components/EmptyState";
export default function OverduePage() {
  const { borrows, users, books } = useLibrary();
  const overdue = borrows.filter((b) => b.status !== "returned" && isOverdue(b.dueDate, b.returnedAt));
  return (
    <div>
      <PageHeader title="Overdue records" description="Borrows past due date." />
      <div className="surface-card overflow-hidden">{overdue.length === 0 ? <EmptyState title="Nothing overdue" description="All borrows within their due date." /> : (
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-4 py-3 text-left">Member</th><th className="px-4 py-3 text-left">Book</th><th className="px-4 py-3 text-left">Due</th><th className="px-4 py-3 text-left">Days late</th><th className="px-4 py-3 text-left">Status</th></tr></thead><tbody>
          {overdue.map((br) => { const u = users.find((x) => x.id === br.userId); const b = books.find((x) => x.id === br.bookId); const late = -daysUntil(br.dueDate); return (
            <tr key={br.id} className="border-t border-border bg-danger/5"><td className="px-4 py-3 font-medium">{u?.name}</td><td className="px-4 py-3">{b?.title}</td><td className="px-4 py-3 text-danger font-medium">{formatDate(br.dueDate)}</td><td className="px-4 py-3">{late} {late === 1 ? "day" : "days"}</td><td className="px-4 py-3"><StatusBadge tone="danger">overdue</StatusBadge></td></tr>
          ); })}
        </tbody></table></div>
      )}</div>
    </div>
  );
}
