'use client';
import { useRouter } from 'next/navigation'; 
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function useAuth(options = {}) {
  const { requiredRole } = options;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login?reason=unauthenticated');
        return;
      }

      const decoded = jwtDecode(token);
      
      const isExpired = decoded.exp * 1000 < Date.now();
      if (isExpired) {
        localStorage.removeItem('token');
        router.push('/login?reason=expired');
      } else {
        setUser(decoded);
        if (requiredRole && decoded.role !== requiredRole) {
          alert('Anda tidak memiliki izin untuk mengakses halaman ini.');
          router.push('/dashboard'); 
        }
      }

    } catch (err) {
      console.error('Gagal decode token:', err);
      localStorage.removeItem('token');
      router.push('/login');
      setUser(null);
    } finally {
        setLoading(false); 
    }
  }, [router, requiredRole]);

  return { user, loading }; 
};
