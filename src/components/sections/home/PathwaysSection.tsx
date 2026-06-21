import { ArrowUpRight } from "lucide-react"

const PATHWAYS = [
  {
    id: "web-dev",
    title: "Web Development",
    badge: "5 PROJECT AKTIF",
    badgeColor: "bg-blue-600 text-white",
    gradient: "from-blue-900/80 via-blue-950/60 to-slate-900",
    bgClass: "bg-gradient-to-br from-slate-800 to-slate-950",
  },
  {
    id: "mobile-dev",
    title: "Mobile Development",
    badge: "3 PROJECT AKTIF",
    badgeColor: "bg-orange-500 text-white",
    gradient: "from-slate-900/80 via-slate-900/60 to-slate-950",
    bgClass: "bg-gradient-to-br from-slate-700 to-slate-900",
  },
  {
    id: "ai-dev",
    title: "AI Development",
    badge: "NEW",
    badgeColor: "bg-orange-500 text-white",
    gradient: "from-teal-900/60 via-slate-900/60 to-slate-950",
    bgClass: "bg-gradient-to-br from-teal-950 to-slate-900",
  },
]

export default function PathwaysSection() {
  return (
    <section id="pathways" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 max-w-md">
              Pilih Keahlian yang Sesuai dengan Minat Kamu
            </h2>
            <p className="text-gray-500 text-sm">
              Mulai karirmu dari mana saja dengan kurikulum simulasi yang dirancang khusus.
            </p>
          </div>
          <a
            href="#"
            className="flex items-center gap-1 text-blue-600 font-semibold text-sm hover:underline shrink-0"
          >
            Eksplor Semua Pathway
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Pathway Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {PATHWAYS.map((pathway) => (
            <div
              key={pathway.id}
              className={`relative ${pathway.bgClass} rounded-2xl overflow-hidden h-60 cursor-pointer group`}
            >
              {/* Overlay gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t ${pathway.gradient}`} />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span
                  className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 w-fit ${pathway.badgeColor}`}
                >
                  {pathway.badge}
                </span>
                <h3 className="text-white font-bold text-xl">{pathway.title}</h3>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 ring-2 ring-blue-500/0 group-hover:ring-blue-500/50 rounded-2xl transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
