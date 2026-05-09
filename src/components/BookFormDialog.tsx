import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useLibrary } from "@/store/library-store";
import type { Book } from "@/lib/types";
import { toast } from "sonner";
export function BookFormDialog({
	open,
	onOpenChange,
	book,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	book?: Book | null;
}) {
	const { categories, addBook, updateBook } = useLibrary();
	const isEdit = !!book;
	const [form, setForm] = useState({
		title: "",
		author: "",
		isbn: "",
		categoryId: "",
		publisher: "",
		year: new Date().getFullYear(),
		totalCopies: 1,
		description: "",
		coverColor: "#12324A",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	useEffect(() => {
		if (book)
			setForm({
				title: book.title,
				author: book.author,
				isbn: book.isbn,
				categoryId: book.categoryId,
				publisher: book.publisher,
				year: book.year,
				totalCopies: book.totalCopies,
				description: book.description,
				coverColor: book.coverColor,
			});
		else
			setForm({
				title: "",
				author: "",
				isbn: "",
				categoryId: categories[0]?.id ?? "",
				publisher: "",
				year: new Date().getFullYear(),
				totalCopies: 1,
				description: "",
				coverColor: "#12324A",
			});
		setErrors({});
	}, [book, open, categories]);
	const submit = () => {
		const errs: Record<string, string> = {};
		if (!form.title.trim()) errs.title = "Title required.";
		if (!form.author.trim()) errs.author = "Author required.";
		if (!form.isbn.trim()) errs.isbn = "ISBN required.";
		if (!form.categoryId) errs.categoryId = "Category required.";
		if (form.totalCopies < 1) errs.totalCopies = "Min 1.";
		setErrors(errs);
		if (Object.keys(errs).length) return;
		if (isEdit && book) {
			const diff = form.totalCopies - book.totalCopies;
			updateBook(book.id, {
				...form,
				availableCopies: Math.max(0, book.availableCopies + diff),
			});
			toast.success("Book updated");
		} else {
			addBook({ ...form });
			toast.success("Book added");
		}
		onOpenChange(false);
	};
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>
						{isEdit ? "Edit book" : "Add a new book"}
					</DialogTitle>
					<DialogDescription>
						{isEdit
							? "Update book details."
							: "Add a title to the catalogue."}
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 sm:grid-cols-2">
					<div className="sm:col-span-2">
						<Label htmlFor="title">Title *</Label>
						<Input
							id="title"
							value={form.title}
							onChange={(e) =>
								setForm({ ...form, title: e.target.value })
							}
						/>
						{errors.title && (
							<p className="mt-1 text-xs text-danger">
								{errors.title}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor="author">Author *</Label>
						<Input
							id="author"
							value={form.author}
							onChange={(e) =>
								setForm({ ...form, author: e.target.value })
							}
						/>
						{errors.author && (
							<p className="mt-1 text-xs text-danger">
								{errors.author}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor="isbn">ISBN *</Label>
						<Input
							id="isbn"
							value={form.isbn}
							onChange={(e) =>
								setForm({ ...form, isbn: e.target.value })
							}
						/>
						{errors.isbn && (
							<p className="mt-1 text-xs text-danger">
								{errors.isbn}
							</p>
						)}
					</div>
					<div>
						<Label>Category *</Label>
						<Select
							value={form.categoryId}
							onValueChange={(v) =>
								setForm({ ...form, categoryId: v })
							}>
							<SelectTrigger>
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((c) => (
									<SelectItem key={c.id} value={c.id}>
										{c.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.categoryId && (
							<p className="mt-1 text-xs text-danger">
								{errors.categoryId}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor="publisher">Publisher</Label>
						<Input
							id="publisher"
							value={form.publisher}
							onChange={(e) =>
								setForm({ ...form, publisher: e.target.value })
							}
						/>
					</div>
					<div>
						<Label htmlFor="year">Year</Label>
						<Input
							id="year"
							type="number"
							value={form.year}
							onChange={(e) =>
								setForm({
									...form,
									year: Number(e.target.value),
								})
							}
						/>
					</div>
					<div>
						<Label htmlFor="copies">Total copies *</Label>
						<Input
							id="copies"
							type="number"
							min={1}
							value={form.totalCopies}
							onChange={(e) =>
								setForm({
									...form,
									totalCopies: Number(e.target.value),
								})
							}
						/>
						{errors.totalCopies && (
							<p className="mt-1 text-xs text-danger">
								{errors.totalCopies}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor="cover">Cover color</Label>
						<div className="flex items-center gap-2">
							<Input
								id="cover"
								type="color"
								value={form.coverColor}
								onChange={(e) =>
									setForm({
										...form,
										coverColor: e.target.value,
									})
								}
								className="h-10 w-16 p-1"
							/>
							<Input
								value={form.coverColor}
								onChange={(e) =>
									setForm({
										...form,
										coverColor: e.target.value,
									})
								}
							/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<Label htmlFor="desc">Description</Label>
						<Textarea
							id="desc"
							rows={3}
							value={form.description}
							onChange={(e) =>
								setForm({
									...form,
									description: e.target.value,
								})
							}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button onClick={submit}>
						{isEdit ? "Save" : "Add book"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
