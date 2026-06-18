import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft, MessageSquare, CheckCircle2, Clock,
  AlertTriangle, Star, ExternalLink, FileEdit
} from "lucide-react"

const projectsData: Record<string, {
  id: number
  track: string
  trackColor: string
  status: string
  statusColor: string
  title: string
  fullDescription: string
  repoUrl: string
  submittedDate: string
  mentor: { name: string; initials: string; role: string; bg: string }
  reviewStages: { label: string; done: boolean; active: boolean }[]
  critiques: {
    id: number
    author: string
    initials: string
    bg: string
    isAuthor?: boolean
    time: string
    section: string
    content: string
    rating?: number
    replies: { author: string; initials: string; bg: string; content: string }[]
  }[]
}> = {
  "1": {
    id: 1,
    track: "Web Development",
    trackColor: "bg-blue-100 text-blue-700",
    status: "IN-REVIEW",
    statusColor: "bg-orange-100 text-orange-600",
    title: "Sustainable Urban Shell",
    fullDescription:
      "Proyek ini berfokus pada pengembangan sistem perumahan modular yang mengintegrasikan taman vertikal untuk kawasan urban berdensitas tinggi. Desain mempertimbangkan efisiensi material, sirkulasi udara alami, dan kemampuan adaptasi modul untuk berbagai kondisi lahan.",
    repoUrl: "https://github.com/farhan/urban-shell",
    submittedDate: "Oct 12, 2023",
    mentor: { name: "Sarah Chen", initials: "SC", role: "Senior Architect Mentor", bg: "bg-teal-600" },
    reviewStages: [
      { label: "Submitted", done: true, active: false },
      { label: "Assigned to Mentor", done: true, active: false },
      { label: "In Review", done: false, active: true },
      { label: "Validated", done: false, active: false },
    ],
    critiques: [
      {
        id: 1,
        author: "Sarah Chen",
        initials: "SC",
        bg: "bg-teal-600",
        time: "Hari ini, 10:45",
        section: "Podium Section",
        rating: 4,
        content:
          "Eksplorasi material pada bagian podium sangat menjanjikan. Namun, perlu diperhatikan rasio antara bukaan dan massa dinding agar structural integrity tetap terjaga, terutama pada modul sudut.",
        replies: [
          {
            author: "Farhan K.",
            initials: "FK",
            bg: "bg-blue-900",
            content: "Terima kasih, Mentor Sarah. Akan saya revisi detail sambungan modul sudut pada gambar kerja.",
          },
        ],
      },
      {
        id: 2,
        author: "Sarah Chen",
        initials: "SC",
        bg: "bg-teal-600",
        time: "Kemarin, 14:30",
        section: "Vertical Garden System",
        rating: 5,
        content:
          "Sistem irigasi vertikal yang diusulkan sangat inovatif. Penggunaan greywater recycling loop ini bisa menjadi keunggulan kompetitif proyek ini di level internasional.",
        replies: [],
      },
    ],
  },
  "3": {
    id: 3,
    track: "Architectural Rendering",
    trackColor: "bg-slate-100 text-slate-600",
    status: "NEEDS REVISION",
    statusColor: "bg-red-100 text-red-600",
    title: "Brutalist Revival Loft",
    fullDescription:
      "Eksplorasi estetika beton mentah dalam konteks residensial mewah modern. Proyek ini menggabungkan prinsip-prinsip brutalisme klasik dengan sentuhan material kontemporer untuk menciptakan ruang interior yang kuat namun nyaman.",
    repoUrl: "https://github.com/farhan/brutalist-loft",
    submittedDate: "Nov 18, 2023",
    mentor: { name: "Arief Wibowo", initials: "AW", role: "Design Critique Mentor", bg: "bg-slate-700" },
    reviewStages: [
      { label: "Submitted", done: true, active: false },
      { label: "Assigned to Mentor", done: true, active: false },
      { label: "In Review", done: true, active: false },
      { label: "Needs Revision", done: false, active: true },
    ],
    critiques: [
      {
        id: 1,
        author: "Arief Wibowo",
        initials: "AW",
        bg: "bg-slate-700",
        time: "2 hari lalu",
        section: "Material Palette",
        rating: 2,
        content:
          "Palet material perlu lebih konsisten. Penggunaan beton ekspos di beberapa area bertabrakan secara visual dengan material kayu yang dipilih. Harap sederhanakan menjadi maksimal 3 material utama.",
        replies: [],
      },
    ],
  },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`h-3.5 w-3.5 ${s <= rating ? "fill-orange-400 text-orange-400" : "text-slate-200"}`} />
      ))}
    </div>
  )
}

