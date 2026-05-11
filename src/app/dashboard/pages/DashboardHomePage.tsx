import { Bell } from "lucide-react"

export default function DashboardHomePage() {
  return (
    <>
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Beranda</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-900">
              Selamat datang kembali, Fahran!
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Kecepatan belajarmu meningkat 12% minggu ini. Kamu tinggal 3 pencapaian lagi untuk menyelesaikan tujuan utamamu.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">
            <Bell className="h-4 w-4" /> Notifikasi
          </button>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_0.8fr]">
          <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-orange-700">
                  Program Aktif
                </span>
                <h2 className="mt-5 text-2xl font-semibold">Web Development</h2>
                <p className="mt-2 text-sm text-slate-300">Mastering Modern Frontend Frameworks</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-center">
                <p className="text-sm text-slate-400">Program Progress</p>
                <p className="mt-2 text-4xl font-semibold">72%</p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-900/80 p-5">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Modul 08: Server-Side Rendering</span>
                <span>Sisa 2,4 jam</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[72%] rounded-full bg-orange-500" />
              </div>
            </div>
          </div>

          <div className="rounded-[32px] bg-slate-950 p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Skill Progress</h3>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                View Full Report
              </span>
            </div>
            <div className="mt-6 space-y-5">
              {[
                { label: "Logic & Algorithms", value: 88 },
                { label: "UI/UX Design", value: 64 },
                { label: "System Architecture", value: 42 },
              ].map((skill) => (
                <div key={skill.label}>
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>{skill.label}</span>
                    <span>{skill.value}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${skill.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
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
            <p className="font-semibold">Tips:</p>
            <p className="mt-2">Menyelesaikan API Quest hari ini akan membuka lencana "Full-Stack Specialist".</p>
          </div>
        </div>

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
                  {project.members.map((member) => (
                    <span key={member} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
