import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

interface RegisterSectionProps {
<<<<<<< HEAD
  onRegister: (nama_lengkap: string, email: string, no_hp: string, password: string) => Promise<void>;
=======
  onRegister: (nama_lengkap: string, email: string, password: string) => Promise<void>;
>>>>>>> 83631dfa5f7a04d89d0a219e8cc90189215aa9b3
  nama_lengkap: string;
  setNamaLengkap: (nama: string) => void;
  email: string;
  setEmail: (email: string) => void;
<<<<<<< HEAD
  no_hp: string;
  setNoHp: (no_hp: string) => void;
=======
>>>>>>> 83631dfa5f7a04d89d0a219e8cc90189215aa9b3
  password: string;
  setPassword: (password: string) => void;
  error: string;
  loading: boolean;
}

export default function RegisterSection({
  onRegister,
  nama_lengkap,
  setNamaLengkap,
  email,
  setEmail,
<<<<<<< HEAD
  no_hp,
  setNoHp,
=======
>>>>>>> 83631dfa5f7a04d89d0a219e8cc90189215aa9b3
  password,
  setPassword,
  error,
  loading
}: RegisterSectionProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    await onRegister(nama_lengkap, email, no_hp, password);
=======
    await onRegister(nama_lengkap, email, password);
>>>>>>> 83631dfa5f7a04d89d0a219e8cc90189215aa9b3
  }

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

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1.5">
              Nama Lengkap
            </label>
            <Input
              id="nama"
              type="text"
              placeholder="Budi Santoso"
              value={nama_lengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              className="rounded-xl border-gray-200 focus-visible:ring-blue-500"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-gray-200 focus-visible:ring-blue-500"
              disabled={loading}
              required
<<<<<<< HEAD
            />
          </div>

          <div>
            <label htmlFor="no_hp" className="block text-sm font-medium text-gray-700 mb-1.5">
              Nomor HP
            </label>
            <Input
              id="no_hp"
              type="tel"
              placeholder="08123456789"
              value={no_hp}
              onChange={(e) => setNoHp(e.target.value)}
              className="rounded-xl border-gray-200 focus-visible:ring-blue-500"
              disabled={loading}
              required
=======
>>>>>>> 83631dfa5f7a04d89d0a219e8cc90189215aa9b3
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
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border-gray-200 focus-visible:ring-blue-500 pr-10"
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Toggle password visibility"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-5 font-semibold mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Sedang mendaftar...' : 'Daftar Sekarang'}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} The Intellectual Atelier
        </p>
      </div>
    </div>
  )
}
