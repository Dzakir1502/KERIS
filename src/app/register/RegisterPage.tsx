import RegisterSection from "@/components/sections/register/RegisterSection"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [nama_lengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [no_hp, setNoHp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (
    nama_lengkap: string,
    email: string,
    no_hp: string,
    password: string
  ) => {
    try {
      setLoading(true);
      setError('');

      const res = await api.post('/auth/register', {
        nama_lengkap,
        email,
        no_hp,
        password,
      });

      // Auto login setelah register — simpan token lalu fetch user
      const token = res.data.data.token;
      localStorage.setItem('token', token);
      await refreshUser();

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registrasi gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterSection
      onRegister={handleRegister}
      nama_lengkap={nama_lengkap}
      setNamaLengkap={setNamaLengkap}
      email={email}
      setEmail={setEmail}
      no_hp={no_hp}
      setNoHp={setNoHp}
      password={password}
      setPassword={setPassword}
      error={error}
      loading={loading}
    />
  );
}