import { Monitor, Crosshair, Users } from "lucide-react"

const FEATURES = [
  {
    icon: <Monitor className="w-5 h-5 text-blue-600" />,
    iconBg: "bg-blue-100",
    title: "Simulasi Project Nyata",
    description:
      "Kerjakan tantangan teknis yang diambil langsung dari kebutuhan industri IT saat ini.",
  },
  {
    icon: <Crosshair className="w-5 h-5 text-orange-500" />,
    iconBg: "bg-orange-100",
    title: "Temukan Skill IT yang Tepat",
    description:
      "AI kami membantu memetakan minatmu ke dalam roadmap pembelajaran yang terstruktur.",
  },
  {
    icon: <Users className="w-5 h-5 text-orange-500" />,
    iconBg: "bg-orange-100",
    title: "Bangun Komunitas",
    description:
      "Berkolaborasi dengan sesama learner dan mentor berpengalaman dalam satu ekosistem.",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-[#F3F4FF]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Kenapa harus KERIS?
          </h2>
          <div className="w-12 h-1 bg-orange-500 rounded-full mx-auto" />
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`w-11 h-11 rounded-lg ${feature.iconBg} flex items-center justify-center mb-5`}
              >
                {feature.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
