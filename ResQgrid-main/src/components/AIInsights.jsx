import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Lightbulb,
  Route,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export default function AIInsights({
  incidents = [],
  simulationStep = 0,
}) {
  const topIncident = incidents[0];

  const insights = getInsights(
    topIncident,
    simulationStep
  );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-purple-400/15 bg-[#0a0b17]">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />

      {/* HEADER */}
      <div className="relative flex flex-col gap-4 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-400/10">

            <div className="absolute inset-0 animate-pulse rounded-xl bg-purple-400/5" />

            <BrainCircuit
              size={19}
              className="relative text-purple-300"
            />

          </div>

          <div>
            <div className="flex items-center gap-2">

              <h2 className="text-xs font-bold text-white">
                AI Response Intelligence
              </h2>

              <span className="flex items-center gap-1 rounded-md border border-purple-400/20 bg-purple-400/10 px-1.5 py-1 text-[7px] font-black uppercase tracking-wider text-purple-300">
                <Sparkles size={8} />
                AI
              </span>

            </div>

            <div className="mt-1 text-[9px] uppercase tracking-wider text-slate-600">
              Decision support & response optimization
            </div>
          </div>

        </div>


        {/* Confidence */}
        <div className="flex items-center gap-3">

          <div className="hidden text-right sm:block">

            <div className="text-[8px] uppercase tracking-wider text-slate-600">
              Model confidence
            </div>

            <div className="mt-0.5 text-xs font-black text-emerald-400">
              94.7%
            </div>

          </div>

          <div className="h-8 w-px bg-white/10" />

          <div className="flex items-center gap-2 rounded-xl border border-emerald-400/10 bg-emerald-400/5 px-3 py-2">

            <ShieldCheck
              size={13}
              className="text-emerald-400"
            />

            <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-400">
              Decision Ready
            </span>

          </div>

        </div>

      </div>


      {/* CONTENT */}
      <div className="relative grid grid-cols-1 gap-3 p-3 lg:grid-cols-3">

        {/* Primary recommendation */}
        <div className="rounded-xl border border-purple-400/15 bg-purple-400/[0.035] p-4 lg:col-span-2">

          <div className="flex items-center gap-2">

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-400/10">
              <Lightbulb
                size={13}
                className="text-purple-300"
              />
            </div>

            <div>

              <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-purple-300">
                AI Recommendation
              </div>

              <div className="mt-0.5 text-[9px] text-slate-600">
                Highest-impact response action
              </div>

            </div>

          </div>


          <div className="mt-4">

            <h3 className="text-base font-black leading-snug text-white">
              {insights.recommendation}
            </h3>

            <p className="mt-2 max-w-2xl text-[10px] leading-5 text-slate-500">
              {insights.explanation}
            </p>

          </div>


          {/* Action chips */}
          <div className="mt-4 flex flex-wrap gap-2">

            {insights.actions.map((action) => (
              <div
                key={action}
                className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.025] px-2.5 py-1.5"
              >
                <CheckCircle2
                  size={10}
                  className="text-emerald-400"
                />

                <span className="text-[8px] font-semibold text-slate-400">
                  {action}
                </span>
              </div>
            ))}

          </div>

        </div>


        {/* Response impact */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">

          <div className="flex items-center gap-2">

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/10">
              <TrendingUp
                size={13}
                className="text-cyan-400"
              />
            </div>

            <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-500">
              Projected Impact
            </div>

          </div>


          <div className="mt-5 space-y-4">

            <ImpactRow
              icon={Clock3}
              label="Response time"
              value={
                simulationStep >= 4
                  ? "−26%"
                  : "−18%"
              }
              positive
            />

            <ImpactRow
              icon={Users}
              label="Exposure"
              value={
                simulationStep >= 3
                  ? "−21%"
                  : "−14%"
              }
              positive
            />

            <ImpactRow
              icon={Route}
              label="Route efficiency"
              value={
                simulationStep >= 2
                  ? "+31%"
                  : "+24%"
              }
              positive
            />

          </div>

        </div>

      </div>


      {/* SIGNALS */}
      <div className="relative border-t border-white/10 p-3">

        <div className="mb-2 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <Activity
              size={11}
              className="text-cyan-400"
            />

            <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-500">
              Intelligence Signals
            </span>

          </div>

          <span className="text-[8px] text-slate-700">
            Updated just now
          </span>

        </div>


        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">

          <Signal
            icon={Zap}
            label="Risk detection"
            value={
              simulationStep > 0
                ? "Escalating"
                : "Stable"
            }
            active={simulationStep > 0}
          />

          <Signal
            icon={Users}
            label="Civilian exposure"
            value={
              simulationStep >= 2
                ? "Increasing"
                : "Monitored"
            }
            active={simulationStep >= 2}
          />

          <Signal
            icon={Route}
            label="Accessibility"
            value={
              simulationStep >= 2
                ? "Deteriorating"
                : "Normal"
            }
            active={simulationStep >= 2}
          />

          <Signal
            icon={ShieldCheck}
            label="Response readiness"
            value="Operational"
            active
          />

        </div>

      </div>


      {/* FOOTER */}
      <div className="flex flex-col gap-2 border-t border-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-2">

          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-400/10">
            <BrainCircuit
              size={10}
              className="text-purple-300"
            />
          </div>

          <span className="text-[8px] text-slate-600">
            Recommendation generated from simulated risk,
            accessibility and civilian-impact signals.
          </span>

        </div>

        <div className="flex items-center gap-1.5 text-[8px] text-slate-700">

          <ArrowUpRight size={9} />

          Decision support only

        </div>

      </div>

    </div>
  );
}


