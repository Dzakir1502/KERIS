import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Send, Paperclip, Info } from "lucide-react"

const mentorsByProject: Record<string, { name: string; initials: string; role: string; bg: string; projectTitle: string; online: boolean }> = {
  "1": {
    name: "Sarah Chen",
    initials: "SC",
    bg: "bg-teal-600",
    role: "Senior Architect Mentor",
    projectTitle: "Sustainable Urban Shell",
    online: true,
  },
  "2": {
    name: "James Wiraputra",
    initials: "JW",
    bg: "bg-purple-700",
    role: "UI/UX Lead Mentor",
    projectTitle: "E-Health Interface",
    online: false,
  },
  "3": {
    name: "Arief Wibowo",
    initials: "AW",
    bg: "bg-slate-700",
    role: "Design Critique Mentor",
    projectTitle: "Brutalist Revival Loft",
    online: true,
  },
}

const initialMessages = [
  {
    id: 1,
    from: "mentor",
    text: "Halo! Ada yang bisa saya bantu terkait projectmu? Silakan sampaikan pertanyaan atau kendala yang kamu hadapi.",
    time: "10:30",
  },
  {
    id: 2,
    from: "user",
    text: "Halo Mentor! Saya ingin bertanya mengenai feedback pada bagian podium section. Apakah saya perlu mengubah seluruh struktur atau hanya detail sambungannya saja?",
    time: "10:45",
  },
  {
    id: 3,
    from: "mentor",
    text: "Pertanyaan bagus! Cukup fokus pada detail sambungan modul sudut saja. Struktur utamanya sudah solid. Yang perlu diperkuat adalah area transisi antara modul horizontal dan vertikal — tambahkan notasi teknis di gambar kerja untuk memperjelas.",
    time: "11:02",
  },
]

export default function HubungiMentorPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const mentor = mentorsByProject[projectId ?? "1"] ?? mentorsByProject["1"]

  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        from: "user",
        text: input.trim(),
        time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      },
    ])
    setInput("")
    // Simulate mentor typing reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          from: "mentor",
          text: "Terima kasih atas pesanmu. Saya sedang melihat detail projectmu dan akan memberikan tanggapan segera.",
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    }, 1500)
  }

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Back */}
      <button
        onClick={() => navigate(`/dashboard/mentor/${projectId}`)}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400 hover:text-slate-900 transition self-start"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Detail Project
      </button>

      <div className="grid gap-6 xl:grid-cols-[1fr_260px] flex-1">
        {/* ── Chat area ── */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden" style={{ minHeight: "70vh" }}>

          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50">
            <div className="relative">
              <div className={`h-10 w-10 rounded-full ${mentor.bg} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                {mentor.initials}
              </div>
              {mentor.online && (
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{mentor.name}</p>
              <p className="text-xs text-slate-400">
                {mentor.role} ·{" "}
                <span className={mentor.online ? "text-green-500 font-medium" : "text-slate-400"}>
                  {mentor.online ? "Online" : "Offline"}
                </span>
              </p>
            </div>
            <div className="ml-auto rounded-xl bg-blue-50 border border-blue-100 px-3 py-1.5 text-xs text-blue-700 font-semibold">
              📁 {mentor.projectTitle}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {/* Date divider */}
            <div className="flex items-center justify-center">
              <span className="rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold text-slate-400">
                Hari ini
              </span>
            </div>

            {messages.map((msg) => {
              const isMentor = msg.from === "mentor"
              return (
                <div key={msg.id} className={`flex items-end gap-2 ${isMentor ? "" : "flex-row-reverse"}`}>
                  {isMentor && (
                    <div className={`h-8 w-8 rounded-full ${mentor.bg} flex items-center justify-center text-xs font-bold text-white shrink-0 mb-0.5`}>
                      {mentor.initials}
                    </div>
                  )}
                  <div className={`max-w-[75%] space-y-1 ${isMentor ? "" : "items-end flex flex-col"}`}>
                    <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isMentor
                        ? "rounded-tl-none bg-slate-100 text-slate-700"
                        : "rounded-tr-none bg-blue-900 text-white"
                    }`}>
                      {msg.text}
                    </div>
                    <p className="text-[10px] text-slate-400 px-1">{msg.time}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Input */}
          <div className="border-t border-slate-100 p-4 bg-slate-50">
            <div className="flex items-end gap-2">
              <button className="h-9 w-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition shrink-0">
                <Paperclip className="h-4 w-4" />
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Tulis pesan ke mentor... (Enter untuk kirim)"
                rows={2}
                className="flex-1 resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition ${
                  input.trim() ? "bg-blue-900 text-white hover:bg-blue-800" : "bg-slate-100 text-slate-300"
                }`}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-[10px] text-center text-slate-300">
              Shift + Enter untuk baris baru
            </p>
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="space-y-4">

          {/* Mentor info */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Info Mentor</h3>
            <div className="flex flex-col items-center text-center gap-3">
              <div className={`h-16 w-16 rounded-2xl ${mentor.bg} flex items-center justify-center text-lg font-bold text-white`}>
                {mentor.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{mentor.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{mentor.role}</p>
                <span className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                  mentor.online ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${mentor.online ? "bg-green-500" : "bg-slate-400"}`} />
                  {mentor.online ? "Online sekarang" : "Sedang offline"}
                </span>
              </div>
            </div>
          </div>

          {/* Context */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Konteks Diskusi</h3>
            <div className="rounded-xl bg-blue-50 border border-blue-100 p-3 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600">Project</p>
              <p className="text-sm font-semibold text-blue-900">{mentor.projectTitle}</p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pesan ini terkait langsung dengan project di atas. Mentor dapat langsung melihat submission kamu saat membalas.
            </p>
          </div>

          {/* Etiquette */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-900">Etika Komunikasi</h3>
            </div>
            <ul className="space-y-2">
              {[
                "Sampaikan pertanyaan dengan jelas dan spesifik.",
                "Sertakan konteks atau screenshot jika perlu.",
                "Hormati waktu respons mentor (1–2 hari kerja).",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="text-blue-400 text-sm shrink-0">•</span>
                  <span className="text-xs text-slate-500 leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
