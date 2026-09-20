import {
  Activity,
  CheckCircle2,
  Clock3,
  MapPin,
  Radio,
  Route,
  Shield,
  Truck,
  Users,
  Zap,
} from "lucide-react";

export default function ResourceDeployment({
  teams = [],
  dispatchedTeams = [],
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#080d16]">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
            <Truck
              size={17}
              className="text-cyan-400"
            />
          </div>

          <div>
            <div className="text-xs font-bold text-white">
              Resource Deployment
            </div>

            <div className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-600">
              Response teams & field units
            </div>
          </div>

        </div>

        <div className="flex items-center gap-1.5 rounded-lg border border-cyan-400/10 bg-cyan-400/5 px-2.5 py-1.5">

          <Activity
            size={11}
            className="text-cyan-400"
          />

          <span className="text-[8px] font-bold uppercase tracking-wider text-cyan-400">
            Tracking
          </span>

        </div>

      </div>


      {/* TEAM LIST */}
      <div className="p-3">

        <div className="space-y-2">

          {teams.map((team) => {
            const isDispatched =
              dispatchedTeams.includes(team.id);

            return (
              <TeamItem
                key={team.id}
                team={team}
                dispatched={isDispatched}
              />
            );
          })}

        </div>


        {/* DEPLOYMENT SUMMARY */}
        <div className="mt-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">

          <div className="mb-3 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Zap
                size={12}
                className="text-yellow-400"
              />

              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Deployment Efficiency
              </span>

            </div>

            <span className="text-xs font-black text-emerald-400">
              91%
            </span>

          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/5">

            <div className="h-full w-[91%] rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-emerald-300" />

          </div>

          <div className="mt-2 flex justify-between text-[8px] text-slate-600">

            <span>
              Availability optimized
            </span>

            <span>
              AI allocation
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}


function TeamItem({ team, dispatched }) {
  const availability = Math.min(
    100,
    Math.max(0, team.availability || 0)
  );

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border p-3 transition-all duration-300 ${
        dispatched
          ? "border-cyan-400/20 bg-cyan-400/[0.04]"
          : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.035]"
      }`}
    >

      {/* Active indicator */}
      <div
        className={`absolute left-0 top-0 h-full w-0.5 ${
          dispatched
            ? "bg-cyan-400"
            : "bg-emerald-400/40"
        }`}
      />

      <div className="flex items-start gap-3">

        {/* Team icon */}
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            dispatched
              ? "bg-cyan-400/10 text-cyan-400"
              : "bg-emerald-400/10 text-emerald-400"
          }`}
        >
          {dispatched ? (
            <Route size={16} />
          ) : (
            <Shield size={16} />
          )}
        </div>


        {/* Team info */}
        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-2">

            <div className="min-w-0">

              <div className="truncate text-[10px] font-bold text-white">
                {team.name}
              </div>

              <div className="mt-1 flex items-center gap-2">

                <span className="flex items-center gap-1 text-[8px] text-slate-500">
                  <Users size={8} />
                  {team.capability}
                </span>

              </div>

            </div>

            <span
              className={`shrink-0 rounded-md px-1.5 py-1 text-[7px] font-black uppercase tracking-wider ${
                dispatched
                  ? "bg-cyan-400/10 text-cyan-400"
                  : "bg-emerald-400/10 text-emerald-400"
              }`}
            >
              {dispatched
                ? "DEPLOYED"
                : "AVAILABLE"}
            </span>

          </div>


          {/* Metrics */}
          <div className="mt-3 grid grid-cols-3 gap-2">

            <SmallMetric
              icon={MapPin}
              label="Distance"
              value={`${team.distance} km`}
            />

            <SmallMetric
              icon={Activity}
              label="Ready"
              value={`${availability}%`}
            />

            <SmallMetric
              icon={Clock3}
              label="ETA"
              value={`${Math.max(
                2,
                Math.round(team.distance * 2)
              )}m`}
            />

          </div>


          {/* Availability bar */}
          <div className="mt-3">

            <div className="mb-1 flex items-center justify-between">

              <span className="text-[7px] uppercase tracking-wider text-slate-600">
                Unit readiness
              </span>

              <span className="text-[8px] font-bold text-slate-500">
                {availability}%
              </span>

            </div>

            <div className="h-1 overflow-hidden rounded-full bg-white/5">

              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  dispatched
                    ? "bg-cyan-400"
                    : availability >= 85
                    ? "bg-emerald-400"
                    : "bg-yellow-400"
                }`}
                style={{
                  width: `${availability}%`,
                }}
              />

            </div>

          </div>


          {/* Dispatch state */}
          {dispatched && (
            <div className="mt-3 flex items-center justify-between rounded-lg border border-cyan-400/10 bg-cyan-400/5 px-2.5 py-2">

              <div className="flex items-center gap-2">

                <div className="relative flex h-5 w-5 items-center justify-center rounded-md bg-cyan-400/10">

                  <Radio
                    size={10}
                    className="text-cyan-400"
                  />

                  <span className="absolute inset-0 animate-ping rounded-md border border-cyan-400/30" />

                </div>

                <div>
                  <div className="text-[8px] font-bold text-cyan-300">
                    Mission Active
                  </div>

                  <div className="text-[7px] text-slate-600">
                    Route optimization enabled
                  </div>
                </div>

              </div>

              <CheckCircle2
                size={13}
                className="text-cyan-400"
              />

            </div>
          )}

        </div>

      </div>
    </div>
  );
}


function SmallMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg bg-white/[0.025] px-2 py-2">

      <div className="flex items-center gap-1 text-[7px] uppercase tracking-wider text-slate-600">
        <Icon size={8} />
        {label}
      </div>

      <div className="mt-0.5 text-[9px] font-bold text-slate-300">
        {value}
      </div>

    </div>
  );
}