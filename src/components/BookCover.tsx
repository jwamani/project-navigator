import { BookOpen } from "lucide-react";
export function BookCover({ color, title, size = "md" }: { color: string; title: string; size?: "sm" | "md" | "lg" }) {
  const dims = size === "sm" ? "h-14 w-10" : size === "lg" ? "h-56 w-40" : "h-24 w-16";
  const text = size === "lg" ? "text-base" : size === "md" ? "text-[10px]" : "text-[8px]";
  return (
    <div className={dims + " relative flex shrink-0 flex-col justify-between overflow-hidden rounded-md p-2 text-white shadow-elevated"}
      style={{ background: "linear-gradient(135deg, " + color + " 0%, " + color + "cc 100%)" }} aria-hidden>
      <BookOpen className={size === "lg" ? "h-5 w-5 opacity-70" : "h-3 w-3 opacity-70"} />
      <div className={text + " font-display font-semibold leading-tight line-clamp-3"}>{title}</div>
      <div className="absolute inset-y-0 left-1.5 w-px bg-white/20" />
    </div>
  );
}
