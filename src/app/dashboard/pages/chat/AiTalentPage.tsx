import { Paperclip, Mic, Image, Send, CheckCircle2 } from "lucide-react"

export default function AiTalentPage() {
  return (
    <div className="flex flex-col h-full min-h-screen bg-white rounded-3xl shadow-sm overflow-hidden">

      {/* Date divider */}
      <div className="flex items-center justify-center py-6">
        <span className="rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Sesi Hari Ini
        </span>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-6">

        {/* Bot message 1 */}
        <div className="flex items-start gap-4">
          <BotAvatar />
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">KEBOT</span>
              <span className="text-xs text-slate-400 font-medium">AI Talent Scout</span>
            </div>
            <div className="rounded-2xl rounded-tl-none bg-slate-100 px-5 py-4 text-sm text-slate-700 leading-relaxed max-w-xl space-y-2">
              <p>
                Halo! Aku telah menganalisis pengiriman proyek terkinimu di{" "}
                <span className="font-semibold text-blue-600">Architectural Core</span>. Skor
                penalaran spasialmu masuk 5% teratas di kohort ini.
              </p>
              <p>
                Aku telah menyiapkan simulasi baru tentang perencanaan kota berkelanjutan. Apakah kamu ingin
                memulai penilaiannya sekarang?
              </p>
            </div>
          </div>
        </div>

        {/* User message */}
        <div className="flex items-end justify-end gap-4">
          <div className="flex-1 flex flex-col items-end space-y-1">
            <span className="text-sm font-bold text-slate-900 pr-1">Kamu</span>
            <div className="rounded-2xl rounded-br-none bg-slate-900 px-5 py-4 text-sm text-white leading-relaxed max-w-xl">
              <p>
                Kedengarannya menarik, Keris. Aku sangat tertarik, tapi aku ingin
                bertanya—apakah simulasi ini mencakup regulasi bangunan hijau terbaru untuk kawasan
                Singapura?
              </p>
            </div>
          </div>
          <UserAvatar />
        </div>

        {/* Bot message 2 */}
        <div className="flex items-start gap-4">
          <BotAvatar />
          <div className="flex-1 space-y-1">
            <span className="text-sm font-bold text-slate-900">KEBOT</span>
            <div className="rounded-2xl rounded-tl-none bg-slate-100 px-5 py-4 text-sm text-slate-700 leading-relaxed max-w-xl space-y-3">
              <p>
                <span className="font-semibold">Pertanyaan yang bagus.</span> Ya, simulasi
                ini mencakup pembaruan Green Mark Framework 2024. Fokus khusus pada:
              </p>
              <ul className="space-y-2">
                {[
                  "Pemodelan Kecerdasan Energi & Performa",
                  "Optimasi Jejak Karbon melalui Kurasi Material",
                  "Kesetaraan Sosial melalui Desain Biofilik",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 text-sm font-semibold transition">
                  Start Simulation
                </button>
                <button className="rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 px-5 py-2 text-sm font-semibold transition">
                  Review Pre-Reading
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Chat Input */}
      <div className="px-6 pb-6 pt-2">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm px-5 py-4">
          <input
            type="text"
            placeholder="Ketik pesanmu ke Keris..."
            className="w-full bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-4 text-slate-400">
              <button className="hover:text-slate-600 transition"><Paperclip className="h-5 w-5" /></button>
              <button className="hover:text-slate-600 transition"><Mic className="h-5 w-5" /></button>
              <button className="hover:text-slate-600 transition"><Image className="h-5 w-5" /></button>
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white transition shadow-md">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function BotAvatar() {
  return (
    <div className="shrink-0 h-11 w-11 rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
      <span className="text-xl">🤖</span>
    </div>
  )
}

function UserAvatar() {
  return (
    <div className="shrink-0 h-11 w-11 rounded-full bg-slate-300 flex items-center justify-center shadow-sm">
      <span className="text-xl">👤</span>
    </div>
  )
}
