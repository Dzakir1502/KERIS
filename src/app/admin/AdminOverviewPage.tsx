import { useEffect, useState } from 'react'
import { Users, FolderKanban, FileCheck, Sword, Clock, CheckCircle } from 'lucide-react'
import { adminAPI, type AdminOverview } from '@/services/adminAPI'

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminOverview | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminAPI.getOverview()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const cards = stats
    ? [
        { label: 'Total Users', value: stats.totalUsers, icon: <Users size={22} />, color: 'blue' },
        { label: 'Total Projects', value: stats.totalProjects, icon: <FolderKanban size={22} />, color: 'purple' },
        { label: 'Total Submissions', value: stats.totalSubmissions, icon: <FileCheck size={22} />, color: 'green' },
        { label: 'Total Quests', value: stats.totalQuests, icon: <Sword size={22} />, color: 'orange' },
        { label: 'Pending Review', value: stats.pendingSubmissions, icon: <Clock size={22} />, color: 'yellow' },
        { label: 'Approved', value: stats.approvedSubmissions, icon: <CheckCircle size={22} />, color: 'emerald' },
      ]
    : []

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Dashboard Overview</h1>
      <p className="text-gray-400 text-sm mb-8">Ringkasan data platform KERIS</p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div key={card.label} className={`border rounded-xl p-5 ${colorMap[card.color]}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wider opacity-70">{card.label}</span>
                {card.icon}
              </div>
              <p className="text-4xl font-bold text-white">{card.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
