import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MessageCircle, Heart, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

const trackFilters = ["Opini", "Web Dev", "Mobile Dev", "AI"]
const kategoriFilters = ["Tanya Jawab", "Sharing Project", "Guest Discussion", "Tips & Clue Cards", "General"]

const threads = [
  {
    id: 1,
    tags: [
      { label: "WEB DEV", color: "bg-orange-100 text-orange-600" },
      { label: "SHARING PROJECT", color: "bg-orange-100 text-orange-600" },
    ],
    postedAgo: "Posted 2h ago",
    title: "Membangun E-Commerce Dengan Tech Stack Next.js 14 & Supabase",
    description:
      "Halo teman-teman! Saya baru saja menyelesaikan project dashboard e-commerce menggunakan App Router dan...",
    author: "Felix Kurniawan",
    authorInitial: "FK",
    authorBg: "bg-blue-600",
    comments: 24,
    likes: 89,
    hasImage: true,
  },
  {
    id: 2,
    tags: [
      { label: "AI", color: "bg-teal-100 text-teal-700" },
      { label: "TANYA JAWAB", color: "bg-orange-100 text-orange-600" },
    ],
    postedAgo: "Posted 5h ago",
    title: "Bagaimana Cara Implementasi RAG (Retrieval Augmented Generation) di Local?",
    description:
      "Saya sedang mencoba menjalankan Llama3 secara local, tapi masih bingung bagaimana cara menghubungkan dokumen PDF saya ke model tersebut agar hasilnya akurat.",
    author: "Sarah J.",
    authorInitial: "SJ",
    authorBg: "bg-slate-400",
    comments: 12,
    likes: 45,
    hasImage: false,
  },
]

export default function CommunityPage() {
  const navigate = useNavigate()
  const [selectedTracks, setSelectedTracks] = useState<string[]>(["Web Dev"])
  const [selectedKategori, setSelectedKategori] = useState("Sharing Project")
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  const toggleTrack = (track: string) => {
    setSelectedTracks((prev) =>
      prev.includes(track) ? prev.filter((t) => t !== track) : [...prev, track]
    )
  }

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Study Hub & Open Forum</h1>
          <p className="mt-1 text-sm text-slate-500">
            Diskusi Dengan Komunitas, Sharing Progress, Dan Tanya-Jawab Seputar Project
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/community/create")}
          className="shrink-0 rounded-2xl bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 transition shadow-sm"
        >
          + Buat Thread
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[220px_1fr]">

        {/* Left sidebar — filters */}
        <div className="space-y-6">

          {/* Filter Track */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-0.5 h-4 bg-orange-500 rounded-full" />
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">Filter Track</p>
            </div>
            <div className="space-y-2">
              {trackFilters.map((track) => {
                const checked = selectedTracks.includes(track)
                return (
                  <label
                    key={track}
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => toggleTrack(track)}
                  >
                    <div className={`h-4 w-4 rounded border-2 flex items-center justify-center transition ${
                      checked ? "bg-blue-900 border-blue-900" : "border-slate-300 group-hover:border-slate-400"
                    }`}>
                      {checked && (
                        <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 10 8" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M1 4l3 3 5-5" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm font-medium transition ${checked ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"}`}>
                      {track}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Filter Kategori */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400 mb-3">Filter Kategori</p>
            <div className="space-y-0.5">
              {kategoriFilters.map((kat) => {
                const active = selectedKategori === kat
                return (
                  <button
                    key={kat}
                    onClick={() => setSelectedKategori(kat)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                      active
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {kat}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right — threads */}
        <div className="space-y-4">

          {/* Sort + count bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>Urutkan:</span>
              <button className="flex items-center gap-1 font-semibold text-slate-900 hover:text-blue-600 transition">
                Terbaru
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-sm text-slate-500 font-medium">124 Threads Found</p>
          </div>

          {/* Thread list */}
          <div className="space-y-3">
            {threads.map((thread) => (
              <div
                key={thread.id}
                onClick={() => navigate(`/dashboard/community/${thread.id}`)}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
              >
                <div className="flex gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Tags + time */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {thread.tags.map((tag) => (
                        <span
                          key={tag.label}
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] ${tag.color}`}
                        >
                          {tag.label}
                        </span>
                      ))}
                      <span className="ml-auto text-xs text-slate-400">{thread.postedAgo}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {thread.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2">
                      {thread.description}
                    </p>

                    {/* Author + stats */}
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className={`h-8 w-8 rounded-full ${thread.authorBg} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                          {thread.authorInitial}
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{thread.author}</span>
                      </div>
                      <div className="flex items-center gap-3 ml-2 text-slate-400 text-sm">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {thread.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {thread.likes}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Image thumbnail */}
                  {thread.hasImage && (
                    <div className="shrink-0 hidden sm:block">
                      <div className="h-28 w-44 rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center">
                        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 p-3">
                          <div className="space-y-1.5">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className="h-1.5 rounded-full bg-slate-600"
                                style={{ width: `${60 + Math.random() * 35}%`, opacity: 0.6 + i * 0.05 }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 pt-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition disabled:opacity-30"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition ${
                  currentPage === page
                    ? "bg-slate-900 text-white shadow"
                    : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}

            <span className="px-1 text-slate-400 text-sm">...</span>

            <button
              onClick={() => setCurrentPage(totalPages)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition ${
                currentPage === totalPages
                  ? "bg-slate-900 text-white shadow"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {totalPages}
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition disabled:opacity-30"
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
