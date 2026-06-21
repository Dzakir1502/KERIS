const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact Support", href: "#" },
  { label: "Documentation", href: "#" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        {/* Brand */}
        <div>
          <p className="font-bold text-blue-600 text-base tracking-widest uppercase mb-1">
            Keris
          </p>
          <p className="text-gray-400 text-sm max-w-xs">
            Building the future of IT talent through immersive simulation.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-x-8 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-sm text-gray-400 shrink-0">
          © {year} The Intellectual Atelier. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
