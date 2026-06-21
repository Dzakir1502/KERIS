import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft, MessageSquare, Trash2, Eye, Heart,
  ChevronDown, Bot, Reply, Code2, ImageIcon,
  FileUp, CheckCircle2, SendHorizonal, X, Loader2, AlertCircle
} from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import communityAPI, { type Thread, type Reply as ReplyType } from "@/services/communityAPI"

const LANGUAGES = ["JavaScript", "TypeScript", "Python", "YAML", "Go", "Rust", "SQL", "Bash"]

const guidelines = [
  "Be respectful and constructive with feedback.",
  "Cite sources if using external data.",
  "Maximum file size for attachments is 25MB.",
]

function ReplyForm({
  loading,
  onSubmit,
  onCancel,
}: {
  loading: boolean
  onSubmit: (message: string, code: string, language: string) => void
  onCancel: () => void
}) {
  const [message, setMessage] = useState("")
  const [codeSnippet, setCodeSnippet] = useState("")
  const [language, setLanguage] = useState("JavaScript")
  const [langOpen, setLangOpen] = useState(false)
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) setAttachedFile(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    onSubmit(message, codeSnippet, language)
    setMessage("")
    setCodeSnippet("")
    setAttachedFile(null)
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-blue-200 bg-white shadow-sm overflow-hidden">
      <div className="grid xl:grid-cols-[1fr_260px]">

        {/* Left — message + code */}
        <div className="p-6 space-y-5 border-r border-slate-100">

          {/* YOUR MESSAGE */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
              <MessageSquare className="h-3.5 w-3.5" />
              Your Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your thoughtful reply here..."
              rows={8}
              disabled={loading}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none transition disabled:opacity-50"
            />
          </div>

          {/* CODE SNIPPET */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                <Code2 className="h-3.5 w-3.5" />
                Code Snippet (Optional)
              </label>
              {/* Language selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLangOpen((p) => !p)}
                  disabled={loading}
                  className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition disabled:opacity-50"
                >
                  {language}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`} />
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
                <span className="ml-2 text-[10px] text-slate-500 font-mono">{language.toLowerCase()}</span>
              </div>
              <textarea
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                placeholder={`// Insert your ${language} code block here...`}
                rows={6}
                spellCheck={false}
                disabled={loading}
                className="w-full bg-slate-900 px-4 py-3 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none resize-none disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Right — attachments + guidelines + submit */}
        <div className="p-6 space-y-4 bg-slate-50">

          {/* Attachments */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => !loading && fileRef.current?.click()}
            className={`rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 py-6 cursor-pointer transition ${
              isDragging ? "border-blue-400 bg-blue-50" : "border-slate-300 bg-white hover:border-blue-300"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              disabled={loading}
              className="hidden"
              onChange={(e) => setAttachedFile(e.target.files?.[0] ?? null)}
            />
            {attachedFile ? (
              <>
                <ImageIcon className="h-8 w-8 text-blue-500" />
                <p className="text-xs font-semibold text-blue-600 text-center truncate max-w-[180px]">{attachedFile.name}</p>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setAttachedFile(null) }}
                  disabled={loading}
                  className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 disabled:opacity-50"
                >
                  <X className="h-3 w-3" /> Hapus
                </button>
              </>
            ) : (
              <>
                <FileUp className="h-8 w-8 text-slate-400" />
                <p className="text-xs font-semibold text-blue-600 text-center">Attachments (Optional)</p>
                <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                  Drag and drop assets or click to browse files
                </p>
              </>
            )}
          </div>

          {/* Guidelines */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Submission Guidelines</p>
            <ul className="space-y-2">
              {guidelines.map((g) => (
                <li key={g} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-500 leading-relaxed">{g}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Mengirim...
              </>
            ) : (
              <>
                Kirim Balasan
                <SendHorizonal className="h-4 w-4" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="w-full text-center text-xs text-slate-400 hover:text-slate-700 transition disabled:opacity-50"
          >
            Cancel and discard draft
          </button>
        </div>
      </div>
    </form>
  )
}

export default function ThreadDetailPage() {
  const { threadId } = useParams<{ threadId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()

  // Data state
  const [thread, setThread] = useState<Thread | null>(null)
  const [replies, setReplies] = useState<ReplyType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [replyLoading, setReplyLoading] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [liked, setLiked] = useState(false)

  // Fetch thread detail
  useEffect(() => {
    if (!threadId) return

    const fetchThread = async () => {
      try {
        setLoading(true)
        setError("")

        const res = await communityAPI.getThreadDetail(parseInt(threadId))
        const data = res.data.data

        setThread(data)
        setReplies(data.replies || [])
      } catch (err: any) {
        console.error("Failed to fetch thread:", err)
        setError(err.response?.data?.message || "Gagal memuat thread")
      } finally {
        setLoading(false)
      }
    }

    fetchThread()
  }, [threadId])

  const handleReplySubmit = async (message: string, _code: string, _language: string) => {
    if (!threadId) return

    try {
      setReplyLoading(true)

      const res = await communityAPI.replyToThread(parseInt(threadId), {
        content: message,
      })

      if (res.data.success) {
        // Add reply to local state
        const newReply = res.data.data
        setReplies((prev) => [...prev, newReply])
        setShowReplyForm(false)
      } else {
        alert(res.data.message || "Gagal mengirim balasan")
      }
    } catch (err: any) {
      console.error("Failed to submit reply:", err)
      alert(err.response?.data?.message || "Gagal mengirim balasan")
    } finally {
      setReplyLoading(false)
    }
  }

  const handleLike = async () => {
    if (!threadId || !thread) return

    try {
      const res = await communityAPI.likeThread(parseInt(threadId))

      if (res.data.success) {
        setLiked((p) => !p)
        setThread((prev) => prev ? { ...prev, likes: prev.likes + (liked ? -1 : 1) } : null)
      }
    } catch (err: any) {
      console.error("Failed to like thread:", err)
    }
  }

  const handleDelete = async () => {
    if (!threadId || !window.confirm("Apakah Anda yakin ingin menghapus thread ini?")) return

    try {
      const res = await communityAPI.deleteThread(parseInt(threadId))

      if (res.data.success) {
        alert("Thread berhasil dihapus")
        navigate("/dashboard/community")
      } else {
        alert(res.data.message || "Gagal menghapus thread")
      }
    } catch (err: any) {
      console.error("Failed to delete thread:", err)
      alert(err.response?.data?.message || "Gagal menghapus thread")
    }
  }

  const formatTimeAgo = (date: string) => {
    const now = new Date()
    const posted = new Date(date)
    const seconds = Math.floor((now.getTime() - posted.getTime()) / 1000)

    if (seconds < 60) return "Baru saja"
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
  }

  const getAvatarColor = (id: number) => {
    const colors = ["bg-blue-600", "bg-teal-600", "bg-purple-600", "bg-pink-600", "bg-orange-600"]
    return colors[id % colors.length]
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-sm text-slate-500">Memuat thread...</p>
      </div>
    )
  }

  if (error || !thread) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-3" />
        <p className="text-red-900 font-semibold text-center">{error || "Thread tidak ditemukan"}</p>
        <button
          onClick={() => navigate("/dashboard/community")}
          className="mt-4 mx-auto block rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
        >
          Kembali ke Komunitas
        </button>
      </div>
    )
  }

  const isOwner = user?.id === thread.authorId

  return (
    <div className="space-y-4">
      {/* Back button */}
      <button
        onClick={() => navigate("/dashboard/community")}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400 hover:text-slate-900 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Discussion
      </button>

      <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
        {/* ── Left: Main Content ── */}
        <div className="space-y-4">

          {/* Post card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-full ${getAvatarColor(thread.authorId)} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                {getInitials(thread.author?.nama_lengkap || "User")}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{thread.author?.nama_lengkap || "Unknown"}</p>
                <p className="text-xs text-slate-400">
                  Diposting {formatTimeAgo(thread.createdAt)} dalam{" "}
                  <span className="font-semibold text-blue-600">{thread.category}</span>
                </p>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-black text-blue-900 leading-snug">{thread.title}</h1>

            {/* Body */}
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{thread.content}</p>

            {/* Action bar */}
            <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowReplyForm((p) => !p)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  showReplyForm ? "bg-slate-200 text-slate-700" : "bg-blue-900 text-white hover:bg-blue-800"
                }`}
              >
                <Reply className="h-4 w-4" />
                {showReplyForm ? "Tutup Form" : "Balas"}
              </button>
              {isOwner && (
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-red-500 transition"
                >
                  <Trash2 className="h-4 w-4" />
                  Hapus
                </button>
              )}
              <div className="ml-auto flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" /> {thread.views} Views
                </span>
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 transition ${liked ? "text-red-500" : "hover:text-red-400"}`}
                >
                  <Heart className={`h-4 w-4 ${liked ? "fill-red-500" : ""}`} />
                  {thread.likes} Likes
                </button>
              </div>
            </div>
          </div>

          {/* ── Inline Reply Form (expands when Balas clicked) ── */}
          {showReplyForm && (
            <ReplyForm
              loading={replyLoading}
              onSubmit={handleReplySubmit}
              onCancel={() => setShowReplyForm(false)}
            />
          )}

          {/* ── Replies ── */}
          {replies.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900">{replies.length} Balasan Komunitas</h2>
              </div>

              <div className="space-y-5 divide-y divide-slate-100">
                {replies.map((reply) => (
                  <div key={reply.id} className="pt-5 first:pt-0 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={`h-9 w-9 rounded-full ${getAvatarColor(reply.authorId)} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                        {getInitials(reply.author?.nama_lengkap || "User")}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900">{reply.author?.nama_lengkap || "Unknown"}</p>
                          {reply.authorId === thread.authorId && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-blue-700">Author</span>
                          )}
                          <p className="text-xs text-slate-400 ml-auto">{formatTimeAgo(reply.createdAt)}</p>
                        </div>
                        <p className="mt-1 text-sm text-slate-600 leading-relaxed">{reply.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right Sidebar ── */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Informasi Thread</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Status</span>
                <span className="flex items-center gap-1.5 font-semibold text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Aktif
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Kategori</span>
                <span className="font-semibold text-blue-600">{thread.category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Replies</span>
                <span className="font-semibold text-slate-900">{replies.length}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <Bot className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Butuh Bantuan AI?</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Gunakan KERIS AI untuk menganalisa thread ini atau mencari solusi serupa.
            </p>
            <button className="w-full rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition">
              Tanya KERIS AI
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
