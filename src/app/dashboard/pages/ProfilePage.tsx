import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
<<<<<<< HEAD
import { Settings, Share2, Star, Zap, BookOpen, Award, User, Phone, Mail, CalendarDays } from "lucide-react"
=======
import { Settings, Share2, Star, Zap, BookOpen, Award, User, Mail, CalendarDays } from "lucide-react"
>>>>>>> 83631dfa5f7a04d89d0a219e8cc90189215aa9b3

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
          <p className="text-sm text-slate-400">Memuat profil...</p>
        </div>
      </div>
    )
  }

  // ── Guard: belum / tidak login ─────────────────────────────────────────────
  if (!user) {
    navigate("/login")
    return null
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  const initials = user.nama_lengkap
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const joinDate = new Date(user.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  // ── Static placeholder data (ganti dengan API call nanti) ──────────────────
  const stats = [
    { icon: <Zap className="h-4 w-4" />,      label: "Level",   value: user.level,  color: "text-orange-400" },
    { icon: <Star className="h-4 w-4" />,      label: "Points",  value: user.points, color: "text-yellow-400" },
    { icon: <BookOpen className="h-4 w-4" />,  label: "Courses", value: 4,           color: "text-blue-400"   },
    { icon: <Award className="h-4 w-4" />,     label: "Badges",  value: 2,           color: "text-purple-400" },
  ]

  const courses = [
    { label: "HTML & CSS",              pct: 80 },
    { label: "JavaScript Foundation",   pct: 60 },
    { label: "React Components",        pct: 45 },
    { label: "Git & Collaboration",     pct: 95 },
  ]

  const badges = [
    { label: "Web Beginner",    active: true  },
    { label: "Web Signature",   active: true  },
    { label: "React Pro",       active: false },
    { label: "Project Master",  active: false },
  ]

  const personalInfo = [
    { icon: <User  className="h-3.5 w-3.5" />, label: "Nama Lengkap", value: user.nama_lengkap },
    { icon: <Mail  className="h-3.5 w-3.5" />, label: "Email",        value: user.email        },
<<<<<<< HEAD
    { icon: <Phone className="h-3.5 w-3.5" />, label: "Nomor HP",     value: user.no_hp || "—" },
=======
>>>>>>> 83631dfa5f7a04d89d0a219e8cc90189215aa9b3
    { icon: <CalendarDays className="h-3.5 w-3.5" />, label: "Bergabung", value: joinDate      },
  ]

  const activityStats = [
    { label: "Total Points", value: user.points, dark: true  },
    { label: "Level",        value: user.level,  dark: false },
    { label: "Avg Score",    value: "—",         dark: false },
    { label: "Mentorship",   value: "—",         dark: false },
  ]

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-5">

      {/* ── Hero Card ──────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 shadow-xl">
        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)," +
              "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)",
          }}
        />
        {/* Soft glow behind avatar */}
        <div className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Avatar + info */}
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-2xl font-bold text-white shadow-lg shadow-orange-500/30">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.nama_lengkap}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                ) : (
                  initials
                )}
              </div>
              {/* Level badge */}
              <span className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-800 bg-slate-900 text-[11px] font-bold text-orange-400">
                {user.level}
              </span>
            </div>

            <div>
              <p className="mb-1 text-[11px] uppercase tracking-widest text-slate-500">{user.email}</p>
              <h1 className="text-2xl font-bold leading-tight text-white">{user.nama_lengkap}</h1>
              <p className="mt-1 text-sm text-slate-400">
                {user.bio ? user.bio : <span className="italic text-slate-600">Belum ada bio — tambahkan di Settings</span>}
              </p>
              <p className="mt-2 text-xs text-slate-600">Bergabung sejak {joinDate}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 sm:flex-col">
            <button
              onClick={() => navigate("/dashboard/settings")}
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:bg-orange-600 active:scale-95"
            >
              <Settings className="h-4 w-4" />
              Edit Profil
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 active:scale-95">
              <Share2 className="h-4 w-4" />
              Bagikan
            </button>
          </div>
        </div>

        {/* Stats row — data real dari user */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3 rounded-2xl bg-slate-900/60 px-4 py-3">
              <span className={s.color}>{s.icon}</span>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-slate-500">{s.label}</p>
                <p className="text-base font-bold text-white">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main grid ──────────────────────────────────────────────────────── */}
      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">

        {/* LEFT column */}
        <div className="space-y-5">

          {/* Learning Progress */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">Learning Progress</p>
                <p className="mt-0.5 text-sm text-slate-400">Web Development — React.js</p>
              </div>
              <span className="rounded-xl bg-orange-50 px-3 py-1 text-sm font-bold text-orange-500">75%</span>
            </div>

            {/* Overall track bar */}
            <div className="mb-5 rounded-2xl bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-700">React.js Track</p>
                <p className="text-xs text-slate-400">15/20 Lessons • 3 Pending Quizzes</p>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-orange-400 to-orange-500" />
              </div>
            </div>

            {/* Per-course bars */}
            <div className="space-y-3">
              {courses.map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <p className="w-48 shrink-0 truncate text-sm text-slate-600">{c.label}</p>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-slate-800 transition-all duration-500"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                  <p className="w-10 text-right text-xs font-semibold text-slate-500">{c.pct}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Badges & Achievements */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold text-slate-900">Badges & Achievements</p>
              <button className="text-xs font-semibold text-blue-600 hover:underline">Lihat semua</button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className={`rounded-2xl border p-4 text-center transition ${
                    b.active
                      ? "border-orange-100 bg-orange-50"
                      : "border-slate-100 bg-slate-50 opacity-50"
                  }`}
                >
                  <div
                    className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl ${
                      b.active ? "bg-orange-500" : "bg-slate-300"
                    }`}
                  >
                    <Award className={`h-5 w-5 ${b.active ? "text-white" : "text-slate-500"}`} />
                  </div>
                  <p className={`text-xs font-semibold ${b.active ? "text-slate-900" : "text-slate-400"}`}>
                    {b.label}
                  </p>
                  <p className={`mt-1 text-[10px] uppercase tracking-wide ${b.active ? "text-orange-500" : "text-slate-400"}`}>
                    {b.active ? "Unlocked" : "Locked"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT column */}
        <div className="space-y-5">

          {/* Informasi Pribadi — data real dari backend (user.nama_lengkap, user.email, user.no_hp, user.createdAt) */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold text-slate-900">Informasi Pribadi</p>
              <span className="text-[10px] uppercase tracking-widest text-slate-400">Profil</span>
            </div>
            <div className="space-y-2.5">
              {personalInfo.map((info) => (
                <div key={info.label} className="flex flex-col rounded-2xl bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    {info.icon}
                    <p className="text-[10px] uppercase tracking-widest">{info.label}</p>
                  </div>
                  <p className="mt-0.5 truncate text-sm font-semibold text-slate-800">{info.value}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/dashboard/settings")}
              className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-95"
            >
              Kelola Akun
            </button>
          </div>

          {/* Activity Overview — nilai real dari user.points & user.level */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="mb-4 font-semibold text-slate-900">Activity Overview</p>
            <div className="grid grid-cols-2 gap-3">
              {activityStats.map((s) => (
                <div
                  key={s.label}
                  className={`rounded-2xl p-4 ${s.dark ? "bg-slate-900" : "bg-slate-50"}`}
                >
                  <p className={`text-[10px] uppercase tracking-widest ${s.dark ? "text-slate-400" : "text-slate-400"}`}>
                    {s.label}
                  </p>
                  <p className={`mt-1 text-2xl font-bold ${s.dark ? "text-white" : "text-slate-900"}`}>
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}