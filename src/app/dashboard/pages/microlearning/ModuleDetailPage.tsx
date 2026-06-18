import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  Play, SkipForward, Volume2, Maximize2, Settings2,
  Share2, Bookmark, ChevronRight, ChevronDown,
  FileText, PlayCircle, ArrowLeft, ArrowRight, Trophy
} from "lucide-react"

const modulesData: Record<string, {
  title: string
  author: string
  description: string
  totalLectures: number
  totalTime: string
  nextModule: string
  nextId: string
  curriculum: {
    section: string
    count: number
    items: { type: "video" | "pdf"; label: string; meta: string }[]
  }[]
}> = {
  "1": {
    title: "HTML Dasar",
    author: "Eko Kurniawan Khannedy",
    description:
      "Welcome to the foundation of web development. In this module, Eko Kurniawan Khannedy guides you through the core principles of HTML. We'll start from the absolute basics—understanding tags and structural elements—and move towards creating semantic, accessible web structures. This lesson is designed for high-level technical mastery, focusing on modern standards and clean code architecture.",
    totalLectures: 24,
    totalTime: "5h 30m",
    nextModule: "CSS Box Model Basics",
    nextId: "2",
    curriculum: [
      {
        section: "HTML Tags",
        count: 3,
        items: [
          { type: "video", label: "Tutorial Video: Structural Tags", meta: "15:00 mins" },
          { type: "pdf", label: "Module: Semantic Documentation", meta: "PDF • 2.4 MB" },
          { type: "pdf", label: "Module: Tag Reference Sheet", meta: "PDF • 1.1 MB" },
        ],
      },
      {
        section: "HTML Elements",
        count: 3,
        items: [
          { type: "video", label: "Tutorial Video: Block & Inline", meta: "12:00 mins" },
          { type: "pdf", label: "Module: Elements Cheatsheet", meta: "PDF • 1.8 MB" },
          { type: "pdf", label: "Module: Nesting Guide", meta: "PDF • 0.9 MB" },
        ],
      },
      {
        section: "HTML List",
        count: 1,
        items: [
          { type: "video", label: "Tutorial Video: Ordered & Unordered", meta: "8:00 mins" },
        ],
      },
    ],
  },
  "2": {
    title: "CSS Basic",
    author: "Eko Kurniawan Khannedy",
    description:
      "Dive into the world of styling with CSS. This module covers selectors, the box model, flexbox, and responsive design fundamentals. Learn how to create visually appealing, maintainable stylesheets that scale with your project.",
    totalLectures: 18,
    totalTime: "4h 15m",
    nextModule: "Javascript Basic",
    nextId: "3",
    curriculum: [
      {
        section: "CSS Selectors",
        count: 3,
        items: [
          { type: "video", label: "Tutorial Video: Selector Types", meta: "14:00 mins" },
          { type: "pdf", label: "Module: Specificity Chart", meta: "PDF • 1.2 MB" },
          { type: "pdf", label: "Module: Selector Reference", meta: "PDF • 0.8 MB" },
        ],
      },
      {
        section: "Box Model",
        count: 2,
        items: [
          { type: "video", label: "Tutorial Video: Box Model Deep Dive", meta: "18:00 mins" },
          { type: "pdf", label: "Module: Box Model Cheatsheet", meta: "PDF • 1.5 MB" },
        ],
      },
    ],
  },
}

function CurriculumItem({ type, label, meta }: { type: "video" | "pdf"; label: string; meta: string }) {
  return (
    <div className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 rounded-xl transition cursor-pointer">
      {type === "video"
        ? <PlayCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
        : <FileText className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
      }
      <div>
        <p className="text-xs font-semibold text-slate-700">{label}</p>
        <p className="text-[10px] text-slate-400 mt-0.5">{meta}</p>
      </div>
    </div>
  )
}

