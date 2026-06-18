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
<<<<<<< HEAD
  const [no_hp, setNoHp] = useState('');
=======
>>>>>>> 83631dfa5f7a04d89d0a219e8cc90189215aa9b3
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (
    nama_lengkap: string,
    email: string,
<<<<<<< HEAD
    no_hp: string,
=======
>>>>>>> 83631dfa5f7a04d89d0a219e8cc90189215aa9b3
    password: string
  ) => {
    try {
      setLoading(true);
      setError('');

      const res = await api.post('/auth/register', {
        nama_lengkap,
        email,
<<<<<<< HEAD
        no_hp,
=======
>>>>>>> 83631dfa5f7a04d89d0a219e8cc90189215aa9b3
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
<<<<<<< HEAD
      no_hp={no_hp}
      setNoHp={setNoHp}
=======
>>>>>>> 83631dfa5f7a04d89d0a219e8cc90189215aa9b3
      password={password}
      setPassword={setPassword}
      error={error}
      loading={loading}
    />
  );
}