import { useState } from "react";
import { useLibrary } from "@/store/library-store";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { UserFormDialog } from "@/components/UserFormDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import type { User } from "@/lib/types";
import { toast } from "sonner";
import { formatDate } from "@/lib/format";
import { EmptyState } from "@/components/EmptyState";
export default function UsersPage() {
  const { users, deleteUser } = useLibrary();
  const [q, setQ] = useState(""); const [editing, setEditing] = useState<User | null>(null); const [creating, setCreating] = useState(false); const [confirmDelete, setConfirmDelete] = useState<User | null>(null);
  const filtered = users.filter((u) => [u.name, u.email, u.role].some((x) => x.toLowerCase().includes(q.toLowerCase())));
  return (
    <div>
      <PageHeader title="Users" description="Manage admin, librarian, and member accounts." actions={<Button onClick={() => setCreating(true)} className="gap-2"><Plus className="h-4 w-4" /> New user</Button>} />
      <div className="surface-card overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border p-3"><div className="relative flex-1 max-w-sm"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search users…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" /></div></div>
        {filtered.length === 0 ? <EmptyState title="No users found" /> : (
          <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-4 py-3 text-left">Name</th><th className="px-4 py-3 text-left">Email</th><th className="px-4 py-3 text-left">Phone</th><th className="px-4 py-3 text-left">Role</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-left">Joined</th><th className="px-4 py-3 text-right">Actions</th></tr></thead><tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                <td className="px-4 py-3 text-muted-foreground">{u.phone}</td>
                <td className="px-4 py-3"><StatusBadge tone={u.role === "admin" ? "accent" : u.role === "librarian" ? "info" : "neutral"}>{u.role}</StatusBadge></td>
                <td className="px-4 py-3"><StatusBadge tone={u.status === "active" ? "success" : "neutral"}>{u.status}</StatusBadge></td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(u.createdAt)}</td>
                <td className="px-4 py-3"><div className="flex justify-end gap-1"><Button variant="ghost" size="icon" onClick={() => setEditing(u)}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" onClick={() => setConfirmDelete(u)}><Trash2 className="h-4 w-4 text-danger" /></Button></div></td>
              </tr>
            ))}
          </tbody></table></div>
        )}
      </div>
      <UserFormDialog open={creating} onOpenChange={setCreating} />
      <UserFormDialog open={!!editing} onOpenChange={(v) => !v && setEditing(null)} user={editing} />
      <ConfirmDialog open={!!confirmDelete} onOpenChange={(v) => !v && setConfirmDelete(null)} title="Delete user?" description={"Permanently remove " + (confirmDelete?.name ?? "") + "."} confirmLabel="Delete" destructive onConfirm={() => { if (confirmDelete) { deleteUser(confirmDelete.id); toast.success("User deleted"); setConfirmDelete(null); } }} />
    </div>
  );
}
