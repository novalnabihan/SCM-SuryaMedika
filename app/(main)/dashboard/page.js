'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartSection from "@/app/components/chartsection";

// Registrasi Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Helper untuk format Rupiah
const formatRupiah = (value) => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value || 0);

  return formatted.replace('IDR', 'Rp');
};


export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState({
    totalStok: 0,
    totalModal: 0,
    totalValue: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload); // ambil { id, username, role }
    } catch (err) {
      console.error('Failed to parse token:', err);
    }

    const fetchSummary = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses/summary/global`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setSummary(data);
        } else {
          console.error('Gagal ambil summary:', data.message);
        }
      } catch (err) {
        console.error('Error fetching summary:', err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Selamat datang kembali, <span className="text-cyan-700">{user?.username || 'Pengguna'}!</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Anda login sebagai <span className="capitalize">{user?.role}</span>.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm">Total Stok</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{summary.totalStok}</p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Modal Gudang</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{formatRupiah(summary.totalModal)}</p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Value Gudang</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{formatRupiah(summary.totalValue)}</p>
        </div>
      </div>

      {/* Chart */}
      <ChartSection />
    </div>
  );
}
