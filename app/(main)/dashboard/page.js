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

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload); // ambil { id, username, role }
    } catch (err) {
      console.error('Failed to parse token:', err);
    }
  }, []);

  const chartData = {
    labels: ['Gudang A', 'Gudang B', 'Gudang C', 'Gudang D','Gudang E', 'Rumah Sakit Hermina', 'sads', 'asdasd', 'asdasd', 'asdasd' ],
    datasets: [
      {
        label: 'Stok Gudang',
        data: [200, 150, 210, 300, 210, 321, 100, 20, 200, 10],
        backgroundColor: '#3B82F6', // biru
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

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
          <p className="text-2xl font-bold text-gray-800 mt-1">560</p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Modal Gudang</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">Rp8,700,000</p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Value Gudang</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">Rp11,200,000</p>
        </div>
      </div>

      {/* Chart */}
      <ChartSection />
    </div>
  );
}
