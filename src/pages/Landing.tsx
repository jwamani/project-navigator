import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, CalendarClock, ShieldCheck, Users } from "lucide-react";
import { useLibrary } from "@/store/library-store";
export default function Landing() {
  const { books, users, borrows } = useLibrary();
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider"><BookOpen className="h-3 w-3" /> Online Library Management System</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">A calm, modern home for your library catalogue.</h1>
            <p className="mt-5 max-w-xl text-base text-primary-foreground/80">Manage books, borrows, reservations, and members in one professional workspace built for libraries that value clarity over clutter.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/catalogue">Browse catalogue <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20"><Link to="/login">Sign in</Link></Button>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[{ label: "Titles in catalogue", value: books.filter((b) => !b.deleted).length, icon: BookOpen },
            { label: "Active borrows", value: borrows.filter((b) => b.status === "active").length, icon: CalendarClock },
            { label: "Registered users", value: users.length, icon: Users }].map((s) => (
            <div key={s.label} className="surface-card p-6"><s.icon className="h-5 w-5 text-secondary" /><p className="mt-3 text-3xl font-semibold">{s.value}</p><p className="text-sm text-muted-foreground">{s.label}</p></div>
          ))}
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[{ title: "Catalogue management", body: "Curate every title with rich metadata, copies tracking, and instant search.", icon: BookOpen },
            { title: "Borrow & reservations", body: "A single workflow for issuing, returning, reserving, and resolving holds.", icon: CalendarClock },
            { title: "Role-based access", body: "Admin, librarian, and member experiences tailored to each role.", icon: ShieldCheck }].map((f) => (
            <div key={f.title} className="surface-card p-6"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><f.icon className="h-5 w-5" /></div><h3 className="mt-4 text-lg font-semibold">{f.title}</h3><p className="mt-2 text-sm text-muted-foreground">{f.body}</p></div>
          ))}
        </div>
      </section>
    </div>
  );
}
