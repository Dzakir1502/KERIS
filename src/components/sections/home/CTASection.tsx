import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"

export default function CTASection() {
  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-b from-slate-900 to-purple-950/50">
      <div className="container mx-auto max-w-3xl text-center">
        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/20 border border-purple-500/20 rounded-2xl p-12">
          <Mail className="w-10 h-10 text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap untuk Memulai?
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Bergabunglah dengan ribuan developer yang sudah menggunakan Keris untuk membangun produk mereka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 group"
            >
              Daftar Gratis
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-slate-300 hover:bg-white/10 hover:text-white"
            >
              Hubungi Kami
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
