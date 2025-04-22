import StatsCard from "@/app/components/cards/StatsCard";
import TransaksiTable from "@/app/components/tables/TransaksiTable";

export default function Dashboard() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gudang</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatsCard title="Total Barang" value={120} />
<StatsCard title="Total Modal" value={(90000000).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} />
<StatsCard title="Total Value" value={(300000000).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} />
{/* <StatsCard title="Total Transaksi" value={45} /> */}

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
