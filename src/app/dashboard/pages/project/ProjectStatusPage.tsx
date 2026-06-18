import { useEffect, useState } from "react"
import { Clock, MonitorPlay, CheckCircle2, Eye, Sparkles, Loader2, FolderOpen } from "lucide-react"
import { projectAPI, type BackendSubmission } from "@/services/projectAPI"

function statusBadge(status: BackendSubmission["status"]) {
  switch (status) {
    case "approved":
      return { label: "Validated", style: "bg-green-100 text-green-700" }
    case "rejected":
      return { label: "Rejected", style: "bg-red-100 text-red-700" }
    default:
      return { label: "Pending", style: "bg-orange-100 text-orange-600" }
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function ProjectStatusPage() {
  const [submissions, setSubmissions] = useState<BackendSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    projectAPI.getMySubmissions()
      .then(setSubmissions)
      .catch(() => setError("Gagal memuat data submission."))
      .finally(() => setLoading(false))
  }, [])

  const pendingCount = submissions.filter((s) => s.status === "pending").length
  const inReviewCount = 0
  const validatedCount = submissions.filter((s) => s.status === "approved").length

  const stats = [
    {
      label: "Pending",
      value: loading ? "—" : String(pendingCount).padStart(2, "0"),
      icon: <Clock className="h-6 w-6 text-orange-400" />,
      iconBg: "bg-orange-50",
      valueColor: "text-orange-500",
    },
    {
      label: "In Review",
      value: loading ? "—" : String(inReviewCount).padStart(2, "0"),
      icon: <MonitorPlay className="h-6 w-6 text-blue-400" />,
      iconBg: "bg-blue-50",
      valueColor: "text-blue-600",
    },
    {
      label: "Validated",
      value: loading ? "—" : String(validatedCount).padStart(2, "0"),
      icon: <CheckCircle2 className="h-6 w-6 text-slate-500" />,
      iconBg: "bg-slate-100",
      valueColor: "text-slate-900",
    },
  ]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Project Status</h1>
        <p className="mt-1 text-sm text-slate-500">
          Pantau status submission projectmu yang telah dikirimkan ke mentor.
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
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Project</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Tanggal Kirim</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Status</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Feedback</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Detail</p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-16 gap-3 text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Memuat data submission...</span>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="flex items-center justify-center py-16 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && submissions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <FolderOpen className="h-8 w-8 text-slate-400" />
            </div>
            <div>
              <p className="text-base font-semibold text-slate-700">Belum ada submission</p>
              <p className="mt-1 text-sm text-slate-400">
                Kamu belum mengirim project apapun. Submit project pertamamu sekarang!
              </p>
            </div>
          </div>
        )}

        {/* Rows */}
        {!loading && !error && submissions.length > 0 && (
          <div className="divide-y divide-slate-100">
            {submissions.map((sub) => {
              const badge = statusBadge(sub.status)
              return (
                <div
                  key={sub.id}
                  className="grid grid-cols-[2fr_1fr_1fr_2fr_auto] gap-4 items-center px-6 py-4 hover:bg-slate-50 transition-colors"
                >
                  {/* Project Details */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                      <FolderOpen className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {sub.Project?.title ?? `Project #${sub.projectId}`}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {sub.Project?.category ?? "AI Development"}
                        {sub.score != null && (
                          <span className="ml-2 font-semibold text-orange-500">Score: {sub.score}</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Submitted Date */}
                  <p className="text-sm text-slate-500">{formatDate(sub.submittedAt)}</p>

                  {/* Status badge */}
                  <div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badge.style}`}>
                      {badge.label}
                    </span>
                  </div>

                  {/* Feedback */}
                  <div className="flex items-center gap-1.5 min-w-0">
                    {sub.feedback ? (
                      <>
                        <Sparkles className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <p className="text-sm text-slate-500 truncate">"{sub.feedback}"</p>
                      </>
                    ) : (
                      <p className="text-sm text-slate-400 italic">
                        {sub.status === "pending" ? "Menunggu review mentor" : "Belum ada feedback"}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <a
                    href={sub.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 transition"
                    title="Lihat repository"
                  >
                    <Eye className="h-5 w-5" />
                  </a>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}
