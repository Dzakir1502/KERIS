import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  Camera, CheckCircle2, Bot, MapPin,
  User, Lock, ChevronRight, CreditCard, Shield
} from "lucide-react"

const TABS = [
  { id: "akun", label: "Informasi Akun", icon: User },
  { id: "keamanan", label: "Keamanan", icon: Lock },
  { id: "langganan", label: "Langganan", icon: CreditCard },
]

function AkunTab() {
  const [nama, setNama] = useState("Aris Setiawan")
  const [email] = useState("aris.setiawan@keris.id")
  const [lokasi, setLokasi] = useState("Jakarta, Indonesia")
  const [bio, setBio] = useState(
    "Digital Architect dengan minat mendalam pada pengembangan karir berbasis teknologi AI dan kolaborasi komunitas kreatif."
  )
  const maxBio = 500
  const fileRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  return (
    <div className="grid gap-6 xl:grid-cols-[220px_1fr]">

      {/* Left — photo */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col items-center text-center space-y-4">
          {/* Avatar */}
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-teal-500 flex items-center justify-center text-3xl font-bold text-white overflow-hidden">
              A
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-white hover:bg-blue-800 transition shadow"
            >
              <Camera className="h-4 w-4" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" />
          </div>
          <div>
            <p className="text-sm font-bold text-blue-600">Foto Profil</p>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Gunakan foto wajah yang jelas agar rekan tim mudah mengenali Anda.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Ganti Foto
            </button>
            <button className="text-xs font-semibold text-red-400 hover:text-red-600 transition">
              Hapus
            </button>
          </div>
        </div>

        {/* Verified badge */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-slate-900">Akun Terverifikasi</p>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              Profil Anda telah diverifikasi oleh tim KERIS untuk keamanan kolaborasi.
            </p>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">

          {/* Nama + Email */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.18em]">Nama Lengkap</label>
              <input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.18em]">Email</label>
              <input
                value={email}
                readOnly
                className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-sm text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Lokasi */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.18em]">Lokasi</label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
              <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
              <input
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                className="flex-1 bg-transparent text-sm text-slate-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.18em]">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, maxBio))}
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition"
            />
            <p className="text-right text-[11px] text-slate-400">
              {bio.length} / {maxBio} karakter
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <button
              onClick={() => navigate("/dashboard/profile")}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Batal
            </button>
            <button className="rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-800 transition shadow-sm">
              Simpan Perubahan
            </button>
          </div>
        </div>

        {/* AI Optimize card */}
        <div className="rounded-2xl bg-blue-900 p-5 flex items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-800">
            <Bot className="h-5 w-5 text-orange-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Optimalkan Profil dengan AI</p>
            <p className="text-xs text-blue-300 mt-0.5 leading-relaxed">
              Biarkan asisten AI kami membantu menulis Bio yang menarik berdasarkan pengalaman Anda.
            </p>
          </div>
          <button className="shrink-0 rounded-xl bg-orange-500 px-4 py-2 text-xs font-bold text-white hover:bg-orange-600 transition">
            Tulis dengan AI
          </button>
        </div>
      </div>
    </div>
  )
}

function KeamananTab() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
      <h2 className="text-base font-bold text-slate-900">Keamanan Akun</h2>
      <div className="space-y-4">
        {["Password Saat Ini", "Password Baru", "Konfirmasi Password Baru"].map((label) => (
          <div key={label} className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.18em]">{label}</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-2 border-t border-slate-100">
        <button className="rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-800 transition">
          Perbarui Password
        </button>
      </div>
    </div>
  )
}

