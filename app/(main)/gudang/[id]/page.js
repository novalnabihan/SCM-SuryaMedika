'use client';

import { useParams } from 'next/navigation';
import { Warehouse, MapPin, PackageSearch, Plus } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import Link from 'next/link';

// Dummy data untuk gudang
const dummyGudang = [
  { id: '1', nama: 'Gudang A', alamat: 'Jl. Mangga Dua', jumlahItem: 2 },
  { id: '2', nama: 'Gudang B', alamat: 'Jl. Ahmad Yani', jumlahItem: 2 },
  { id: '3', nama: 'Gudang C', alamat: 'Jl. Raya', jumlahItem: 3 },
];

const dataTransaksi = [
  {
    id: 1,
    tanggal: "2025-04-10",
    kode: "QWE-21",
    barang: "Bending Iron",
    jumlah: 2,
    hargasatuan: 500000,
    total: 1000000,
    jenis: "Pembelian",
    gudang: "Gudang A",
    operator: "Andi",
  },
  {
    id: 2,
    tanggal: "2025-04-09",
    kode: "SBD-01",
    barang: "Surgical Bone Drill Driller",
    jumlah: 1,
    hargasatuan: 133735140,
    total: 133735140,
    jenis: "Penjualan",
    gudang: "Gudang A",
    operator: "Bagus",
  },
  {
    id: 3,
    tanggal: "2025-04-10",
    kode: "PVS -21",
    barang: "PAVIS 400",
    jumlah: 2,
    hargasatuan: 800000,
    total: 1600000,
    jenis: "Pembelian",
    gudang: "Gudang C",
    operator: "Agus",
  },
  {
    id: 4,
    tanggal: "2025-04-10",
    kode: "PVS-41",
    barang: "PAVIS 401",
    jumlah: 2,
    hargasatuan: 750000,
    total: 1500000,
    jenis: "Penjualan",
    gudang: "Gudang C",
    operator: "Agus",
  },
  {
    id: 5,
    tanggal: "2025-04-10",
    kode: "PVS-55",
    barang: "PAVIS 555",
    jumlah: 2,
    hargasatuan: 2000000,
    total: 4000000,
    jenis: "Pembelian",
    gudang: "Gudang B",
    operator: "Andi",
  },
  {
    id: 6,
    tanggal: "2025-04-10",
    kode: "RSK-21",
    barang: "Ruskin Liston Bone Cutting 18 CM",
    jumlah: 1,
    hargasatuan: 900000,
    total: 900000,
    jenis: "Pembelian",
    gudang: "Gudang C",
    operator: "Andi",
  },
  {
    id: 7,
    tanggal: "2025-04-10",
    kode: "QWE-21",
    barang: "Cast Cutter Saw Oscimed Ergo II",
    jumlah: 1,
    hargasatuan: 11000000,
    total: 11000000,
    jenis: "Penjualan",
    gudang: "Gudang B",
    operator: "Andi",
  },
];

export default function GudangDetailPage() {
  const { id } = useParams();
  const gudang = dummyGudang.find((g) => g.id === id);

  // Filter transaksi berdasarkan nama gudang yang dipilih
  const transaksiGudang = dataTransaksi.filter((t) => t.gudang === gudang?.nama);

  const totalTransaksi = transaksiGudang.length;
  const totalItemTerjual = transaksiGudang.reduce((acc, t) => acc + t.jumlah, 0);
  const totalNilai = transaksiGudang.reduce((acc, t) => acc + t.total, 0);

  if (!gudang) return <p>Gudang tidak ditemukan</p>;

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-900">
          <Warehouse className="text-cyan-800" /> {gudang.nama}
        </h1>
        <p className="text-gray-500 mt-2 flex items-center gap-2">
          <MapPin size={16} /> {gudang.alamat}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-5 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Stok</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{totalItemTerjual}</p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Modal Gudang</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">Rp{totalNilai.toLocaleString()}</p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Value Gudang</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">Rp{totalNilai.toLocaleString()}</p>
        </div>
      </div>

      {/* Tombol Catat Invoice */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tabel Transaksi</h1>
        <div className="flex gap-4">
          <Input placeholder="Cari produk..." className="flex items-center gap-2 py-6 px-5 text-gray-600 border rounded-md" />
          <Button className="flex items-center gap-2 bg-cyan-950 hover:bg-cyan-900 text-white px-5 py-6 rounded-lg min-w-[200px] text-base">
            <Plus className="w-5 h-5" />
            Buat Invoice Baru
          </Button>
        </div>
      </div>

      {/* Table Transaksi */}
      <Card className="p-4 shadow-md rounded-xl">
        <ScrollArea>
          <Table className="table-auto">
            <TableHeader>
              <TableRow className="bg-slate-200">
                <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                  Tanggal
                </TableHead>
                <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                  Kode Barang
                </TableHead>
                <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                  Nama Barang
                </TableHead>
                <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                  Jumlah
                </TableHead>
                <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                  Harga Satuan
                </TableHead>
                <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                  Total
                </TableHead>
                <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                  Gudang
                </TableHead>
                <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                  Operator
                </TableHead>
                <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transaksiGudang.map((transaksi) => (
                <TableRow key={transaksi.id} className="hover:bg-gray-50">
                  <TableCell className="px-6 py-4 text-base">
                    {transaksi.tanggal}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-base">
                    {transaksi.kode}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-base">
                    {transaksi.barang}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-base">
                    {transaksi.jumlah}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-base">
                    Rp {transaksi.hargasatuan.toLocaleString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-base">
                    Rp {transaksi.total.toLocaleString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-base">
                    {transaksi.gudang}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-base">
                    {transaksi.operator}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-base">
                    <span
                      className={`text-base px-2 py-1 rounded-full font-medium ${
                        transaksi.jenis === "Pembelian"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaksi.jenis}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
}
