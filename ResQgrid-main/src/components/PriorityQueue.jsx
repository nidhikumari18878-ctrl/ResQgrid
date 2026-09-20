import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  MapPin,
  ShieldAlert,
  Users,
} from "lucide-react";

export default function PriorityQueue({
  incidents = [],
  teams = [],
  dispatchedTeams = [],
  onDispatch,
}) {
  const getPriorityStyle = (priority = 0) => {
    if (priority >= 80) {
      return {
        label: "CRITICAL",
        text: "text-red-400",
        bg: "bg-red-400/10",
        border: "border-red-400/20",
        bar: "bg-red-400",
      };
    }

    if (priority >= 60) {
      return {
        label: "HIGH",
        text: "text-orange-400",
        bg: "bg-orange-400/10",
        border: "border-orange-400/20",
        bar: "bg-orange-400",
      };
    }

    if (priority >= 40) {
      return {
        label: "MEDIUM",
        text: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/20",
        bar: "bg-yellow-400",
      };
    }

    return {
      label: "LOW",
      text: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
      bar: "bg-emerald-400",
    };
  };

  const findRecommendedTeam = (incident) => {
    if (!teams.length) return null;

    const compatible = teams.filter(
      (team) =>
        team.status === "AVAILABLE" &&
        !dispatchedTeams.includes(team.id)
    );

    if (!compatible.length) return null;

    const scored = compatible.map((team) => {
      let capabilityScore = 60;

      if (
        incident.type === "Flood" &&
        team.capability === "Flood Rescue"
      ) {
        capabilityScore = 100;
      }

      if (
        incident.type === "Medical" &&
        team.capability === "Medical Emergency"
      ) {
        capabilityScore = 100;
      }

      if (
        incident.type === "Fire" &&
        team.capability === "General Rescue"
      ) {
        capabilityScore = 82;
      }

      const distanceScore = Math.max(
        0,
        100 - team.distance * 8
      );

      const score =
        team.availability * 0.4 +
        capabilityScore * 0.35 +
        distanceScore * 0.25;

      return {
        ...team,
        score,
      };
    });

    return scored.sort(
      (a, b) => b.score - a.score
    )[0];
  };

  return (
    <div className="h-[520px] overflow-hidden rounded-2xl border border-white/10 bg-[#080d16]">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-400/20 bg-red-400/10">
            <ShieldAlert
              size={17}
              className="text-red-400"
            />
          </div>

          <div>
            <div className="text-xs font-bold text-white">
              AI Priority Queue
            </div>

            <div className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-600">
              Dynamic incident ranking
            </div>
          </div>

        </div>

        <div className="flex items-center gap-1.5 rounded-lg border border-purple-400/20 bg-purple-400/10 px-2.5 py-1.5">

          <BrainCircuit
            size={12}
            className="text-purple-300"
          />

          <span className="text-[8px] font-bold uppercase tracking-wider text-purple-300">
            AI Active
          </span>

        </div>

      </div>

      {/* QUEUE */}
      <div className="h-[calc(100%-73px)] overflow-y-auto p-3">

        <div className="space-y-3">

          {incidents.map((incident, index) => {
            const priority = getPriorityStyle(
              incident.priority
            );

            const recommendedTeam =
              findRecommendedTeam(incident);

            const isDispatched =
              dispatchedTeams.includes(
                recommendedTeam?.id
              );

            return (
              <div
                key={incident.id}
                className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
                  index === 0
                    ? "border-red-400/20 bg-red-400/[0.035]"
                    : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.035]"
                }`}
              >

                {/* Priority strip */}
                <div
                  className={`absolute left-0 top-0 h-full w-0.5 ${priority.bar}`}
                />

                <div className="p-3.5">

                  {/* Incident top */}
                  <div className="flex items-start justify-between gap-3">

                    <div className="flex min-w-0 items-start gap-2.5">

                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-slate-500">
                        <span className="font-mono text-[9px] font-bold">
                          0{index + 1}
                        </span>
                      </div>

                      <div className="min-w-0">

                        <div className="flex items-center gap-2">

                          <h3 className="truncate text-xs font-bold text-white">
                            {incident.location}
                          </h3>

                          {index === 0 && (
                            <span className="animate-pulse text-[7px] font-black uppercase tracking-wider text-red-400">
                              Top Priority
                            </span>
                          )}

                        </div>

                        <div className="mt-1 flex items-center gap-2">

                          <span className="flex items-center gap-1 text-[9px] text-slate-500">
                            <MapPin size={9} />
                            {incident.zone}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-slate-700" />

                          <span className="text-[9px] text-slate-500">
                            {incident.type}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* Score */}
                    <div className="shrink-0 text-right">

                      <div
                        className={`text-xl font-black ${priority.text}`}
                      >
                        {incident.priority}
                      </div>

                      <div
                        className={`text-[7px] font-bold tracking-wider ${priority.text}`}
                      >
                        PRIORITY
                      </div>

                    </div>

                  </div>


                  {/* Risk bar */}
                  <div className="mt-3">

                    <div className="mb-1 flex items-center justify-between">

                      <span className="text-[8px] uppercase tracking-wider text-slate-600">
                        AI Risk Score
                      </span>

                      <span
                        className={`text-[8px] font-bold ${priority.text}`}
                      >
                        {priority.label}
                      </span>

                    </div>

                    <div className="h-1 overflow-hidden rounded-full bg-white/5">

                      <div
                        className={`h-full rounded-full transition-all duration-700 ${priority.bar}`}
                        style={{
                          width: `${incident.priority}%`,
                        }}
                      />

                    </div>

                  </div>


                  {/* Metrics */}
                  <div className="mt-3 grid grid-cols-3 gap-2">

                    <Metric
                      label="Risk"
                      value={`${incident.risk}%`}
                    />

                    <Metric
                      label="People"
                      value={incident.people}
                      icon={Users}
                    />

                    <Metric
                      label="Access"
                      value={`${incident.accessibility}%`}
                    />

                  </div>


                  {/* Recommended resource */}
                  <div className="mt-3 rounded-lg border border-white/5 bg-black/10 p-2.5">

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/10">
                          <BrainCircuit
                            size={13}
                            className="text-cyan-400"
                          />
                        </div>

                        <div>

                          <div className="text-[8px] font-bold uppercase tracking-wider text-slate-600">
                            AI Recommendation
                          </div>

                          <div className="mt-0.5 text-[10px] font-semibold text-slate-300">
                            {recommendedTeam
                              ? recommendedTeam.name
                              : "No team available"}
                          </div>

                        </div>

                      </div>

                      {recommendedTeam && (
                        <div className="text-right">

                          <div className="text-[10px] font-black text-cyan-400">
                            {Math.round(
                              recommendedTeam.score
                            )}
                          </div>

                          <div className="text-[7px] text-slate-600">
                            MATCH
                          </div>

                        </div>
                      )}

                    </div>


                    {/* Dispatch */}
                    {recommendedTeam && (
                      <button
                        onClick={() =>
                          onDispatch?.(
                            recommendedTeam.id,
                            incident.location
                          )
                        }
                        disabled={isDispatched}
                        className={`mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-[9px] font-bold uppercase tracking-wider transition ${
                          isDispatched
                            ? "cursor-default border border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                            : "border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/15 hover:shadow-lg hover:shadow-cyan-500/5"
                        }`}
                      >

                        {isDispatched ? (
                          <>
                            <CheckCircle2 size={12} />
                            Team Dispatched
                          </>
                        ) : (
                          <>
                            <ArrowRight size={12} />
                            Dispatch Recommended Team
                          </>
                        )}

                      </button>
                    )}

                  </div>

                </div>
              </div>
            );
          })}

        </div>


        {/* Footer */}
        <div className="mt-3 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.015] px-3 py-2.5">

          <div className="flex items-center gap-2">

            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-400/10">
              <ChevronRight
                size={12}
                className="text-cyan-400"
              />
            </div>

            <span className="text-[9px] text-slate-500">
              Queue updates automatically
            </span>

          </div>

          <span className="text-[8px] font-bold text-emerald-400">
            REAL-TIME
          </span>

        </div>

      </div>
    </div>
  );
}

function Metric({ label, value, icon: Icon }) {
  return (
    <div className="rounded-lg bg-white/[0.025] px-2 py-2">

      <div className="flex items-center gap-1 text-[7px] uppercase tracking-wider text-slate-600">
        {Icon && <Icon size={8} />}
        {label}
      </div>

      <div className="mt-0.5 text-[10px] font-bold text-slate-300">
        {value}
      </div>

    </div>
  );
}