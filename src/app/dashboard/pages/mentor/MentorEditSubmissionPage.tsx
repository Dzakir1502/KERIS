import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Link2, Code2, ChevronDown, AlertTriangle, SendHorizonal } from "lucide-react"

const LANGUAGES = ["JavaScript", "TypeScript", "Python", "YAML", "Go", "Rust", "SQL", "Bash"]

const prefillData: Record<string, {
  title: string
  track: string
  repoUrl: string
  description: string
  code: string
  revisionNotes: string
}> = {
  "3": {
    title: "Brutalist Revival Loft",
    track: "Architectural Rendering",
    repoUrl: "https://github.com/farhan/brutalist-loft",
    description:
      "Eksplorasi estetika beton mentah dalam konteks residensial mewah modern. Menggabungkan prinsip brutalisme klasik dengan material kontemporer.",
    code: "// Render config\nconst renderSettings = {\n  resolution: '4K',\n  samples: 2048,\n  engine: 'Cycles'\n}",
    revisionNotes:
      "Mentor meminta penyederhanaan palet material menjadi maksimal 3 material utama dan perbaikan konsistensi antara beton ekspos dengan elemen kayu.",
  },
}

export default function MentorEditSubmissionPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()

  const pre = prefillData[projectId ?? "3"] ?? prefillData["3"]

  const [title, setTitle] = useState(pre.title)
  const [repoUrl, setRepoUrl] = useState(pre.repoUrl)
  const [description, setDescription] = useState(pre.description)
  const [code, setCode] = useState(pre.code)
  const [language, setLanguage] = useState("JavaScript")
  const [langOpen, setLangOpen] = useState(false)
  const [changeNote, setChangeNote] = useState("")

  return (
    <div className="space-y-5">
      {/* Back */}
      <button
        onClick={() => navigate(`/dashboard/mentor/${projectId}`)}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400 hover:text-slate-900 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Detail Project
      </button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Edit Submission</h1>
        <p className="mt-1 text-sm text-slate-500">
          Perbarui submission kamu berdasarkan catatan dari mentor, lalu kirim ulang untuk direview.
        </p>
      </div>

      {/* Revision notes banner */}
      <div className="flex items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-5">
        <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-orange-700">Catatan Revisi dari Mentor</p>
          <p className="mt-1 text-sm text-orange-600 leading-relaxed">{pre.revisionNotes}</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
        {/* ── Left: Edit Form ── */}
        <div className="space-y-4">

          {/* Title + Track */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Judul Project</p>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Track</p>
              <div className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400">
                {pre.track} <span className="text-xs">(tidak dapat diubah)</span>
              </div>
            </div>
          </div>

          {/* Repo URL */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
              <Link2 className="h-3.5 w-3.5" />
              Project URL / Repository
            </label>
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Deskripsi Project</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition"
            />
          </div>

          {/* Code Snippet */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                <Code2 className="h-3.5 w-3.5" />
                Code Snippet
              </label>
              <div className="relative">
                <button
                  onClick={() => setLangOpen((p) => !p)}
                  className="flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600 hover:bg-slate-200 transition"
                >
                  {language}
                  <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-7 z-10 w-36 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang); setLangOpen(false) }}
                        className={`w-full px-3 py-2 text-left text-sm transition ${language === lang ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:bg-slate-50"}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-700">
              <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={7}
                spellCheck={false}
                className="w-full bg-slate-900 px-5 py-4 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Change notes */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
              Catatan Perubahan
              <span className="ml-1 normal-case font-normal text-slate-300">(opsional)</span>
            </p>
            <textarea
              value={changeNote}
              onChange={(e) => setChangeNote(e.target.value)}
              placeholder="Jelaskan perubahan apa saja yang kamu buat berdasarkan feedback mentor..."
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition"
            />
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="space-y-4">

          {/* Checklist */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Revision Checklist</h3>
            <ul className="space-y-2.5">
              {[
                "Perbaiki poin yang disebutkan mentor",
                "Perbarui URL repository jika ada perubahan",
                "Tambahkan catatan perubahan",
                "Pastikan code snippet sudah diupdate",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="h-4 w-4 rounded border-2 border-slate-300 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-500 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Submit */}
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 px-4 py-3.5 text-sm font-bold text-white hover:bg-blue-800 transition shadow-sm">
            <SendHorizonal className="h-4 w-4" />
            Kirim Ulang untuk Review
          </button>

          <button
            onClick={() => navigate(`/dashboard/mentor/${projectId}`)}
            className="w-full text-center text-xs text-slate-400 hover:text-slate-700 transition py-1"
          >
            Batalkan perubahan
          </button>

          {/* Warning */}
          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 space-y-1">
            <p className="text-xs font-bold text-orange-700">Perhatian</p>
            <p className="text-xs text-orange-600 leading-relaxed">
              Setelah dikirim ulang, status project akan kembali ke "In-Review" dan mentor akan diberitahu.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