export default function ModuleDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const navigate = useNavigate()
  const mod = modulesData[moduleId ?? "1"] ?? modulesData["1"]

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ "HTML Tags": true })
 

  const toggleSection = (section: string) =>
    setExpandedSections((p) => ({ ...p, [section]: !p[section] }))

  return (
    <div className="space-y-4">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <span className="hover:text-slate-600 cursor-pointer" onClick={() => navigate("/dashboard/micro-learning")}>Curriculum</span>
        <ChevronRight className="h-3 w-3" />
        <span className="hover:text-slate-600 cursor-pointer">Web Development</span>
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-blue-600">{mod.title}</span>
      </nav>

      <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
        {/* ── Left: Video + Info ── */}
        <div className="space-y-4">

          {/* Video player */}
          <div className="rounded-2xl overflow-hidden bg-slate-900 shadow-lg">
            {/* Fake transcript overlay */}
            <div className="px-8 py-6 space-y-3">
              {[
                "Apa itu tag HTML dan fungsinya?",
                "Cara penulisan elemen dengan benar;",
                "Note: tika de HPA ig traNHGH andnotc.",
                "Holnis Narao ning ingidersdonned",
                "Re gin Salosllneario/Ot Dn Bgdrmthc Noke Hots;",
                "And heal. Bioool n Gono truck.",
              ].map((line, i) => (
                <div key={i} className="flex items-start gap-3">
                  {i % 3 === 0 && <Play className="h-3 w-3 text-white mt-0.5 shrink-0 opacity-50" />}
                  {i % 3 !== 0 && <div className="h-3 w-3 shrink-0" />}
                  <p className="text-xs text-slate-300 leading-relaxed opacity-80">{line}</p>
                </div>
              ))}
              <p className="text-[10px] text-slate-500 mt-2">
                Dhuengo Dtes sof senecs Sef en teo 0{" "}
                <span className="inline-block h-1 w-24 rounded-full bg-blue-500 align-middle" />
              </p>
            </div>

            {/* Player controls */}
            <div className="flex items-center gap-3 bg-slate-950 px-5 py-3 border-t border-slate-800">
              <button className="text-white hover:text-blue-400 transition">
                <Play className="h-5 w-5 fill-white" />
              </button>
              <button className="text-slate-400 hover:text-white transition">
                <SkipForward className="h-4 w-4" />
              </button>
              <button className="text-slate-400 hover:text-white transition">
                <Volume2 className="h-4 w-4" />
              </button>
              <span className="text-xs text-slate-400 font-mono">12:45 / 45:00</span>
              {/* Seek bar */}
              <div className="flex-1 h-1.5 rounded-full bg-slate-700 relative">
                <div className="h-full rounded-full bg-blue-500" style={{ width: "28%" }} />
              </div>
              <button className="text-slate-400 hover:text-white transition">
                <Settings2 className="h-4 w-4" />
              </button>
              <button className="text-slate-400 hover:text-white transition">
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Title + actions */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900">{mod.title}</h1>
              <p className="mt-1 text-sm text-slate-500">
                by{" "}
                <span className="font-semibold text-blue-600 cursor-pointer hover:underline">
                  {mod.author}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button className="flex items-center gap-1.5 rounded-xl bg-blue-900 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800 transition">
                <Bookmark className="h-4 w-4" />
                Save Module
              </button>
            </div>
          </div>

          {/* Overview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-slate-900">Module Overview</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{mod.description}</p>
          </div>

          {/* Navigation footer */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/dashboard/micro-learning")}
              className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={() => navigate(`/dashboard/micro-learning/${mod.nextId}`)}
              className="flex items-center gap-3 rounded-2xl bg-blue-900 pl-5 pr-4 py-3 text-sm font-bold text-white hover:bg-blue-800 transition"
            >
              <div className="text-right">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-300">Next Module</p>
                <p className="text-sm font-bold">{mod.nextModule}</p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <ArrowRight className="h-4 w-4" />
              </div>
            </button>
          </div>
        </div>

        {/* ── Right: Curriculum sidebar ── */}
        <div className="space-y-4">

          {/* Curriculum content */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Curriculum Content</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {mod.totalLectures} Lectures • {mod.totalTime} total
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {mod.curriculum.map((sec) => (
                <div key={sec.section}>
                  <button
                    onClick={() => toggleSection(sec.section)}
                    className="flex w-full items-center justify-between px-5 py-3 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-2">
                      {expandedSections[sec.section]
                        ? <ChevronDown className="h-4 w-4 text-blue-600" />
                        : <ChevronRight className="h-4 w-4 text-slate-400" />
                      }
                      <span className="text-sm font-bold text-slate-900">{sec.section}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{sec.count} Items</span>
                  </button>

                  {expandedSections[sec.section] && (
                    <div className="pb-2 px-2">
                      {sec.items.map((item) => (
                        <CurriculumItem key={item.label} {...item} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Next milestone */}
          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-orange-500 shrink-0" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                Next Milestone
              </p>
            </div>
            <p className="text-sm font-semibold text-orange-800 leading-relaxed">
              Complete this module to unlock the "Web Architect" badge.
            </p>
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded-full bg-orange-100 overflow-hidden">
                <div className="h-full w-1/4 rounded-full bg-orange-500" />
              </div>
              <p className="text-[10px] font-bold text-orange-400 text-right">25%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
