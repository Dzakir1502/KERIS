import { useState } from "react"
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom"
import {
  CircleDot, Command, ChevronDown, LayoutDashboard,
  MessageCircle, Settings, Trophy, Users, UserCircle, Bot,
  Activity, Upload, BookOpen, Gamepad2, LogOut
} from "lucide-react"
import logo from "@/assets/hero.png"
import { useAuth } from "@/context/AuthContext"

export default function DashboardLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const { user, logout } = useAuth()

  const [chatOpen, setChatOpen] = useState(path.startsWith("/dashboard/chat"))
  const [projectOpen, setProjectOpen] = useState(path.startsWith("/dashboard/project"))

  const isChatGroupActive = path.startsWith("/dashboard/chat")
  const isProjectGroupActive = path.startsWith("/dashboard/project")

  const toggleChat = () => {
    setChatOpen((p) => !p)
    setProjectOpen(false)
    if (!chatOpen) navigate("/dashboard/chat/ai-talent")
  }

  const toggleProject = () => {
    setProjectOpen((p) => !p)
    setChatOpen(false)
    if (!projectOpen) navigate("/dashboard/project")
  }

  const isActive = (route: string) => path === route

  // Ambil inisial nama untuk avatar
  const initials = user?.nama_lengkap
    ? user.nama_lengkap.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : "?"

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900">
      <div className="mx-auto max-w-360 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[260px_1fr]">

          {/* Sidebar */}
          <aside className="relative flex flex-col rounded-3xl bg-white shadow-sm xl:sticky xl:top-6 xl:self-start z-20 overflow-hidden">

            {/* Logo */}
            <div className="p-5 pb-4 border-b border-slate-100">
              <Link to="/" className="flex items-center gap-3">
                <img src={logo} alt="KERIS Logo" className="h-10 w-10 object-contain" />
                <span className="text-xl font-bold tracking-tight text-slate-900">KERIS</span>
              </Link>
            </div>

            {/* User info mini */}
            {user && (
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{user.nama_lengkap}</p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
              </div>
            )}

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1">

              <NavBtn path="/dashboard" label="Beranda" icon={<LayoutDashboard className="h-5 w-5" />}
                active={isActive("/dashboard")} onClick={() => navigate("/dashboard")} />

              <NavBtn path="/dashboard/profile" label="Profil" icon={<UserCircle className="h-5 w-5" />}
                active={isActive("/dashboard/profile")} onClick={() => navigate("/dashboard/profile")} />

              {/* Chat bot & IT Career */}
              <div>
                <button
                  onClick={toggleChat}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-left transition-all ${
                    isChatGroupActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <MessageCircle className="h-5 w-5 shrink-0" />
                  <span className="flex-1">Chat bot & IT Career</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${chatOpen ? "rotate-180" : ""}`} />
                </button>
                {chatOpen && (
                  <div className="mt-1 ml-4 space-y-1 border-l-2 border-slate-200 pl-3">
                    <SubBtn label="AI Talent Scout" icon={<Bot className="h-4 w-4 shrink-0" />}
                      active={isActive("/dashboard/chat/ai-talent")}
                      onClick={() => navigate("/dashboard/chat/ai-talent")} />
                    <SubBtn label="IT Career Researcher" icon={<MessageCircle className="h-4 w-4 shrink-0" />}
                      active={isActive("/dashboard/chat/it-career")}
                      onClick={() => navigate("/dashboard/chat/it-career")} />
                  </div>
                )}
              </div>

              {/* Project Workspace */}
              <div>
                <button
                  onClick={toggleProject}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-left transition-all ${
                    isProjectGroupActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Command className="h-5 w-5 shrink-0" />
                  <span className="flex-1">Project Workspace</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${projectOpen ? "rotate-180" : ""}`} />
                </button>
                {projectOpen && (
                  <div className="mt-1 ml-4 space-y-1 border-l-2 border-slate-200 pl-3">
                    <SubBtn label="Project Dashboard" icon={<LayoutDashboard className="h-4 w-4 shrink-0" />}
                      active={isActive("/dashboard/project/dashboard")}
                      onClick={() => navigate("/dashboard/project/dashboard")} />
                    <SubBtn label="Project Status" icon={<Activity className="h-4 w-4 shrink-0" />}
                      active={isActive("/dashboard/project/status")}
                      onClick={() => navigate("/dashboard/project/status")} />
                    <SubBtn label="Submission" icon={<Upload className="h-4 w-4 shrink-0" />}
                      active={isActive("/dashboard/project/submission")}
                      onClick={() => navigate("/dashboard/project/submission")} />
                    <SubBtn label="Micro Learning Modul" icon={<BookOpen className="h-4 w-4 shrink-0" />}
                      active={isActive("/dashboard/micro-learning")}
                      onClick={() => navigate("/dashboard/micro-learning")} />
                    <SubBtn label="Gamified Quest" icon={<Gamepad2 className="h-4 w-4 shrink-0" />}
                      active={isActive("/dashboard/project/gamified-quest")}
                      onClick={() => navigate("/dashboard/project/gamified-quest")} />
                  </div>
                )}
              </div>

              <NavBtn path="/dashboard/mentor" label="Mentor Review" icon={<Trophy className="h-5 w-5" />}
                active={isActive("/dashboard/mentor")} onClick={() => navigate("/dashboard/mentor")} />

              <NavBtn path="/dashboard/community" label="Komunitas" icon={<Users className="h-5 w-5" />}
                active={isActive("/dashboard/community")} onClick={() => navigate("/dashboard/community")} />
            </nav>

            {/* Submit Project */}
            <div className="px-4 pb-4">
              <button className="w-full rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 transition">
                Submit Project
              </button>
            </div>

            {/* Bottom */}
            <div className="px-3 pb-4 border-t border-slate-100 pt-3 space-y-1">
              <button
                onClick={() => navigate("/dashboard/settings")}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm transition ${
                  isActive("/dashboard/settings")
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Settings className="h-5 w-5" />
                Settings
              </button>
              <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
                <CircleDot className="h-5 w-5" />
                Help
              </button>
              {/* Tombol Logout */}
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm text-red-500 transition hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-5 w-5" />
                Keluar
              </button>
            </div>
          </aside>

          {/* Page content */}
          <section className="space-y-6 min-h-screen">
            <Outlet />
          </section>

        </div>
      </div>
    </div>
  )
}

function NavBtn({ path: _path, label, icon, active, onClick }: {
  path: string; label: string; icon: React.ReactNode; active: boolean; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-left transition-all ${
        active
          ? "bg-slate-900 text-white shadow-md"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function SubBtn({ label, icon, active, onClick }: {
  label: string; icon: React.ReactNode; active: boolean; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium text-left transition-all ${
        active
          ? "bg-slate-900 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}