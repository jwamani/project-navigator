import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "@/store/library-store";
import { PageHeader } from "@/components/PageHeader";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
export default function CreateReservation() {
  const navigate = useNavigate();
  const { books, currentUser, createReservation } = useLibrary();
  const [bookId, setBookId] = useState("");
  if (!currentUser) return null;
  const unavailable = books.filter((b) => !b.deleted && b.availableCopies === 0);
  return (
    <div>
      <PageHeader title="Place a reservation" description="Hold an unavailable book." />
      <form className="surface-card max-w-xl space-y-4 p-6" onSubmit={(e) => { e.preventDefault(); if (!bookId) return; const res = createReservation(currentUser.id, bookId); if (!res.ok) return toast.error(res.reason ?? "Could not reserve"); toast.success("Reservation placed"); navigate("/member/reservations"); }}>
        <div>
          <Label>Book *</Label>
          <Select value={bookId} onValueChange={setBookId}><SelectTrigger><SelectValue placeholder="Select unavailable book" /></SelectTrigger><SelectContent>{unavailable.map((b) => <SelectItem key={b.id} value={b.id}>{b.title} — {b.author}</SelectItem>)}</SelectContent></Select>
          {unavailable.length === 0 && <p className="mt-2 text-xs text-muted-foreground">All books currently have available copies.</p>}
        </div>
        <div className="flex gap-2"><Button type="submit" disabled={!bookId}>Place reservation</Button><Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button></div>
      </form>
    </div>
  );
}
