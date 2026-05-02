import { useLibrary } from "@/store/library-store";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge, statusToTone } from "@/components/StatusBadge";
import { formatDate, isOverdue } from "@/lib/format";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function MyBorrows() {
  const { currentUser, borrows, books } = useLibrary();
  if (!currentUser) return null;
  const mine = borrows.filter((b) => b.userId === currentUser.id);
  return (
    <div>
      <PageHeader title="My borrow history" description="Every book you've borrowed." />
      <div className="surface-card overflow-hidden">{mine.length === 0 ? <EmptyState title="No history yet" description="Browse the catalogue to find your next read." action={<Button asChild><Link to="/member/catalogue">Browse</Link></Button>} /> : (
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-4 py-3 text-left">Book</th><th className="px-4 py-3 text-left">Borrowed</th><th className="px-4 py-3 text-left">Due</th><th className="px-4 py-3 text-left">Returned</th><th className="px-4 py-3 text-left">Status</th></tr></thead><tbody>
          {mine.map((br) => { const b = books.find((x) => x.id === br.bookId); const overdue = br.status !== "returned" && isOverdue(br.dueDate, br.returnedAt); return (
            <tr key={br.id} className={"border-t border-border " + (overdue ? "bg-danger/5" : "")}>
              <td className="px-4 py-3 font-medium">{b?.title}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(br.borrowedAt)}</td>
              <td className={"px-4 py-3 " + (overdue ? "text-danger font-medium" : "text-muted-foreground")}>{formatDate(br.dueDate)}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(br.returnedAt)}</td>
              <td className="px-4 py-3"><StatusBadge tone={statusToTone(overdue ? "overdue" : br.status)}>{overdue ? "overdue" : br.status}</StatusBadge></td>
            </tr>
          ); })}
        </tbody></table></div>
      )}</div>
    </div>
  );
}
