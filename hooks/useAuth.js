'use client';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        setUser(decoded); // { id, username, role, iat, exp }
      }
    } catch (err) {
      console.error('Gagal decode token:', err);
      localStorage.removeItem('token');
      setUser(null);
    }
  }, []);

  return user;
};
