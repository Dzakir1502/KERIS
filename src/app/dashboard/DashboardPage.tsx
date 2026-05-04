import { useState } from "react"
import { Bell, CircleDot, Command, LayoutDashboard, MessageCircle, Settings, Trophy, Users, UserCircle, Send } from "lucide-react"
import { Link } from "react-router-dom"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "profile", label: "Profile", icon: UserCircle },
  { id: "chatCareer", label: "Chat bot & IT Career", icon: MessageCircle },
  { id: "aiTalent", label: "AI Talent Scout", icon: MessageCircle },
  { id: "project", label: "Project Workspace", icon: Command },
  { id: "mentor", label: "Mentor Review", icon: Trophy },
  { id: "community", label: "Community", icon: Users },
]

const chatCareerSubItems = [
  { id: "chatbot", label: "Chatbot" },
  { id: "itcareer", label: "IT Career" },
]

const sidebarItems = [
  { label: "Settings", icon: Settings },
  { label: "Help", icon: CircleDot },
]

export default function DashboardPage() {
  const [activePage, setActivePage] = useState("dashboard")
  const [activeChatCareerTab, setActiveChatCareerTab] = useState("chatbot")

  const showChatCareerSubnav = activePage === "chatCareer"

  const renderMainContent = () => {
    if (activePage === "chatCareer" || activePage === "aiTalent") {
      return (
        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
                  {activePage === "aiTalent" ? "AI Talent Scout" : "Chat bot & IT Career"}
                </p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-900">
                  {activePage === "aiTalent" ? "AI Talent Scout Session" : "Chat with Your Career Assistant"}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  {activePage === "aiTalent" 
                    ? "Get personalized guidance from your AI mentor. Ask questions, explore simulations, and track your learning progress."
                    : "Choose between instant chat support or career planning with AI guidance."}
                </p>
              </div>
              <div className="inline-flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                <Bell className="h-4 w-4" /> Active Now
              </div>
            </div>
          </div>

          {activePage === "aiTalent" ? (
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-6 space-y-4">
                {/* Chat messages */}
                <div className="space-y-4">
                  {/* Keris message */}
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white flex-shrink-0">
                      K
                    </div>
                    <div className="space-y-2 flex-1">
                      <p className="text-xs font-semibold text-slate-700">Keris</p>
                      <div className="space-y-2 text-sm text-slate-700 bg-slate-50 rounded-3xl p-4">
                        <p>
                          Hello! I've been analyzing your recent project submissions in the <span className="font-semibold text-blue-600">Architectural Core</span>. Your spatial reasoning scores are in the top 5% of this cohort.
                        </p>
                        <p>
                          I've prepared a new simulation based on sustainable urban planning. Would you like to begin the assessment now?
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* User message */}
                  <div className="flex flex-row-reverse gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white flex-shrink-0">
                      Y
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-700 text-right">You</p>
                      <div className="text-sm text-white bg-slate-900 rounded-3xl p-4 w-fit ml-auto">
                        <p>
                          That sounds fascinating, Keris. I'm definitely interested, but I wanted to ask—does this simulation cover the new green-building regulations for the Singapore district?
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Keris response */}
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white flex-shrink-0">
                      K
                    </div>
                    <div className="space-y-2 flex-1">
                      <p className="text-xs font-semibold text-slate-700">Keris</p>
                      <div className="space-y-3 text-sm text-slate-700 bg-slate-50 rounded-3xl p-4">
                        <p><span className="font-semibold">Excellent question</span>. Yes, the simulation includes the 2024 Green Mark Framework updates. It focuses specifically on:</p>
                        <ul className="space-y-2 ml-4">
                          <li className="flex gap-2">
                            <span className="text-orange-500 font-bold">•</span>
                            Energy Intelligence & Performance Modeling
                          </li>
                          <li className="flex gap-2">
                            <span className="text-orange-500 font-bold">•</span>
                            Carbon Footprint optimization via Material curation
                          </li>
                          <li className="flex gap-2">
                            <span className="text-orange-500 font-bold">•</span>
                            Social Equity through Biophilic Design
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-3xl bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-sm font-semibold transition">
                  Start Simulation
                </button>
                <button className="rounded-3xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 px-6 py-3 text-sm font-semibold transition">
                  Review Pre-Reading
                </button>
              </div>

              {/* Chat input */}
              <div className="mt-6 flex gap-3 items-end">
                <input
                  type="text"
                  placeholder="Type your message to Keris..."
                  className="flex-1 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white transition">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-wrap gap-3 mb-6">
                {chatCareerSubItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveChatCareerTab(item.id)}
                    className={`rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                      activeChatCareerTab === item.id
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.35fr_0.8fr]">
                <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl">
                  <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-orange-700">
                    Quick Assistant
                  </span>
                  <h2 className="mt-5 text-2xl font-semibold">
                    {activeChatCareerTab === "chatbot" ? "Instant Help" : "Career Path"}
                  </h2>
                  <p className="mt-2 text-sm text-slate-300">
                    {activeChatCareerTab === "chatbot"
                      ? "Ask anything about your courses, projects, or learning path."
                      : "Plan your next career moves and milestones."}
                  </p>

                  <div className="mt-6 rounded-3xl bg-slate-900/80 p-5 space-y-3">
                    {activeChatCareerTab === "chatbot" ? (
                      <>
                        <p className="text-sm text-slate-300">Popular questions:</p>
                        <div className="space-y-2 text-xs text-slate-400">
                          <p>• How do I improve my React skills?</p>
                          <p>• What's the next module after this?</p>
                          <p>• How can I get better at system design?</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-slate-300">Your current focus areas:</p>
                        <div className="space-y-2 text-xs text-slate-400">
                          <p>✓ Complete portfolio project</p>
                          <p>→ Connect with 3 industry mentors</p>
                          <p>→ Practice mock interviews</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="rounded-[32px] bg-slate-950 p-6 text-white shadow-2xl">
                  <h3 className="text-lg font-semibold">Tips</h3>
                  <div className="mt-6 space-y-4 text-sm">
                    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4">
                      <p className="font-semibold text-slate-100">💡 Pro Tip</p>
                      <p className="mt-2 text-slate-300">{activeChatCareerTab === "chatbot" ? "Be specific with your questions for better answers." : "Update your goals weekly to stay on track."}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }

    return (
      <>
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Home</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-900">
                Welcome back, Fahran!
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Your learning velocity is up 12% this week. You're 3 milestones away from completing your primary objective.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">
              <Bell className="h-4 w-4" /> Notifications
            </button>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_0.8fr]">
            <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-2xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-orange-700">
                    Active Program
                  </span>
                  <h2 className="mt-5 text-2xl font-semibold">Web Development</h2>
                  <p className="mt-2 text-sm text-slate-300">Mastering Modern Frontend Frameworks</p>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-center">
                  <p className="text-sm text-slate-400">Program Progress</p>
                  <p className="mt-2 text-4xl font-semibold">72%</p>
                </div>
              </div>

              <div className="mt-8 rounded-3xl bg-slate-900/80 p-5">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Module 08: Server-Side Rendering</span>
                  <span>2.4h remaining</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[72%] rounded-full bg-orange-500" />
                </div>
              </div>
            </div>

            <div className="rounded-[32px] bg-slate-950 p-6 text-white shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Skill Progress</h3>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                  View Full Report
                </span>
              </div>
              <div className="mt-6 space-y-5">
                {[
                  { label: "Logic & Algorithms", value: 88 },
                  { label: "UI/UX Design", value: 64 },
                  { label: "System Architecture", value: 42 },
                ].map((skill) => (
                  <div key={skill.label}>
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{skill.label}</span>
                      <span>{skill.value}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-800">
                      <div className={`h-full rounded-full bg-blue-500`} style={{ width: `${skill.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Quest Active</h3>
                <p className="mt-2 text-sm text-slate-600">Current tasks ready for completion.</p>
              </div>
              <span className="inline-flex rounded-3xl bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                2 active
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {[
                { title: "Dasar-dasar Keris Nusantara", description: "Due in 4 hours", badge: "Urgent" },
                { title: "Debug Session: Auth Flow", description: "Open peer review", badge: "Review" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                    </div>
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                      {item.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl bg-orange-50 p-4 text-sm text-slate-700">
              <p className="font-semibold">Pro Tip:</p>
              <p className="mt-2">Completing the API Quest today will unlock the “Full-Stack Specialist” badge.</p>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Project Active</h3>
                <p className="mt-2 text-sm text-slate-600">Projects currently in progress.</p>
              </div>
              <button className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
                Resume Project
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {[
                {
                  title: "E-Commerce Landing Page",
                  subtitle: "v2.4 - Layout refinement in progress",
                  status: "Urgent",
                  members: ["AM", "LS"],
                },
                {
                  title: "Analytics Dashboard",
                  subtitle: "v1.0 - Initial deployment",
                  status: "Review",
                  members: ["JS"],
                },
              ].map((project) => (
                <div key={project.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{project.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{project.subtitle}</p>
                    </div>
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    {project.members.map((member) => (
                      <span key={member} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_1fr]">
          <aside className="relative rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm xl:sticky xl:top-6 xl:self-start z-20">
            <Link
              to="/"
              className="mb-6 inline-flex w-full items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900 transition hover:border-blue-500 hover:text-blue-700"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-600 text-xl font-bold text-white transition-transform duration-200 hover:scale-105">
                K
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">KERIS</p>
                <p className="truncate text-base font-semibold">Beranda</p>
              </div>
            </Link>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activePage === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActivePage(item.id)
                      if (item.id !== "chatCareer") {
                        setActiveChatCareerTab("chatbot")
                      }
                    }}
                    className={`flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium text-left transition ${
                      isActive
                        ? "bg-slate-900 text-white shadow-md"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    {item.label}
                  </button>
                )
              })}
            </nav>

            {showChatCareerSubnav && (
              <div className="mt-4 space-y-3 rounded-[32px] border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-700">Chat bot & IT Career</p>
                <div className="space-y-2">
                  {chatCareerSubItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveChatCareerTab(item.id)}
                      className={`flex w-full items-center justify-between rounded-3xl px-4 py-3 text-sm font-medium transition ${
                        activeChatCareerTab === item.id
                          ? "bg-slate-900 text-white"
                          : "bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Open</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Quick action</p>
              <p className="mt-3">Submit your next project or review a mentor note.</p>
              <button className="mt-4 w-full rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600">
                Submit Project
              </button>
            </div>

            <div className="mt-8 space-y-2 border-t border-slate-200 pt-4">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    className="flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    <Icon className="h-4.5 w-4.5" />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </aside>

          <section className="space-y-6 relative z-10 xl:-ml-6 xl:pl-6">
            {renderMainContent()}
          </section>
        </div>
      </div>
    </div>
  )
}
