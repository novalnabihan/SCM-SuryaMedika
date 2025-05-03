'use client';

import { useState } from 'react';
import SidebarLink from './SidebarLink';
import LogoutModal from '@/app/components/logout/logoutomodal';
import { LayoutDashboard, Package, Warehouse, Boxes, UserRound, LogOut } from 'lucide-react';

const Sidebar = () => {
  const [showLogout, setShowLogout] = useState(false);

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
        <h2 className="text-2xl font-bold text-white mb-8">PT. Hartindo Surya Medika</h2>
        <nav className="space-y-4">
          <SidebarLink href="/dashboard" icon={LayoutDashboard}>Dashboard</SidebarLink>
          <SidebarLink href="/karyawan" icon={UserRound}>Karyawan</SidebarLink>
          <SidebarLink href="/gudang" icon={Warehouse}>Gudang</SidebarLink>
          <SidebarLink href="/transaksi" icon={Package}>Transaksi</SidebarLink>
          <SidebarLink href="/stok" icon={Boxes}>Stok</SidebarLink>
          <SidebarLink as="button" onClick={() => setShowLogout(true)} icon={LogOut}>Logout </SidebarLink>

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
