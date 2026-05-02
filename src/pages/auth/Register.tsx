import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthShell } from "./Login";
import { useLibrary } from "@/store/library-store";
import { toast } from "sonner";
export default function Register() {
	const { addUser, login } = useLibrary();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirm: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		const errs: Record<string, string> = {};
		if (!form.name) errs.name = "Name required.";
		if (!form.email) errs.email = "Email required.";
		if (form.password.length < 6) errs.password = "Min 6 chars.";
		if (form.password !== form.confirm)
			errs.confirm = "Passwords don't match.";
		setErrors(errs);
		if (Object.keys(errs).length) return;
		addUser({
			name: form.name,
			email: form.email,
			phone: form.phone,
			role: "member",
			status: "active",
		});
		login(form.email);
		toast.success("Account created");
		navigate("/member");
	};
	return (
		<AuthShell
			title="Create your account"
			subtitle="Join the library to borrow and reserve books.">
			<form onSubmit={submit} className="space-y-4">
				<div>
					<Label htmlFor="name">Full name</Label>
					<Input
						id="name"
						value={form.name}
						onChange={(e) =>
							setForm({ ...form, name: e.target.value })
						}
					/>
					{errors.name && (
						<p className="mt-1 text-xs text-danger">
							{errors.name}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						value={form.email}
						onChange={(e) =>
							setForm({ ...form, email: e.target.value })
						}
					/>
					{errors.email && (
						<p className="mt-1 text-xs text-danger">
							{errors.email}
						</p>
					)}
				</div>
				<div>
					<Label htmlFor="phone">Phone</Label>
					<Input
						id="phone"
						value={form.phone}
						onChange={(e) =>
							setForm({ ...form, phone: e.target.value })
						}
					/>
				</div>
				<div className="grid gap-4 sm:grid-cols-2">
					<div>
						<Label htmlFor="pw">Password</Label>
						<Input
							id="pw"
							type="password"
							value={form.password}
							onChange={(e) =>
								setForm({ ...form, password: e.target.value })
							}
						/>
						{errors.password && (
							<p className="mt-1 text-xs text-danger">
								{errors.password}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor="cf">Confirm</Label>
						<Input
							id="cf"
							type="password"
							value={form.confirm}
							onChange={(e) =>
								setForm({ ...form, confirm: e.target.value })
							}
						/>
						{errors.confirm && (
							<p className="mt-1 text-xs text-danger">
								{errors.confirm}
							</p>
						)}
					</div>
				</div>
				<Button type="submit" className="w-full">
					Create account
				</Button>
			</form>
			<p className="mt-6 text-center text-sm text-muted-foreground">
				Already a member?{" "}
				<Link
					to="/login"
					className="font-medium text-secondary hover:underline">
					Sign in
				</Link>
			</p>
		</AuthShell>
	);
}
