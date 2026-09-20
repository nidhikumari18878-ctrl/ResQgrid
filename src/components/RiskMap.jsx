import {
  AlertTriangle,
  Crosshair,
  Layers,
  MapPin,
  Navigation,
  Radio,
  ShieldAlert,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

export default function RiskMap({
  incidents = [],
  simulationStep = 0,
  dispatchedTeams = [],
}) {
  const getRiskColor = (priority = 0) => {
    if (priority >= 80) {
      return {
        ring: "border-red-400",
        glow: "bg-red-500",
        text: "text-red-300",
      };
    }

    if (priority >= 60) {
      return {
        ring: "border-orange-400",
        glow: "bg-orange-400",
        text: "text-orange-300",
      };
    }

    if (priority >= 40) {
      return {
        ring: "border-yellow-400",
        glow: "bg-yellow-400",
        text: "text-yellow-300",
      };
    }

    return {
      ring: "border-emerald-400",
      glow: "bg-emerald-400",
      text: "text-emerald-300",
    };
  };

  return (
    <div className="relative h-[520px] overflow-hidden rounded-2xl border border-white/10 bg-[#080d16] shadow-2xl shadow-black/20">

      {/* MAP HEADER */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#080d16]/85 px-4 py-3 backdrop-blur-xl">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
            <Navigation
              size={17}
              className="text-cyan-400"
            />
          </div>

          <div>
            <div className="text-xs font-bold text-white">
              Live Risk Map
            </div>

            <div className="mt-0.5 flex items-center gap-2 text-[9px] uppercase tracking-wider text-slate-500">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              AI Spatial Intelligence
            </div>
          </div>

        </div>

        <div className="hidden items-center gap-2 sm:flex">

          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
            <Radio size={12} className="text-cyan-400" />
            <span className="text-[9px] font-bold text-slate-400">
              LIVE DATA
            </span>
          </div>

          <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-500 transition hover:bg-white/5 hover:text-white">
            <Layers size={14} />
          </button>

        </div>
      </div>

      {/* MAP CANVAS */}
      <div className="absolute inset-0 overflow-hidden bg-[#0a111b]">

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(100,116,139,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100,116,139,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "42px 42px",
          }}
        />

        {/* Map terrain shapes */}
        <div className="absolute -left-20 top-32 h-72 w-[75%] rotate-[18deg] rounded-[45%] border border-cyan-400/10 bg-cyan-400/[0.025]" />

        <div className="absolute -right-24 bottom-20 h-80 w-[65%] rotate-[-25deg] rounded-[45%] border border-emerald-400/10 bg-emerald-400/[0.025]" />

        <div className="absolute left-[20%] top-[15%] h-24 w-64 rotate-12 rounded-full border border-white/5 bg-white/[0.015]" />

        <div className="absolute right-[15%] top-[45%] h-20 w-72 -rotate-12 rounded-full border border-white/5 bg-white/[0.015]" />

        {/* Roads */}
        <div className="absolute left-[5%] top-[60%] h-[2px] w-[90%] rotate-[-12deg] bg-slate-500/20" />
        <div className="absolute left-[10%] top-[42%] h-[2px] w-[85%] rotate-[18deg] bg-slate-500/20" />
        <div className="absolute left-[45%] top-[5%] h-[90%] w-[2px] rotate-[8deg] bg-slate-500/20" />
        <div className="absolute left-[68%] top-[8%] h-[85%] w-[2px] rotate-[-22deg] bg-slate-500/20" />

        {/* Main arterial */}
        <div className="absolute left-[-5%] top-[49%] h-[4px] w-[110%] rotate-[-7deg] bg-cyan-300/10 shadow-[0_0_12px_rgba(34,211,238,0.08)]" />

        {/* Rain simulation overlay */}
        {simulationStep >= 1 && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-blue-500/[0.025]" />

            <div className="absolute left-[8%] top-[22%] h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute right-[20%] top-[30%] h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute bottom-[15%] left-[40%] h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />

            {/* Rain streaks */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 35 }).map((_, index) => (
                <span
                  key={index}
                  className="absolute h-5 w-px rotate-[18deg] animate-pulse bg-cyan-300"
                  style={{
                    left: `${(index * 29) % 100}%`,
                    top: `${(index * 37) % 100}%`,
                    animationDelay: `${index * 70}ms`,
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* INCIDENT MARKERS */}
        {incidents.map((incident, index) => {
          const risk = getRiskColor(incident.priority);

          const positions = [
            { left: "24%", top: "38%" },
            { left: "65%", top: "27%" },
            { left: "75%", top: "65%" },
            { left: "37%", top: "73%" },
          ];

          const position =
            positions[index % positions.length];

          const isDispatched = dispatchedTeams.length > 0 && index === 0;

          return (
            <div
              key={incident.id}
              className="absolute z-10"
              style={position}
            >
              {/* Pulse */}
              <div
                className={`absolute -inset-5 animate-ping rounded-full opacity-20 ${risk.glow}`}
              />

              <div
                className={`absolute -inset-2 rounded-full opacity-20 blur-md ${risk.glow}`}
              />

              {/* Marker */}
              <div
                className={`relative flex h-9 w-9 items-center justify-center rounded-full border-2 bg-[#081019] shadow-xl ${risk.ring}`}
              >
                {incident.type === "Flood" ? (
                  <ShieldAlert
                    size={15}
                    className={risk.text}
                  />
                ) : (
                  <AlertTriangle
                    size={15}
                    className={risk.text}
                  />
                )}

                <span
                  className={`absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[7px] font-black text-white ${risk.glow}`}
                >
                  {incident.priority}
                </span>
              </div>

              {/* Label */}
              <div className="absolute left-1/2 top-11 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#080d16]/90 px-2.5 py-1.5 shadow-xl backdrop-blur-md">
                <div className="text-[9px] font-bold text-white">
                  {incident.location}
                </div>

                <div className={`text-[8px] ${risk.text}`}>
                  {incident.type} • {incident.priority}
                </div>
              </div>

              {/* Dispatch route */}
              {isDispatched && (
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-px origin-top -rotate-[52deg] border-l border-dashed border-cyan-400/60">
                  <div className="absolute -left-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
                </div>
              )}
            </div>
          );
        })}

        {/* CITY CENTER */}
        <div className="absolute left-[51%] top-[52%] z-[5] -translate-x-1/2 -translate-y-1/2">

          <div className="absolute -inset-12 rounded-full border border-cyan-400/10" />
          <div className="absolute -inset-7 rounded-full border border-cyan-400/10" />

          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10">
            <Crosshair
              size={14}
              className="text-cyan-400"
            />
          </div>

        </div>

        {/* Map labels */}
        <div className="absolute left-[12%] top-[25%] text-[8px] font-bold uppercase tracking-widest text-slate-700">
          North District
        </div>

        <div className="absolute right-[10%] top-[47%] text-[8px] font-bold uppercase tracking-widest text-slate-700">
          East Sector
        </div>

        <div className="absolute bottom-[17%] left-[15%] text-[8px] font-bold uppercase tracking-widest text-slate-700">
          South Zone
        </div>

        {/* Bottom information */}
        <div className="absolute bottom-4 left-4 z-20">

          <div className="rounded-xl border border-white/10 bg-[#080d16]/90 px-3 py-2.5 backdrop-blur-xl">

            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-cyan-400" />

              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Monitoring Area
              </span>
            </div>

            <div className="mt-1 text-xs font-semibold text-white">
              Central Response Grid
            </div>

          </div>

        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 z-20 hidden rounded-xl border border-white/10 bg-[#080d16]/90 p-3 backdrop-blur-xl sm:block">

          <div className="mb-2 text-[8px] font-bold uppercase tracking-widest text-slate-600">
            Risk Level
          </div>

          <div className="space-y-1.5">

            <LegendDot
              color="bg-red-400"
              label="Critical"
            />

            <LegendDot
              color="bg-orange-400"
              label="High"
            />

            <LegendDot
              color="bg-yellow-400"
              label="Medium"
            />

            <LegendDot
              color="bg-emerald-400"
              label="Low"
            />

          </div>

        </div>

      </div>

      {/* MAP CONTROLS */}
      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-white/10 bg-[#080d16]/90 p-1 shadow-2xl backdrop-blur-xl">

        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white">
          <ZoomIn size={15} />
        </button>

        <div className="h-4 w-px bg-white/10" />

        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white">
          <ZoomOut size={15} />
        </button>

        <div className="h-4 w-px bg-white/10" />

        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white">
          <Crosshair size={15} />
        </button>

      </div>

      {/* Top-left simulation indicator */}
      {simulationStep > 0 && (
        <div className="absolute left-4 top-[88px] z-30 flex items-center gap-2 rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-2 backdrop-blur-xl">

          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-blue-400" />
            <span className="relative h-2 w-2 rounded-full bg-blue-400" />
          </span>

          <span className="text-[9px] font-bold uppercase tracking-wider text-blue-300">
            Weather Simulation Active
          </span>

        </div>
      )}
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-1.5 w-1.5 rounded-full ${color}`}
      />
      <span className="text-[8px] text-slate-500">
        {label}
      </span>
    </div>
  );
}