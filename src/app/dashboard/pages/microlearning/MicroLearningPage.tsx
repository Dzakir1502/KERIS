import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Clock, BarChart2, Trophy, Zap } from "lucide-react"

const modules = [
  {
    id: 1,
    abbr: "HTML",
    abbrBg: "bg-blue-100 text-blue-700",
    title: "HTML Basic",
    tag: "FRONTEND",
    tagColor: "bg-blue-100 text-blue-600",
    duration: "30 min",
    level: "Beginner",
    levelColor: "text-slate-500",
  },
  {
    id: 2,
    abbr: "CSS",
    abbrBg: "bg-blue-100 text-blue-700",
    title: "CSS Basic",
    tag: "FRONTEND",
    tagColor: "bg-blue-100 text-blue-600",
    duration: "30 min",
    level: "Beginner",
    levelColor: "text-slate-500",
  },
  {
    id: 3,
    abbr: "JS",
    abbrBg: "bg-yellow-100 text-yellow-700",
    title: "Javascript Basic",
    tag: "FRONTEND",
    tagColor: "bg-blue-100 text-blue-600",
    duration: "30 min",
    level: "Beginner",
    levelColor: "text-slate-500",
  },
  {
    id: 4,
    abbr: "GIT",
    abbrBg: "bg-orange-100 text-orange-700",
    title: "Git/Github",
    tag: "VCS",
    tagColor: "bg-orange-100 text-orange-600",
    duration: "20 min",
    level: "Intermediate",
    levelColor: "text-orange-500",
  },
  {
    id: 5,
    abbr: "JS+",
    abbrBg: "bg-red-100 text-red-700",
    title: "Javascript Intermediate",
    tag: "BACKEND",
    tagColor: "bg-red-100 text-red-600",
    duration: "30 min",
    level: "Advanced",
    levelColor: "text-red-500",
  },
]

const FILTERS = ["Semua Kategori", "Terbaru"]

export default function MicroLearningPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState("Semua Kategori")

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="space-y-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-teal-600 mb-2">
            Technical Mastery Path
          </p>
          <h1 className="text-4xl font-black text-slate-900 leading-tight">
            Micro Learning Module
          </h1>
          <p className="mt-2 text-sm text-slate-500 max-w-lg leading-relaxed">
            Elevate your technical proficiency with bite-sized, high-impact learning sessions designed for the modern architect.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Selesai</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-slate-900">10</span>
              <span className="text-sm text-slate-400 font-medium">Modul</span>
            </div>
          </div>
          <div className="rounded-2xl bg-orange-50 border border-orange-100 px-6 py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-400">Tersedia</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-orange-500">4</span>
              <span className="text-sm text-orange-400 font-medium">Baru</span>
            </div>
          </div>
        </div>
      </div>

      {/* Kurikulum Modul */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Section header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Kurikulum Modul</h2>
          <div className="flex rounded-xl border border-slate-200 overflow-hidden text-xs font-semibold">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 transition ${
                  activeFilter === f
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Module list */}
        <div className="divide-y divide-slate-100">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition group"
            >
              {/* Icon */}
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xs font-black ${mod.abbrBg}`}>
                {mod.abbr}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-bold text-slate-900">{mod.title}</p>
                  <span className={`rounded-sm px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] ${mod.tagColor}`}>
                    {mod.tag}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {mod.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart2 className="h-3.5 w-3.5" />
                    <span className={mod.levelColor}>{mod.level}</span>
                  </span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate(`/dashboard/micro-learning/${mod.id}`)}
                className="shrink-0 rounded-xl bg-blue-900 px-5 py-2 text-sm font-bold text-white hover:bg-blue-800 transition opacity-0 group-hover:opacity-100 sm:opacity-100"
              >
                Mulai
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Flash sale + Weekly challenge */}
      <div className="grid gap-4 sm:grid-cols-[1fr_260px]">

        {/* Flash sale card */}
        <div className="rounded-2xl bg-blue-900 p-7 space-y-4 relative overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #38bdf8 0%, transparent 55%)" }}
          />
          <span className="relative inline-block rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Flash Sale Learning
          </span>
          <h3 className="relative text-2xl font-black text-white leading-snug">
            Mastering Cloud Architecture
          </h3>
          <p className="relative text-sm text-blue-200 leading-relaxed max-w-sm">
            Join the elite rank of cloud experts with our intensive advanced module. Limited seats available for live sessions.
          </p>
          <button className="relative rounded-xl border-2 border-white px-6 py-2.5 text-sm font-bold text-white hover:bg-white hover:text-blue-900 transition">
            Explore Curriculums
          </button>
        </div>

        {/* Weekly Challenge card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col items-center text-center space-y-4">
          {/* Trophy icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
            <Trophy className="h-8 w-8 text-orange-500" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">Weekly Challenge</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Complete 3 modules this week to unlock the 'Neural Navigator' badge.
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full space-y-2">
            <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-orange-500 transition-all"
                style={{ width: "66.6%" }}
              />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              2/3 Completed
            </p>
          </div>

          <button className="w-full rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-600 transition flex items-center justify-center gap-2">
            <Zap className="h-4 w-4" />
            Lanjutkan Challenge
          </button>
        </div>
      </div>
    </div>
  )
}
