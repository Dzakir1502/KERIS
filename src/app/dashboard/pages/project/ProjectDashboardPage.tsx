import { useEffect, useState } from "react"
import { Monitor, ClipboardList, CheckCircle2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { projectAPI } from "@/services/projectAPI"

const projects = [
  {
    level: "01",
    status: "ACTIVE",
    statusColor: "bg-green-100 text-green-700",
    tags: ["PYTHON", "AI", "DATA"],
    title: "Membangun Pipeline Analisis Data Performa Siswa",
    description:
      "Bersihkan dataset riwayat belajar siswa yang kotor, bangun pipeline otomatis, dan visualisasikan faktor kelulusan menggunakan Python standar industri.",
    locked: false,
    missionRoute: "/dashboard/project/mission/1",
  },
  {
    level: "02",
    status: "ACTIVE",
    statusColor: "bg-green-100 text-green-700",
    tags: ["PYTHON", "ML", "SCIKIT-LEARN"],
    title: "Membangun Pipeline Machine Learning Prediksi Kelulusan Siswa",
    description:
      "Latih model AI untuk mengenali pola belajar siswa dan memprediksi apakah siswa akan lulus atau gagal secara otomatis menggunakan Scikit-learn.",
    locked: false,
    missionRoute: "/dashboard/project/mission/2",
  },
  {
    level: "03",
    status: "LOCKED",
    statusColor: "bg-slate-100 text-slate-500",
    tags: ["NODE.JS", "MONGODB"],
    title: "Full-Stack E-Commerce Platform",
    description:
      "Membangun platform belanja online lengkap dengan fitur keranjang, otentikasi user, dan sistem pembayaran terintegrasi.",
    locked: true,
    missionRoute: null,
  },
]

const TOTAL_PROJECTS = projects.length

export default function ProjectDashboardPage() {
  const navigate = useNavigate()
  const [approved, setApproved] = useState(0)
  const [submitted, setSubmitted] = useState(0)
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    projectAPI.getDashboardStats()
      .then((stats) => {
        setApproved(stats.projectsApproved)
        setSubmitted(stats.projectsSubmitted)
      })
      .catch(() => {})
      .finally(() => setLoadingStats(false))
  }, [])

  const progress = TOTAL_PROJECTS > 0 ? Math.round((approved / TOTAL_PROJECTS) * 100) : 0

  const stats = [
    {
      label: "Current Stream",
      value: "AI Development",
      icon: <Monitor className="h-6 w-6 text-blue-600" />,
      iconBg: "bg-blue-50",
    },
    {
      label: "Project Tersedia",
      value: `${TOTAL_PROJECTS} Projects`,
      icon: <ClipboardList className="h-6 w-6 text-orange-500" />,
      iconBg: "bg-orange-50",
    },
    {
      label: "Project Selesai",
      value: loadingStats ? "—" : `${String(approved).padStart(2, "0")} Projects`,
      icon: <CheckCircle2 className="h-6 w-6 text-green-500" />,
      iconBg: "bg-green-50",
    },
  ]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Project Overview</h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back, continue your learning journey to master AI development.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${s.iconBg}`}>
              {s.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">{s.label}</p>
              <p className="mt-1 text-lg font-bold text-slate-900">{s.value}</p>
            </div>
          </div>
        ))}

        {/* Overall Progress — circular */}
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="24" fill="none" stroke="#f1f5f9" strokeWidth="5" />
              <circle
                cx="28" cy="28" r="24" fill="none"
                stroke="#f97316" strokeWidth="5"
                strokeDasharray={`${2 * Math.PI * 24}`}
                strokeDashoffset={`${2 * Math.PI * 24 * (1 - progress / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="relative text-xs font-bold text-slate-900">
              {loadingStats ? "—" : `${progress}%`}
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Overall Progress</p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              {loadingStats ? "Loading..." : `${progress}% Done`}
            </p>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

        {/* Section header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Learning Path: Level Up</h2>
          <button className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition">
            View Curriculum
          </button>
        </div>

        {/* Project cards */}
        <div className="divide-y divide-slate-100">
          {projects.map((project) => (
            <div key={project.level} className="flex items-stretch gap-0">
              {/* Left level number with orange accent on active */}
              <div className={`flex w-16 shrink-0 flex-col items-center justify-center py-6 border-r border-slate-100 ${!project.locked ? "border-l-4 border-l-orange-500" : "border-l-4 border-l-transparent"}`}>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Level</span>
                <span className={`text-2xl font-black ${project.locked ? "text-slate-300" : "text-slate-900"}`}>
                  {project.level}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 items-center justify-between gap-4 px-6 py-5">
                <div className="flex-1 min-w-0">
                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] ${project.statusColor}`}>
                      {project.status}
                    </span>
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className={`text-base font-bold ${project.locked ? "text-slate-400" : "text-slate-900"}`}>
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Button */}
                <div className="shrink-0">
                  <button
                    disabled={project.locked}
                    onClick={() => project.missionRoute && navigate(project.missionRoute)}
                    className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
                      project.locked
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-200"
                    }`}
                  >
                    Mulai
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
