import LoginSection from "@/components/sections/login/LoginSection"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError('');

      const res = await api.post('/auth/login', { email, password });
      const token = res.data.data.token;

      // Simpan token lalu fetch data user sebelum navigasi
      localStorage.setItem('token', token);
      await refreshUser();

<<<<<<< HEAD
      navigate('/dashboard');
=======
      // Decode role from JWT payload
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
>>>>>>> 83631dfa5f7a04d89d0a219e8cc90189215aa9b3
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginSection
      onLogin={handleLogin}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      loading={loading}
    />
  );
}