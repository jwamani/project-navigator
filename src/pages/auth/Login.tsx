import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLibrary } from "@/store/library-store";
import { Library } from "lucide-react";
import { toast } from "sonner";
const AUTH_BG_IMAGE =
	"https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1600";
const demoAccounts = [
	{ email: "admin@olms.app", role: "Admin" },
	{ email: "librarian@olms.app", role: "Librarian" },
	{ email: "member@olms.app", role: "Member" },
];
export default function Login() {
	const { login } = useLibrary();
	const navigate = useNavigate();
	const [email, setEmail] = useState("admin@olms.app");
	const [password, setPassword] = useState("demo");
	const [error, setError] = useState("");
	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		if (!email || !password) {
			setError("Email and password required.");
			return;
		}
		const u = login(email);
		if (!u) {
			setError("No account found.");
			return;
		}
		toast.success("Welcome, " + u.name.split(" ")[0]);
		navigate("/" + u.role);
	};
	return (
		<AuthShell
			title="Welcome back"
			subtitle="Sign in to access your library workspace.">
			<form onSubmit={submit} className="space-y-4">
				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<div className="flex items-center justify-between">
						<Label htmlFor="pw">Password</Label>
						<Link
							to="/forgot-password"
							className="text-xs text-secondary hover:underline">
							Forgot?
						</Link>
					</div>
					<Input
						id="pw"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				{error && <p className="text-sm text-danger">{error}</p>}
				<Button type="submit" className="w-full">
					Sign in
				</Button>
			</form>
			{/* <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/40 p-3">
				<p className="text-xs font-medium text-muted-foreground">
					Demo accounts (any password)
				</p>
				<div className="mt-2 grid gap-1.5 text-xs">
					{demoAccounts.map((a) => (
						<button
							key={a.email}
							type="button"
							onClick={() => setEmail(a.email)}
							className="flex justify-between rounded px-2 py-1 text-left hover:bg-background">
							<span className="font-medium">{a.role}</span>
							<span className="text-muted-foreground">
								{a.email}
							</span>
						</button>
					))}
				</div>
			</div> */}
			<p className="mt-6 text-center text-sm text-muted-foreground">
				New here?{" "}
				<Link
					to="/register"
					className="font-medium text-secondary hover:underline">
					Create an account
				</Link>
			</p>
		</AuthShell>
	);
}
export function AuthShell({
	title,
	subtitle,
	children,
}: {
	title: string;
	subtitle?: string;
	children: React.ReactNode;
}) {
	return (
		<div className="grid min-h-screen lg:grid-cols-2">
			<div className="relative hidden overflow-hidden p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
				<div className="absolute inset-0">
					<img
						src={AUTH_BG_IMAGE}
						alt="Library shelves"
						className="h-full w-full object-cover object-center"
					/>
					<div className="absolute inset-0 bg-gradient-to-br from-[hsl(207,60%,10%)]/85 via-[hsl(207,60%,12%)]/70 to-[hsl(207,60%,14%)]/45" />
				</div>
				<Link to="/" className="relative flex items-center gap-2">
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
						<Library className="h-5 w-5" />
					</div>
					<div>
						<p className="font-display text-base font-semibold leading-tight">
							OLMS
						</p>
						<p className="text-[11px] uppercase tracking-wider text-primary-foreground/70">
							Library System
						</p>
					</div>
				</Link>
				<div className="relative mx-auto max-w-2xl rounded-2xl border border-white/15 bg-white/10 p-8 backdrop-blur-sm lg:max-w-3xl lg:p-10">
					<p className="text-sm uppercase tracking-[0.52em] text-secondary-foreground/60">
						Library quote
					</p>
					<h2 className="mt-4 font-display text-4xl font-semibold leading-tight lg:text-5xl tracking-wide">
						A quiet space for thoughtful library work.
					</h2>
					<p className="mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/80 lg:text-lg">
						Manage your catalogue, members, and borrows with the
						calm, structured workflow your team deserves.
					</p>
				</div>
				<p className="relative text-xs text-primary-foreground/60">
					© {new Date().getFullYear()} OLMS
				</p>
			</div>
			<div className="flex items-center justify-center px-6 py-12 lg:px-10">
				<div className="w-full max-w-md lg:max-w-lg">
					<Link
						to="/"
						className="mb-8 flex items-center gap-2 lg:hidden">
						<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
							<Library className="h-5 w-5" />
						</div>
						<p className="font-display text-base font-semibold">
							OLMS
						</p>
					</Link>
					<h1 className="text-2xl font-semibold">{title}</h1>
					{subtitle && (
						<p className="mt-1 text-sm text-muted-foreground">
							{subtitle}
						</p>
					)}
					<div className="mt-8">{children}</div>
				</div>
			</div>
		</div>
	);
}
