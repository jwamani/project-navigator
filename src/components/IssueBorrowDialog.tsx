import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLibrary } from "@/store/library-store";
import { toast } from "sonner";
export function IssueBorrowDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { users, books, createBorrow } = useLibrary();
  const [userId, setUserId] = useState("");
  const [bookId, setBookId] = useState("");
  const [days, setDays] = useState("14");
  const submit = () => {
    const res = createBorrow(userId, bookId, Number(days));
    if (!res.ok) { toast.error(res.reason ?? "Could not issue"); return; }
    toast.success("Book issued"); onOpenChange(false); setUserId(""); setBookId("");
  };
  const memberUsers = users.filter((u) => u.role === "member" && u.status === "active");
  const availableBooks = books.filter((b) => !b.deleted && b.availableCopies > 0);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Issue book</DialogTitle><DialogDescription>System enforces availability and 5-book limit.</DialogDescription></DialogHeader>
        <div className="space-y-4">
          <div><Label>Member *</Label><Select value={userId} onValueChange={setUserId}><SelectTrigger><SelectValue placeholder="Select member" /></SelectTrigger><SelectContent>{memberUsers.map((u) => <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>)}</SelectContent></Select></div>
          <div><Label>Book *</Label><Select value={bookId} onValueChange={setBookId}><SelectTrigger><SelectValue placeholder="Select book" /></SelectTrigger><SelectContent>{availableBooks.map((b) => <SelectItem key={b.id} value={b.id}>{b.title} — {b.availableCopies} avail.</SelectItem>)}</SelectContent></Select></div>
          <div><Label>Loan period</Label><Select value={days} onValueChange={setDays}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="7">7 days</SelectItem><SelectItem value="14">14 days</SelectItem><SelectItem value="21">21 days</SelectItem></SelectContent></Select></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={submit} disabled={!userId || !bookId}>Issue</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
