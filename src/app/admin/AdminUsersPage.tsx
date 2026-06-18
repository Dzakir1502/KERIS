import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Loader2, AlertCircle } from 'lucide-react'
import { adminAPI, type AdminUser } from '@/services/adminAPI'

interface UserForm {
  email: string
  nama_lengkap: string
  password: string
  no_hp: string
  role: string
}

const EMPTY_FORM: UserForm = { email: '', nama_lengkap: '', password: '', no_hp: '', role: 'user' }

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modal, setModal] = useState<'add' | 'edit' | null>(null)
  const [editTarget, setEditTarget] = useState<AdminUser | null>(null)
  const [form, setForm] = useState<UserForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const load = async () => {
    try {
      setLoading(true)
      setError('')
      setUsers(await adminAPI.getUsers())
    } catch {
      setError('Gagal memuat data users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const openAdd = () => { setForm(EMPTY_FORM); setFormError(''); setModal('add') }
  const openEdit = (u: AdminUser) => {
    setEditTarget(u)
    setForm({ email: u.email, nama_lengkap: u.nama_lengkap, password: '', no_hp: u.no_hp || '', role: u.role })
    setFormError('')
    setModal('edit')
  }
  const closeModal = () => { setModal(null); setEditTarget(null); setForm(EMPTY_FORM); setFormError('') }

  const handleSave = async () => {
    if (!form.email || !form.nama_lengkap) { setFormError('Email dan nama wajib diisi'); return }
    if (modal === 'add' && !form.password) { setFormError('Password wajib diisi untuk user baru'); return }
    try {
      setSaving(true)
      setFormError('')
      if (modal === 'add') {
        await adminAPI.createUser({ email: form.email, nama_lengkap: form.nama_lengkap, password: form.password, no_hp: form.no_hp, role: form.role })
      } else if (editTarget) {
        const payload: any = { email: form.email, nama_lengkap: form.nama_lengkap, no_hp: form.no_hp, role: form.role }
        if (form.password) payload.password = form.password
        await adminAPI.updateUser(editTarget.id, payload)
      }
      closeModal()
      load()
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'Gagal menyimpan')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await adminAPI.deleteUser(id)
      setDeleteId(null)
      load()
    } catch {
      alert('Gagal menghapus user')
    }
  }

  const roleBadge = (role: string) => {
    const map: Record<string, string> = {
      admin: 'bg-red-500/20 text-red-400',
      mentor: 'bg-blue-500/20 text-blue-400',
      user: 'bg-gray-700 text-gray-300',
    }
    return map[role] || map.user
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-gray-400 text-sm">Kelola akun pengguna platform</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} /> Tambah User
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500"><Loader2 size={24} className="animate-spin mx-auto" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800">
                <tr className="text-gray-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-4 py-3">Nama</th>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">Role</th>
                  <th className="text-left px-4 py-3">Level</th>
                  <th className="text-left px-4 py-3">Points</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {users.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-8 text-gray-500">Belum ada user</td></tr>
                ) : users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-white">{u.nama_lengkap}</td>
                    <td className="px-4 py-3 text-gray-400">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${roleBadge(u.role)}`}>{u.role}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{u.level}</td>
                    <td className="px-4 py-3 text-gray-300">{u.points}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(u)} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => setDeleteId(u.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="font-semibold text-white">{modal === 'add' ? 'Tambah User' : 'Edit User'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white"><X size={18} /></button>
            </div>
            <div className="px-6 py-4 space-y-4">
              {formError && <p className="text-red-400 text-sm">{formError}</p>}
              {[
                { key: 'nama_lengkap', label: 'Nama Lengkap', type: 'text', placeholder: 'John Doe' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
                { key: 'password', label: modal === 'add' ? 'Password' : 'Password (kosongkan jika tidak diubah)', type: 'password', placeholder: '••••••••' },
                { key: 'no_hp', label: 'No HP (opsional)', type: 'text', placeholder: '08123...' },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs text-gray-400 mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={(form as any)[f.key]}
                    onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="user">user</option>
                  <option value="mentor">mentor</option>
                  <option value="admin">admin</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-800 flex gap-3 justify-end">
              <button onClick={closeModal} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Batal</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2">
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
            <p className="text-white font-medium mb-1">Hapus user ini?</p>
            <p className="text-gray-400 text-sm mb-5">Tindakan ini tidak bisa dibatalkan.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-700 rounded-lg">Batal</button>
              <button onClick={() => handleDelete(deleteId)} className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
