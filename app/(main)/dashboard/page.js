'use client';

import { Bar } from 'react-chartjs-2';
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

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-5 bg-white rounded-xl shadow-sm">
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
