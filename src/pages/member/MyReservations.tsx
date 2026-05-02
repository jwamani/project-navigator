import { useLibrary } from "@/store/library-store";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge, statusToTone } from "@/components/StatusBadge";
import { formatDate } from "@/lib/format";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useState } from "react";
import { toast } from "sonner";
import type { Reservation } from "@/lib/types";
export default function MyReservations() {
  const { currentUser, reservations, books, cancelReservation } = useLibrary();
  const [target, setTarget] = useState<Reservation | null>(null);
  if (!currentUser) return null;
  const mine = reservations.filter((r) => r.userId === currentUser.id);
  return (
    <div>
      <PageHeader title="My reservations" description="Holds you've placed." actions={<Button asChild><Link to="/member/reservations/new">Place reservation</Link></Button>} />
      <div className="surface-card overflow-hidden">{mine.length === 0 ? <EmptyState title="No reservations yet" description="Reserve a book when all copies are on loan." action={<Button asChild><Link to="/member/catalogue">Browse</Link></Button>} /> : (
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-4 py-3 text-left">Book</th><th className="px-4 py-3 text-left">Reserved</th><th className="px-4 py-3 text-left">Expires</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody>
          {mine.map((r) => { const b = books.find((x) => x.id === r.bookId); return (
            <tr key={r.id} className="border-t border-border">
              <td className="px-4 py-3 font-medium">{b?.title}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(r.reservedAt)}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(r.expiresAt)}</td>
              <td className="px-4 py-3"><StatusBadge tone={statusToTone(r.status)}>{r.status}</StatusBadge></td>
              <td className="px-4 py-3 text-right">{r.status === "pending" && <Button size="sm" variant="outline" onClick={() => setTarget(r)}>Cancel</Button>}</td>
            </tr>
          ); })}
        </tbody></table></div>
      )}</div>
      <ConfirmDialog open={!!target} onOpenChange={(v) => !v && setTarget(null)} title="Cancel reservation?" destructive confirmLabel="Cancel reservation" onConfirm={() => { if (target) { cancelReservation(target.id); toast.success("Cancelled"); setTarget(null); } }} />
    </div>
  );
}
