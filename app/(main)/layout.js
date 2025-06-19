'use client';

import Sidebar from '@/app/components/sidebar/Sidebar';
import useAuth from '@/hooks/useAuth'; 

export default function MainLayout({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-100">
        Memeriksa sesi Anda...
      </div>
    );
  }
  
  if (user) {
    return (
      <div className="flex min-h-screen">
        <Sidebar /> 
        <main className="ml-64 flex-1 bg-slate-100 p-6">
          {children} 
        </main>
      </div>
    );
  }


  return null; 
}