import { Clock, MonitorPlay, CheckCircle2, Monitor, BarChart2, Pencil, Smartphone, Eye, Lock, PenLine, Sparkles, Square } from "lucide-react"

const stats = [
  {
    label: "Pending",
    value: "04",
    icon: <Clock className="h-6 w-6 text-orange-400" />,
    iconBg: "bg-orange-50",
    valueColor: "text-orange-500",
  },
  {
    label: "In Review",
    value: "12",
    icon: <MonitorPlay className="h-6 w-6 text-blue-400" />,
    iconBg: "bg-blue-50",
    valueColor: "text-blue-600",
  },
  {
    label: "Validated",
    value: "38",
    icon: <CheckCircle2 className="h-6 w-6 text-slate-500" />,
    iconBg: "bg-slate-100",
    valueColor: "text-slate-900",
  },
]

const projects = [
  {
    icon: <Monitor className="h-5 w-5 text-blue-600" />,
    iconBg: "bg-blue-50",
    title: "Building Landing Page UMKM Lokal",
    subtitle: "Web Development • Q3 Batch",
    date: "Oct 12, 2023",
    status: "Validated",
    statusStyle: "bg-green-100 text-green-700",
    reviewIcon: <Sparkles className="h-3.5 w-3.5 text-slate-400 shrink-0" />,
    review: '"Exemplary semantic structure...',
    actionIcon: <Eye className="h-5 w-5" />,
    actionStyle: "text-blue-500 hover:text-blue-700",
  },
  {
    icon: <BarChart2 className="h-5 w-5 text-orange-500" />,
    iconBg: "bg-orange-50",
    title: "E-Commerce Data Analysis",
    subtitle: "Data Science • Final Assignment",
    date: "Nov 05, 2023",
    status: "In Review",
    statusStyle: "bg-blue-100 text-blue-700",
    reviewIcon: <Square className="h-3.5 w-3.5 text-slate-300 shrink-0" />,
    review: "Awaiting Senior Architect review",
    actionIcon: <Lock className="h-5 w-5" />,
    actionStyle: "text-slate-300 cursor-not-allowed",
  },
  {
    icon: <Pencil className="h-5 w-5 text-orange-500" />,
    iconBg: "bg-orange-50",
    title: "Atelier Brand Identity Kit",
    subtitle: "Visual Design • Branding 101",
    date: "Nov 18, 2023",
    status: "Pending",
    statusStyle: "bg-orange-100 text-orange-600",
    reviewIcon: null,
    review: "Queued for initial validation",
    actionIcon: <PenLine className="h-5 w-5" />,
    actionStyle: "text-blue-500 hover:text-blue-700",
  },
  {
    icon: <Smartphone className="h-5 w-5 text-blue-600" />,
    iconBg: "bg-blue-50",
    title: "HealthTech Mobile Prototype",
    subtitle: "UX Design • Capstone",
    date: "Sept 22, 2023",
    status: "Validated",
    statusStyle: "bg-green-100 text-green-700",
    reviewIcon: <Sparkles className="h-3.5 w-3.5 text-slate-400 shrink-0" />,
    review: '"Outstanding user journey ma...',
    actionIcon: <Eye className="h-5 w-5" />,
    actionStyle: "text-blue-500 hover:text-blue-700",
  },
]

export default function ProjectStatusPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Project Status</h1>
        <p className="mt-1 text-sm text-slate-500">
          Track and manage your intellectual contributions within the Atelier.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">{s.label}</p>
              <p className={`mt-2 text-4xl font-black ${s.valueColor}`}>{s.value}</p>
            </div>
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${s.iconBg}`}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_2fr_auto] gap-4 px-6 py-3 border-b border-slate-100 bg-slate-50">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Project Details</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Submitted Date</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Status</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Review Results</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Actions</p>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100">
          {projects.map((p) => (
            <div
              key={p.title}
              className="grid grid-cols-[2fr_1fr_1fr_2fr_auto] gap-4 items-center px-6 py-4 hover:bg-slate-50 transition-colors"
            >
              {/* Project Details */}
              <div className="flex items-center gap-3 min-w-0">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${p.iconBg}`}>
                  {p.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{p.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{p.subtitle}</p>
                </div>
              </div>

              {/* Submitted Date */}
              <p className="text-sm text-slate-500">{p.date}</p>

              {/* Status badge */}
              <div>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${p.statusStyle}`}>
                  {p.status}
                </span>
              </div>

              {/* Review Results */}
              <div className="flex items-center gap-1.5 min-w-0">
                {p.reviewIcon}
                <p className="text-sm text-slate-400 truncate">{p.review}</p>
              </div>

              {/* Actions */}
              <button className={`transition ${p.actionStyle}`}>
                {p.actionIcon}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
