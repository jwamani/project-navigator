import { useLibrary } from "@/store/library-store";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Repeat } from "lucide-react";
import type { Role } from "@/lib/types";
const roles: { role: Role; label: string }[] = [{ role: "admin", label: "Admin" }, { role: "librarian", label: "Librarian" }, { role: "member", label: "Member" }];
export function RoleSwitcher() {
  const { setRole, currentUser } = useLibrary();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="outline" size="sm" className="gap-2"><Repeat className="h-3.5 w-3.5" />Demo: switch role</Button></DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>View as</DropdownMenuLabel><DropdownMenuSeparator />
        {roles.map((r) => (
          <DropdownMenuItem key={r.role} onClick={() => setRole(r.role)} className="capitalize">{r.label}{currentUser?.role === r.role && <span className="ml-auto text-xs text-muted-foreground">current</span>}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
