import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthShell } from "./Login";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function ResetPassword() {
  const navigate = useNavigate();
  const [pw, setPw] = useState(""); const [cf, setCf] = useState(""); const [err, setErr] = useState("");
  return (
    <AuthShell title="Set a new password" subtitle="Choose a password you don't use elsewhere.">
      <form onSubmit={(e) => { e.preventDefault(); if (pw.length < 6) return setErr("Min 6 chars."); if (pw !== cf) return setErr("Passwords don't match."); toast.success("Password updated"); navigate("/login"); }} className="space-y-4">
        <div><Label htmlFor="np">New password</Label><Input id="np" type="password" value={pw} onChange={(e) => setPw(e.target.value)} /></div>
        <div><Label htmlFor="cp">Confirm</Label><Input id="cp" type="password" value={cf} onChange={(e) => setCf(e.target.value)} /></div>
        {err && <p className="text-sm text-danger">{err}</p>}
        <Button type="submit" className="w-full">Update password</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground"><Link to="/login" className="font-medium text-secondary hover:underline">Back to sign in</Link></p>
    </AuthShell>
  );
}
