import { useNavigate } from "react-router-dom"

export default function ProfilePage() {
  const navigate = useNavigate()
  return (
    <div className="space-y-6">
      <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl">
        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr] xl:items-center">
          <div className="flex flex-col gap-6 rounded-[32px] bg-slate-900/40 p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-[28px] border border-slate-800 bg-slate-900 text-4xl font-semibold text-white">
                F
                <span className="absolute -right-2 -bottom-2 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white shadow-lg shadow-orange-500/20">
                  12
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Farhan Kebab</p>
                <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-white">Senior Track</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">Aspiring Full-Stack Developer • Learning Web Signature Track</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Badges</p>
                <p className="mt-2 text-lg font-semibold text-white">12</p>
              </div>
              <div className="rounded-3xl bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Streak</p>
                <p className="mt-2 text-lg font-semibold text-white">24 Days</p>
              </div>
              <div className="rounded-3xl bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Courses</p>
                <p className="mt-2 text-lg font-semibold text-white">4 Finished</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button onClick={() => navigate("/dashboard/settings")} className="rounded-3xl bg-orange-500 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600">Edit Profil</button>
            <button className="rounded-3xl border border-slate-700 bg-slate-900/70 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800">Bagikan Profil</button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Learning Progress</p>
              <p className="mt-2 text-sm text-slate-500">Roadmap saat ini • Web Development - React.js</p>
            </div>
            <div className="rounded-3xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900">75%</div>
          </div>

          <div className="rounded-[28px] bg-slate-100 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Progress</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">Web Development - React.js</p>
              </div>
              <div className="text-sm text-slate-500">15/20 Lessons • 3 Pending Quizzes</div>
            </div>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-[75%] rounded-full bg-orange-500" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "HTML & CSS", value: "80%" },
              { label: "JavaScript Foundation", value: "60%" },
              { label: "React Components", value: "45%" },
              { label: "Git & Collaboration", value: "95%" },
            ].map((item) => (
              <div key={item.label} className="rounded-[28px] bg-slate-100 p-5">
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">Badges & Achievements</p>
              <button className="text-sm font-semibold text-blue-600">Lihat semua</button>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Web Beginner", status: "Unlocked", active: true },
                { label: "Web Signature", status: "Unlocked", active: true },
                { label: "React Pro", status: "Locked", active: false },
                { label: "Project Master", status: "Locked", active: false },
              ].map((badge) => (
                <div key={badge.label} className={`rounded-3xl p-4 shadow-sm ${badge.active ? "bg-white" : "bg-slate-100"}`}>
                  <p className={`text-sm font-semibold ${badge.active ? "text-slate-900" : "text-slate-500"}`}>{badge.label}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-400">{badge.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">Informasi Pribadi</p>
              <span className="text-xs uppercase tracking-[0.22em] text-slate-400">Profil</span>
            </div>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              {[
                { label: "Alamat Email", value: "farhan.kebab@enterprise.com" },
                { label: "Lokasi", value: "Jakarta, Indonesia" },
                { label: "Tanggal Bergabung", value: "12 Oktober 2023" },
                { label: "Project Aktif", value: "3 Misi Berjalan" },
              ].map((info) => (
                <div key={info.label} className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{info.label}</p>
                  <p className="mt-2 font-semibold text-slate-900">{info.value}</p>
                </div>
              ))}
            </div>
            <button onClick={() => navigate("/dashboard/settings")} className="mt-6 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">Kelola Akun</button>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Activity Overview</p>
            <div className="mt-6 grid gap-4">
              {[
                { label: "Hours Learned", value: "124" },
                { label: "Assignments", value: "32" },
                { label: "Avg Score", value: "8.9" },
                { label: "Mentorship", value: "12" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Lokasi</p>
            <div className="mt-5 h-52 rounded-[24px] bg-slate-900" />
            <p className="mt-4 text-sm text-slate-500">Jakarta HQ</p>
          </div>
        </div>
      </div>
    </div>
  )
}
