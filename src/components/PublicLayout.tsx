import { Link, NavLink, Outlet } from "react-router-dom";
import { Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLibrary } from "@/store/library-store";
export function PublicLayout() {
  const { currentUser } = useLibrary();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Library className="h-5 w-5" /></div>
            <div><p className="font-display text-base font-semibold leading-tight">OLMS</p><p className="text-[11px] uppercase tracking-wider text-muted-foreground">Online Library</p></div>
          </Link>
          <nav className="ml-6 hidden items-center gap-1 sm:flex">
            <NavLink to="/catalogue" className={({ isActive }) => "rounded-md px-3 py-1.5 text-sm " + (isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}>Browse Catalogue</NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            {currentUser ? <Button asChild size="sm"><Link to={"/" + currentUser.role}>Open Dashboard</Link></Button> : <><Button asChild variant="ghost" size="sm"><Link to="/login">Sign in</Link></Button><Button asChild size="sm"><Link to="/register">Create account</Link></Button></>}
          </div>
        </div>
      </header>
      <main className="flex-1"><Outlet /></main>
      <footer className="border-t border-border bg-card/60"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8"><p>© {new Date().getFullYear()} OLMS</p><p>School project demo</p></div></footer>
    </div>
  );
}
