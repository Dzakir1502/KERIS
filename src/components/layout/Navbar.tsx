import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "Beranda", href: "#" },
  { label: "Pathway", href: "#pathways" },
  { label: "Fitur", href: "#features" },
]

const AUTH_ROUTES = ["/login", "/register"]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()

  const isAuthPage = AUTH_ROUTES.includes(pathname)
  const isDashboard = pathname.startsWith("/dashboard")

  if (isDashboard) {
    return null
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo — ke "/" di auth page, ke "#" di home */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border-2 border-blue-600" />
          </div>
          <span className="font-bold text-blue-600 text-lg tracking-widest uppercase">
            Keris
          </span>
        </Link>

        {/* Desktop Nav — hanya tampil di non-auth dan non-dashboard page */}
        {!isAuthPage && !isDashboard && (
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* CTA */}
        {!isDashboard && (
          <div className="hidden md:flex items-center gap-3">
            <Link to="/register">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5">
                Daftar
              </Button>
            </Link>
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Masuk
            </Link>
          </div>
        )}

        {/* Mobile Toggle — hanya di non-auth dan non-dashboard page */}
        {!isAuthPage && !isDashboard && (
          <button
            className="md:hidden text-gray-600 hover:text-blue-600"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Mobile Menu — hanya di non-auth page */}
      {!isAuthPage && isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <Link to="/register" className="flex-1">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                Daftar
              </Button>
            </Link>
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 self-center"
            >
              Masuk
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
