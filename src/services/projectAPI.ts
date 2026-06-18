import api from './api'

export interface BackendProject {
  id: number
  title: string
  description: string
  category: string
  difficulty: string
  status: string
  tags: string[]
}

export interface BackendSubmission {
  id: number
  projectId: number
  userId: number
  projectLink: string
  demoLink: string
  description: string
  status: 'pending' | 'approved' | 'rejected'
  feedback?: string
  score?: number
  submittedAt: string
  reviewedAt?: string
  Project?: {
    id: number
    title: string
    category: string
    difficulty: string
  }
}

export interface DashboardStats {
  projectsSubmitted: number
  projectsApproved: number
  coursesEnrolled: number
  coursesCompleted: number
}

export const projectAPI = {
  getAllProjects: async (): Promise<BackendProject[]> => {
    const res = await api.get('/projects')
    return res.data.data?.data || []
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    const res = await api.get('/dashboard')
    return res.data.data?.stats ?? {
      projectsSubmitted: 0,
      projectsApproved: 0,
      coursesEnrolled: 0,
      coursesCompleted: 0,
    }
  },

  submitProject: async (
    projectId: number,
    data: { projectLink: string; demoLink: string; description: string; technologies?: string[] }
  ) => {
    const res = await api.post(`/projects/${projectId}/submit`, data)
    return res.data
  },

  getMySubmissions: async (): Promise<BackendSubmission[]> => {
    const res = await api.get('/projects/my-submissions')
    return res.data.data || []
  },
}
