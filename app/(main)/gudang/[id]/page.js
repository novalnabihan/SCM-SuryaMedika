"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Warehouse, MapPin } from "lucide-react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import ModalAddGudangTransaksi from "../_components/modal-add-gudangtransaksi";
import { useRouter } from "next/navigation";

export default function GudangDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [gudang, setGudang] = useState(null);
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalStok: 0,
    totalModal: 0,
    totalValue: 0,
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch gudang
      const gudangRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const gudangData = await gudangRes.json();
      setGudang(gudangData);

      // Fetch transaksi
      const trxRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses/${id}/transactions`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const trxData = await trxRes.json();
      setTransaksi(Array.isArray(trxData) ? trxData : []);

      // Fetch summary
      const summaryRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses/${id}/summary`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const summaryData = await summaryRes.json();
      setSummary(summaryData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) return <p>Memuat data gudang...</p>;
  if (!gudang) return <p>Gudang tidak ditemukan.</p>;

  return (
    <div className="p-7 bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/gudang")}
          className="text-sm text-cyan-700 border border-cyan-700 hover:bg-cyan-50 px-4 py-2 rounded-lg mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>

        <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-900">
          <Warehouse className="text-cyan-800" /> {gudang.name}
        </h1>
        <p className="text-gray-500 mt-2 flex items-center gap-2">
          <MapPin size={16} /> {gudang.address}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-5 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Stok</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            {summary.totalStok}
          </p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Modal Gudang</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            Rp {summary.totalModal.toLocaleString()}
          </p>
        </div>
        <div className="p-5 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Total Value Gudang</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">
            Rp {summary.totalValue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Tabel Transaksi */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Transaksi di Gudang Ini</h2>
        <div className="flex gap-4">
          <Input
            placeholder="Cari produk..."
            className="py-6 px-5 text-gray-600 border rounded-md"
          />
          <ModalAddGudangTransaksi warehouseId={id} onSuccess={fetchData} />
        </div>
      </div>

      <Card className="p-4 shadow-md rounded-xl">
        <ScrollArea>
          <Table className="table-auto text-base">
            <TableHeader>
              <TableRow className="bg-slate-200">
                <TableHead>Tanggal</TableHead>
                <TableHead>Kode Barang</TableHead>
                <TableHead>Nama Barang</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Harga Satuan</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Partner</TableHead>
                <TableHead>Metode Pembayaran</TableHead>
                <TableHead>Status Pembayaran</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transaksi.map((trx) => (
                <TableRow key={trx.id}>
                  <TableCell>
                    {new Date(trx.transactionDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{trx.itemCode}</TableCell>
                  <TableCell>{trx.itemName}</TableCell>
                  <TableCell>{trx.quantity}</TableCell>
                  <TableCell>Rp {trx.unitPrice.toLocaleString()}</TableCell>
                  <TableCell>Rp {trx.subtotal.toLocaleString()}</TableCell>
                  <TableCell>{trx.operator}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        trx.isPurchase
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {trx.isPurchase ? "Pembelian" : "Penjualan"}
                    </span>
                  </TableCell>
                  <TableCell>{trx.partner}</TableCell>
                  <TableCell>{trx.paymentMethod}</TableCell>
                  <TableCell>
                    <span
                      className={`text-sm font-medium ${
                        trx.paymentStatus ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {trx.paymentStatus ? "Lunas" : "Belum Lunas"}
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
