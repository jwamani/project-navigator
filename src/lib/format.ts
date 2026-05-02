export function formatDate(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
export function daysUntil(iso: string) {
  return Math.round((new Date(iso).getTime() - Date.now()) / 86400000);
}
export function isOverdue(due: string, returned?: string | null) {
  if (returned) return new Date(returned).getTime() > new Date(due).getTime();
  return new Date(due).getTime() < Date.now();
}
