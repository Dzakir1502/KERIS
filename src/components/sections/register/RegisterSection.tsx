import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

export default function RegisterSection() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4FF] px-4 pt-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Buat Akun Baru</h1>
          <p className="text-gray-500 text-sm mt-1">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1.5">
                Nama Depan
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="Budi"
                className="rounded-xl border-gray-200 focus-visible:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1.5">
                Nama Belakang
              </label>
              <Input
                id="lastName"
                type="text"
                placeholder="Santoso"
                className="rounded-xl border-gray-200 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              className="rounded-xl border-gray-200 focus-visible:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimal 8 karakter"
                className="rounded-xl border-gray-200 focus-visible:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="pathway" className="block text-sm font-medium text-gray-700 mb-1.5">
              Minat Pathway
            </label>
            <select
              id="pathway"
              className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Pilih pathway-mu</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="ai">AI Development</option>
            </select>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-5 font-semibold mt-2"
          >
            Daftar Sekarang
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} The Intellectual Atelier
        </p>
      </div>
    </div>
  )
}
