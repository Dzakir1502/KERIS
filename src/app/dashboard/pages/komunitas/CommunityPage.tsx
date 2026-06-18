import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { MessageCircle, Heart, ChevronDown, ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import communityAPI, { type Thread } from "@/services/communityAPI"

const trackFilters = ["Opini", "Web Dev", "Mobile Dev", "AI"]
const kategoriFilters = ["Tanya Jawab", "Sharing Project", "Guest Discussion", "Tips & Clue Cards", "General"]

export default function CommunityPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [selectedTracks, setSelectedTracks] = useState<string[]>(["Web Dev"])
  const [selectedKategori, setSelectedKategori] = useState("Sharing Project")
  const [currentPage, setCurrentPage] = useState(1)
  const [sort, setSort] = useState<"latest" | "trending">("latest")

  const [threads, setThreads] = useState<Thread[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const limit = 10
  const totalPages = Math.ceil(totalCount / limit)

  // useCallback agar referensi stabil — mencegah infinite effect loop
  const fetchThreads = useCallback(async (page: number, kategori: string, sortBy: "latest" | "trending") => {
    try {
      setLoading(true)
      setError("")

      const res = await communityAPI.getAllThreads({
        page,
        limit,
        category: kategori,
        sort: sortBy,
      })

      const data = res.data.data
      setThreads(data.data || [])
      setTotalCount(data.pagination?.total || 0)
    } catch (err: any) {
      console.error("Failed to fetch threads:", err)
      // Jika backend mati / belum berjalan, tampilkan pesan ramah
      if (!err.response) {
        setError("Tidak dapat terhubung ke server. Pastikan backend sudah berjalan di port 5000.")
      } else {
        setError(err.response?.data?.message || "Gagal memuat threads")
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // Satu useEffect tunggal — semua dependency digabung
  // Reset page ke 1 saat filter berubah, fetch dengan page baru
  useEffect(() => {
    setCurrentPage(1)
    fetchThreads(1, selectedKategori, sort)
  }, [selectedKategori, sort, fetchThreads])

  // Effect terpisah hanya untuk perubahan page (tidak reset filter)
  useEffect(() => {
    if (currentPage === 1) return // sudah dihandle effect di atas
    fetchThreads(currentPage, selectedKategori, sort)
  }, [currentPage])

  const toggleTrack = (track: string) => {
    setSelectedTracks((prev) =>
      prev.includes(track) ? prev.filter((t) => t !== track) : [...prev, track]
    )
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

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()

  const getAvatarColor = (id: number) => {
    const colors = ["bg-blue-600", "bg-teal-600", "bg-purple-600", "bg-pink-600", "bg-orange-600"]
    return colors[id % colors.length]
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
        {/* Sidebar filter */}
        <div className="space-y-6">
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
                      active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {kat}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Thread list */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>Urutkan:</span>
              <button
                onClick={() => setSort(sort === "latest" ? "trending" : "latest")}
                className="flex items-center gap-1 font-semibold text-slate-900 hover:text-blue-600 transition"
              >
                {sort === "latest" ? "Terbaru" : "Trending"}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="text-sm text-slate-500 font-medium">{totalCount} Threads Found</p>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-900">Terjadi Kesalahan</p>
                <p className="text-xs text-red-700 mt-0.5">{error}</p>
                <button
                  onClick={() => fetchThreads(currentPage, selectedKategori, sort)}
                  className="mt-2 text-xs font-semibold text-red-600 hover:underline"
                >
                  Coba lagi
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-sm text-slate-500">Memuat threads...</p>
            </div>
          ) : threads.length === 0 && !error ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <p className="text-sm text-slate-500">Tidak ada threads untuk kategori ini</p>
              <button
                onClick={() => navigate("/dashboard/community/create")}
                className="mt-4 rounded-xl bg-blue-900 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition"
              >
                Buat Thread Pertama
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {threads.map((thread) => (
                  <div
                    key={thread.id}
                    onClick={() => navigate(`/dashboard/community/${thread.id}`)}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
                  >
                    <div className="flex gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] bg-blue-100 text-blue-700">
                            {thread.category}
                          </span>
                          <span className="ml-auto text-xs text-slate-400">{formatTimeAgo(thread.createdAt)}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 leading-snug">{thread.title}</h3>
                        <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2">
                          {(thread.content ?? "").substring(0, 150)}{(thread.content ?? "").length > 150 ? "..." : ""}
                        </p>
                        <div className="mt-4 flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className={`h-8 w-8 rounded-full ${getAvatarColor(thread.authorId)} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                              {getInitials(thread.author?.nama_lengkap || "User")}
                            </div>
                            <span className="text-sm font-semibold text-slate-700">
                              {thread.author?.nama_lengkap || "Unknown"}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 ml-2 text-slate-400 text-sm">
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              {Array.isArray(thread.replies) ? thread.replies.length : 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {thread.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 pt-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition disabled:opacity-30"
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {[...Array(Math.min(3, totalPages))].map((_, i) => {
                    const page = i + 1
                    return (
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
                    )
                  })}

                  {totalPages > 3 && <span className="px-1 text-slate-400 text-sm">...</span>}

                  {totalPages > 3 && (
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
                  )}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition disabled:opacity-30"
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}