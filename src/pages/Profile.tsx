import { useState } from "react";
import { useLibrary } from "@/store/library-store";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function Profile() {
  const { currentUser, updateUser } = useLibrary();
  const [name, setName] = useState(currentUser?.name ?? "");
  const [phone, setPhone] = useState(currentUser?.phone ?? "");
  const [pw, setPw] = useState(""); const [cf, setCf] = useState("");
  if (!currentUser) return null;
  return (
    <div>
      <PageHeader title="Profile" description="Update your account details." />
      <div className="grid gap-6 lg:grid-cols-2">
        <form className="surface-card space-y-4 p-6" onSubmit={(e) => { e.preventDefault(); updateUser(currentUser.id, { name, phone }); toast.success("Profile updated"); }}>
          <h2 className="text-base font-semibold">Account details</h2>
          <div><Label htmlFor="n">Name</Label><Input id="n" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><Label htmlFor="em">Email</Label><Input id="em" value={currentUser.email} disabled /></div>
          <div><Label htmlFor="ph">Phone</Label><Input id="ph" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          <div><Label>Role</Label><Input value={currentUser.role} disabled className="capitalize" /></div>
          <Button type="submit">Save changes</Button>
        </form>
        <form className="surface-card space-y-4 p-6" onSubmit={(e) => { e.preventDefault(); if (pw.length < 6) return toast.error("Min 6 chars"); if (pw !== cf) return toast.error("Passwords don't match"); setPw(""); setCf(""); toast.success("Password updated"); }}>
          <h2 className="text-base font-semibold">Change password</h2>
          <div><Label htmlFor="np">New password</Label><Input id="np" type="password" value={pw} onChange={(e) => setPw(e.target.value)} /></div>
          <div><Label htmlFor="cp">Confirm</Label><Input id="cp" type="password" value={cf} onChange={(e) => setCf(e.target.value)} /></div>
          <Button type="submit" variant="secondary">Update password</Button>
        </form>
      </div>
    </div>
  );
}
