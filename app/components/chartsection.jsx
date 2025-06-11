"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartSection() {
  const [stokGudang, setStokGudang] = useState({ labels: [], values: [] });
  const [penjualanBulanan, setPenjualanBulanan] = useState({
    labels: [],
    values: [],
  });
  const [barangTerlaris, setBarangTerlaris] = useState({
    labels: [],
    values: [],
  });
  const [trxPerWarehouse, setTrxPerWarehouse] = useState({
    labels: [],
    values: [],
  });
  const [trxDualBar, setTrxDualBar] = useState({
    labels: [],
    pembelian: [],
    penjualan: [],
  });
  const [trxPerBulan, setTrxPerBulan] = useState({
    labels: [],
    pembelian: [],
    penjualan: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        // 1. Stok per gudang
        const res1 = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses/summary/per-warehouse`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(
          "Fetching stok gudang:",
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses/summary/per-warehouse`
        );
        const data1 = await res1.json();
        setStokGudang({
          labels: data1.map((d) => d.name),
          values: data1.map((d) => d.totalStock),
        });

        // 2. Penjualan per bulan
        const res2 = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/transaksi/sales-per-month?year=2025`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(
          "Fetching penjualan:",
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/sales-per-month?year=2025`
        );
        const data2 = await res2.json();
        setPenjualanBulanan({
          labels: data2.map((d) => d.month),
          values: data2.map((d) => d.totalSales),
        });

        // 3. Barang terlaris
        const res3 = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/transaksi/top-items?limit=5`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(
          "Fetching top items:",
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/top-items?limit=5`
        );
        const data3 = await res3.json();
        setBarangTerlaris({
          labels: data3.map((d) => d.itemName),
          values: data3.map((d) => d.totalSold),
        });

        // 4. Total transaksi per gudang
        const res4 = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/transaksi/per-warehouse`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data4 = await res4.json();
        setTrxPerWarehouse({
          labels: data4.map((d) => d.warehouse),
          values: data4.map((d) => d.totalTransactions),
        });

        const res5 = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/transaksi/per-warehouse-by-type`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data5 = await res5.json();
        setTrxDualBar({
          labels: data5.map((d) => d.warehouse),
          pembelian: data5.map((d) => d.pembelian),
          penjualan: data5.map((d) => d.penjualan),
        });

        const res6 = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/transaksi/monthly-by-type?year=2025`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data6 = await res6.json();
        setTrxPerBulan({
          labels: data6.map((d) => d.month),
          pembelian: data6.map((d) => d.pembelian),
          penjualan: data6.map((d) => d.penjualan),
        });
      } catch (err) {
        console.error("Gagal fetch chart data:", err);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
      {/* Chart 1: Stok per Gudang */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Stok per Gudang</h2>
        <Bar
          data={{
            labels: stokGudang.labels,
            datasets: [
              {
                label: "Stok",
                data: stokGudang.values,
                backgroundColor: "#3B82F6",
                borderRadius: 6,
              },
            ],
          }}
          options={options}
        />
      </div>

      {/* Chart 2: Penjualan per Bulan */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">
          Transaksi Bulanan (Pembelian vs Penjualan)
        </h2>
        <Bar
          data={{
            labels: trxPerBulan.labels,
            datasets: [
              {
                label: "Pembelian",
                data: trxPerBulan.pembelian,
                backgroundColor: "#f87171", // merah muda
                borderRadius: 6,
              },
              {
                label: "Penjualan",
                data: trxPerBulan.penjualan,
                backgroundColor: "#facc15", // kuning
                borderRadius: 6,
              },
            ],
          }}
          options={options}
        />
      </div>

      {/* Chart 3 & 4 berdampingan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-1 lg:col-span-2">
        {/* Chart 3: Barang Terlaris */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Barang Terlaris</h2>
          <Bar
            data={{
              labels: barangTerlaris.labels,
              datasets: [
                {
                  label: "Jumlah Terjual",
                  data: barangTerlaris.values,
                  backgroundColor: "#10b981",
                  borderRadius: 6,
                },
              ],
            }}
            options={{
              ...options,
              indexAxis: "y",
            }}
          />
        </div>

        {/* Chart 4: Total Transaksi per Gudang */}
        {/* Chart 4: Pembelian vs Penjualan per Gudang */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">
            Transaksi per Gudang (Pembelian vs Penjualan)
          </h2>
          <Bar
            data={{
              labels: trxDualBar.labels,
              datasets: [
                {
                  label: "Pembelian",
                  data: trxDualBar.pembelian,
                  backgroundColor: "#ef4444", // merah
                  borderRadius: 6,
                },
                {
                  label: "Penjualan",
                  data: trxDualBar.penjualan,
                  backgroundColor: "#3b82f6", // biru
                  borderRadius: 6,
                },
              ],
            }}
            options={{
              responsive: true,
              indexAxis: "y", // horizontal bar
              plugins: {
                legend: { position: "top" },
                title: { display: false },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