function getInsights(incident, simulationStep) {
  const location =
    incident?.location || "highest-risk zone";

  const score = incident?.priority || 0;

  if (simulationStep >= 4) {
    return {
      recommendation: `Prioritize immediate rescue deployment to ${location}.`,
      explanation: `The AI engine has identified ${location} as the highest-priority incident with a current priority score of ${score}. Resource allocation should account for civilian exposure, route accessibility and team capability.`,
      actions: [
        "Dispatch matched team",
        "Optimize rescue route",
        "Monitor civilian reports",
      ],
    };
  }

  if (simulationStep >= 3) {
    return {
      recommendation: `Escalate monitoring around ${location} and prepare rapid response.`,
      explanation:
        "Citizen-reported signals and rising urgency are increasing the estimated response priority. The system recommends preparing a compatible field unit before accessibility deteriorates further.",
      actions: [
        "Verify incoming reports",
        "Pre-position response team",
        "Track access conditions",
      ],
    };
  }

  if (simulationStep >= 2) {
    return {
      recommendation: `Recalculate response routes as accessibility changes.`,
      explanation:
        "Reduced road accessibility can increase travel time and alter the most suitable rescue path. The AI layer continuously factors access conditions into resource prioritization.",
      actions: [
        "Recalculate routes",
        "Monitor road access",
        "Update team ETA",
      ],
    };
  }

  return {
    recommendation:
      "Continue monitoring risk signals and maintain response readiness.",
    explanation:
      "The system is currently observing rainfall, incident risk, citizen signals and resource availability. No emergency simulation escalation has been triggered.",
    actions: [
      "Monitor risk zones",
      "Track incidents",
      "Maintain readiness",
    ],
  };
}


function ImpactRow({
  icon: Icon,
  label,
  value,
  positive = false,
}) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-2">

        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.035]">
          <Icon
            size={12}
            className="text-slate-500"
          />
        </div>

        <span className="text-[9px] text-slate-500">
          {label}
        </span>

      </div>

      <span
        className={`text-[10px] font-black ${
          positive
            ? "text-emerald-400"
            : "text-slate-300"
        }`}
      >
        {value}
      </span>

    </div>
  );
}


function Signal({
  icon: Icon,
  label,
  value,
  active = false,
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.015] px-3 py-2.5">

      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
          active
            ? "bg-cyan-400/10"
            : "bg-white/[0.03]"
        }`}
      >
        <Icon
          size={12}
          className={
            active
              ? "text-cyan-400"
              : "text-slate-600"
          }
        />
      </div>

      <div className="min-w-0">

        <div className="truncate text-[7px] uppercase tracking-wider text-slate-600">
          {label}
        </div>

        <div
          className={`mt-0.5 truncate text-[9px] font-bold ${
            active
              ? "text-slate-300"
              : "text-slate-600"
          }`}
        >
          {value}
        </div>

      </div>

    </div>
  );
}