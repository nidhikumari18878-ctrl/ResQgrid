import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageSquareWarning,
  Radio,
  Users,
} from "lucide-react";

import { citizenReports } from "../data/simulationData";

export default function CitizenReports() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#080d16]">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-400/10">
            <MessageSquareWarning
              size={17}
              className="text-purple-300"
            />
          </div>

          <div>
            <div className="text-xs font-bold text-white">
              Citizen Reports
            </div>

            <div className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-600">
              Crowdsourced emergency signals
            </div>
          </div>

        </div>

        <div className="flex items-center gap-2 rounded-lg border border-emerald-400/10 bg-emerald-400/5 px-2.5 py-1.5">

          <Radio
            size={11}
            className="text-emerald-400"
          />

          <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-400">
            Live
          </span>

        </div>

      </div>


      {/* REPORT LIST */}
      <div className="p-3">

        <div className="space-y-2">

          {citizenReports.map((report, index) => (
            <ReportItem
              key={report.id}
              report={report}
              index={index}
            />
          ))}

        </div>


        {/* REPORT SUMMARY */}
        <div className="mt-3 grid grid-cols-3 gap-2">

          <Summary
            icon={MessageSquareWarning}
            value="24"
            label="Reports"
          />

          <Summary
            icon={Users}
            value="07"
            label="Verified"
          />

          <Summary
            icon={AlertTriangle}
            value="03"
            label="Critical"
          />

        </div>

      </div>
    </div>
  );
}


function ReportItem({ report, index }) {
  const isCritical = report.severity === "CRITICAL";

  const isHigh = report.severity === "HIGH";

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border p-3 transition-all duration-300 ${
        isCritical
          ? "border-red-400/20 bg-red-400/[0.035] hover:bg-red-400/[0.055]"
          : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.035]"
      }`}
    >

      {/* Severity indicator */}
      <div
        className={`absolute left-0 top-0 h-full w-0.5 ${
          isCritical
            ? "bg-red-400"
            : isHigh
            ? "bg-orange-400"
            : "bg-yellow-400"
        }`}
      />

      <div className="flex items-start gap-3">

        {/* Icon */}
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            isCritical
              ? "bg-red-400/10 text-red-400"
              : isHigh
              ? "bg-orange-400/10 text-orange-400"
              : "bg-yellow-400/10 text-yellow-400"
          }`}
        >
          {report.type === "People Trapped" ? (
            <Users size={16} />
          ) : report.type === "Fire Smoke" ? (
            <AlertTriangle size={16} />
          ) : (
            <MapPin size={16} />
          )}
        </div>


        {/* Content */}
        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-2">

            <div>
              <div className="text-[11px] font-bold text-white">
                {report.type}
              </div>

              <div className="mt-1 flex items-center gap-1.5 text-[9px] text-slate-500">
                <MapPin size={9} />
                {report.location}
              </div>
            </div>

            <span
              className={`shrink-0 rounded-md px-1.5 py-1 text-[7px] font-black uppercase tracking-wider ${
                isCritical
                  ? "bg-red-400/10 text-red-400"
                  : isHigh
                  ? "bg-orange-400/10 text-orange-400"
                  : "bg-yellow-400/10 text-yellow-400"
              }`}
            >
              {report.severity}
            </span>

          </div>


          {/* Meta */}
          <div className="mt-3 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <span className="flex items-center gap-1 text-[8px] text-slate-600">
                <Clock3 size={9} />
                {report.time}
              </span>

              <span className="flex items-center gap-1 text-[8px] text-emerald-400">
                <CheckCircle2 size={9} />
                Verified
              </span>

            </div>

            <span className="font-mono text-[8px] text-slate-700">
              {report.id}
            </span>

          </div>


          {/* Evidence indicator */}
          <div className="mt-2.5 flex items-center gap-2">

            <div className="flex items-center gap-1.5 rounded-md bg-white/[0.025] px-2 py-1">

              <Camera
                size={9}
                className="text-slate-600"
              />

              <span className="text-[7px] text-slate-600">
                Visual evidence
              </span>

            </div>

            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/5">

              <div
                className={`h-full rounded-full ${
                  isCritical
                    ? "w-[92%] bg-red-400/60"
                    : isHigh
                    ? "w-[76%] bg-orange-400/60"
                    : "w-[61%] bg-yellow-400/60"
                }`}
              />

            </div>

            <span className="text-[7px] text-slate-600">
              confidence
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}


function Summary({ icon: Icon, value, label }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">

      <div className="flex items-center gap-1.5">

        <Icon
          size={11}
          className="text-slate-600"
        />

        <span className="text-[8px] uppercase tracking-wider text-slate-600">
          {label}
        </span>

      </div>

      <div className="mt-1 text-sm font-black text-slate-300">
        {value}
      </div>

    </div>
  );
}