import api from './api';

/**
 * Community API Service
 * Handles all community/forum operations
 */

export interface Thread {
  id: number;
  title: string;
  content: string;
  category: string;
  authorId: number;
  author?: {
    id: number;
    nama_lengkap: string;
    avatar: string;
  };
  tags?: string;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  replies?: Reply[];
}

export interface Reply {
  id: number;
  threadId: number;
  authorId: number;
  author?: {
    id: number;
    nama_lengkap: string;
    avatar: string;
  };
  content: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export const communityAPI = {
  // ═══════════════════════════════════════════════════════════════
  // THREADS - Read Operations
  // ═══════════════════════════════════════════════════════════════

  /**
   * Get all threads with filtering and pagination
   */
  getAllThreads: async (params?: {
    page?: number;
    limit?: number;
    category?: string;
    sort?: 'latest' | 'trending';
    mine?: boolean;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.mine) queryParams.append('mine', 'true');

    return api.get(`/community/threads?${queryParams.toString()}`);
  },

  /**
   * Get thread detail with all replies
   */
  getThreadDetail: async (threadId: number) => {
    return api.get(`/community/threads/${threadId}`);
  },

  // ═══════════════════════════════════════════════════════════════
  // THREADS - Write Operations (Protected)
  // ═══════════════════════════════════════════════════════════════

  /**
   * Create new thread
   */
  createThread: async (data: {
    title: string;
    content: string;
    category: string;
    tags?: string[];
  }) => {
    return api.post('/community/threads', {
      title: data.title,
      content: data.content,
      category: data.category,
      tags: data.tags || [],
    });
  },

  /**
   * Delete thread (only if owner)
   */
  deleteThread: async (threadId: number) => {
    return api.delete(`/community/threads/${threadId}`);
  },

  /**
   * Like thread
   */
  likeThread: async (threadId: number) => {
    return api.post(`/community/threads/${threadId}/like`);
  },

  // ═══════════════════════════════════════════════════════════════
  // REPLIES - Comments/Responses
  // ═══════════════════════════════════════════════════════════════

  /**
   * Add reply/comment to thread
   */
  replyToThread: async (threadId: number, data: {
    content: string;
  }) => {
    return api.post(`/community/threads/${threadId}/replies`, {
      content: data.content,
    });
  },

  /**
   * Delete reply (only if owner)
   */
  deleteReply: async (threadId: number, replyId: number) => {
    return api.delete(`/community/threads/${threadId}/replies/${replyId}`);
  },
};

export default communityAPI;