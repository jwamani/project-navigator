import { useState } from "react";
import { useLibrary } from "@/store/library-store";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { StatusBadge, statusToTone } from "@/components/StatusBadge";
import { formatDate } from "@/lib/format";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import type { Reservation } from "@/lib/types";
import { toast } from "sonner";
import { EmptyState } from "@/components/EmptyState";
export default function ReservationsPage() {
	const {
		reservations,
		users,
		books,
		fulfilReservation,
		cancelReservation,
		createBorrow,
	} = useLibrary();
	const [tab, setTab] = useState("pending");
	const [cancelTarget, setCancelTarget] = useState<Reservation | null>(null);
	const filtered = reservations.filter((r) =>
		tab === "all" ? true : r.status === tab,
	);
	const fulfilAndIssue = (r: Reservation) => {
		const res = createBorrow(r.userId, r.bookId);
		if (!res.ok) {
			toast.error(res.reason ?? "Could not issue");
			return;
		}
		fulfilReservation(r.id);
		toast.success("Fulfilled & issued");
	};
	return (
		<div>
			<PageHeader title="Reservations" description="Manage holds." />
			<Tabs value={tab} onValueChange={setTab} className="mb-4">
				<TabsList>
					<TabsTrigger value="pending">Pending</TabsTrigger>
					<TabsTrigger value="fulfilled">Fulfilled</TabsTrigger>
					<TabsTrigger value="cancelled">Cancelled</TabsTrigger>
					<TabsTrigger value="all">All</TabsTrigger>
				</TabsList>
			</Tabs>
			<div className="surface-card overflow-hidden">
				{filtered.length === 0 ? (
					<EmptyState title="No reservations" />
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
										Reserved
									</th>
									<th className="px-4 py-3 text-left">
										Expires
									</th>
									<th className="px-4 py-3 text-left">
										Status
									</th>
									<th className="px-4 py-3 text-right">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{filtered.map((r) => {
									const u = users.find(
										(x) => x.id === r.userId,
									);
									const b = books.find(
										(x) => x.id === r.bookId,
									);
									return (
										<tr
											key={r.id}
											className="border-t border-border">
											<td className="px-4 py-3 font-medium">
												{u?.name}
											</td>
											<td className="px-4 py-3">
												{b?.title}
											</td>
											<td className="px-4 py-3 text-muted-foreground">
												{formatDate(r.reservedAt)}
											</td>
											<td className="px-4 py-3 text-muted-foreground">
												{formatDate(r.expiresAt)}
											</td>
											<td className="px-4 py-3">
												<StatusBadge
													tone={statusToTone(
														r.status,
													)}>
													{r.status}
												</StatusBadge>
											</td>
											<td className="px-4 py-3">
												<div className="flex justify-end gap-2">
													{r.status === "pending" &&
														b &&
														b.availableCopies >
															0 && (
															<Button
																size="sm"
																onClick={() =>
																	fulfilAndIssue(
																		r,
																	)
																}>
																Fulfil & issue
															</Button>
														)}
													{r.status === "pending" && (
														<Button
															size="sm"
															variant="outline"
															onClick={() =>
																setCancelTarget(
																	r,
																)
															}>
															Cancel
														</Button>
													)}
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>
			<ConfirmDialog
				open={!!cancelTarget}
				onOpenChange={(v) => !v && setCancelTarget(null)}
				title="Cancel reservation?"
				description="The hold will be released."
				destructive
				confirmLabel="Cancel reservation"
				onConfirm={() => {
					if (cancelTarget) {
						cancelReservation(cancelTarget.id);
						toast.success("Cancelled");
						setCancelTarget(null);
					}
				}}
			/>
		</div>
	);
}
