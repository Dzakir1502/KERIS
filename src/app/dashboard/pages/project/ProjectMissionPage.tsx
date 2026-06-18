import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft, FileText, ChevronRight, Mail,
  Code2, Database, BarChart3, CheckCircle2,
  BrainCircuit, Layers, LineChart,
} from "lucide-react"

const MISSIONS: Record<string, {
  level: string
  roadmapTitle: string
  subtitle: string
  email: { from: string; to: string; subject: string; paragraphs: string[]; quote: string }
  missionBrief: { profesi: string; tugas: string; konteks: string; label: string }
  roadmap: { icon: React.ReactNode; stage: string; title: string; desc: string }[]
  roadmapDesc: string
  closingQuote: string
  objectives: string[]
  technologies: string[]
}> = {
  "1": {
    level: "Level 1",
    roadmapTitle: "🗺️ Level 1 — AI Foundations Roadmap",
    subtitle: "Membangun Pipeline Analisis Data Performa Siswa",
    email: {
      from: "Tech Lead & Mentor Utama",
      to: "Junior AI Engineer (Karyawan Baru)",
      subject: "Welcome to the team!",
      paragraphs: [
        "Selamat pagi! Silakan letakkan tasmu, siapkan workspace-mu, dan selamat bergabung di tim **Basudara Company**. Saya adalah Tech Lead sekaligus mentormu di sini.",
        "Mulai detik ini, statusmu bukan lagi sekadar mahasiswa yang duduk mencatat teori di kelas — kamu telah resmi menjabat sebagai **Junior AI Engineer** kami. Melalui program **KERIS (Knowledge Experience & Roadmap for IT Students)**, kita akan menjalankan simulasi profesi IT standar industri yang sesungguhnya.",
        "Masa onboarding ini tidak akan diisi dengan membaca modul tebal yang membosankan. Kamu akan langsung terjun ke lapangan, menerima task ticket, membedah dataset yang kotor, dan merancang logika AI untuk memecahkan masalah klien nyata.",
        "Setiap kode yang kamu ketik di sini adalah cerminan pekerjaan sehari-hari di dunia industri, yang pada akhirnya akan menjadi **portofolio profesionalmu**.",
      ],
      quote: "Kopimu sudah siap? Nyalakan laptopmu, dan mari kita mulai briefing proyek sprint pertamamu hari ini!",
    },
    missionBrief: {
      label: "🏢 Misi Pertamamu (Onboarding)",
      profesi: "Junior AI Engineer",
      tugas: "Membangun Pipeline Analisis Data Performa Siswa",
      konteks:
        "Perusahaan edu-tech meminta tim menganalisis data riwayat belajar siswa yang masih kotor, membersihkannya, dan membuat program otomatis untuk memvisualisasikan faktor apa yang membuat siswa lulus atau gagal.",
    },
    roadmap: [
      {
        icon: <Code2 className="h-4 w-4" />,
        stage: "Tahap 1",
        title: "Python Fundamentals",
        desc: "Kamu mampu merancang fondasi logika dasar program menggunakan variabel, fungsi, dan struktur perulangan (loop).",
      },
      {
        icon: <Database className="h-4 w-4" />,
        stage: "Tahap 2",
        title: "Data Handling",
        desc: "Kamu mampu menggunakan library industri untuk mengubah data mentah yang berantakan menjadi tabel terstruktur yang siap dianalisis AI.",
      },
      {
        icon: <BarChart3 className="h-4 w-4" />,
        stage: "Tahap 3",
        title: "Data Visualization",
        desc: "Kamu mampu menerjemahkan angka-angka membosankan menjadi cerita visual dan grafik (insight) untuk memukau klien.",
      },
    ],
    roadmapDesc:
      "Susun kode dari setiap tahap secara berurutan ke dalam satu file Python untuk menghasilkan pipeline analitik yang utuh.",
    closingQuote:
      "Saat kamu berhasil mengumpulkan dan menyusun baris kode dari Clue 1 hingga 9 secara berurutan ke dalam satu file .py, kamu akan menghasilkan sebuah pipeline data analitik yang utuh. Ini bukan sekadar hafalan teori, tapi program nyata standar industri yang akan menjadi portofoliomu. Let's get to work!",
    objectives: [
      "Merancang fondasi logika dasar program menggunakan variabel, fungsi, dan loop",
      "Menggunakan library Pandas untuk mengubah data mentah menjadi tabel terstruktur",
      "Membuat visualisasi data yang informatif untuk memukau klien",
      "Membangun satu pipeline analitik Python yang utuh dan siap dijalankan",
    ],
    technologies: ["Python", "Pandas", "Matplotlib", "Seaborn", "NumPy"],
  },

  "2": {
    level: "Level 2",
    roadmapTitle: "🗺️ Level 2 — AI Prediction Roadmap",
    subtitle: "Membangun Pipeline Machine Learning Prediksi Kelulusan Siswa",
    email: {
      from: "Tech Lead & Mentor Utama",
      to: "Machine Learning Engineer",
      subject: "Welcome to AI Prediction Division!",
      paragraphs: [
        "Selamat datang kembali di **Basudara Company**. Kamu telah menyelesaikan onboarding pertama sebagai Junior AI Engineer dan berhasil membangun pipeline analisis data siswa.",
        "Namun, klien kita sekarang memiliki permintaan yang lebih menantang. Mereka tidak lagi hanya ingin melihat laporan data. Mereka ingin sistem yang dapat **mengambil keputusan dan memprediksi masa depan**.",
        "Mulai hari ini, kamu naik level menjadi **Machine Learning Engineer**. Di sprint kali ini, tugasmu bukan sekadar membersihkan data atau membuat grafik. Kamu akan mengajarkan komputer mengenali pola belajar siswa, lalu memprediksi apakah siswa akan lulus atau gagal secara otomatis.",
        "Siapkan laptopmu, buka code editor, dan mari mulai proyek berikutnya!",
      ],
      quote: "Siapkan laptopmu, buka code editor, dan mari mulai proyek berikutnya!",
    },
    missionBrief: {
      label: "🏢 Misi Kedua (Sprint Project)",
      profesi: "Machine Learning Engineer",
      tugas: "Membangun Pipeline Machine Learning Prediksi Kelulusan Siswa",
      konteks:
        "Perusahaan edu-tech ingin sistem yang bukan hanya menganalisis data siswa, tetapi juga memprediksi apakah siswa akan lulus atau gagal secara otomatis. Proyek ini dibagi menjadi 9 kepingan puzzle (Clue Card). Jika seluruh kode dari Clue 1–9 digabungkan secara berurutan, akan terbentuk sebuah pipeline Machine Learning lengkap.",
    },
    roadmap: [
      {
        icon: <Layers className="h-4 w-4" />,
        stage: "Tahap 1",
        title: "Feature Engineering & Data Preparation",
        desc: "Kamu mampu menyiapkan data agar dapat dipahami model AI.",
      },
      {
        icon: <BrainCircuit className="h-4 w-4" />,
        stage: "Tahap 2",
        title: "Machine Learning Fundamentals",
        desc: "Kamu mampu melatih model AI sederhana untuk memprediksi hasil.",
      },
      {
        icon: <LineChart className="h-4 w-4" />,
        stage: "Tahap 3",
        title: "AI Evaluation & Insight",
        desc: "Kamu mampu mengukur performa model AI dan menjelaskan hasilnya.",
      },
    ],
    roadmapDesc:
      "Susun kode dari setiap tahap secara berurutan ke dalam satu file Python untuk menghasilkan pipeline Machine Learning yang utuh.",
    closingQuote:
      "Itu dia tiket sprint keduamu! Saat kamu berhasil mengumpulkan dan menyusun baris kode dari Clue 1 hingga 9 secara berurutan ke dalam satu file .py, kamu akan menghasilkan sebuah pipeline Machine Learning yang utuh. Di level ini, kamu tidak lagi hanya membersihkan dan menganalisis data seperti sebelumnya. Sekarang kamu mulai mengajari komputer mengenali pola, belajar dari data, dan membuat prediksi secara otomatis. Ini bukan sekadar hafalan algoritma atau teori di kelas, tetapi simulasi pekerjaan nyata seorang Machine Learning Engineer. Buka code editor-mu, latih model AI-mu, dan buktikan kemampuanmu layaknya seorang Engineer sungguhan. Let's build intelligence!",
    objectives: [
      "Menyiapkan dan mentransformasi fitur data agar dapat dipahami model AI",
      "Melatih model Machine Learning sederhana untuk memprediksi kelulusan siswa",
      "Mengukur dan mengevaluasi performa model AI menggunakan metrik yang tepat",
      "Membangun pipeline Machine Learning yang utuh dan siap dijalankan",
    ],
    technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "NumPy"],
  },
}

