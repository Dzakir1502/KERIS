import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  FolderOpen, Link2, Code2, MessageSquare,
  SendHorizonal, ChevronDown, CheckCircle2, ArrowRight, ClipboardList
} from "lucide-react"

const projectOptions = [
  "Membangun Landing Page UMKM Lokal",
  "Dashboard Management Stok Barang",
  "Full-Stack E-Commerce Platform",
]

function SuccessState({ projectName, onReset }: { projectName: string; onReset: () => void }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center">
      {/* Animated checkmark ring */}
      <div className="relative flex h-28 w-28 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30" />
        <div className="absolute inset-2 rounded-full bg-green-50" />
        <CheckCircle2 className="relative h-16 w-16 text-green-500" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-black text-slate-900">Submission Berhasil Dikirim!</h2>
        <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
          Project <span className="font-semibold text-slate-700">"{projectName}"</span> sudah diterima dan sedang menunggu penugasan mentor.
        </p>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2 text-xs font-semibold">
        <span className="rounded-full bg-green-100 px-3 py-1.5 text-green-700">✓ Submitted</span>
        <ChevronDown className="h-3 w-3 -rotate-90 text-slate-300" />
        <span className="rounded-full bg-orange-100 px-3 py-1.5 text-orange-600">⏳ Pending</span>
        <ChevronDown className="h-3 w-3 -rotate-90 text-slate-300" />
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-400">In-Review</span>
        <ChevronDown className="h-3 w-3 -rotate-90 text-slate-300" />
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-400">Validated</span>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <button
          onClick={() => navigate("/dashboard/mentor")}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-900 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800 transition shadow-sm"
        >
          <ClipboardList className="h-4 w-4" />
          Pantau di Mentor Review
        </button>
        <button
          onClick={onReset}
          className="flex-1 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
        >
          Submit Lagi
        </button>
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 transition"
      >
        Kembali ke Dashboard
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

export default function SubmissionPage() {
  const [selectedProject, setSelectedProject] = useState("")
  const [repoUrl, setRepoUrl] = useState("")
  const [code, setCode] = useState("")
  const [comment, setComment] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const canSubmit = selectedProject && repoUrl

  const handleSubmit = () => {
    if (!canSubmit) return
    setSubmitting(true)
    // Simulate async submit
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1200)
  }

  const handleReset = () => {
    setSelectedProject("")
    setRepoUrl("")
    setCode("")
    setComment("")
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Project Submission</h1>
          <div className="mt-2 h-0.5 w-36 rounded-full bg-blue-600" />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-8">
          <SuccessState projectName={selectedProject} onReset={handleReset} />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Project Submission</h1>
        <div className="mt-2 h-0.5 w-36 rounded-full bg-blue-600" />
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
        <ClipboardList className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-800">Submission ini akan dikirim ke Mentor Review Portal</p>
          <p className="text-xs text-blue-500 mt-0.5">
            Setelah submit, mentor akan di-assign dan projectmu masuk status <strong>Pending → In-Review</strong>. Pantau di{" "}
            <button
              onClick={() => {}}
              className="underline font-semibold hover:text-blue-700"
            >
              Mentor Review Portal
            </button>.
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-8 space-y-7">

        {/* Select Project */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <FolderOpen className="h-4 w-4 text-blue-500" />
            Select Project
            <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((p) => !p)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 hover:border-slate-300 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <span className={selectedProject ? "text-slate-800" : "text-slate-400"}>
                {selectedProject || "Choose a project ..."}
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
                {projectOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setSelectedProject(opt); setDropdownOpen(false) }}
                    className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Project URL */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Link2 className="h-4 w-4 text-blue-500" />
            Project URL / Repository
            <span className="text-red-400">*</span>
          </label>
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/username/project-alpha"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
        </div>

        {/* Code Snippet */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Code2 className="h-4 w-4 text-blue-500" />
            Code Snippet
            <span className="text-xs font-normal text-slate-400">(opsional)</span>
          </label>
          <div className="relative rounded-xl overflow-hidden border-2 border-dashed border-blue-400 focus-within:border-blue-500 transition">
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Paste your core logic or configuration here..."
              rows={8}
              spellCheck={false}
              className="w-full bg-slate-950 px-5 py-4 text-sm font-mono text-slate-300 placeholder-slate-600 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <MessageSquare className="h-4 w-4 text-blue-500" />
            Catatan untuk Mentor
            <span className="text-xs font-normal text-slate-400">(opsional)</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ceritakan pendekatan yang kamu gunakan atau tantangan yang dihadapi..."
            rows={5}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
          />
        </div>

        {/* Submit */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold text-white shadow-md transition ${
              canSubmit && !submitting
                ? "bg-green-600 hover:bg-green-700 shadow-green-500/20"
                : "bg-slate-300 cursor-not-allowed"
            }`}
          >
            {submitting ? (
              <>
                <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Mengirim...
              </>
            ) : (
              <>
                <SendHorizonal className="h-5 w-5" />
                Submit Project ke Mentor
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-400">
            Pastikan repository sudah publik sebelum submit. Kolom bertanda <span className="text-red-400">*</span> wajib diisi.
          </p>
        </div>
      </div>
    </div>
  )
}
