import { useMemo, useState } from "react";
import { useLibrary } from "@/store/library-store";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { StatusBadge, statusToTone } from "@/components/StatusBadge";
import { formatDate, isOverdue } from "@/lib/format";
import { IssueBorrowDialog } from "@/components/IssueBorrowDialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import type { BorrowRecord } from "@/lib/types";
import { toast } from "sonner";
import { EmptyState } from "@/components/EmptyState";
export default function BorrowsPage() {
	const { borrows, users, books, returnBorrow } = useLibrary();
	const [issuing, setIssuing] = useState(false);
	const [tab, setTab] = useState("active");
	const [q, setQ] = useState("");
	const [returning, setReturning] = useState<BorrowRecord | null>(null);
	const filtered = useMemo(
		() =>
			borrows
				.filter((b) => {
					if (tab === "active")
						return (
							b.status === "active" ||
							(b.status !== "returned" &&
								isOverdue(b.dueDate, b.returnedAt))
						);
					if (tab === "returned") return b.status === "returned";
					if (tab === "overdue")
						return (
							b.status !== "returned" &&
							isOverdue(b.dueDate, b.returnedAt)
						);
					return true;
				})
				.filter((b) => {
					if (!q.trim()) return true;
					const u = users.find((x) => x.id === b.userId);
					const bk = books.find((x) => x.id === b.bookId);
					return [u?.name, bk?.title].some((s) =>
						s?.toLowerCase().includes(q.toLowerCase()),
					);
				}),
		[borrows, tab, q, users, books],
	);
	return (
		<div>
			<PageHeader
				title="Borrow records"
				description="Issue books, track due dates, process returns."
				actions={
					<Button onClick={() => setIssuing(true)} className="gap-2">
						<Plus className="h-4 w-4" /> Issue book
					</Button>
				}
			/>
			<Tabs value={tab} onValueChange={setTab} className="mb-4">
				<TabsList>
					<TabsTrigger value="active">Active</TabsTrigger>
					<TabsTrigger value="overdue">Overdue</TabsTrigger>
					<TabsTrigger value="returned">Returned</TabsTrigger>
					<TabsTrigger value="all">All</TabsTrigger>
				</TabsList>
			</Tabs>
			<div className="surface-card overflow-hidden">
				<div className="border-b border-border p-3">
					<Input
						placeholder="Search by member or book…"
						value={q}
						onChange={(e) => setQ(e.target.value)}
						className="max-w-sm"
					/>
				</div>
				{filtered.length === 0 ? (
					<EmptyState
						title="No borrow records"
						description="Records appear once books are issued."
					/>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
								<tr>
									<th className="px-4 py-3 text-left">
										Member
									</th>
									<th className="px-4 py-3 text-left">
										Book
									</th>
									<th className="px-4 py-3 text-left">
										Borrowed
									</th>
									<th className="px-4 py-3 text-left">Due</th>
									<th className="px-4 py-3 text-left">
										Returned
									</th>
									<th className="px-4 py-3 text-left">
										Status
									</th>
									<th className="px-4 py-3 text-right">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{filtered.map((br) => {
									const u = users.find(
										(x) => x.id === br.userId,
									);
									const b = books.find(
										(x) => x.id === br.bookId,
									);
									const overdue =
										br.status !== "returned" &&
										isOverdue(br.dueDate, br.returnedAt);
									return (
										<tr
											key={br.id}
											className={
												"border-t border-border " +
												(overdue ? "bg-danger/5" : "")
											}>
											<td className="px-4 py-3 font-medium">
												{u?.name}
											</td>
											<td className="px-4 py-3">
												{b?.title}
											</td>
											<td className="px-4 py-3 text-muted-foreground">
												{formatDate(br.borrowedAt)}
											</td>
											<td
												className={
													"px-4 py-3 " +
													(overdue
														? "text-danger font-medium"
														: "text-muted-foreground")
												}>
												{formatDate(br.dueDate)}
											</td>
											<td className="px-4 py-3 text-muted-foreground">
												{formatDate(br.returnedAt)}
											</td>
											<td className="px-4 py-3">
												<StatusBadge
													tone={statusToTone(
														overdue
															? "overdue"
															: br.status,
													)}>
													{overdue
														? "overdue"
														: br.status}
												</StatusBadge>
											</td>
											<td className="px-4 py-3 text-right">
												{br.status !== "returned" && (
													<Button
														size="sm"
														variant="outline"
														onClick={() =>
															setReturning(br)
														}>
														Mark returned
													</Button>
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>
			<IssueBorrowDialog open={issuing} onOpenChange={setIssuing} />
			<ConfirmDialog
				open={!!returning}
				onOpenChange={(v) => !v && setReturning(null)}
				title="Mark as returned?"
				description="The book returns to the available pool."
				confirmLabel="Confirm return"
				onConfirm={() => {
					if (returning) {
						returnBorrow(returning.id);
						toast.success("Returned");
						setReturning(null);
					}
				}}
			/>
		</div>
	);
}
