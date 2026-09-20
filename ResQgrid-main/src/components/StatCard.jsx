import { ArrowUpRight, Activity } from "lucide-react";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon = Activity,
  danger = false,
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 ${
        danger
          ? "border-red-500/20 bg-red-500/[0.045] hover:border-red-400/30"
          : "border-white/10 bg-white/[0.025] hover:border-cyan-400/20"
      }`}
    >
      {/* Background glow */}
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100 ${
          danger
            ? "bg-red-500/10"
            : "bg-cyan-400/5"
        }`}
      />

      <div className="relative">

        {/* Top row */}
        <div className="flex items-start justify-between gap-3">

          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
              danger
                ? "border-red-400/20 bg-red-400/10 text-red-400"
                : "border-cyan-400/10 bg-cyan-400/10 text-cyan-400"
            }`}
          >
            <Icon size={17} />
          </div>

          <div
            className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${
              danger
                ? "bg-red-400/10 text-red-400"
                : "bg-emerald-400/10 text-emerald-400"
            }`}
          >
            <ArrowUpRight size={11} />
            Live
          </div>

        </div>

        {/* Value */}
        <div className="mt-5">

          <div
            className={`text-2xl font-black tracking-tight sm:text-3xl ${
              danger ? "text-red-300" : "text-white"
            }`}
          >
            {value}
          </div>

          <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
            {title}
          </div>

        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-3">

          <span
            className={`h-1.5 w-1.5 rounded-full ${
              danger
                ? "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.7)]"
                : "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
            }`}
          />

          <span className="truncate text-[10px] text-slate-500">
            {subtitle}
          </span>

        </div>

      </div>
    </div>
  );
}