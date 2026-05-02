import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLibrary } from "@/store/library-store";
import type { Category } from "@/lib/types";
import { toast } from "sonner";
export function CategoryFormDialog({ open, onOpenChange, category }: { open: boolean; onOpenChange: (v: boolean) => void; category?: Category | null }) {
  const { addCategory, updateCategory } = useLibrary();
  const isEdit = !!category;
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  useEffect(() => {
    if (category) setForm({ name: category.name, description: category.description ?? "" });
    else setForm({ name: "", description: "" });
    setError("");
  }, [category, open]);
  const submit = () => {
    if (!form.name.trim()) { setError("Name required."); return; }
    if (isEdit && category) { updateCategory(category.id, form); toast.success("Updated"); }
    else { addCategory(form); toast.success("Created"); }
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>{isEdit ? "Edit category" : "Create category"}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label htmlFor="cname">Name *</Label><Input id="cname" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />{error && <p className="mt-1 text-xs text-danger">{error}</p>}</div>
          <div><Label htmlFor="cdesc">Description</Label><Textarea id="cdesc" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={submit}>{isEdit ? "Save" : "Create"}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
