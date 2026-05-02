import { useState } from "react";
import { useLibrary } from "@/store/library-store";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { CategoryFormDialog } from "@/components/CategoryFormDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import type { Category } from "@/lib/types";
import { toast } from "sonner";
export default function CategoriesPage() {
  const { categories, books, deleteCategory } = useLibrary();
  const [creating, setCreating] = useState(false); const [editing, setEditing] = useState<Category | null>(null); const [confirmDel, setConfirmDel] = useState<Category | null>(null);
  return (
    <div>
      <PageHeader title="Categories" description="Organise the catalogue." actions={<Button onClick={() => setCreating(true)} className="gap-2"><Plus className="h-4 w-4" /> New category</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{categories.map((c) => { const count = books.filter((b) => b.categoryId === c.id && !b.deleted).length; return (
        <div key={c.id} className="surface-card p-5">
          <div className="flex items-start justify-between">
            <div><h3 className="font-semibold">{c.name}</h3><p className="mt-1 text-xs text-muted-foreground">{count} {count === 1 ? "book" : "books"}</p></div>
            <div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => setEditing(c)}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" onClick={() => setConfirmDel(c)}><Trash2 className="h-4 w-4 text-danger" /></Button></div>
          </div>
          {c.description && <p className="mt-3 text-sm text-muted-foreground">{c.description}</p>}
        </div>
      ); })}</div>
      <CategoryFormDialog open={creating} onOpenChange={setCreating} />
      <CategoryFormDialog open={!!editing} onOpenChange={(v) => !v && setEditing(null)} category={editing} />
      <ConfirmDialog open={!!confirmDel} onOpenChange={(v) => !v && setConfirmDel(null)} title="Delete category?" description={"Remove '" + (confirmDel?.name ?? "") + "'."} confirmLabel="Delete" destructive onConfirm={() => { if (!confirmDel) return; const res = deleteCategory(confirmDel.id); if (!res.ok) toast.error(res.reason ?? "Cannot delete"); else toast.success("Deleted"); setConfirmDel(null); }} />
    </div>
  );
}
