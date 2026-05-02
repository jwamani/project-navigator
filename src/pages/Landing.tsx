import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, CalendarClock, ShieldCheck, Users, Search, ChartBar as BarChart3 } from "lucide-react";
import { useLibrary } from "@/store/library-store";

const HERO_IMAGE = "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1600";
const SHELF_IMAGE = "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=900";
const READING_IMAGE = "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=900";
const CATALOGUE_IMAGE = "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=900";

export default function Landing() {
  const { books, users, borrows } = useLibrary();

  const stats = [
    { label: "Titles in catalogue", value: books.filter((b) => !b.deleted).length, icon: BookOpen },
    { label: "Active borrows", value: borrows.filter((b) => b.status === "active").length, icon: CalendarClock },
    { label: "Registered users", value: users.length, icon: Users },
  ];

  const features = [
    {
      title: "Catalogue management",
      body: "Curate every title with rich metadata, copy tracking, and instant search across author, ISBN, and category.",
      icon: BookOpen,
      image: SHELF_IMAGE,
    },
    {
      title: "Borrow & reservations",
      body: "A single workflow for issuing, returning, reserving, and resolving holds — with automatic availability tracking.",
      icon: CalendarClock,
      image: READING_IMAGE,
    },
    {
      title: "Reports & oversight",
      body: "Track overdue records, popular titles, and member activity in a clear reporting dashboard.",
      icon: BarChart3,
      image: CATALOGUE_IMAGE,
    },
  ];

  return (
    <div className="bg-background">

      {/* Hero */}
      <section className="relative min-h-[92vh] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Library interior"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(207,60%,10%)] via-[hsl(207,60%,12%)]/90 to-[hsl(207,60%,14%)]/60" />
        </div>

        {/* Content */}
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/80">
              <BookOpen className="h-3 w-3" /> Online Library Management System
            </p>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              A professional home for your library.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75">
              Manage books, borrows, reservations, and members in one structured workspace designed for clarity and efficiency.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
              >
                <Link to="/catalogue">
                  Browse catalogue <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50"
              >
                <Link to="/login">Sign in to dashboard</Link>
              </Button>
            </div>

            {/* Inline stats */}
            <div className="mt-14 flex flex-wrap gap-8 border-t border-white/15 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-bold text-white">{s.value}</p>
                  <p className="mt-0.5 text-sm text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Role callout strip */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-medium text-muted-foreground">
              Role-based access for every team member —
            </p>
            <div className="flex flex-wrap gap-2">
              {["Admin", "Librarian", "Member"].map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground"
                >
                  {role}
                </span>
              ))}
            </div>
            <div className="ml-auto">
              <Button asChild size="sm" variant="outline">
                <Link to="/login">Access dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature sections — alternating image + text */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary">Platform features</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Everything a modern library needs.
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            OLMS brings together catalogue management, borrow tracking, and member oversight in a single, coherent interface.
          </p>
        </div>

        <div className="space-y-24">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
            >
              {/* Image */}
              <div className={`relative overflow-hidden rounded-2xl shadow-elevated ${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <img
                  src={f.image}
                  alt={f.title}
                  className="h-72 w-full object-cover lg:h-96"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(207,60%,10%)]/30 to-transparent" />
              </div>

              {/* Text */}
              <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-foreground">{f.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{f.body}</p>
                <ul className="mt-6 space-y-2">
                  {featureDetails[i].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-secondary">Workflows</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground">Built around your daily operations.</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((step, i) => (
              <div key={step.title} className="surface-card p-6">
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-border bg-primary">
        <div className="absolute inset-0 opacity-10">
          <img
            src={HERO_IMAGE}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
            Ready to bring order to your library?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/75">
            Sign in to access your role-based dashboard, or explore the public catalogue to see what's available.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/login">Sign in <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
              <Link to="/catalogue">
                <Search className="mr-1.5 h-4 w-4" /> Browse catalogue
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const featureDetails: string[][] = [
  [
    "Search by title, author, ISBN, or category",
    "Track total and available copies in real time",
    "Soft-delete books while preserving borrow history",
    "Assign and manage categories across the collection",
  ],
  [
    "Issue books with a single form, enforcing availability checks",
    "Process returns and automatically update copy counts",
    "Members can reserve unavailable titles with expiry management",
    "Fulfil reservations and convert them to borrows in one action",
  ],
  [
    "See the most-borrowed titles at a glance",
    "Track overdue items with days-late visibility",
    "Review user activity and borrow totals by member",
    "Admin and librarian dashboards with live summary cards",
  ],
];

const workflowSteps = [
  {
    title: "Add your catalogue",
    body: "Import or manually add books with full metadata, categories, and copy counts.",
  },
  {
    title: "Register members",
    body: "Create member accounts and assign roles — admin, librarian, or member.",
  },
  {
    title: "Issue and track borrows",
    body: "Librarians issue books, track due dates, and process returns with one click.",
  },
  {
    title: "Monitor and report",
    body: "Stay on top of overdue items, reservations, and popular titles from the dashboard.",
  },
];
