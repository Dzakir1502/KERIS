import { Button } from "@/components/ui/button"
import { Brain, Cloud, BookOpen, SquareStack } from "lucide-react"

export default function EcosystemSection() {
  return (
    <section id="ecosystem" className="py-24 bg-[#F3F4FF]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Ekosistem Belajar Terpadu
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* AI Talent Scout - White card, large */}
          <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col justify-between min-h-56">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-4">
                <Brain className="w-4 h-4" />
                AI Talent Scout
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 max-w-xs">
                Dilirik Perusahaan Sesuai Hasil Simulasi
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                Data performamu dalam simulasi dikonversi menjadi profil kompetensi
                yang dapat diakses oleh recruiter mitra kami.
              </p>
            </div>
          </div>

          {/* Project Workspace - Blue card */}
          <div className="bg-blue-600 rounded-2xl p-8 flex flex-col justify-between min-h-56">
            <div>
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Project Workspace</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Environment coding berbasis cloud yang siap pakai. Fokus pada kode, bukan pada setup.
              </p>
            </div>
            <div className="mt-4 bg-blue-800/60 rounded-lg px-4 py-2 font-mono text-blue-200 text-sm">
              npm start simulation...
            </div>
          </div>

          {/* Gamified Clue Cards - Orange card */}
          <div className="bg-orange-500 rounded-2xl p-8 flex flex-col justify-between min-h-48">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-5">
              <SquareStack className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Gamified Clue Cards</h3>
              <p className="text-orange-100 text-sm leading-relaxed">
                Terjebak dalam kode? Gunakan kartu bantuan yang membuat proses belajar terasa seperti petualangan.
              </p>
            </div>
          </div>

          {/* E-Learning Module - White card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col justify-between min-h-48">
            <div className="flex items-start gap-5">
              {/* Tablet visual */}
              <div className="shrink-0 w-24 h-28 bg-gray-100 rounded-xl flex flex-col items-center justify-center gap-2 border border-gray-200">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-gray-400 text-xs">Lihat Kursus</span>
              </div>
              {/* Text */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">E-Learning Module</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Akses modul teori pendukung di setiap fase project. Belajar konsepnya,
                  terapkan langsung di simulasinya.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full text-xs"
                >
                  Buka Silabus
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
