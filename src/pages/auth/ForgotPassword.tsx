import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthShell } from "./Login";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <AuthShell title="Reset your password" subtitle="We'll send a secure link to set a new one.">
      {sent ? (<div className="rounded-lg border border-success/30 bg-success/10 p-4 text-sm text-success">A reset link has been sent to <strong>{email}</strong>.</div>) : (
        <form onSubmit={(e) => { e.preventDefault(); if (!email) return; setSent(true); toast.success("Reset link sent"); }} className="space-y-4">
          <div><Label htmlFor="em">Email</Label><Input id="em" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <Button type="submit" className="w-full">Send reset link</Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-muted-foreground"><Link to="/login" className="font-medium text-secondary hover:underline">Back to sign in</Link></p>
    </AuthShell>
  );
}
