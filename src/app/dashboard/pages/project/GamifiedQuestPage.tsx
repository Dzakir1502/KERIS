import { useState } from "react"
import {
  Flame, Lightbulb, FileText, PersonStanding, Lock,
  Sparkles, Fingerprint, ShieldCheck, Info
} from "lucide-react"

const quests = [
  {
    id: 1,
    status: "SELESAI",
    statusColor: "bg-green-100 text-green-700",
    title: "Tantangan 1",
    description: "Dasar-Dasar Sejarah Keris Nusantara dan Filosofinya.",
    xp: "+450",
    icon: <FileText className="h-5 w-5 text-slate-500" />,
    iconBg: "bg-slate-100",
    cta: { label: "See Clue Card →", style: "text-blue-600 hover:text-blue-700" },
    locked: false,
    done: true,
  },
  {
    id: 2,
    status: "TERBUKA",
    statusColor: "bg-orange-100 text-orange-600",
    title: "Tantangan 2",
    description: "Mengenal Ragam Pamor dan Teknik Tempa Lipat.",
    xp: "+1200",
    icon: <PersonStanding className="h-5 w-5 text-slate-500" />,
    iconBg: "bg-slate-100",
    cta: { label: "Start ▸", style: "text-orange-500 hover:text-orange-600 font-semibold" },
    locked: false,
    done: false,
  },
  {
    id: 3,
    status: "TERKUNCI",
    statusColor: "bg-slate-100 text-slate-500",
    title: "Tantangan 3",
    description: "Ritual Jamasan dan Perawatan Pusaka Warisan.",
    xp: "+1200",
    icon: <Lock className="h-5 w-5 text-slate-400" />,
    iconBg: "bg-slate-100",
    cta: { label: "Start ▸", style: "text-slate-300 cursor-not-allowed" },
    locked: true,
    done: false,
  },
]

const clues = [
  {
    id: "882",
    type: "CORE CONCEPT",
    typeColor: "bg-blue-600 text-white",
    title: "Kerangka HTML",
    description: '"Proportion is the silent bridge between...',
    icon: <Lightbulb className="h-8 w-8 text-blue-600" />,
    iconBg: "bg-blue-100",
    locked: false,
  },
  {
    id: "412",
    type: "EVIDENCE",
    typeColor: "bg-orange-400 text-white",
    title: "Implicit Bias Cipher",
    description: "The encoded signature suggests a systemic...",
    icon: <Fingerprint className="h-8 w-8 text-orange-500" />,
    iconBg: "bg-orange-50",
    locked: false,
  },
  {
    id: null,
    type: null,
    typeColor: "",
    title: "Locked Artifact",
    description: "Complete \"Echoes of History\" to reveal",
    icon: <Lock className="h-8 w-8 text-slate-400" />,
    iconBg: "bg-slate-100",
    locked: true,
  },
  {
    id: "009",
    type: "RARE TOOL",
    typeColor: "bg-blue-500 text-white",
    title: "The Prism of Persuasion",
    description: "A lens used to decompose rhetorical...",
    icon: <Sparkles className="h-8 w-8 text-blue-600" />,
    iconBg: "bg-blue-100",
    locked: false,
  },
  {
    id: "009",
    type: "RARE TOOL",
    typeColor: "bg-blue-500 text-white",
    title: "The Prism of Persuasion",
    description: "A lens used to decompose rhetorical...",
    icon: <Sparkles className="h-8 w-8 text-blue-600" />,
    iconBg: "bg-blue-100",
    locked: false,
  },
  {
    id: "112",
    type: "PROOF",
    typeColor: "bg-orange-500 text-white",
    title: "Certified Intuition",
    description: "Verification of a student's ability to navigate...",
    icon: <ShieldCheck className="h-8 w-8 text-orange-500" />,
    iconBg: "bg-orange-50",
    locked: false,
  },
]

const tabs = ["All Cards", "Rare Only", "Hints"]

export default function GamifiedQuestPage() {
  const [activeTab, setActiveTab] = useState("All Cards")

  return (
    <div className="space-y-6">

      {/* Hero header */}
      <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-black text-slate-900 leading-tight">
          Halo, Farhan Lanjutkan<br />Petualanganmu.
        </h1>
        <div className="flex items-center gap-4 shrink-0">
          {/* Streak */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Streak</p>
            <p className="mt-1 text-2xl font-black text-orange-500 flex items-center gap-1">
              08 <Flame className="h-5 w-5 text-orange-400" />
            </p>
          </div>
          {/* Total Clues */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">Total Clues</p>
            <p className="mt-1 text-2xl font-black text-blue-600 flex items-center gap-1">
              24 <Lightbulb className="h-5 w-5 text-blue-400" />
            </p>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 xl:grid-cols-[1fr_1.7fr]">

        {/* Left — Active Quests */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-500" />
              <h2 className="text-base font-bold text-slate-900">Active Quests</h2>
            </div>
            <span className="rounded-full bg-blue-600 px-3 py-0.5 text-xs font-bold text-white">3 Active</span>
          </div>

          <div className="divide-y divide-slate-100">
            {quests.map((q) => (
              <div key={q.id} className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] ${q.statusColor}`}>
                    {q.status}
                  </span>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${q.iconBg}`}>
                    {q.icon}
                  </div>
                </div>
                <div>
                  <h3 className={`text-base font-bold ${q.locked ? "text-slate-400" : "text-slate-900"}`}>
                    {q.title}
                  </h3>
                  <p className={`mt-1 text-sm ${q.locked ? "text-slate-300" : "text-slate-500"}`}>
                    {q.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-500">
                    XP Gain: <span className="text-slate-900">{q.xp}</span>
                  </span>
                  <button className={`text-sm transition ${q.cta.style}`} disabled={q.locked}>
                    {q.cta.label}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Clue Inventory */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-slate-500" />
              <h2 className="text-base font-bold text-slate-900">Clue Inventory</h2>
            </div>
            {/* Tabs */}
            <div className="flex rounded-xl border border-slate-200 overflow-hidden text-xs font-semibold">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 transition ${
                    activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Clue grid */}
          <div className="grid grid-cols-3 gap-0 divide-x divide-y divide-slate-100">
            {clues.map((clue, i) => (
              <div
                key={i}
                className={`p-4 flex flex-col gap-3 ${clue.locked ? "bg-slate-50" : ""}`}
              >
                {/* Icon box */}
                <div className={`flex h-16 w-full items-center justify-center rounded-xl ${clue.iconBg}`}>
                  {clue.icon}
                </div>

                {/* Type + ID */}
                {!clue.locked && clue.type && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] ${clue.typeColor}`}>
                      {clue.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">ID: #{clue.id}</span>
                  </div>
                )}

                {/* Title */}
                <p className={`text-sm font-bold leading-snug ${clue.locked ? "text-slate-400" : "text-slate-900"}`}>
                  {clue.title}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{clue.description}</p>

                {/* Bottom row */}
                {!clue.locked && (
                  <div className="flex items-center justify-between mt-auto pt-1">
                    <span className="h-3 w-3 rounded-full bg-blue-600" />
                    <button className="text-slate-300 hover:text-slate-400 transition">
                      <Info className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
