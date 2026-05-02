import { cn } from "@/lib/utils";
type Tone = "success" | "warning" | "danger" | "info" | "neutral" | "accent";
const toneClasses: Record<Tone, string> = {
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  danger: "bg-danger/10 text-danger border-danger/20",
  info: "bg-secondary/10 text-secondary border-secondary/20",
  accent: "bg-accent/10 text-accent border-accent/20",
  neutral: "bg-muted text-muted-foreground border-border",
};
export function StatusBadge({ children, tone = "neutral", className }: { children: React.ReactNode; tone?: Tone; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", toneClasses[tone], className)}>{children}</span>;
}
export function statusToTone(status: string): Tone {
  switch (status) {
    case "active": return "info";
    case "returned": return "success";
    case "overdue": return "danger";
    case "pending": return "warning";
    case "fulfilled": return "success";
    case "cancelled": return "neutral";
    case "inactive": return "neutral";
    case "available": return "success";
    case "unavailable": return "danger";
    default: return "neutral";
  }
}
