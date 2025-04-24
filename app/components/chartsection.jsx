import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartSection() {
    const dataStokGudang = {
        labels: ['Gudang A', 'Gudang B', 'Gudang C', 'Gudang D','Gudang E', 'Rumah Sakit Hermina', 'sads', 'asdasd', 'asdasd', 'asdasd' ],
        datasets: [
          {
            label: 'Stok Gudang',
            data: [200, 150, 210, 300, 210, 321,100, 20, 200, 10],
            backgroundColor: '#3B82F6', // biru
            borderRadius: 6,
          },
        ],
      };

  const dataPenjualanBulanan = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Total Penjualan",
        data: [120, 150, 180, 200, 170, 220],
        backgroundColor: "#facc15", // kuning
        borderRadius : 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Stok per Gudang</h2>
        <Bar data={dataStokGudang} options={options} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Total Penjualan per Bulan</h2>
        <Bar data={dataPenjualanBulanan} options={options} />
      </div>
    </div>
  );
}
