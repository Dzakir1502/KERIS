import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft, MessageSquare, Trash2, Eye, Heart,
  ChevronDown, Bot, Reply, Code2, ImageIcon,
  FileUp, CheckCircle2, SendHorizonal, X
} from "lucide-react"

const thread = {
  author: "Aris Setiawan",
  authorInitial: "AS",
  authorBg: "bg-slate-800",
  postedAgo: "2 jam yang lalu",
  category: "Backend Engineering",
  title: "Versi 1 (Profesional & Tech-Oriented)",
  body: `"Eksplorasi terbaru saya dalam bidang AI generatif: membangun model yang mampu menghasilkan animasi 'kucing joget' secara dinamis. Tantangan utamanya adalah menjaga konsistensi gerakan agar tetap natural, sekaligus responsif terhadap input pengguna.

Pendekatan yang saya gunakan menggabungkan model diffusion dan motion synthesis untuk menghasikan output yang lebih hidup dan ekspresif."`,
  code: `kafka:
  bootstrap-servers: localhost:9092
  producer:
    key-serializer: org.apache.kafka.common.serialization.StringSerializer
    value-serializer: io.confluent.kafka.serializers.KafkaAvroSerializer
    acks: all
    retries: 5`,
  codeLabel: "YAML CONFIGURATION",
  views: "1.2k",
  likes: 42,
  status: "Aktif",
  shared: "12 Kali",
  topic: "Architecture",
  popularTopics: ["KUBERNETES", "REACT 19", "RUST", "OPENAI"],
}

const replies = [
  {
    id: 1,
    author: "Siti Aminah",
    authorInitial: "SI",
    authorBg: "bg-teal-600",
    time: "1 jam yang lalu",
    content:
      "Sangat menarik pembahasannya, Mas Aris. Apakah ada pertimbangan khusus mengenai latency saat menggunakan Avro Serializer dibandingkan JSON biasa di environment produksi?",
    nested: [
      {
        id: 11,
        author: "Aris Setiawan",
        authorInitial: "AS",
        authorBg: "bg-slate-800",
        isAuthor: true,
        content:
          "Latensi Avro jauh lebih rendah karena binary format, Siti. Kami menghemat sekitar 40% payload size dibandingkan JSON.",
      },
    ],
  },
  {
    id: 2,
    author: "Budi Pratama",
    authorInitial: "BP",
    authorBg: "bg-blue-700",
    time: "45 menit yang lalu",
    content:
      "Kami baru saja migrasi ke pendekatan serupa. Tantangan terbesarnya justru di monitoring dead-letter queues. Apakah Mas Aris ada tips untuk observability-nya?",
    nested: [],
  },
]

const LANGUAGES = ["JavaScript", "TypeScript", "Python", "YAML", "Go", "Rust", "SQL", "Bash"]

const guidelines = [
  "Be respectful and constructive with feedback.",
  "Cite sources if using external data.",
  "Maximum file size for attachments is 25MB.",
]

