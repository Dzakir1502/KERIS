import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  FileEdit, Bold, Italic, List, Link2, Image,
  Code2, CloudUpload, CheckCircle2, SendHorizonal, X, ChevronDown
} from "lucide-react"

const KATEGORI_OPTIONS = ["Tech Discussion", "Tanya Jawab", "Sharing Project", "Guest Discussion", "Tips & Clue Cards", "General"]
const TRACK_OPTIONS = ["Software Engineering", "Web Development", "Mobile Development", "AI & Machine Learning", "Data Science", "UI/UX Design"]
const LANGUAGES = ["JavaScript", "TypeScript", "Python", "YAML", "Go", "Rust", "SQL", "Bash"]

const guidelines = [
  "Keep titles concise and impactful.",
  "Tag appropriately to reach the right audience.",
  "Use snippets for technical documentation.",
]

function Dropdown({
  label, value, options, onChange
}: {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="space-y-1.5 flex-1">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">{label}</p>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          {value}
          <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute z-10 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false) }}
                className={`w-full px-4 py-2.5 text-left text-sm transition ${value === opt ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:bg-slate-50"}`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function CreateThreadPage() {
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState("")
  const [kategori, setKategori] = useState("Tech Discussion")
  const [track, setTrack] = useState("Software Engineering")
  const [content, setContent] = useState("")
  const [codeSnippet, setCodeSnippet] = useState("")
  const [language, setLanguage] = useState("JavaScript")
  const [langOpen, setLangOpen] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    setAttachedFiles((prev) => [...prev, ...files])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    setAttachedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const toolbarItems = [
    { icon: <Bold className="h-4 w-4" />, label: "Bold" },
    { icon: <Italic className="h-4 w-4" />, label: "Italic" },
    { icon: <List className="h-4 w-4" />, label: "List" },
    { icon: <Link2 className="h-4 w-4" />, label: "Link" },
    { icon: <Image className="h-4 w-4" />, label: "Image" },
  ]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileEdit className="h-4 w-4 text-slate-400" />
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">Editorial Workspace</p>
        </div>
        <h1 className="text-4xl font-black text-slate-900">Create Thread Form</h1>
        <p className="mt-2 text-sm text-slate-500 max-w-xl">
          Craft your contribution to the KERIS Hub. Use the tools below to structure your thoughts, share code, and engage with the community.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_280px]">

        {/* ── Left: Form ── */}
        <div className="space-y-4">

          {/* Judul + Kategori + Track */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            {/* Judul Thread */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Judul Thread</p>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a descriptive title for your thread..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>

            {/* Kategori + Track */}
            <div className="flex gap-4">
              <Dropdown label="Kategori" value={kategori} options={KATEGORI_OPTIONS} onChange={setKategori} />
              <Dropdown label="Track" value={track} options={TRACK_OPTIONS} onChange={setTrack} />
            </div>
          </div>

          {/* Konten Thread */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Konten Thread</p>

            {/* Toolbar */}
            <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
              {toolbarItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  title={item.label}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition"
                >
                  {item.icon}
                </button>
              ))}
              <div className="mx-2 h-5 w-px bg-slate-200" />
              <button
                type="button"
                title="Code Block"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition"
              >
                <Code2 className="h-4 w-4" />
              </button>
            </div>

            {/* Content area */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thread content here... Markdown is supported."
              rows={10}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Code Snippet */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Code Snippet (Optional)</p>
              {/* Language dropdown */}
              <div className="relative">
                <button
                  type="button"
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
                        type="button"
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

            {/* Dark code editor */}
            <div className="rounded-xl overflow-hidden border border-slate-700">
              <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>
              <textarea
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                placeholder={`// Paste your ${language} code here...`}
                rows={8}
                spellCheck={false}
                className="w-full bg-slate-900 px-5 py-4 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="space-y-4">

          {/* Attachments */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Attachments (Optional)</p>

            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-6 cursor-pointer transition ${
                isDragging ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-slate-50 hover:border-blue-300"
              }`}
            >
              <input ref={fileRef} type="file" multiple className="hidden" onChange={handleFileChange} />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                <CloudUpload className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-xs font-semibold text-slate-600">Drop Files Or Click To Upload</p>
              <p className="text-[11px] text-slate-400">PNG, JPG, PDF, or ZIP (Max 10MB)</p>
            </div>

            {/* Attached file list */}
            {attachedFiles.length > 0 && (
              <div className="space-y-1.5">
                {attachedFiles.map((file, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                    <span className="text-xs text-slate-600 truncate max-w-[160px]">{file.name}</span>
                    <button
                      onClick={() => removeFile(i)}
                      className="text-slate-300 hover:text-red-500 transition ml-2"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Editorial Guidelines */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Editorial Guidelines</h3>
            <ul className="space-y-2.5">
              {guidelines.map((g) => (
                <li key={g} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-500 leading-relaxed">{g}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Publish */}
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white hover:bg-slate-800 transition shadow-sm">
            <SendHorizonal className="h-4 w-4" />
            Publish Thread
          </button>

          <button
            onClick={() => navigate("/dashboard/community")}
            className="flex w-full items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition"
          >
            <X className="h-4 w-4" />
            Batal
          </button>
        </div>
      </div>
    </div>
  )
}
