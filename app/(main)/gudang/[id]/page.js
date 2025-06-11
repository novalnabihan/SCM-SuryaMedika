// GudangDetailPage.js (revisi agar table-nya sama seperti transaksi, tanpa kolom Gudang)

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ExpandedDetailPanel from "../../transaksi/_components/ExpandedDetailPanel";
import ModalAddGudangTransaksi from "../_components/modal-add-gudangtransaksi";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft, Warehouse, MapPin } from "lucide-react";

export default function GudangDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [gudang, setGudang] = useState(null);
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [expandedData, setExpandedData] = useState(null);
  const [summary, setSummary] = useState({ totalStok: 0, totalModal: 0, totalValue: 0 });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const [gudangRes, trxRes, summaryRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses/${id}`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses/${id}/transactions`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses/${id}/summary`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const [gudangData, trxData, summaryData] = await Promise.all([
        gudangRes.json(),
        trxRes.json(),
        summaryRes.json(),
      ]);

      setGudang(gudangData);
      setTransaksi(Array.isArray(trxData) ? trxData : []);
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

  const handleSave = async (updatePayload) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transaksi/${expandedRowId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatePayload),
      });
      if (res.ok) {
        await fetchData();
        setExpandedRowId(null);
        setExpandedData(null);
      }
    } catch (err) {
      console.error("Error update transaksi:", err);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transaksi/${expandedRowId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchData();
        setExpandedRowId(null);
        setExpandedData(null);
      }
    } catch (err) {
      console.error("Error delete transaksi:", err);
    }
  };

  if (loading) return <p>Memuat data gudang...</p>;
  if (!gudang) return <p>Gudang tidak ditemukan.</p>;

  return (
    <div className="p-7 bg-slate-100 min-h-screen relative">
      <Button variant="ghost" onClick={() => router.push("/gudang")} className="text-sm text-cyan-700 border border-cyan-700 hover:bg-cyan-50 px-4 py-2 rounded-lg mb-4">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Button>

      <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-900">
        <Warehouse className="text-cyan-800" /> {gudang.name}
      </h1>
      <p className="text-gray-500 mt-2 flex items-center gap-2">
        <MapPin size={16} /> {gudang.address}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <Card className="p-5"><p className="text-sm text-gray-500">Total Stok</p><p className="text-2xl font-bold text-gray-800">{summary.totalStok}</p></Card>
        <Card className="p-5"><p className="text-sm text-gray-500">Total Modal</p><p className="text-2xl font-bold text-gray-800">Rp {summary.totalModal.toLocaleString()}</p></Card>
        <Card className="p-5"><p className="text-sm text-gray-500">Total Value</p><p className="text-2xl font-bold text-gray-800">Rp {summary.totalValue.toLocaleString()}</p></Card>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Transaksi di Gudang Ini</h2>
        <div className="flex gap-4">
          <Input placeholder="Cari produk..." className="py-6 px-5 text-gray-600 border rounded-md" />
          <ModalAddGudangTransaksi warehouseId={id} onSuccess={fetchData} />
        </div>
      </div>

      <Card className="p-0 shadow-md rounded-xl overflow-hidden">
        <ScrollArea>
          <div className="min-w-[1200px]">
            <Table className="table-auto text-base [&_th]:px-4 [&_th]:py-3 [&_td]:px-4 [&_td]:py-3">
              <TableHeader className="bg-slate-200 sticky top-0 z-10">
                <TableRow>
                  <TableHead />
                  <TableHead />
                  <TableHead>Kode Invoice</TableHead>
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
                {loading ? (
                  <TableRow><TableCell colSpan={14} className="text-center py-10">Loading...</TableCell></TableRow>
                ) : transaksi.length === 0 ? (
                  <TableRow><TableCell colSpan={14} className="text-center py-10">Tidak ada data transaksi.</TableCell></TableRow>
                ) : (
                  transaksi.map((trx) => (
                    <TableRow key={trx.id} className="group hover:bg-gray-50 relative">
                      <TableCell />
                      <TableCell>
                        <button
                          onClick={() => {
                            if (expandedRowId === trx.id) {
                              setExpandedRowId(null);
                              setExpandedData(null);
                            } else {
                              setExpandedRowId(trx.id);
                              setExpandedData(trx);
                            }
                          }}
                          className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-800"
                        >⮞</button>
                      </TableCell>
                      <TableCell>{trx.invoiceCode}</TableCell>
                      <TableCell>{new Date(trx.transactionDate).toLocaleDateString()}</TableCell>
                      <TableCell>{trx.itemId}</TableCell>
                      <TableCell>{trx.itemName}</TableCell>
                      <TableCell>{trx.quantity}</TableCell>
                      <TableCell>Rp {trx.unitPrice.toLocaleString()}</TableCell>
                      <TableCell>Rp {trx.subtotal.toLocaleString()}</TableCell>
                      <TableCell>{trx.operator}</TableCell>
                      <TableCell>
                        <span className={`text-sm px-2 py-1 rounded-full ${trx.isPurchase ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {trx.isPurchase ? "Pembelian" : "Penjualan"}
                        </span>
                      </TableCell>
                      <TableCell>{trx.partner}</TableCell>
                      <TableCell>{trx.paymentMethod}</TableCell>
                      <TableCell>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${trx.paymentStatus ? "bg-emerald-100 text-emerald-800" : "bg-yellow-100 text-yellow-700"}`}>
                          {trx.paymentStatus ? "Lunas" : "Belum Lunas"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </Card>

      {expandedRowId && expandedData && (
        <ExpandedDetailPanel
          data={expandedData}
          onSave={handleSave}
          onCancel={() => {
            setExpandedRowId(null);
            setExpandedData(null);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
