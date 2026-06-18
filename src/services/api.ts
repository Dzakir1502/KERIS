import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tambahkan token ke setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle error — JANGAN redirect saat request dari AuthContext (startup check)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Hanya redirect jika bukan request profile check saat startup
      // Cek dari flag yang bisa diset oleh caller
      const isAuthCheck = error.config?._isAuthCheck;
      if (!isAuthCheck) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const profileAPI = {
  updateProfile: async (data: {
    nama_lengkap?: string;
    no_hp?: string;
    bio?: string;
    avatar?: string;
  }) => {
    return api.put("/users/profile", data);
  },

  changePassword: async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    return api.put("/users/change-password", data);
  },
};

export default api;