'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  return (
    <aside className="w-64 bg-cyan-950 shadow-md p-4 h-screen">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard">
            <a
              className={`block p-2 rounded ${router.pathname === '/dashboard' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
            >
              Dashboard
            </a>
          </Link>
        </li>
        <li>
          <Link href="/transaksi">
            <a
              className={`block p-2 rounded ${router.pathname === '/transaksi' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
            >
              Transaksi
            </a>
          </Link>
        </li>
        <li>
          <Link href="/gudang">
            <a
              className={`block p-2 rounded ${router.pathname === '/gudang' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
            >
              Gudang
            </a>
          </Link>
        </li>
        <li>
          <Link href="/stok">
            <a
              className={`block p-2 rounded ${router.pathname === '/stok' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
            >
              Stok
            </a>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
