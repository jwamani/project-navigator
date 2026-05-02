import { Link, useNavigate, useParams } from "react-router-dom";
import { useLibrary } from "@/store/library-store";
import { BookCover } from "@/components/BookCover";
import { StatusBadge, statusToTone } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookmarkPlus } from "lucide-react";
import { formatDate } from "@/lib/format";
import { toast } from "sonner";
export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, categories, currentUser, borrows, reservations, users, createReservation } = useLibrary();
  const book = books.find((b) => b.id === id);
  if (!book) return <div className="mx-auto max-w-3xl px-4 py-16 text-center"><h1 className="text-2xl font-semibold">Book not found</h1><Button asChild className="mt-4"><Link to="/catalogue">Back to catalogue</Link></Button></div>;
  const category = categories.find((c) => c.id === book.categoryId);
  const bookBorrows = borrows.filter((b) => b.bookId === book.id);
  const activeReservations = reservations.filter((r) => r.bookId === book.id && r.status === "pending");
  const reserve = () => {
    if (!currentUser) { navigate("/login"); return; }
    const res = createReservation(currentUser.id, book.id);
    if (!res.ok) toast.error(res.reason ?? "Could not reserve"); else toast.success("Reservation placed");
  };
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6 gap-1"><ArrowLeft className="h-4 w-4" /> Back</Button>
      <div className="surface-card overflow-hidden">
        <div className="grid gap-8 p-6 sm:grid-cols-[auto,1fr] sm:p-8">
          <BookCover color={book.coverColor} title={book.title} size="lg" />
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{category?.name}</p>
            <h1 className="mt-1 text-3xl font-semibold leading-tight">{book.title}</h1>
            <p className="mt-1 text-base text-muted-foreground">by {book.author}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {book.availableCopies > 0 ? <StatusBadge tone="success">{book.availableCopies} of {book.totalCopies} available</StatusBadge> : <StatusBadge tone="danger">All copies on loan</StatusBadge>}
              <StatusBadge tone="neutral">ISBN {book.isbn}</StatusBadge>
              <StatusBadge tone="neutral">{book.publisher} · {book.year}</StatusBadge>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-foreground/90">{book.description}</p>
            {currentUser?.role === "member" && book.availableCopies === 0 && <Button onClick={reserve} className="mt-6 gap-2"><BookmarkPlus className="h-4 w-4" /> Reserve this book</Button>}
          </div>
        </div>
        <div className="border-t border-border bg-muted/30 p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-base font-semibold">Borrow history</h2>
              {bookBorrows.length === 0 ? <p className="mt-2 text-sm text-muted-foreground">No history yet.</p> : (
                <ul className="mt-3 space-y-2 text-sm">{bookBorrows.slice(0, 5).map((br) => { const u = users.find((x) => x.id === br.userId); return (
                  <li key={br.id} className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2">
                    <span>{u?.name ?? "Unknown"}</span><span className="text-xs text-muted-foreground">{formatDate(br.borrowedAt)}</span>
                    <StatusBadge tone={statusToTone(br.status)}>{br.status}</StatusBadge>
                  </li>
                ); })}</ul>
              )}
            </div>
            <div>
              <h2 className="text-base font-semibold">Active reservations</h2>
              {activeReservations.length === 0 ? <p className="mt-2 text-sm text-muted-foreground">None.</p> : (
                <ul className="mt-3 space-y-2 text-sm">{activeReservations.map((r) => { const u = users.find((x) => x.id === r.userId); return (
                  <li key={r.id} className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2">
                    <span>{u?.name ?? "Unknown"}</span><span className="text-xs text-muted-foreground">expires {formatDate(r.expiresAt)}</span>
                  </li>
                ); })}</ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
