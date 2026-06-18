import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Loader2, AlertCircle } from 'lucide-react'
import { adminAPI, type AdminProject } from '@/services/adminAPI'

interface ProjectForm {
  title: string
  description: string
  fullDescription: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  status: 'active' | 'upcoming' | 'closed'
  deadline: string
  tags: string
}

const EMPTY_FORM: ProjectForm = {
  title: '', description: '', fullDescription: '', category: '', difficulty: 'easy', status: 'active', deadline: '', tags: '',
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<AdminProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [editTarget, setEditTarget] = useState<AdminProject | null>(null)
  const [form, setForm] = useState<ProjectForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const load = async () => {
    try { setLoading(true); setError(''); setProjects(await adminAPI.getProjects()) }
    catch { setError('Gagal memuat data project') }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const openAdd = () => { setForm(EMPTY_FORM); setFormError(''); setModal('add') }
  const openEdit = (p: AdminProject) => {
    setEditTarget(p)
    setForm({
      title: p.title, description: p.description, fullDescription: p.fullDescription || '',
      category: p.category, difficulty: p.difficulty, status: p.status,
      deadline: p.deadline ? p.deadline.slice(0, 10) : '',
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : '',
    })
    setFormError(''); setModal('edit')
  }
  const closeModal = () => { setModal(null); setEditTarget(null); setForm(EMPTY_FORM); setFormError('') }

  const handleSave = async () => {
    if (!form.title || !form.description || !form.category || !form.difficulty || !form.deadline) {
      setFormError('Judul, deskripsi, kategori, difficulty, dan deadline wajib diisi'); return
    }
    try {
      setSaving(true); setFormError('')
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      }
      if (modal === 'add') await adminAPI.createProject(payload)
      else if (editTarget) await adminAPI.updateProject(editTarget.id, payload)
      closeModal(); load()
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Gagal menyimpan')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id: number) => {
    try { await adminAPI.deleteProject(id); setDeleteId(null); load() }
    catch { alert('Gagal menghapus project') }
  }

  const diffColor = { easy: 'text-green-400 bg-green-500/10', medium: 'text-yellow-400 bg-yellow-500/10', hard: 'text-red-400 bg-red-500/10' }
  const statusColor = { active: 'text-emerald-400 bg-emerald-500/10', upcoming: 'text-blue-400 bg-blue-500/10', closed: 'text-gray-400 bg-gray-700' }

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div><label className="block text-xs text-gray-400 mb-1">{label}</label>{children}</div>
  )
  const inputCls = "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 text-sm">Kelola instruksi dan tugas project</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} /> Tambah Project
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center"><Loader2 size={24} className="animate-spin mx-auto text-gray-500" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800">
                <tr className="text-gray-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-4 py-3">Judul</th>
                  <th className="text-left px-4 py-3">Kategori</th>
                  <th className="text-left px-4 py-3">Difficulty</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Deadline</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {projects.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-8 text-gray-500">Belum ada project</td></tr>
                ) : projects.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-white max-w-xs truncate">{p.title}</td>
                    <td className="px-4 py-3 text-gray-400">{p.category}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${diffColor[p.difficulty]}`}>{p.difficulty}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColor[p.status]}`}>{p.status}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{p.deadline ? new Date(p.deadline).toLocaleDateString('id-ID') : '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded"><Pencil size={14} /></button>
                        <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-lg shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
              <h2 className="font-semibold text-white">{modal === 'add' ? 'Tambah Project' : 'Edit Project'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white"><X size={18} /></button>
            </div>
            <div className="px-6 py-4 space-y-4 overflow-y-auto">
              {formError && <p className="text-red-400 text-sm">{formError}</p>}
              <Field label="Judul Project">
                <input type="text" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Nama project" className={inputCls} />
              </Field>
              <Field label="Deskripsi Singkat">
                <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={2} placeholder="Deskripsi pendek..." className={inputCls + ' resize-none'} />
              </Field>
              <Field label="Deskripsi Lengkap (opsional)">
                <textarea value={form.fullDescription} onChange={(e) => setForm((p) => ({ ...p, fullDescription: e.target.value }))} rows={4} placeholder="Instruksi dan detail project..." className={inputCls + ' resize-none'} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Kategori">
                  <input type="text" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} placeholder="AI Development" className={inputCls} />
                </Field>
                <Field label="Deadline">
                  <input type="date" value={form.deadline} onChange={(e) => setForm((p) => ({ ...p, deadline: e.target.value }))} className={inputCls} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Difficulty">
                  <select value={form.difficulty} onChange={(e) => setForm((p) => ({ ...p, difficulty: e.target.value as any }))} className={inputCls}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </Field>
                <Field label="Status">
                  <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as any }))} className={inputCls}>
                    <option value="active">Active</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="closed">Closed</option>
                  </select>
                </Field>
              </div>
              <Field label="Tags (pisahkan dengan koma)">
                <input type="text" value={form.tags} onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))} placeholder="Python, ML, Pandas" className={inputCls} />
              </Field>
            </div>
            <div className="px-6 py-4 border-t border-gray-800 flex gap-3 justify-end shrink-0">
              <button onClick={closeModal} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Batal</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium disabled:opacity-50 flex items-center gap-2">
                {saving && <Loader2 size={14} className="animate-spin" />} Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-sm text-center shadow-2xl">
            <Trash2 size={32} className="text-red-400 mx-auto mb-3" />
            <p className="text-white font-medium mb-1">Hapus project ini?</p>
            <p className="text-gray-400 text-sm mb-5">Semua submission terkait bisa terpengaruh.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-gray-400 border border-gray-700 rounded-lg">Batal</button>
              <button onClick={() => handleDelete(deleteId)} className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
