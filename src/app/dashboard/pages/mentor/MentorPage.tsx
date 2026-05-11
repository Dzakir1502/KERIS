import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Pencil, AlertTriangle, Clock, History, UploadCloud } from "lucide-react"

const STATUS_FILTERS = ["All Projects", "Pending", "In-Review", "Validated", "Needs Revision"]

const projects = [
  {
    id: 1,
    track: "Web Development",
    trackColor: "bg-blue-100 text-blue-700",
    status: "IN-REVIEW",
    statusColor: "bg-orange-100 text-orange-600",
    title: "Sustainable Urban Shell",
    description: "Integrating modular housing with vertical gardening systems for high-...",
    avatars: ["MK", "AR"],
    extraAvatars: 2,
    cta: { label: "View Details →", style: "text-blue-600 hover:text-blue-700", icon: null },
    warning: false,
  },
  {
    id: 2,
    track: "UI/UX Design",
    trackColor: "bg-purple-100 text-purple-700",
    status: "VALIDATED",
    statusColor: "bg-green-100 text-green-700",
    title: "E-Health Interface",
    description: "Patient-centric dashboard focusing on accessibility and rapid data...",
    avatars: ["SC"],
    extraAvatars: 0,
    cta: { label: "View Critique →", style: "text-blue-600 hover:text-blue-700", icon: null },
    warning: false,
  },
  {
    id: 3,
    track: "Architectural Rendering",
    trackColor: "bg-slate-100 text-slate-600",
    status: "NEEDS REVISION",
    statusColor: "bg-red-100 text-red-600",
    title: "Brutalist Revival Loft",
    description: "Reimagining raw concrete aesthetics for luxury residential interiors in...",
    avatars: [],
    extraAvatars: 0,
    cta: { label: "Edit Submission", style: "text-red-500 hover:text-red-600 font-semibold", icon: <Pencil className="h-3.5 w-3.5" /> },
    warning: true,
  },
  {
    id: 4,
    track: "Full Stack",
    trackColor: "bg-teal-100 text-teal-700",
    status: "PENDING",
    statusColor: "bg-yellow-100 text-yellow-700",
    title: "Asset Management API",
    description: "Secure backend infrastructure for real-time tracking of architectural sit...",
    avatars: [],
    extraAvatars: 0,
    awaitingMentor: true,
    cta: { label: "View Details →", style: "text-blue-600 hover:text-blue-700", icon: null },
    warning: false,
  },
]

const activities = [
  {
    when: "TODAY, 10:45 AM",
    dot: "bg-blue-500",
    title: "Mentor Sarah Chen left 4 comments on 'Sustainable Urban Shell'",
    description: "Focused on material efficiency and structural integrity in the podium section.",
  },
  {
    when: "YESTERDAY, 02:20 PM",
    dot: "bg-green-500",
    title: "Project 'E-Health Interface' was Validated",
    description: "Passed all accessibility and interaction criteria. High-quality execution.",
  },
  {
    when: "3 DAYS AGO",
    dot: "bg-slate-300",
    title: "New project 'Brutalist Revival Loft' submitted",
    description: "Pending initial mentor assignment for the Architectural Rendering track.",
  },
]

export default function MentorPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState("All Projects")

  const filtered = activeFilter === "All Projects"
    ? projects
    : projects.filter((p) =>
        p.status.toLowerCase().replace(" ", "-") === activeFilter.toLowerCase().replace(" ", "-") ||
        p.status.toLowerCase() === activeFilter.toLowerCase()
      )

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Mentor Review Portal</h1>
          <p className="mt-1 text-sm text-slate-500 max-w-lg">
            Track your architectural journey. Submit projects for expert critique and monitor your progress across different specializations.
          </p>
        </div>
        {/* Stats */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center shadow-sm">
            <p className="text-2xl font-black text-slate-900">12</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Submitted</p>
          </div>
          <div className="rounded-2xl bg-blue-900 px-5 py-3 text-center shadow-sm">
            <p className="text-2xl font-black text-white">04</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">In-Review</p>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400">Filter by status:</span>
        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              activeFilter === f
                ? "bg-blue-900 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Submit new project CTA */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-blue-300 bg-blue-50 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
            <UploadCloud className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-blue-900">Punya project baru?</p>
            <p className="text-xs text-blue-500">Submit project untuk mulai direview oleh mentor.</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/dashboard/project/submission")}
          className="shrink-0 flex items-center gap-1.5 rounded-xl bg-blue-900 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800 transition"
        >
          Submit Project
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Track + Status badges */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className={`rounded-sm px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] ${project.trackColor}`}>
                {project.track}
              </span>
              <span className={`rounded-sm px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] ${project.statusColor}`}>
                {project.status}
              </span>
            </div>

            {/* Title + description */}
            <h3 className="text-base font-bold text-slate-900">{project.title}</h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed flex-1">{project.description}</p>

            {/* Bottom row */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {project.warning && (
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                )}
                {project.avatars.length > 0 && (
                  <div className="flex -space-x-2">
                    {project.avatars.map((a) => (
                      <div key={a} className="h-7 w-7 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white">
                        {a}
                      </div>
                    ))}
                    {project.extraAvatars > 0 && (
                      <div className="h-7 w-7 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[9px] font-bold text-slate-600">
                        +{project.extraAvatars}
                      </div>
                    )}
                  </div>
                )}
                {project.awaitingMentor && (
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    Awaiting Mentor
                  </span>
                )}
              </div>
              <button
                onClick={() =>
                  project.status === "NEEDS REVISION"
                    ? navigate(`/dashboard/mentor/${project.id}/edit`)
                    : navigate(`/dashboard/mentor/${project.id}`)
                }
                className={`flex items-center gap-1.5 text-sm transition ${project.cta.style}`}
              >
                {project.cta.icon}
                {project.cta.label}
              </button>
            </div>
          </div>
        ))}

        {/* Mentor Recommendation featured card */}
        <div className="sm:col-span-2 rounded-2xl bg-blue-900 p-6 shadow-sm flex gap-4 items-center">
          <div className="flex-1 space-y-3">
            <span className="inline-block rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
              Mentor Recommendation
            </span>
            <h3 className="text-xl font-black text-white leading-snug">
              Professional Portfolio Review: Senior Architect Track
            </h3>
            <p className="text-sm text-blue-200 leading-relaxed">
              Your recent projects show a strong mastery of structural form. We recommend submitting your 'Urban Shell' to the Global Design Challenge.
            </p>
            <button
              onClick={() => navigate("/dashboard/mentor/enroll")}
              className="rounded-xl border-2 border-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-white hover:text-blue-900 transition"
            >
              Enroll In Advanced Track
            </button>
          </div>
          {/* 3D orb placeholder */}
          <div className="hidden sm:flex h-36 w-36 shrink-0 items-center justify-center rounded-2xl bg-blue-800 overflow-hidden">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-900 shadow-2xl shadow-cyan-500/30 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-300 to-blue-600 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-slate-400" />
          <h2 className="text-base font-bold text-slate-900">Recent Activity</h2>
        </div>

        <div className="space-y-0">
          {activities.map((act, i) => (
            <div key={i} className="flex gap-4">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className={`h-3 w-3 rounded-full mt-1 shrink-0 ${act.dot}`} />
                {i < activities.length - 1 && (
                  <div className="w-px flex-1 bg-slate-100 my-1" />
                )}
              </div>
              {/* Content */}
              <div className="pb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">{act.when}</p>
                <p className="text-sm font-semibold text-slate-900">{act.title}</p>
                <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">{act.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
