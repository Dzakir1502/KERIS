import { useState } from "react"
import { Search, ArrowRight, Monitor, Smartphone, BrainCircuit } from "lucide-react"

const careers = [
  {
    id: "ai-engineer",
    icon: BrainCircuit,
    badge: "Tinggi Permintaan",
    badgeColor: "text-orange-600 bg-orange-50",
    title: "AI Engineer",
    description: "Membangun sistem cerdas dan pipeline machine learning. Membentuk batas terdepan teknologi masa depan.",
    tags: ["Python", "TensorFlow", "LLM"],
  },
  {
    id: "mobile",
    icon: Smartphone,
    badge: "Mobile",
    badgeColor: "text-sky-600 bg-sky-50",
    title: "Pengembangan Mobile",
    description: "Menciptakan pengalaman mulus di ujung jari. Menguasai native dan cross-platform development.",
    tags: ["Swift", "Kotlin", "Flutter"],
  },
  {
    id: "web",
    icon: Monitor,
    badge: "Jalur Utama",
    badgeColor: "text-blue-600 bg-blue-50",
    title: "Pengembangan Web",
    description: "Merancang antarmuka web modern. Fokus pada performa, aksesibilitas, dan keindahan visual.",
    tags: ["React", "Tailwind", "TypeScript"],
  },
]

export default function ItCareerPage() {
  const [search, setSearch] = useState("")

  const filtered = careers.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      c.badge.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-500">
            Arsitek Masa Depan
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            <span className="font-extrabold">IT</span>
            <span className="font-normal">Karier</span>
            <span className="text-blue-600">Penjelajah.</span>
          </h1>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            Jelajahi dunia digital. Dari desain kreatif hingga infrastruktur berat, kuasai
            perjalanan profesionalmu melalui jalur yang sesuai dengan karaktermu.
          </p>
        </div>

        {/* Search */}
        <div className="w-full sm:max-w-xs">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari berdasarkan skill, peran, atau teknologi..."
              className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Career Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((career) => {
          const Icon = career.icon
          return (
            <div
              key={career.id}
              className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Badge */}
              <span className={`absolute top-5 right-5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] ${career.badgeColor}`}>
                {career.badge}
              </span>

              {/* Icon */}
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-blue-600">
                <Icon className="h-6 w-6" />
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-slate-900">{career.title}</h3>
              <p className="mt-2 text-sm leading-5 text-slate-500 flex-1">{career.description}</p>

              {/* Skill Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {career.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group-hover:gap-2.5">
                Jelajahi Jalur
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Search className="h-10 w-10 mb-4 opacity-40" />
          <p className="text-sm font-medium">Tidak ada hasil untuk "<span className="text-slate-600">{search}</span>"</p>
        </div>
      )}
    </div>
  )
}
