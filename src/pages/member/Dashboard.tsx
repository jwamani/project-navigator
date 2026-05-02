import { useLibrary } from "@/store/library-store";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { BookOpen, BookOpenCheck, CalendarClock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookCover } from "@/components/BookCover";
import { formatDate } from "@/lib/format";
import { StatusBadge, statusToTone } from "@/components/StatusBadge";
export default function MemberDashboard() {
  const { currentUser, books, borrows, reservations } = useLibrary();
  if (!currentUser) return null;
  const myBorrows = borrows.filter((b) => b.userId === currentUser.id);
  const active = myBorrows.filter((b) => b.status === "active");
  const myRes = reservations.filter((r) => r.userId === currentUser.id);
  const newest = books.filter((b) => !b.deleted).slice(-4);
  return (
    <div>
      <PageHeader title={"Welcome, " + currentUser.name.split(" ")[0]} description="Your reading and reservations." actions={<Button asChild><Link to="/member/catalogue">Browse catalogue</Link></Button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Currently borrowed" value={active.length} icon={BookOpenCheck} />
        <StatCard label="Reservations" value={myRes.filter((r) => r.status === "pending").length} icon={CalendarClock} tone="accent" />
        <StatCard label="Books read" value={myBorrows.filter((b) => b.status === "returned").length} icon={BookOpen} tone="secondary" />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="surface-card p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between"><h2 className="text-base font-semibold">Active borrows</h2><Button asChild variant="ghost" size="sm"><Link to="/member/borrows">All history</Link></Button></div>
          {active.length === 0 ? <p className="text-sm text-muted-foreground">No active borrows.</p> : (
            <ul className="space-y-2">{active.map((br) => { const b = books.find((x) => x.id === br.bookId); if (!b) return null; return (
              <li key={br.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3"><BookCover color={b.coverColor} title={b.title} size="sm" /><div><p className="text-sm font-medium">{b.title}</p><p className="text-xs text-muted-foreground">Due {formatDate(br.dueDate)}</p></div></div>
                <StatusBadge tone={statusToTone(br.status)}>{br.status}</StatusBadge>
              </li>
            ); })}</ul>
          )}
        </div>
        <div className="surface-card p-5">
          <h2 className="mb-3 text-base font-semibold">Newest in catalogue</h2>
          <ul className="space-y-3">{newest.map((b) => (
            <li key={b.id}><Link to={"/catalogue/" + b.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted"><BookCover color={b.coverColor} title={b.title} size="sm" /><div><p className="text-sm font-medium">{b.title}</p><p className="text-xs text-muted-foreground">{b.author}</p></div></Link></li>
          ))}</ul>
        </div>
      </div>
    </div>
  );
}
