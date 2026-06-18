import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Loader2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { adminAPI, type AdminQuest, type AdminClue } from '@/services/adminAPI'

type Tab = 'quests' | 'clues'

// ─── Quest Modal Form ─────────────────────────────────────────────────────────
interface QuestForm { title: string; description: string; xp: string; status: string; level: string; order: string }
const EMPTY_QUEST: QuestForm = { title: '', description: '', xp: '500', status: 'active', level: '1', order: '1' }

// ─── Clue Modal Form ──────────────────────────────────────────────────────────
interface ClueForm { questId: string; clueCode: string; type: string; title: string; description: string; codeSnippet: string; isLocked: boolean }
const EMPTY_CLUE: ClueForm = { questId: '', clueCode: '', type: 'CORE CONCEPT', title: '', description: '', codeSnippet: '', isLocked: false }

const inputCls = "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><label className="block text-xs text-gray-400 mb-1">{label}</label>{children}</div>
)

export default function AdminQuestsPage() {
  const [tab, setTab] = useState<Tab>('quests')
  const [quests, setQuests] = useState<AdminQuest[]>([])
  const [clues, setClues] = useState<AdminClue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedQuest, setExpandedQuest] = useState<number | null>(null)

  // Quest modal
  const [questModal, setQuestModal] = useState<'add' | 'edit' | null>(null)
  const [editQuest, setEditQuest] = useState<AdminQuest | null>(null)
  const [questForm, setQuestForm] = useState<QuestForm>(EMPTY_QUEST)
  const [questSaving, setQuestSaving] = useState(false)
  const [questError, setQuestError] = useState('')
  const [deleteQuestId, setDeleteQuestId] = useState<number | null>(null)

  // Clue modal
  const [clueModal, setClueModal] = useState<'add' | 'edit' | null>(null)
  const [editClue, setEditClue] = useState<AdminClue | null>(null)
  const [clueForm, setClueForm] = useState<ClueForm>(EMPTY_CLUE)
  const [clueSaving, setClueSaving] = useState(false)
  const [clueError, setClueError] = useState('')
  const [deleteClueId, setDeleteClueId] = useState<number | null>(null)

  const load = async () => {
    try {
      setLoading(true); setError('')
      const [q, c] = await Promise.all([adminAPI.getQuests(), adminAPI.getClues()])
      setQuests(q); setClues(c)
    } catch { setError('Gagal memuat data') }
    finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  // ── Quest handlers ──────────────────────────────────────────────────────────
  const openAddQuest = () => { setQuestForm(EMPTY_QUEST); setQuestError(''); setQuestModal('add') }
  const openEditQuest = (q: AdminQuest) => {
    setEditQuest(q)
    setQuestForm({ title: q.title, description: q.description, xp: String(q.xp), status: q.status, level: String(q.level), order: String(q.order) })
    setQuestError(''); setQuestModal('edit')
  }
  const closeQuestModal = () => { setQuestModal(null); setEditQuest(null); setQuestError('') }

  const saveQuest = async () => {
    if (!questForm.title || !questForm.description) { setQuestError('Judul dan deskripsi wajib diisi'); return }
    try {
      setQuestSaving(true); setQuestError('')
      const payload = { title: questForm.title, description: questForm.description, xp: Number(questForm.xp), status: questForm.status as any, level: Number(questForm.level), order: Number(questForm.order) }
      if (questModal === 'add') await adminAPI.createQuest(payload)
      else if (editQuest) await adminAPI.updateQuest(editQuest.id, payload)
      closeQuestModal(); load()
    } catch (err: any) { setQuestError(err.response?.data?.message || 'Gagal menyimpan') }
    finally { setQuestSaving(false) }
  }

  const deleteQuest = async (id: number) => {
    try { await adminAPI.deleteQuest(id); setDeleteQuestId(null); load() }
    catch { alert('Gagal menghapus quest') }
  }

  // ── Clue handlers ───────────────────────────────────────────────────────────
  const openAddClue = () => { setClueForm(EMPTY_CLUE); setClueError(''); setClueModal('add') }
  const openEditClue = (c: AdminClue) => {
    setEditClue(c)
    setClueForm({ questId: c.questId ? String(c.questId) : '', clueCode: c.clueCode, type: c.type, title: c.title, description: c.description, codeSnippet: c.codeSnippet || '', isLocked: c.isLocked })
    setClueError(''); setClueModal('edit')
  }
  const closeClueModal = () => { setClueModal(null); setEditClue(null); setClueError('') }

  const saveClue = async () => {
    if (!clueForm.clueCode || !clueForm.title || !clueForm.description) { setClueError('Kode, judul, dan deskripsi wajib diisi'); return }
    try {
      setClueSaving(true); setClueError('')
      const payload = { questId: clueForm.questId ? Number(clueForm.questId) : null, clueCode: clueForm.clueCode, type: clueForm.type as any, title: clueForm.title, description: clueForm.description, codeSnippet: clueForm.codeSnippet || null, isLocked: clueForm.isLocked }
      if (clueModal === 'add') await adminAPI.createClue(payload)
      else if (editClue) await adminAPI.updateClue(editClue.id, payload)
      closeClueModal(); load()
    } catch (err: any) { setClueError(err.response?.data?.message || 'Gagal menyimpan') }
    finally { setClueSaving(false) }
  }

  const deleteClue = async (id: number) => {
    try { await adminAPI.deleteClue(id); setDeleteClueId(null); load() }
    catch { alert('Gagal menghapus clue') }
  }

  const typeBadge: Record<string, string> = {
    'CORE CONCEPT': 'bg-blue-500/20 text-blue-300',
    'EVIDENCE': 'bg-green-500/20 text-green-300',
    'RARE TOOL': 'bg-purple-500/20 text-purple-300',
    'PROOF': 'bg-orange-500/20 text-orange-300',
  }
  const statusBadge: Record<string, string> = {
    active: 'bg-emerald-500/20 text-emerald-400',
    locked: 'bg-gray-700 text-gray-400',
    completed: 'bg-blue-500/20 text-blue-400',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Gamified Quest</h1>
          <p className="text-gray-400 text-sm">Kelola quest aktif dan clue inventory</p>
        </div>
        <button
          onClick={tab === 'quests' ? openAddQuest : openAddClue}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} /> {tab === 'quests' ? 'Tambah Quest' : 'Tambah Clue'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1 w-fit mb-6">
        {(['quests', 'clues'] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === t ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'}`}>
            {t === 'quests' ? 'Active Quests' : 'Clue Inventory'}
          </button>
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {loading ? (
        <div className="p-8 text-center"><Loader2 size={24} className="animate-spin mx-auto text-gray-500" /></div>
      ) : tab === 'quests' ? (
        /* ─── Quests Tab ─── */
        <div className="space-y-3">
          {quests.length === 0 && <p className="text-gray-500 text-center py-8">Belum ada quest</p>}
          {quests.map((q) => (
            <div key={q.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <button onClick={() => setExpandedQuest(expandedQuest === q.id ? null : q.id)} className="text-gray-400 hover:text-white shrink-0">
                    {expandedQuest === q.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <div className="min-w-0">
                    <p className="font-medium text-white truncate">{q.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${statusBadge[q.status]}`}>{q.status}</span>
                      <span className="text-xs text-gray-500">Level {q.level} · {q.xp} XP</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <button onClick={() => openEditQuest(q)} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded"><Pencil size={14} /></button>
                  <button onClick={() => setDeleteQuestId(q.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded"><Trash2 size={14} /></button>
                </div>
              </div>
              {expandedQuest === q.id && (
                <div className="px-5 pb-4 border-t border-gray-800 pt-3">
                  <p className="text-gray-400 text-sm mb-3">{q.description}</p>
                  {q.clues && q.clues.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Clues terkait</p>
                      <div className="space-y-1">
                        {q.clues.map((c) => (
                          <div key={c.id} className="flex items-center gap-2 text-sm">
                            <span className="font-mono text-orange-400 w-10 shrink-0">#{c.clueCode}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${typeBadge[c.type] || ''}`}>{c.type}</span>
                            <span className="text-gray-300 truncate">{c.title}</span>
                            {c.isLocked && <span className="text-xs text-yellow-500 ml-auto shrink-0">🔒</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* ─── Clues Tab ─── */
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800">
                <tr className="text-gray-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-4 py-3">Kode</th>
                  <th className="text-left px-4 py-3">Tipe</th>
                  <th className="text-left px-4 py-3">Judul</th>
                  <th className="text-left px-4 py-3">Quest</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {clues.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-8 text-gray-500">Belum ada clue</td></tr>
                ) : clues.map((c) => {
                  const linkedQuest = quests.find((q) => q.id === c.questId)
                  return (
                    <tr key={c.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-orange-400 font-medium">#{c.clueCode}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeBadge[c.type] || ''}`}>{c.type}</span>
                      </td>
                      <td className="px-4 py-3 text-white max-w-xs truncate">{c.title}</td>
                      <td className="px-4 py-3 text-gray-400 truncate">{linkedQuest?.title || '—'}</td>
                      <td className="px-4 py-3">
                        {c.isLocked ? <span className="text-yellow-500 text-xs">🔒 Locked</span> : <span className="text-emerald-400 text-xs">Unlocked</span>}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <button onClick={() => openEditClue(c)} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded"><Pencil size={14} /></button>
                          <button onClick={() => setDeleteClueId(c.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quest Modal */}
      {questModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="font-semibold text-white">{questModal === 'add' ? 'Tambah Quest' : 'Edit Quest'}</h2>
              <button onClick={closeQuestModal} className="text-gray-400 hover:text-white"><X size={18} /></button>
            </div>
            <div className="px-6 py-4 space-y-4">
              {questError && <p className="text-red-400 text-sm">{questError}</p>}
              <Field label="Judul"><input type="text" value={questForm.title} onChange={(e) => setQuestForm((p) => ({ ...p, title: e.target.value }))} placeholder="Nama quest" className={inputCls} /></Field>
              <Field label="Deskripsi"><textarea value={questForm.description} onChange={(e) => setQuestForm((p) => ({ ...p, description: e.target.value }))} rows={3} className={inputCls + ' resize-none'} /></Field>
              <div className="grid grid-cols-3 gap-3">
                <Field label="XP"><input type="number" value={questForm.xp} onChange={(e) => setQuestForm((p) => ({ ...p, xp: e.target.value }))} className={inputCls} /></Field>
                <Field label="Level"><input type="number" value={questForm.level} onChange={(e) => setQuestForm((p) => ({ ...p, level: e.target.value }))} className={inputCls} /></Field>
                <Field label="Order"><input type="number" value={questForm.order} onChange={(e) => setQuestForm((p) => ({ ...p, order: e.target.value }))} className={inputCls} /></Field>
              </div>
              <Field label="Status">
                <select value={questForm.status} onChange={(e) => setQuestForm((p) => ({ ...p, status: e.target.value }))} className={inputCls}>
                  <option value="active">Active</option>
                  <option value="locked">Locked</option>
                  <option value="completed">Completed</option>
                </select>
              </Field>
            </div>
            <div className="px-6 py-4 border-t border-gray-800 flex gap-3 justify-end">
              <button onClick={closeQuestModal} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Batal</button>
              <button onClick={saveQuest} disabled={questSaving} className="px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium disabled:opacity-50 flex items-center gap-2">
                {questSaving && <Loader2 size={14} className="animate-spin" />} Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clue Modal */}
      {clueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
              <h2 className="font-semibold text-white">{clueModal === 'add' ? 'Tambah Clue' : 'Edit Clue'}</h2>
              <button onClick={closeClueModal} className="text-gray-400 hover:text-white"><X size={18} /></button>
            </div>
            <div className="px-6 py-4 space-y-4 overflow-y-auto">
              {clueError && <p className="text-red-400 text-sm">{clueError}</p>}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Kode Clue"><input type="text" value={clueForm.clueCode} onChange={(e) => setClueForm((p) => ({ ...p, clueCode: e.target.value }))} placeholder="882" className={inputCls} /></Field>
                <Field label="Tipe">
                  <select value={clueForm.type} onChange={(e) => setClueForm((p) => ({ ...p, type: e.target.value }))} className={inputCls}>
                    <option>CORE CONCEPT</option>
                    <option>EVIDENCE</option>
                    <option>RARE TOOL</option>
                    <option>PROOF</option>
                  </select>
                </Field>
              </div>
              <Field label="Judul"><input type="text" value={clueForm.title} onChange={(e) => setClueForm((p) => ({ ...p, title: e.target.value }))} placeholder="Nama clue" className={inputCls} /></Field>
              <Field label="Deskripsi"><textarea value={clueForm.description} onChange={(e) => setClueForm((p) => ({ ...p, description: e.target.value }))} rows={3} className={inputCls + ' resize-none'} /></Field>
              <Field label="Code Snippet (opsional)"><textarea value={clueForm.codeSnippet} onChange={(e) => setClueForm((p) => ({ ...p, codeSnippet: e.target.value }))} rows={3} placeholder="print('Hello World')" className={inputCls + ' resize-none font-mono text-xs'} /></Field>
              <Field label="Quest (opsional)">
                <select value={clueForm.questId} onChange={(e) => setClueForm((p) => ({ ...p, questId: e.target.value }))} className={inputCls}>
                  <option value="">— Tidak terhubung —</option>
                  {quests.map((q) => <option key={q.id} value={q.id}>{q.title}</option>)}
                </select>
              </Field>
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input type="checkbox" checked={clueForm.isLocked} onChange={(e) => setClueForm((p) => ({ ...p, isLocked: e.target.checked }))} className="accent-orange-500" />
                Clue terkunci (locked)
              </label>
            </div>
            <div className="px-6 py-4 border-t border-gray-800 flex gap-3 justify-end shrink-0">
              <button onClick={closeClueModal} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Batal</button>
              <button onClick={saveClue} disabled={clueSaving} className="px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium disabled:opacity-50 flex items-center gap-2">
                {clueSaving && <Loader2 size={14} className="animate-spin" />} Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Quest Confirm */}
      {deleteQuestId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-sm text-center shadow-2xl">
            <Trash2 size={32} className="text-red-400 mx-auto mb-3" />
            <p className="text-white font-medium mb-1">Hapus quest ini?</p>
            <p className="text-gray-400 text-sm mb-5">Clue yang terhubung akan tetap ada.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteQuestId(null)} className="px-4 py-2 text-sm text-gray-400 border border-gray-700 rounded-lg">Batal</button>
              <button onClick={() => deleteQuest(deleteQuestId)} className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg">Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Clue Confirm */}
      {deleteClueId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-sm text-center shadow-2xl">
            <Trash2 size={32} className="text-red-400 mx-auto mb-3" />
            <p className="text-white font-medium mb-1">Hapus clue ini?</p>
            <p className="text-gray-400 text-sm mb-5">Tindakan ini tidak bisa dibatalkan.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteClueId(null)} className="px-4 py-2 text-sm text-gray-400 border border-gray-700 rounded-lg">Batal</button>
              <button onClick={() => deleteClue(deleteClueId)} className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
