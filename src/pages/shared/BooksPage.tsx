import { useState } from "react";
import { Link } from "react-router-dom";
import { useLibrary } from "@/store/library-store";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { BookCover } from "@/components/BookCover";
import { StatusBadge } from "@/components/StatusBadge";
import { BookFormDialog } from "@/components/BookFormDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import type { Book } from "@/lib/types";
import { toast } from "sonner";
export default function BooksPage({
	allowDelete = false,
}: {
	allowDelete?: boolean;
}) {
	const { books, categories, deleteBook } = useLibrary();
	const [q, setQ] = useState("");
	const [creating, setCreating] = useState(false);
	const [editing, setEditing] = useState<Book | null>(null);
	const [confirmDel, setConfirmDel] = useState<Book | null>(null);
	const filtered = books
		.filter((b) => !b.deleted)
		.filter((b) =>
			[b.title, b.author, b.isbn].some((x) =>
				x.toLowerCase().includes(q.toLowerCase()),
			),
		);
	return (
		<div>
			<PageHeader
				title="Books"
				description="Manage the library's catalogue."
				actions={
					<Button onClick={() => setCreating(true)} className="gap-2">
						<Plus className="h-4 w-4" /> Add book
					</Button>
				}
			/>
			<div className="surface-card overflow-hidden">
				<div className="flex items-center gap-2 border-b border-border p-3">
					<div className="relative flex-1 max-w-sm">
						<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Search books…"
							value={q}
							onChange={(e) => setQ(e.target.value)}
							className="pl-9"
						/>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
							<tr>
								<th className="px-4 py-3 text-left">Book</th>
								<th className="px-4 py-3 text-left">
									Category
								</th>
								<th className="px-4 py-3 text-left">ISBN</th>
								<th className="px-4 py-3 text-left">Year</th>
								<th className="px-4 py-3 text-left">
									Availability
								</th>
								<th className="px-4 py-3 text-right">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{filtered.map((b) => {
								const cat = categories.find(
									(c) => c.id === b.categoryId,
								);
								return (
									<tr
										key={b.id}
										className="border-t border-border">
										<td className="px-4 py-3">
											<div className="flex items-center gap-3">
												<BookCover
													color={b.coverColor}
													title={b.title}
													size="sm"
												/>
												<div>
													<Link
														to={
															"/catalogue/" + b.id
														}
														className="font-medium hover:text-primary">
														{b.title}
													</Link>
													<p className="text-xs text-muted-foreground">
														{b.author}
													</p>
												</div>
											</div>
										</td>
										<td className="px-4 py-3 text-muted-foreground">
											{cat?.name}
										</td>
										<td className="px-4 py-3 text-muted-foreground">
											{b.isbn}
										</td>
										<td className="px-4 py-3 text-muted-foreground">
											{b.year}
										</td>
										<td className="px-4 py-3">
											{b.availableCopies > 0 ? (
												<StatusBadge tone="success">
													{b.availableCopies}/
													{b.totalCopies}
												</StatusBadge>
											) : (
												<StatusBadge tone="danger">
													0/{b.totalCopies}
												</StatusBadge>
											)}
										</td>
										<td className="px-4 py-3">
											<div className="flex justify-end gap-1">
												<Button
													variant="ghost"
													size="icon"
													onClick={() =>
														setEditing(b)
													}>
													<Pencil className="h-4 w-4" />
												</Button>
												{allowDelete && (
													<Button
														variant="ghost"
														size="icon"
														onClick={() =>
															setConfirmDel(b)
														}>
														<Trash2 className="h-4 w-4 text-danger" />
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
			</div>
			<BookFormDialog open={creating} onOpenChange={setCreating} />
			<BookFormDialog
				open={!!editing}
				onOpenChange={(v) => !v && setEditing(null)}
				book={editing}
			/>
			<ConfirmDialog
				open={!!confirmDel}
				onOpenChange={(v) => !v && setConfirmDel(null)}
				title="Delete book?"
				description={
					"Soft-delete '" +
					(confirmDel?.title ?? "") +
					"'. History retained."
				}
				destructive
				confirmLabel="Delete"
				onConfirm={() => {
					if (confirmDel) {
						deleteBook(confirmDel.id);
						toast.success("Deleted");
						setConfirmDel(null);
					}
				}}
			/>
		</div>
	);
}
