import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft, CheckCircle2, Lock, Star,
  ChevronRight, Sparkles, Trophy, Zap
} from "lucide-react"

const tracks = [
  {
    id: "senior-architect",
    title: "Senior Architect Track",
    badge: "Most Popular",
    badgeColor: "bg-orange-500",
    icon: <Trophy className="h-6 w-6 text-white" />,
    iconBg: "bg-blue-900",
    description:
      "Kuasai desain arsitektur skala besar, structural form, dan presentasi portofolio level internasional.",
    duration: "12 Minggu",
    projects: 6,
    requirements: [
      { label: "Minimal 3 project selesai", met: true },
      { label: "Review score ≥ 4.0", met: true },
      { label: "Belum pernah enroll Advanced Track", met: true },
    ],
    unlocked: true,
  },
  {
    id: "full-stack-senior",
    title: "Full Stack Senior Track",
    badge: null,
    icon: <Zap className="h-6 w-6 text-white" />,
    iconBg: "bg-teal-700",
    description:
      "Dari arsitektur backend hingga frontend yang scalable — track ini mempersiapkan kamu menjadi engineer senior.",
    duration: "10 Minggu",
    projects: 5,
    requirements: [
      { label: "Minimal 3 project selesai", met: true },
      { label: "Review score ≥ 3.5", met: true },
      { label: "Full Stack project di portofolio", met: false },
    ],
    unlocked: false,
  },
  {
    id: "design-lead",
    title: "Design Lead Track",
    badge: null,
    icon: <Sparkles className="h-6 w-6 text-white" />,
    iconBg: "bg-purple-700",
    description:
      "Fokus pada UI/UX leadership, design system mastery, dan user research methodology tingkat lanjut.",
    duration: "8 Minggu",
    projects: 4,
    requirements: [
      { label: "Minimal 2 UI/UX project validated", met: true },
      { label: "Review score ≥ 4.2", met: false },
      { label: "Portofolio design system aktif", met: false },
    ],
    unlocked: false,
  },
]

const benefits = [
  "Akses ke mentor senior industri secara 1-on-1",
  "Project challenge eksklusif level senior",
  "Sertifikat kelulusan Advanced Track KERIS",
  "Priority review dan feedback turnaround 24 jam",
  "Direkomendasikan ke jaringan hiring partner KERIS",
]

export default function EnrollAdvancedTrackPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState("senior-architect")
  const [agreed, setAgreed] = useState(false)

  const selectedTrack = tracks.find((t) => t.id === selected)!

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate("/dashboard/mentor")}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400 hover:text-slate-900 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Mentor Review Portal
      </button>

      {/* Header */}
      <div className="rounded-2xl bg-blue-900 p-8 text-white space-y-3">
        <span className="inline-block rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
          Mentor Recommendation
        </span>
        <h1 className="text-3xl font-black leading-snug">
          Enroll in Advanced Track
        </h1>
        <p className="text-sm text-blue-200 max-w-xl leading-relaxed">
          Profilmu memenuhi syarat untuk program Advanced Track. Tingkatkan level kemampuanmu bersama mentor senior industri dan dapatkan pengakuan internasional.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        {/* ── Left ── */}
        <div className="space-y-4">

          {/* Track selection */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">Pilih Track</h2>
            <div className="space-y-3">
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => track.unlocked && setSelected(track.id)}
                  className={`w-full text-left rounded-2xl border-2 p-4 transition ${
                    selected === track.id
                      ? "border-blue-900 bg-blue-50"
                      : track.unlocked
                        ? "border-slate-200 hover:border-slate-300 bg-white"
                        : "border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${track.iconBg}`}>
                      {track.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-slate-900">{track.title}</p>
                        {track.badge && (
                          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold text-white ${track.badgeColor}`}>
                            {track.badge}
                          </span>
                        )}
                        {!track.unlocked && (
                          <Lock className="h-3.5 w-3.5 text-slate-400" />
                        )}
                      </div>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed">{track.description}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
                        <span>⏱ {track.duration}</span>
                        <span>📁 {track.projects} Projects</span>
                      </div>
                    </div>
                    {selected === track.id && (
                      <CheckCircle2 className="h-5 w-5 text-blue-900 shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Persyaratan — {selectedTrack.title}
            </h2>
            <ul className="space-y-3">
              {selectedTrack.requirements.map((req) => (
                <li key={req.label} className="flex items-center gap-3">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full shrink-0 ${
                    req.met ? "bg-green-100" : "bg-red-100"
                  }`}>
                    {req.met
                      ? <CheckCircle2 className="h-4 w-4 text-green-600" />
                      : <Lock className="h-3.5 w-3.5 text-red-400" />
                    }
                  </div>
                  <span className={`text-sm ${req.met ? "text-slate-700" : "text-slate-400 line-through"}`}>
                    {req.label}
                  </span>
                </li>
              ))}
            </ul>
            {!selectedTrack.unlocked && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3">
                <p className="text-xs font-semibold text-red-600">
                  Kamu belum memenuhi semua persyaratan untuk track ini.
                </p>
              </div>
            )}
          </div>

          {/* Agreement */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="flex items-start gap-3 cursor-pointer">
              <div
                onClick={() => setAgreed((p) => !p)}
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition ${
                  agreed ? "bg-blue-900 border-blue-900" : "border-slate-300"
                }`}
              >
                {agreed && (
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 10 8" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M1 4l3 3 5-5" />
                  </svg>
                )}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Saya memahami komitmen Advanced Track dan bersedia menyelesaikan semua project dan review dalam durasi yang ditentukan.
              </p>
            </label>
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="space-y-4">

          {/* Benefits */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-orange-400 fill-orange-400" />
              <h3 className="text-sm font-bold text-slate-900">Keuntungan Advanced Track</h3>
            </div>
            <ul className="space-y-2.5">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-600 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Track summary */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 space-y-3">
            <h3 className="text-sm font-bold text-blue-900">Ringkasan Pilihan</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Track</span>
                <span className="font-semibold text-slate-900 text-right text-xs max-w-[140px]">{selectedTrack.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Durasi</span>
                <span className="font-semibold text-slate-900">{selectedTrack.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Projects</span>
                <span className="font-semibold text-slate-900">{selectedTrack.projects} project</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className={`font-semibold ${selectedTrack.unlocked ? "text-green-600" : "text-red-500"}`}>
                  {selectedTrack.unlocked ? "✓ Eligible" : "✗ Locked"}
                </span>
              </div>
            </div>
          </div>

          {/* Enroll button */}
          <button
            disabled={!selectedTrack.unlocked || !agreed}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition shadow-sm ${
              selectedTrack.unlocked && agreed
                ? "bg-blue-900 text-white hover:bg-blue-800"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            Daftar Sekarang
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate("/dashboard/mentor")}
            className="w-full text-center text-xs text-slate-400 hover:text-slate-700 transition"
          >
            Kembali ke Portal
          </button>
        </div>
      </div>
    </div>
  )
}
