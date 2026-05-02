import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLibrary } from "@/store/library-store";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookCover } from "@/components/BookCover";
import { StatusBadge } from "@/components/StatusBadge";
import { Search } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
export default function Catalogue() {
  const { books, categories } = useLibrary();
  const [q, setQ] = useState(""); const [cat, setCat] = useState("all");
  const filtered = useMemo(() => books.filter((b) => !b.deleted).filter((b) => cat === "all" ? true : b.categoryId === cat).filter((b) => {
    if (!q.trim()) return true; const s = q.toLowerCase();
    return [b.title, b.author, b.isbn, categories.find((c) => c.id === b.categoryId)?.name ?? ""].some((x) => x.toLowerCase().includes(s));
  }), [books, categories, q, cat]);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6"><h1 className="text-3xl font-semibold">Browse the catalogue</h1><p className="mt-1 text-sm text-muted-foreground">Search by title, author, ISBN, or category.</p></div>
      <div className="surface-card mb-6 flex flex-col gap-3 p-4 sm:flex-row">
        <div className="relative flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search books…" className="pl-9" /></div>
        <Select value={cat} onValueChange={setCat}><SelectTrigger className="sm:w-56"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All categories</SelectItem>{categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select>
      </div>
      {filtered.length === 0 ? <EmptyState title="No books found" description="Try another search term or category." /> : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((b) => { const c = categories.find((c) => c.id === b.categoryId); return (
            <Link key={b.id} to={"/catalogue/" + b.id} className="surface-card group flex gap-4 p-4 transition hover:shadow-elevated">
              <BookCover color={b.coverColor} title={b.title} />
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{c?.name}</p>
                <h3 className="mt-0.5 line-clamp-2 font-semibold leading-snug group-hover:text-primary">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.author}</p>
                <div className="mt-3">{b.availableCopies > 0 ? <StatusBadge tone="success">{b.availableCopies} available</StatusBadge> : <StatusBadge tone="danger">Unavailable</StatusBadge>}</div>
              </div>
            </Link>
          ); })}
        </div>
      )}
    </div>
  );
}
