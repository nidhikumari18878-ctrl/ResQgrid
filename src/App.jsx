import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bell,
  BrainCircuit,
  Clock3,
  Menu,
  Radio,
  ShieldAlert,
  Siren,
  Truck,
  Users,
  X,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import RiskMap from "./components/RiskMap";
import PriorityQueue from "./components/PriorityQueue";
import CitizenReports from "./components/CitizenReports";
import ResourceDeployment from "./components/ResourceDeployment";
import AIInsights from "./components/AIInsights";

import {
  incidents as initialIncidents,
  rescueTeams as initialTeams,
} from "./data/simulationData";

import {
  calculatePriority,
  allocateResource,
} from "./utils/emergencyEngine";

export default function App() {
  const [simulationStep, setSimulationStep] = useState(0);
  const [dispatchedTeams, setDispatchedTeams] = useState([]);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState(null);

  const incidents = useMemo(() => {
    return initialIncidents.map((incident) => ({
      ...incident,
      priority: calculatePriority({
        risk:
          simulationStep >= 1
            ? Math.min(100, incident.risk + 4)
            : incident.risk,
        people:
          simulationStep >= 2
            ? Math.min(100, incident.people + 15)
            : incident.people,
        urgency:
          simulationStep >= 3
            ? Math.min(100, incident.urgency + 8)
            : incident.urgency,
        accessibility:
          simulationStep >= 2
            ? Math.max(10, incident.accessibility - 12)
            : incident.accessibility,
      }),
    }));
  }, [simulationStep]);

  const sortedIncidents = [...incidents].sort(
    (a, b) => b.priority - a.priority
  );

  const criticalZones = incidents.filter(
    (item) => item.priority >= 80
  ).length;

  const affectedPeople =
    simulationStep >= 3
      ? 487
      : simulationStep >= 2
      ? 452
      : 421;

  const responseTime =
    simulationStep >= 4
      ? "6.2m"
      : simulationStep >= 2
      ? "7.1m"
      : "8.4m";

  const handleSimulation = () => {
    setSimulationStep((previous) =>
      previous >= 4 ? 0 : previous + 1
    );
  };

  const handleDispatch = (teamId, location) => {
    if (dispatchedTeams.includes(teamId)) return;

    setDispatchedTeams((previous) => [
      ...previous,
      teamId,
    ]);

    setToast({
      type: "success",
      message: `${teamId} dispatched to ${location}`,
    });

    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#050810] text-slate-100">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[15%] top-[-10%] h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute right-[-5%] top-[30%] h-96 w-96 rounded-full bg-red-500/5 blur-3xl" />
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden">
          <div className="h-full w-72 border-r border-white/10 bg-[#080d16]">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div className="font-bold">RESQGRID AI</div>

              <button
                onClick={() => setMobileMenu(false)}
                className="rounded-lg p-2 hover:bg-white/5"
              >
                <X size={20} />
              </button>
            </div>

            <Sidebar />
          </div>
        </div>
      )}

      <div className="relative flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#070b13] lg:block">
          <Sidebar />
        </aside>

        <main className="min-w-0 flex-1">
          {/* Header */}
          <Header
            simulationStep={simulationStep}
            onSimulation={handleSimulation}
            onMenu={() => setMobileMenu(true)}
          />

          <div className="p-4 md:p-6 xl:p-8">
            {/* Hero */}
            <section className="mb-7">
              <div className="mb-3 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>

                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                  Emergency Intelligence Network
                </span>
              </div>

              <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
                <div>
                  <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                    Predict.{" "}
                    <span className="text-cyan-400">
                      Prioritize.
                    </span>{" "}
                    Respond.
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    AI-powered emergency intelligence and
                    resource optimization for faster,
                    coordinated response.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">
                      System
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm font-semibold">
                      <Radio
                        size={13}
                        className="text-emerald-400"
                      />
                      Operational
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">
                      Mode
                    </div>
                    <div className="mt-1 text-sm font-semibold">
                      {simulationStep > 0
                        ? "Simulation"
                        : "Monitoring"}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Emergency simulation banner */}
            {simulationStep > 0 && (
              <EmergencyAlert
                step={simulationStep}
                onReset={() => setSimulationStep(0)}
              />
            )}

            {/* Stats */}
            <section className="mb-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
              <StatCard
                title="Critical Zones"
                value={criticalZones}
                subtitle={
                  criticalZones > 1
                    ? "+1 detected"
                    : "Monitoring"
                }
                icon={ShieldAlert}
                danger={criticalZones > 1}
              />

              <StatCard
                title="People Affected"
                value={affectedPeople}
                subtitle={
                  simulationStep >= 2
                    ? "+31 in last update"
                    : "Live estimate"
                }
                icon={Users}
              />

              <StatCard
                title="Active Teams"
                value={
                  initialTeams.length -
                  dispatchedTeams.length +
                  dispatchedTeams.length
                }
                subtitle={`${dispatchedTeams.length} dispatched`}
                icon={Truck}
              />

              <StatCard
                title="Avg Response"
                value={responseTime}
                subtitle={
                  simulationStep >= 4
                    ? "Optimized"
                    : "Current estimate"
                }
                icon={Clock3}
              />
            </section>

            {/* Main command center */}
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
              <div className="min-w-0 xl:col-span-2">
                <RiskMap
                  incidents={incidents}
                  simulationStep={simulationStep}
                  dispatchedTeams={dispatchedTeams}
                />
              </div>

              <div className="min-w-0">
                <PriorityQueue
                  incidents={sortedIncidents}
                  teams={initialTeams}
                  dispatchedTeams={dispatchedTeams}
                  onDispatch={handleDispatch}
                />
              </div>
            </section>

            {/* Lower intelligence panels */}
            <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
              <CitizenReports />

              <ResourceDeployment
                teams={initialTeams}
                dispatchedTeams={dispatchedTeams}
              />
            </section>

            {/* AI section */}
            <section className="mt-5">
              <AIInsights
                incidents={sortedIncidents}
                simulationStep={simulationStep}
              />
            </section>

            {/* Bottom system strip */}
            <footer className="mt-8 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-[11px] text-slate-600 sm:flex-row">
              <div className="flex items-center gap-2">
                <BrainCircuit size={14} />
                RESQGRID AI • DECISION SUPPORT SYSTEM
              </div>

              <div>
                Prototype Environment • Simulation Data
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[100] w-[calc(100%-40px)] max-w-sm animate-[slideIn_.35s_ease-out]">
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-[#0b1514]/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="rounded-xl bg-emerald-400/10 p-2 text-emerald-400">
              <Truck size={18} />
            </div>

            <div>
              <div className="text-sm font-bold text-white">
                Dispatch Confirmed
              </div>

              <div className="mt-1 text-xs text-slate-400">
                {toast.message}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EmergencyAlert({ step, onReset }) {
  const alerts = {
    1: {
      title: "HEAVY RAINFALL DETECTED",
      message:
        "Multiple zones showing abnormal rainfall activity.",
    },
    2: {
      title: "ACCESSIBILITY DETERIORATING",
      message:
        "Road accessibility has decreased in affected zones.",
    },
    3: {
      title: "CIVILIAN RISK ESCALATING",
      message:
        "Citizen reports indicate increasing emergency exposure.",
    },
    4: {
      title: "CRITICAL RESPONSE REQUIRED",
      message:
        "AI engine has identified high-priority incidents requiring immediate deployment.",
    },
  };

  const current = alerts[step] || alerts[1];

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-red-500/25 bg-red-500/[0.06]">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="animate-pulse rounded-xl bg-red-500/10 p-2.5 text-red-400">
            <Siren size={20} />
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-wider text-red-400">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              LIVE SIMULATION EVENT
            </div>

            <h2 className="mt-1 text-sm font-bold text-white">
              {current.title}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              {current.message}
            </p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          Reset Simulation
        </button>
      </div>

      <div className="flex gap-1 px-4 pb-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              item <= step
                ? "bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.5)]"
                : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}