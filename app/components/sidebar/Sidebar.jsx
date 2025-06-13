'use client';

import { useEffect, useState } from 'react';
import SidebarLink from './SidebarLink';
import LogoutModal from '@/app/components/logout/logoutomodal';
import {
  LayoutDashboard,
  Package,
  Warehouse,
  Boxes,
  UserRound,
  LogOut,
  FileSpreadsheet
} from 'lucide-react';

const Sidebar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    } catch (err) {
      console.error('Gagal parsing token:', err);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <>
      <aside className="fixed top-0 left-0 w-64 h-screen bg-cyan-950 shadow-lg px-6 py-8 text-base z-50 overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-8">
          PT. Hartindo Surya Medika
        </h2>
        <nav className="space-y-4">
          <SidebarLink href="/dashboard" icon={LayoutDashboard}>
            Dashboard
          </SidebarLink>

          {/* Tampilkan hanya jika manajer */}
          {user?.role === 'manajer' && (
            <SidebarLink href="/karyawan" icon={UserRound}>
              Karyawan
            </SidebarLink>
          )}

          <SidebarLink href="/gudang" icon={Warehouse}>
            Gudang
          </SidebarLink>
          <SidebarLink href="/transaksi" icon={Package}>
            Transaksi
          </SidebarLink>
          <SidebarLink href="/stok" icon={Boxes}>
            Stok
          </SidebarLink>
          <SidebarLink href="/invoice" icon={FileSpreadsheet}>
            Invoice
          </SidebarLink>
          <SidebarLink as="button" onClick={() => setShowLogout(true)} icon={LogOut}>
            Logout
          </SidebarLink>
        </nav>
      </aside>

      <LogoutModal
        open={showLogout}
        onCancel={() => setShowLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;
