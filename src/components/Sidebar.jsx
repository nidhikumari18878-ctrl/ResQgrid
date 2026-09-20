import {
  Activity,
  BrainCircuit,
  Map,
  Radio,
  Settings,
  ShieldAlert,
  Siren,
  Truck,
  Users,
} from "lucide-react";

const navigation = [
  {
    label: "Command Center",
    icon: Activity,
    section: "command",
  },
  {
    label: "Live Risk Map",
    icon: Map,
    section: "map",
  },
  {
    label: "Incidents",
    icon: ShieldAlert,
    badge: "04",
    section: "incidents",
  },
  {
    label: "Resources",
    icon: Truck,
    badge: "12",
    section: "resources",
  },
  {
    label: "Citizen Reports",
    icon: Users,
    section: "reports",
  },
  {
    label: "AI Intelligence",
    icon: BrainCircuit,
    premium: true,
    section: "ai",
  },
];

export default function Sidebar({
  activeSection = "command",
  onNavigate,
}) {
  const handleClick = (section) => {
    onNavigate?.(section);
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">

      {/* BRAND */}
      <div className="shrink-0 border-b border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
            <div className="absolute inset-0 animate-pulse rounded-xl bg-cyan-400/10" />

            <Siren
              size={22}
              className="relative text-cyan-400"
            />
          </div>

          <div>
            <div className="text-sm font-black tracking-wide text-white">
              RESQGRID
              <span className="text-cyan-400"> AI</span>
            </div>

            <div className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-slate-500">
              Emergency Intelligence
            </div>
          </div>
        </div>
      </div>

      {/* LIVE STATUS */}
      <div className="mx-4 mt-5 shrink-0 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04] p-3">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
            Network Status
          </span>

          <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>

            ONLINE
          </span>
        </div>

        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
          <div className="h-full w-[94%] rounded-full bg-emerald-400/60" />
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-6">
        <div className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
          Operations
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.section;

            return (
              <button
                key={item.section}
                type="button"
                onClick={() => handleClick(item.section)}
                className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-400/[0.08] text-cyan-300"
                    : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 h-6 w-0.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                )}

                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                    isActive
                      ? "bg-cyan-400/10"
                      : "bg-white/[0.02] group-hover:bg-white/5"
                  }`}
                >
                  <Icon size={16} />
                </div>

                <span className="flex-1 text-xs font-semibold">
                  {item.label}
                </span>

                {item.badge && (
                  <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[9px] font-bold text-slate-500">
                    {item.badge}
                  </span>
                )}

                {item.premium && (
                  <span className="rounded-md border border-purple-400/20 bg-purple-400/10 px-1.5 py-0.5 text-[8px] font-bold text-purple-300">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* SECONDARY */}
        <div className="mb-3 mt-8 px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
          System
        </div>

        <button
          type="button"
          onClick={() => handleClick("communications")}
          className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 transition ${
            activeSection === "communications"
              ? "bg-cyan-400/[0.08] text-cyan-300"
              : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-200"
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.02] group-hover:bg-white/5">
            <Radio size={16} />
          </div>

          <span className="text-xs font-semibold">
            Communications
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleClick("settings")}
          className={`group mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 transition ${
            activeSection === "settings"
              ? "bg-cyan-400/[0.08] text-cyan-300"
              : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-200"
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.02] group-hover:bg-white/5">
            <Settings size={16} />
          </div>

          <span className="text-xs font-semibold">
            System Settings
          </span>
        </button>
      </div>

      {/* COMMAND CENTER CARD */}
      <div className="shrink-0 border-t border-white/10 p-4">
        <div className="relative overflow-hidden rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] p-4">
          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-cyan-400/5 blur-2xl" />

          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/10">
                <Radio
                  size={13}
                  className="text-cyan-400"
                />
              </div>

              <span className="text-[10px] font-bold text-slate-300">
                COMMAND ONLINE
              </span>
            </div>

            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-lg font-black text-white">
                  99.8%
                </div>

                <div className="text-[9px] text-slate-600">
                  system reliability
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-bold text-emerald-400">
                  SECURE
                </div>

                <div className="text-[9px] text-slate-600">
                  encrypted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}