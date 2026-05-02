import type { LucideIcon } from "lucide-react";
export function StatCard({ label, value, icon: Icon, hint, tone = "primary" }: { label: string; value: string | number; icon: LucideIcon; hint?: string; tone?: "primary" | "secondary" | "accent" | "danger" | "success" }) {
  const toneBg: Record<string, string> = {
    primary: "bg-primary/10 text-primary", secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent", danger: "bg-danger/10 text-danger", success: "bg-success/10 text-success",
  };
  return (
    <div className="surface-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className={"flex h-10 w-10 items-center justify-center rounded-lg " + toneBg[tone]}><Icon className="h-5 w-5" /></div>
      </div>
    </div>
  );
}
