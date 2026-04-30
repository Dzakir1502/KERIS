import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import heroPerson from "@/assets/hero-person.png"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-white pt-16"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* Left: Text Content */}
        <div>
          <span className="inline-block text-xs font-semibold text-orange-500 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 mb-6 tracking-wide uppercase">
            Platform Simulasi Kerja #1
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
            Belajar Skill Nyata Lewat{" "}
            <span className="text-blue-600">Simulasi Project</span>{" "}
            Dunia Kerja.
          </h1>

          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            Bangun portofolio profesional dengan mengerjakan project IT nyata dari
            berbagai perusahaan terkemuka di lingkungan simulasi yang aman namun
            menantang.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-semibold"
            >
              Mulai Simulasi
            </Button>
            <a
              href="#features"
              className="flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600 transition-colors"
            >
              Lihat Demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-md">
            <img
              src={heroPerson}
              alt="Developer bekerja pada project simulasi"
              className="w-full rounded-2xl object-cover shadow-2xl aspect-square"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
