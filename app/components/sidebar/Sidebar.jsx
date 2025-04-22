'use client';

import SidebarLink from './SidebarLink';
import { LayoutDashboard, Package, Warehouse, Boxes } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-cyan-950 shadow-md p-4 h-screen text-sm">
      <h2 className="text-xl font-bold text-white mb-6">Menu</h2>
      <nav className="space-y-2">
        <SidebarLink href="/dashboard" icon={LayoutDashboard}>Dashboard</SidebarLink>
        <SidebarLink href="/transaksi" icon={Package}>Transaksi</SidebarLink>
        <SidebarLink href="/gudang" icon={Warehouse}>Gudang</SidebarLink>
        <SidebarLink href="/stok" icon={Boxes}>Stok</SidebarLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
