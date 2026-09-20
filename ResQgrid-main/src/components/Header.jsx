import { useEffect, useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  Play,
  RotateCcw,
  Zap,
} from "lucide-react";

export default function Header({
  simulationStep = 0,
  onSimulation,
  onMenu,
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const isSimulation = simulationStep > 0;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050810]/85 backdrop-blur-xl">

      <div className="flex h-[72px] items-center justify-between px-4 md:px-6 xl:px-8">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          <button
            onClick={onMenu}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.06] hover:text-white lg:hidden"
          >
            <Menu size={19} />
          </button>

          <div className="hidden sm:block">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Control Room
            </div>

            <div className="mt-1 text-sm font-semibold text-slate-200">
              Emergency Operations Dashboard
            </div>
          </div>

        </div>


        {/* CENTER STATUS */}
        <div className="hidden items-center gap-2 md:flex">

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2">

            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Network Operational
            </span>

          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 font-mono text-[10px] text-slate-500">
            {formattedTime}
          </div>

        </div>


        {/* RIGHT */}
        <div className="flex items-center gap-2">

          {/* Simulation Button */}
          <button
            onClick={onSimulation}
            className={`group relative flex items-center gap-2 overflow-hidden rounded-xl px-3 py-2.5 text-xs font-bold transition-all duration-300 sm:px-4 ${
              isSimulation
                ? "border border-red-400/30 bg-red-400/10 text-red-300 shadow-lg shadow-red-500/5"
                : "border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/15"
            }`}
          >

            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {isSimulation ? (
              <RotateCcw size={14} />
            ) : (
              <Play size={14} />
            )}

            <span className="hidden sm:inline">
              {isSimulation
                ? `SIMULATION ${simulationStep}/4`
                : "SIMULATE EMERGENCY"}
            </span>

          </button>


          {/* Notification */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.06] hover:text-white">

            <Bell size={17} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]" />

          </button>


          {/* User */}
          <button className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-2 py-1.5 transition hover:bg-white/[0.06] sm:flex">

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-400/20">
              <Zap size={13} className="text-cyan-300" />
            </div>

            <div className="text-left">
              <div className="text-[10px] font-bold text-slate-300">
                OPS-01
              </div>

              <div className="text-[8px] text-emerald-400">
                ONLINE
              </div>
            </div>

            <ChevronDown
              size={13}
              className="text-slate-600"
            />

          </button>

        </div>

      </div>


      {/* SIMULATION PROGRESS */}
      {isSimulation && (
        <div className="h-[2px] w-full bg-white/5">

          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-yellow-400 to-red-400 transition-all duration-700"
            style={{
              width: `${simulationStep * 25}%`,
            }}
          />

        </div>
      )}

    </header>
  );
}