import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useLibrary } from "@/store/library-store";
import {
	LayoutDashboard,
	Users,
	BookMarked,
	Tags,
	BookOpenCheck,
	CalendarClock,
	AlertOctagon,
	BarChart3,
	UserCircle,
	BookOpen,
	Library,
	LogOut,
	Bell,
	Search,
	Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RoleSwitcher } from "./RoleSwitcher";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { Role } from "@/lib/types";
type NavItem = { to: string; label: string; icon: typeof LayoutDashboard };
const navByRole: Record<Role, NavItem[]> = {
	admin: [
		{ to: "/admin", label: "Dashboard", icon: LayoutDashboard },
		{ to: "/admin/users", label: "Users", icon: Users },
		{ to: "/admin/books", label: "Books", icon: BookMarked },
		{ to: "/admin/categories", label: "Categories", icon: Tags },
		{ to: "/admin/borrows", label: "Borrow Records", icon: BookOpenCheck },
		{
			to: "/admin/reservations",
			label: "Reservations",
			icon: CalendarClock,
		},
		{ to: "/admin/overdue", label: "Overdue", icon: AlertOctagon },
		{ to: "/admin/reports", label: "Reports", icon: BarChart3 },
		{ to: "/profile", label: "Profile", icon: UserCircle },
	],
	librarian: [
		{ to: "/librarian", label: "Dashboard", icon: LayoutDashboard },
		{ to: "/librarian/books", label: "Books", icon: BookMarked },
		{
			to: "/librarian/borrows",
			label: "Borrow Records",
			icon: BookOpenCheck,
		},
		{
			to: "/librarian/reservations",
			label: "Reservations",
			icon: CalendarClock,
		},
		{ to: "/librarian/overdue", label: "Overdue", icon: AlertOctagon },
		{ to: "/profile", label: "Profile", icon: UserCircle },
	],
	member: [
		{ to: "/member", label: "Dashboard", icon: LayoutDashboard },
		{ to: "/member/catalogue", label: "Catalogue", icon: BookOpen },
		{ to: "/member/borrows", label: "My Borrows", icon: BookOpenCheck },
		{
			to: "/member/reservations",
			label: "My Reservations",
			icon: CalendarClock,
		},
		{ to: "/profile", label: "Profile", icon: UserCircle },
	],
};
function SidebarContent({
	role,
	onNavigate,
}: {
	role: Role;
	onNavigate?: () => void;
}) {
	const items = navByRole[role];
	return (
		<div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
			<div className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border">
				<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
					<Library className="h-5 w-5" />
				</div>
				<div>
					<p className="font-display text-base font-semibold leading-tight">
						OLMS
					</p>
					<p className="text-[11px] uppercase tracking-wider text-sidebar-foreground/60">
						Library System
					</p>
				</div>
			</div>
			<nav className="flex-1 space-y-1 px-3 py-4">
				{items.map((item) => (
					<NavLink
						key={item.to}
						to={item.to}
						end={item.to.split("/").length === 2}
						onClick={onNavigate}
						className={({ isActive }) =>
							cn(
								"flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
								isActive
									? "bg-sidebar-accent text-white"
									: "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-white",
							)
						}>
						<item.icon className="h-4 w-4" />
						{item.label}
					</NavLink>
				))}
			</nav>
			<div className="border-t border-sidebar-border px-5 py-4 text-[11px] text-sidebar-foreground/60">
				Role view:{" "}
				<span className="font-medium capitalize text-sidebar-foreground">
					{role}
				</span>
			</div>
		</div>
	);
}
export function AppLayout() {
	const { currentUser, logout } = useLibrary();
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = useState(false);
	useEffect(() => {
		if (!currentUser) navigate("/login", { replace: true });
	}, [currentUser, navigate]);
	if (!currentUser) return null;
	const role = currentUser.role;
	return (
		<div className="flex min-h-screen bg-background">
			<aside className="hidden w-64 shrink-0 lg:block">
				<div className="fixed inset-y-0 left-0 w-64">
					<SidebarContent role={role} />
				</div>
			</aside>
			<div className="flex min-h-screen flex-1 flex-col">
				<header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur sm:px-6">
					<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="lg:hidden">
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-64 p-0">
							<SidebarContent
								role={role}
								onNavigate={() => setMobileOpen(false)}
							/>
						</SheetContent>
					</Sheet>
					<div className="relative hidden flex-1 max-w-md md:block">
						<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Search…"
							className="pl-9 bg-background"
						/>
					</div>
					<div className="ml-auto flex items-center gap-2">
						<RoleSwitcher />
						<Button
							variant="ghost"
							size="icon"
							aria-label="Notifications">
							<Bell className="h-4 w-4" />
						</Button>
						<div className="hidden items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 sm:flex">
							<div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
								{currentUser.name
									.split(" ")
									.map((n) => n[0])
									.slice(0, 2)
									.join("")}
							</div>
							<div className="text-xs leading-tight">
								<p className="font-medium">
									{currentUser.name}
								</p>
								<p className="capitalize text-muted-foreground">
									{currentUser.role}
								</p>
							</div>
						</div>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => {
								logout();
								navigate("/login");
							}}
							aria-label="Log out">
							<LogOut className="h-4 w-4" />
						</Button>
					</div>
				</header>
				<main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-7xl">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
}
