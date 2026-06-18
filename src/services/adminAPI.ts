import api from './api'

export interface AdminUser {
  id: number
  email: string
  nama_lengkap: string
  no_hp: string
  role: 'user' | 'mentor' | 'admin'
  level: number
  points: number
  createdAt: string
}

export interface AdminProject {
  id: number
  title: string
  description: string
  fullDescription: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  status: 'active' | 'upcoming' | 'closed'
  tags: string[]
  deadline: string
  reward: { points: number; badge: string }
  participants: number
  completions: number
  createdAt: string
}

export interface AdminQuest {
  id: number
  title: string
  description: string
  xp: number
  status: 'active' | 'locked' | 'completed'
  level: number
  order: number
  clues?: AdminClue[]
  createdAt: string
}

export interface AdminClue {
  id: number
  questId: number | null
  clueCode: string
  type: 'CORE CONCEPT' | 'EVIDENCE' | 'RARE TOOL' | 'PROOF'
  title: string
  description: string
  codeSnippet: string | null
  isLocked: boolean
  createdAt: string
}

export interface AdminOverview {
  totalUsers: number
  totalProjects: number
  totalSubmissions: number
  totalQuests: number
  pendingSubmissions: number
  approvedSubmissions: number
}

const BASE = '/admin'

export const adminAPI = {
  getOverview: async (): Promise<AdminOverview> => {
    const res = await api.get(`${BASE}/overview`)
    return res.data.data
  },

  // Users
  getUsers: async (): Promise<AdminUser[]> => {
    const res = await api.get(`${BASE}/users`)
    return res.data.data || []
  },
  createUser: async (data: { email: string; nama_lengkap: string; password: string; no_hp?: string; role?: string }) => {
    return (await api.post(`${BASE}/users`, data)).data
  },
  updateUser: async (id: number, data: Partial<AdminUser> & { password?: string }) => {
    return (await api.put(`${BASE}/users/${id}`, data)).data
  },
  deleteUser: async (id: number) => {
    return (await api.delete(`${BASE}/users/${id}`)).data
  },

  // Projects
  getProjects: async (): Promise<AdminProject[]> => {
    const res = await api.get(`${BASE}/projects`)
    return res.data.data || []
  },
  createProject: async (data: Partial<AdminProject>) => {
    return (await api.post(`${BASE}/projects`, data)).data
  },
  updateProject: async (id: number, data: Partial<AdminProject>) => {
    return (await api.put(`${BASE}/projects/${id}`, data)).data
  },
  deleteProject: async (id: number) => {
    return (await api.delete(`${BASE}/projects/${id}`)).data
  },

  // Quests
  getQuests: async (): Promise<AdminQuest[]> => {
    const res = await api.get(`${BASE}/quests`)
    return res.data.data || []
  },
  createQuest: async (data: Partial<AdminQuest>) => {
    return (await api.post(`${BASE}/quests`, data)).data
  },
  updateQuest: async (id: number, data: Partial<AdminQuest>) => {
    return (await api.put(`${BASE}/quests/${id}`, data)).data
  },
  deleteQuest: async (id: number) => {
    return (await api.delete(`${BASE}/quests/${id}`)).data
  },

  // Clues
  getClues: async (): Promise<AdminClue[]> => {
    const res = await api.get(`${BASE}/clues`)
    return res.data.data || []
  },
  createClue: async (data: Partial<AdminClue>) => {
    return (await api.post(`${BASE}/clues`, data)).data
  },
  updateClue: async (id: number, data: Partial<AdminClue>) => {
    return (await api.put(`${BASE}/clues/${id}`, data)).data
  },
  deleteClue: async (id: number) => {
    return (await api.delete(`${BASE}/clues/${id}`)).data
  },
}