export default function MentorProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const [replyText, setReplyText] = useState("")
  const [replyOpen, setReplyOpen] = useState<number | null>(null)

  const project = projectsData[projectId ?? "1"] ?? projectsData["1"]

  return (
    <div className="space-y-5">
      {/* Back */}
      <button
        onClick={() => navigate("/dashboard/mentor")}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400 hover:text-slate-900 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Mentor Review Portal
      </button>

      <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
        {/* ── Left ── */}
        <div className="space-y-4">

          {/* Project header card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-sm px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] ${project.trackColor}`}>
                {project.track}
              </span>
              <span className={`rounded-sm px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] ${project.statusColor}`}>
                {project.status}
              </span>
            </div>
            <h1 className="text-2xl font-black text-blue-900">{project.title}</h1>
            <p className="text-sm text-slate-500 leading-relaxed">{project.fullDescription}</p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Lihat Repository
              </a>
              <span className="text-xs text-slate-400">Submitted: {project.submittedDate}</span>
              {project.status === "NEEDS REVISION" && (
                <button
                  onClick={() => navigate(`/dashboard/mentor/${projectId}/edit`)}
                  className="ml-auto flex items-center gap-1.5 rounded-xl bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100 transition"
                >
                  <FileEdit className="h-3.5 w-3.5" />
                  Edit Submission
                </button>
              )}
            </div>
          </div>

          {/* Critiques */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                Mentor Critiques
                <span className="ml-2 text-sm font-normal text-slate-400">({project.critiques.length} catatan)</span>
              </h2>
              <div className="flex rounded-xl border border-slate-200 overflow-hidden text-xs font-semibold">
                {["Terbaru", "Per Section"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-3 py-1.5 transition ${tab === "Terbaru" ? "bg-blue-900 text-white" : "text-slate-500 hover:bg-slate-50"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-5 divide-y divide-slate-100">
              {project.critiques.map((c) => (
                <div key={c.id} className="pt-5 first:pt-0 space-y-4">
                  {/* Mentor comment */}
                  <div className="flex items-start gap-3">
                    <div className={`h-9 w-9 rounded-full ${c.bg} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                      {c.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-slate-900">{c.author}</p>
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">Mentor</span>
                        <span className="text-xs text-slate-400">{c.time}</span>
                        {c.rating && <StarRating rating={c.rating} />}
                      </div>
                      <div className="mt-0.5">
                        <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 mb-2">
                          📍 {c.section}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{c.content}</p>
                      <button
                        onClick={() => setReplyOpen(replyOpen === c.id ? null : c.id)}
                        className="mt-2 flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        Balas
                      </button>
                    </div>
                  </div>

                  {/* Replies */}
                  {c.replies.map((r, i) => (
                    <div key={i} className="ml-12 flex items-start gap-3">
                      <div className={`h-8 w-8 rounded-full ${r.bg} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                        {r.initials}
                      </div>
                      <div className="flex-1 rounded-xl bg-slate-50 px-4 py-3">
                        <p className="text-xs font-bold text-slate-900">{r.author}</p>
                        <p className="mt-1 text-xs text-slate-600 leading-relaxed">{r.content}</p>
                      </div>
                    </div>
                  ))}

                  {/* Inline reply input */}
                  {replyOpen === c.id && (
                    <div className="ml-12 space-y-2">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Tulis balasanmu ke mentor..."
                        rows={3}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition"
                      />
                      <div className="flex gap-2">
                        <button className="rounded-xl bg-blue-900 px-4 py-2 text-xs font-bold text-white hover:bg-blue-800 transition">
                          Kirim
                        </button>
                        <button
                          onClick={() => setReplyOpen(null)}
                          className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="space-y-4">

          {/* Assigned mentor */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Assigned Mentor</h3>
            <div className="flex items-center gap-3">
              <div className={`h-12 w-12 rounded-2xl ${project.mentor.bg} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                {project.mentor.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{project.mentor.name}</p>
                <p className="text-xs text-slate-400">{project.mentor.role}</p>
              </div>
            </div>
            <button className="w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition">
              Hubungi Mentor
            </button>
          </div>

          {/* Review progress */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Review Progress</h3>
            <div className="space-y-3">
              {project.reviewStages.map((stage, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full shrink-0 ${
                    stage.done ? "bg-green-500" : stage.active ? "bg-orange-400" : "bg-slate-100"
                  }`}>
                    {stage.done
                      ? <CheckCircle2 className="h-4 w-4 text-white" />
                      : stage.active
                        ? <Clock className="h-3.5 w-3.5 text-white" />
                        : <div className="h-2 w-2 rounded-full bg-slate-300" />
                    }
                  </div>
                  <span className={`text-xs font-semibold ${
                    stage.done ? "text-slate-900" : stage.active ? "text-orange-500" : "text-slate-400"
                  }`}>
                    {stage.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-2">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Quick Actions</h3>
            {project.status === "NEEDS REVISION" && (
              <button
                onClick={() => navigate(`/dashboard/mentor/${projectId}/edit`)}
                className="flex w-full items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-100 transition"
              >
                <FileEdit className="h-4 w-4" />
                Edit & Resubmit
              </button>
            )}
            <button
              onClick={() => navigate("/dashboard/project/submission")}
              className="flex w-full items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              <ExternalLink className="h-4 w-4" />
              Lihat di Project Status
            </button>
            <button className="flex w-full items-center gap-2 rounded-xl bg-orange-50 px-4 py-2.5 text-xs font-semibold text-orange-600 hover:bg-orange-100 transition">
              <AlertTriangle className="h-4 w-4" />
              Laporkan Masalah
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