function ReplyForm({ onCancel }: { onCancel: () => void }) {
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

  return (
    <div className="rounded-2xl border border-blue-200 bg-white shadow-sm overflow-hidden">
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
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none transition"
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
                  onClick={() => setLangOpen((p) => !p)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
                >
                  {language}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`} />
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
                className="w-full bg-slate-900 px-4 py-3 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none resize-none"
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
            onClick={() => fileRef.current?.click()}
            className={`rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 py-6 cursor-pointer transition ${
              isDragging ? "border-blue-400 bg-blue-50" : "border-slate-300 bg-white hover:border-blue-300"
            }`}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setAttachedFile(e.target.files?.[0] ?? null)}
            />
            {attachedFile ? (
              <>
                <ImageIcon className="h-8 w-8 text-blue-500" />
                <p className="text-xs font-semibold text-blue-600 text-center truncate max-w-[180px]">{attachedFile.name}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); setAttachedFile(null) }}
                  className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600"
                >
                  <X className="h-3 w-3" /> Hapus
                </button>
              </>
            ) : (
              <>
                <FileUp className="h-8 w-8 text-slate-400" />
                <p className="text-xs font-semibold text-blue-600 text-center">Attachments (Optional)</p>
                <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                  Drag and drop assets or click<br />to browse files
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
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800 transition shadow-sm">
            Kirim Balasan
            <SendHorizonal className="h-4 w-4" />
          </button>

          <button
            onClick={onCancel}
            className="w-full text-center text-xs text-slate-400 hover:text-slate-700 transition"
          >
            Cancel and discard draft
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ThreadDetailPage() {
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(thread.likes)
  const [showReplyForm, setShowReplyForm] = useState(false)

  const handleLike = () => {
    setLiked((p) => !p)
    setLikeCount((p) => (liked ? p - 1 : p + 1))
  }

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
              <div className={`h-10 w-10 rounded-full ${thread.authorBg} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                {thread.authorInitial}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{thread.author}</p>
                <p className="text-xs text-slate-400">
                  Diposting {thread.postedAgo} dalam{" "}
                  <span className="font-semibold text-blue-600">{thread.category}</span>
                </p>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-black text-blue-900 leading-snug">{thread.title}</h1>

            {/* Body */}
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{thread.body}</p>

            {/* Code block */}
            <div className="rounded-xl overflow-hidden">
              <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{thread.codeLabel}</span>
              </div>
              <pre className="bg-slate-900 px-5 py-4 text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed">{thread.code}</pre>
            </div>

            {/* Image placeholder */}
            <div className="rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center h-48">
              <div className="text-center text-slate-400 space-y-2">
                <div className="text-4xl">🐱</div>
                <p className="text-xs font-medium">Media Attachment</p>
              </div>
            </div>

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
              <button className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-red-500 transition">
                <Trash2 className="h-4 w-4" />
                Hapus
              </button>
              <div className="ml-auto flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" /> {thread.views} Views
                </span>
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 transition ${liked ? "text-red-500" : "hover:text-red-400"}`}
                >
                  <Heart className={`h-4 w-4 ${liked ? "fill-red-500" : ""}`} />
                  {likeCount} Likes
                </button>
              </div>
            </div>
          </div>

          {/* ── Inline Reply Form (expands when Balas clicked) ── */}
          {showReplyForm && (
            <ReplyForm onCancel={() => setShowReplyForm(false)} />
          )}

          {/* ── Replies ── */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">18 Balasan Komunitas</h2>
              <div className="flex rounded-xl border border-slate-200 overflow-hidden text-xs font-semibold">
                {["Terbaru", "Populer"].map((tab) => (
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
              {replies.map((reply) => (
                <div key={reply.id} className="pt-5 first:pt-0 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className={`h-9 w-9 rounded-full ${reply.authorBg} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                      {reply.authorInitial}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-900">{reply.author}</p>
                        <p className="text-xs text-slate-400">{reply.time}</p>
                      </div>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">{reply.content}</p>
                      <button className="mt-2 flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Balas
                      </button>
                    </div>
                  </div>

                  {reply.nested.map((nested) => (
                    <div key={nested.id} className="ml-12 flex items-start gap-3">
                      <div className={`h-8 w-8 rounded-full ${nested.authorBg} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                        {nested.authorInitial}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900">{nested.author}</p>
                          {nested.isAuthor && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-blue-700">Author</span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-slate-600 leading-relaxed">{nested.content}</p>
                        <button className="mt-2 flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition">
                          <MessageSquare className="h-3.5 w-3.5" />
                          Balas
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <button className="flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-500 hover:text-slate-900 transition border-t border-slate-100">
              <ChevronDown className="h-4 w-4" />
              Tampilkan 10 Balasan Lainnya
            </button>
          </div>
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
                  {thread.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Dibagikan</span>
                <span className="font-semibold text-slate-900">{thread.shared}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Topik</span>
                <span className="font-semibold text-blue-600 underline cursor-pointer">{thread.topic}</span>
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
              Gunakan KERIS AI untuk menganalisa kode snippet di atas atau mencari solusi arsitektur serupa.
            </p>
            <button className="w-full rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition">
              Tanya KERIS AI
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Topik Populer Pekan Ini</h3>
            <div className="flex flex-wrap gap-2">
              {thread.popularTopics.map((topic) => (
                <span key={topic} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
