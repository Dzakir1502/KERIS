import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import { profileAPI } from "@/services/api";

const API_BASE_URL = "http://localhost:5000/api";

export interface UserProfile {
  id: number;
  email: string;
  nama_lengkap: string;
  no_hp: string;
  bio: string;
  avatar: string;
  level: number;
  points: number;
  role: "user" | "mentor" | "admin";
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateUser: (data: Partial<UserProfile>) => Promise<UserProfile>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      // Gunakan axios langsung — BUKAN instance api yang punya interceptor redirect
      // Ini mencegah redirect loop saat token expired/invalid di startup
      const res = await axios.get(`${API_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 8000,
      });
      setUser(res.data.data);
    } catch {
      // Token tidak valid — hapus saja, jangan redirect paksa
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (data: Partial<UserProfile>): Promise<UserProfile> => {
    try {
      const res = await profileAPI.updateProfile({
        nama_lengkap: data.nama_lengkap,
        no_hp: data.no_hp,
        bio: data.bio,
        avatar: data.avatar,
      });
      const updatedUser = res.data.data as UserProfile;
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Failed to update user profile:", error);
      throw error;
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout, refreshUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
}