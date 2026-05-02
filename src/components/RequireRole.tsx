import { Navigate } from "react-router-dom";
import { useLibrary } from "@/store/library-store";
import type { Role } from "@/lib/types";
export function RequireRole({ role, children }: { role: Role | Role[]; children: React.ReactNode }) {
  const { currentUser } = useLibrary();
  if (!currentUser) return <Navigate to="/login" replace />;
  const allowed = Array.isArray(role) ? role.includes(currentUser.role) : currentUser.role === role;
  if (!allowed) return <Navigate to={"/" + currentUser.role} replace />;
  return <>{children}</>;
}