function renderParagraph(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <span key={i} className="font-semibold text-slate-800">{part}</span>
      : <span key={i}>{part}</span>
  )
}

export default function ProjectMissionPage() {
  const navigate = useNavigate()
  const { levelId } = useParams<{ levelId: string }>()
  const mission = MISSIONS[levelId ?? "1"]

  if (!mission) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-400">
        Mission tidak ditemukan.
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Back button */}
      <button
        onClick={() => navigate("/dashboard/project/dashboard")}
        className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Project Dashboard
      </button>

      {/* Header card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-3">
          <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-600">
            {mission.level}
          </span>
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-green-700">
            Active
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-400">{mission.roadmapTitle.replace(/^🗺️\s/, "")}</span>
        </div>

        <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Project Mission</h1>
            <p className="mt-0.5 text-sm text-slate-500">{mission.subtitle}</p>
          </div>
          <div className="flex shrink-0 gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              <FileText className="h-4 w-4" />
              Brief PDF
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-blue-900/20 transition hover:bg-blue-800">
              Start Mission
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">

        {/* LEFT */}
        <div className="space-y-6">

          {/* Email scenario */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Skenario Proyek (Roleplay Industri)</h2>
            </div>

            <div className="mb-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 space-y-1">
              <p className="text-xs text-slate-500">
                <span className="font-bold text-slate-700">Dari:</span> {mission.email.from}
              </p>
              <p className="text-xs text-slate-500">
                <span className="font-bold text-slate-700">Kepada:</span> {mission.email.to}
              </p>
              <p className="text-xs text-slate-500">
                <span className="font-bold text-slate-700">Subjek:</span>{" "}
                <span className="italic">{mission.email.subject}</span>
              </p>
            </div>

            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              {mission.email.paragraphs.map((p, i) => (
                <p key={i}>{renderParagraph(p)}</p>
              ))}
              <blockquote className="rounded-xl border-l-4 border-orange-400 bg-orange-50 px-4 py-3 text-sm italic text-slate-700">
                "{mission.email.quote}"
              </blockquote>
            </div>
          </div>

          {/* Mission brief */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-bold text-slate-900">{mission.missionBrief.label}</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3">
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 w-28 shrink-0">Profesi</span>
                <span className="text-sm font-semibold text-slate-800">{mission.missionBrief.profesi}</span>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3">
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 w-28 shrink-0">Tugas Utama</span>
                <span className="text-sm text-slate-700">{mission.missionBrief.tugas}</span>
              </div>
              <div className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3">
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 w-28 shrink-0">Konteks</span>
                <span className="text-sm text-slate-700">{mission.missionBrief.konteks}</span>
              </div>
            </div>
          </div>

          {/* Roadmap */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-base font-bold text-slate-900">{mission.roadmapTitle}</h2>
            <p className="mb-5 text-sm text-slate-500">{mission.roadmapDesc}</p>
            <div className="space-y-4">
              {mission.roadmap.map((s, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
                      {s.icon}
                    </div>
                    {i < mission.roadmap.length - 1 && (
                      <div className="mt-1 h-8 w-px bg-slate-200" />
                    )}
                  </div>
                  <div className="pt-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-500">{s.stage}</p>
                    <p className="text-sm font-bold text-slate-900">{s.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-blue-900 p-4">
              <p className="text-xs text-blue-200 leading-relaxed italic">
                "{mission.closingQuote}"
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">— Tech Lead</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-5">

          {/* Objektif Pembelajaran */}
          <div className="rounded-2xl bg-orange-500 p-5 text-white">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.18em]">Objektif Pembelajaran</h3>
            <ul className="space-y-2.5">
              {mission.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-200" />
                  <span className="text-xs leading-relaxed text-orange-50">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Teknologi</h3>
            <div className="flex flex-wrap gap-2">
              {mission.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
