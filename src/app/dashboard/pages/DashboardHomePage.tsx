import { Bell, Zap, Star } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function DashboardHomePage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
          <p className="text-sm text-slate-400">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    navigate("/login")
    return null
  }

  // Ambil nama depan untuk sapaan
  const firstName = user.nama_lengkap?.split(" ")[0] ?? "Pengguna"

  // Inisial avatar
  const initials = user.nama_lengkap
    ? user.nama_lengkap.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?"

  return (
    <>
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Beranda</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-900">
              Selamat datang kembali, {firstName}!
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              {user.bio
                ? user.bio
                : "Terus semangat belajar dan tingkatkan skillmu. Cek quest dan project aktifmu hari ini."}
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">
            <Bell className="h-4 w-4" /> Notifikasi
          </button>
        </div>

        {/* Stats & Info User */}
        <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_0.8fr]">
          {/* Card Profil Singkat */}
          <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
                  {initials}
                </div>
                <div>
                  <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-orange-700">
                    Member Aktif
                  </span>
                  <h2 className="mt-2 text-2xl font-semibold">{user.nama_lengkap}</h2>
                  <p className="mt-1 text-sm text-slate-300">{user.email}</p>
                  {user.no_hp && (
                    <p className="mt-1 text-sm text-slate-400">{user.no_hp}</p>
                  )}
                </div>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-center shrink-0">
                <p className="text-sm text-slate-400">Total Points</p>
                <p className="mt-2 text-4xl font-semibold">{user.points ?? 0}</p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-900/80 p-5">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Level kamu saat ini</span>
                <span>Terus tingkatkan!</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <Zap className="h-5 w-5 text-orange-400" />
                <div className="flex-1">
                  <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-orange-500 transition-all"
                      style={{ width: `${Math.min(((user.level ?? 1) / 10) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <span className="text-white font-semibold text-sm">Level {user.level ?? 1}</span>
              </div>
            </div>
          </div>

          {/* Card Statistik */}
          <div className="rounded-[32px] bg-slate-950 p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Statistik Kamu</h3>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="mt-6 space-y-5">
              {[
                { label: "Nama Lengkap", value: user.nama_lengkap },
                { label: "Points", value: String(user.points ?? 0) },
                { label: "Level", value: String(user.level ?? 1) },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>{item.label}</span>
                    <span className="font-semibold text-white truncate max-w-[120px] text-right">{item.value}</span>
                  </div>
                  <div className="mt-2 h-px bg-slate-800" />
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/dashboard/profile")}
              className="mt-6 w-full rounded-2xl border border-slate-700 bg-slate-800 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
            >
              Lihat Profil Lengkap
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Quest Aktif */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Quest Aktif</h3>
              <p className="mt-2 text-sm text-slate-600">Tugas yang siap untuk diselesaikan.</p>
            </div>
            <span className="inline-flex rounded-3xl bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
              2 aktif
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {[
              { title: "Dasar-dasar Keris Nusantara", description: "Tenggat dalam 4 jam", badge: "Urgent" },
              { title: "Debug Session: Auth Flow", description: "Open peer review", badge: "Review" },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                  </div>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                    {item.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl bg-orange-50 p-4 text-sm text-slate-700">
            <p className="font-semibold">Tips untuk {firstName}:</p>
            <p className="mt-2">Menyelesaikan API Quest hari ini akan membuka lencana "Full-Stack Specialist".</p>
          </div>
        </div>

        {/* Project Aktif */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Project Aktif</h3>
              <p className="mt-2 text-sm text-slate-600">Project yang sedang berjalan.</p>
            </div>
            <button className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
              Resume Project
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {[
              {
                title: "E-Commerce Landing Page",
                subtitle: "v2.4 - Layout refinement in progress",
                status: "Urgent",
                members: ["AM", "LS"],
              },
              {
                title: "Analytics Dashboard",
                subtitle: "v1.0 - Initial deployment",
                status: "Review",
                members: ["JS"],
              },
            ].map((project) => (
              <div key={project.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{project.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{project.subtitle}</p>
                  </div>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                    {project.status}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  {/* Tampilkan inisial member + inisial user yang login */}
                  {project.members.map((member) => (
                    <span key={member} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700">
                      {member}
                    </span>
                  ))}
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 font-semibold text-white text-xs" title={user.nama_lengkap}>
                    {initials}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}