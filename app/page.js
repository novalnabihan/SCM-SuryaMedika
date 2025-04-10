import StatsCard from "@/components/cards/StatsCard";
import DummyChart from "@/components/charts/DummyChart";
import BarangBaruTable from "@/components/tables/BarangBaruTable";
import TransaksiTable from "@/components/tables/TransaksiTable";

export default function Dashboard() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Barang" value={120} />
        <StatsCard title="Barang Individu" value={90} />
        <StatsCard title="Barang Bundle" value={30} />
        <StatsCard title="Total Transaksi" value={45} />
      </div>

      {/* Charts */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DummyChart title="Barang Masuk per Bulan" />
        <DummyChart title="Jenis Transaksi" />
      </div> */}

      {/* Tables */}
      <div className="mt-4">
        {/* <BarangBaruTable /> */}
        <TransaksiTable />
      </div>
    </main>
  );
}
