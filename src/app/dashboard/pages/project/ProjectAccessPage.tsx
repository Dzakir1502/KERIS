import { KeyRound, Info } from "lucide-react"

export default function ProjectAccessPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] px-4">

      {/* Main card */}
      <div className="w-full max-w-lg rounded-3xl bg-slate-100 p-10 flex flex-col items-center text-center gap-6">

        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <rect x="3" y="4" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h2M7 12h2M7 16h2M11 8h6M11 12h4" />
          </svg>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Project Access</h1>
          <p className="mt-2 text-sm text-slate-500">Simulation Phase 01: Project Alpha</p>
        </div>

        {/* Access code card */}
        <div className="w-full rounded-2xl bg-white p-6 shadow-sm text-left space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Special Access Code</p>

          {/* Code input */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <KeyRound className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="text-sm font-mono text-slate-400 tracking-widest">ENTER-ALPHA-CODE</span>
          </div>

          {/* Clearance note */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500 shrink-0" />
            <p className="text-sm text-slate-500">Clearance Level: Restricted Intellectual Assets</p>
          </div>

          {/* CTA Button */}
          <button className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition hover:bg-blue-700 flex items-center justify-center gap-2">
            Initialize Workspace
            <span aria-hidden="true">→</span>
          </button>

          {/* Lost credentials */}
          <p className="text-center text-sm text-slate-500">
            Lost your credentials?{" "}
            <span className="font-semibold text-blue-600 cursor-pointer hover:underline">Contact System Administrator</span>
          </p>
        </div>
      </div>

      {/* Floating help card — bottom right */}
      <div className="fixed bottom-8 right-8 flex items-start gap-3 rounded-2xl bg-white px-5 py-4 shadow-lg border border-slate-100 max-w-xs">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
          <Info className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-700">Need Assistance?</p>
          <p className="mt-1 text-xs text-slate-500 leading-relaxed">
            Access codes are unique to each researcher in simulation Phase 01.
          </p>
        </div>
      </div>

    </div>
  )
}
