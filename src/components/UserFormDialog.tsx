import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLibrary } from "@/store/library-store";
import type { Role, User } from "@/lib/types";
import { toast } from "sonner";
export function UserFormDialog({ open, onOpenChange, user }: { open: boolean; onOpenChange: (v: boolean) => void; user?: User | null }) {
  const { addUser, updateUser } = useLibrary();
  const isEdit = !!user;
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "member" as Role, status: "active" as "active" | "inactive", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (user) setForm({ name: user.name, email: user.email, phone: user.phone, role: user.role, status: user.status, password: "" });
    else setForm({ name: "", email: "", phone: "", role: "member", status: "active", password: "" });
    setErrors({});
  }, [user, open]);
  const submit = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name required.";
    if (!form.email.trim()) errs.email = "Email required.";
    if (!isEdit && form.password.length < 6) errs.password = "Min 6 chars.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (isEdit && user) { updateUser(user.id, { name: form.name, email: form.email, phone: form.phone, role: form.role, status: form.status }); toast.success("User updated"); }
    else { addUser({ name: form.name, email: form.email, phone: form.phone, role: form.role, status: form.status }); toast.success("User created"); }
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{isEdit ? "Edit user" : "Create user"}</DialogTitle><DialogDescription>{isEdit ? "Update user details." : "Add a new user account."}</DialogDescription></DialogHeader>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2"><Label htmlFor="name">Name *</Label><Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />{errors.name && <p className="mt-1 text-xs text-danger">{errors.name}</p>}</div>
          <div><Label htmlFor="email">Email *</Label><Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />{errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}</div>
          <div><Label htmlFor="phone">Phone</Label><Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          <div><Label>Role</Label><Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as Role })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="admin">Admin</SelectItem><SelectItem value="librarian">Librarian</SelectItem><SelectItem value="member">Member</SelectItem></SelectContent></Select></div>
          <div><Label>Status</Label><Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as "active" | "inactive" })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem></SelectContent></Select></div>
          {!isEdit && <div className="sm:col-span-2"><Label htmlFor="pw">Temporary password *</Label><Input id="pw" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />{errors.password && <p className="mt-1 text-xs text-danger">{errors.password}</p>}</div>}
        </div>
        <DialogFooter><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={submit}>{isEdit ? "Save" : "Create"}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