function LanggananTab() {
  const plans = [
    {
      id: "basic",
      name: "Basic Learner",
      price: "Gratis",
      priceLabel: null,
      desc: "Mulai perjalanan AI Anda dengan akses dasar ke komunitas dan workspace publik.",
      cta: "Paket Saat Ini",
      ctaStyle: "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-400 cursor-not-allowed",
      popular: false,
      current: false,
    },
    {
      id: "pro",
      name: "Pro Learner",
      price: "Rp 149k",
      priceLabel: "/bln",
      desc: "Sempurna untuk individu yang ingin memperdalam keahlian AI secara profesional.",
      cta: "Sedang Digunakan",
      ctaStyle: "w-full rounded-xl border-2 border-blue-900 bg-white px-4 py-2 text-sm font-bold text-blue-900",
      popular: true,
      current: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      priceLabel: null,
      desc: "Solusi lengkap untuk institusi dan tim korporat dengan dukungan prioritas.",
      cta: "Hubungi Sales",
      ctaStyle: "w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800 transition",
      popular: false,
      current: false,
    },
  ]

  return (
    <div className="space-y-5">

      {/* Current plan + upgrade */}
      <div className="grid gap-4 xl:grid-cols-[1fr_280px]">

        {/* Current plan card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="inline-block rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white">Aktif</span>
              <h2 className="text-2xl font-black text-blue-900">Pro Learner</h2>
              <p className="text-sm text-slate-400">Paket tahunan otomatis diperbarui</p>
            </div>
            <Shield className="h-8 w-8 text-slate-200" />
          </div>

          {/* Meta */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Berlaku Hingga</p>
              <p className="mt-1 text-sm font-bold text-slate-900">24 Okt 2024</p>
            </div>
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Metode Pembayaran</p>
              <p className="mt-1 text-sm font-bold text-slate-900">•••• 8821</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <p className="text-sm font-bold text-slate-700">Manfaat Utama:</p>
            {[
              "Akses tak terbatas ke semua Career Path AI",
              "Workspace Pro dengan kapasitas cloud 50GB",
              "Sesi mentoring eksklusif 2x setiap bulan",
            ].map((b) => (
              <div key={b} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0" />
                <span className="text-sm text-slate-600">{b}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button className="rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-800 transition">
              Kelola Langganan
            </button>
            <button className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
              Riwayat Tagihan
            </button>
          </div>
        </div>

        {/* Upgrade card */}
        <div className="rounded-2xl bg-blue-900 p-6 space-y-4">
          <h3 className="text-xl font-black text-white leading-snug">Butuh Lebih Banyak Kekuatan?</h3>
          <p className="text-sm text-blue-200 leading-relaxed">
            Tingkatkan ke paket{" "}
            <span className="font-bold text-orange-400">Enterprise Elite</span>{" "}
            untuk tim. Dapatkan akses ke infrastruktur AI kustom dan kolaborasi proyek skala besar.
          </p>
          <div className="space-y-2">
            {["Hingga 20 Anggota Tim", "Akses API Premium Terintegrasi"].map((f) => (
              <div key={f} className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500 shrink-0">
                  <ChevronRight className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-sm font-semibold text-white">{f}</span>
              </div>
            ))}
          </div>
          <button className="w-full rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white hover:bg-orange-600 transition">
            Upgrade ke Enterprise
          </button>
        </div>
      </div>

      {/* Other plans */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Paket Lainnya</h3>
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition">Lihat perbandingan lengkap</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.id} className={`rounded-2xl border p-5 space-y-3 ${
              plan.current ? "border-blue-900 shadow-sm" : "border-slate-200 bg-white"
            }`}>
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-slate-500">{plan.name}</p>
                {plan.popular && (
                  <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white">Terpopuler</span>
                )}
              </div>
              <p className="text-2xl font-black text-slate-900">
                {plan.price}
                {plan.priceLabel && <span className="text-sm font-semibold text-slate-400">{plan.priceLabel}</span>}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">{plan.desc}</p>
              <button className={plan.ctaStyle}>{plan.cta}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Investment banner */}
      <div className="rounded-2xl bg-blue-900 p-8 space-y-2 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #38bdf8 0%, transparent 60%)" }}
        />
        <h3 className="text-xl font-black text-white relative">Investasi untuk Masa Depan</h3>
        <p className="text-sm text-blue-200 max-w-md leading-relaxed relative">
          Dengan berlangganan, Anda juga berkontribusi pada pengembangan kurikulum AI terbuka untuk talenta lokal.
        </p>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("akun")

  return (
    <div className="space-y-6">
      {/* Header — dynamic per tab */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          {activeTab === "akun" && "Informasi Akun"}
          {activeTab === "keamanan" && "Keamanan"}
          {activeTab === "langganan" && "Langganan Anda"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {activeTab === "akun" && "Perbarui detail profil dan cara orang lain melihat Anda di platform."}
          {activeTab === "keamanan" && "Atur password dan keamanan akun Anda."}
          {activeTab === "langganan" && "Pilih paket yang sesuai dengan kebutuhan pengembangan karir dan pembelajaran AI Anda."}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-1 w-fit">
        {TABS.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      {activeTab === "akun" && <AkunTab />}
      {activeTab === "keamanan" && <KeamananTab />}
      {activeTab === "langganan" && <LanggananTab />}
    </div>
  )
}
