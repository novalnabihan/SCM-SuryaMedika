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
import ModalAdd from "./_components/modal-add";
import Link from "next/link";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Button } from "@/app/components/ui/button";
import ExpandedDetailPanel from "./_components/ExpandedDetailPanel";

export default function InvoiceTable() {
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [expandedData, setExpandedData] = useState(null);

  const fetchTransaksi = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transaksi`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setDataTransaksi(data);
      else setDataTransaksi([]);
    } catch (error) {
      console.error("Gagal fetch transaksi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);

  const handleSave = async (updatePayload) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transaksi/${expandedRowId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatePayload),
      });
      if (res.ok) {
        await fetchTransaksi();
        setExpandedRowId(null);
        setExpandedData(null);
      } else {
        console.error("Gagal update transaksi");
      }
    } catch (err) {
      console.error("Error saat update:", err);
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
        await fetchTransaksi();
        setExpandedRowId(null);
        setExpandedData(null);
      } else {
        console.error("Gagal hapus transaksi");
      }
    } catch (err) {
      console.error("Error hapus transaksi:", err);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen relative">
      <div className="flex items-center justify-between p-6 pb-4 sticky top-0 bg-slate-100 z-20 min-h-[80px]">
        <h1 className="text-2xl font-bold">Tabel Transaksi</h1>
        <div className="flex items-center gap-4">
          <Input placeholder="Cari produk..." className="w-64 h-12 px-4 text-gray-600 border rounded-md" />
          <ModalAdd />
        </div>
      </div>

      <div className="px-6 pb-6">
        <Card className="p-0 shadow-md rounded-xl overflow-hidden">
          <ScrollArea className="w-full">
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
                    <TableHead>Gudang</TableHead>
                    <TableHead>Operator</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Partner</TableHead>
                    <TableHead>Metode Pembayaran</TableHead>
                    <TableHead>Status Pembayaran</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={14} className="text-center py-10">Loading...</TableCell>
                    </TableRow>
                  ) : dataTransaksi.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={14} className="text-center py-10">Tidak ada data transaksi.</TableCell>
                    </TableRow>
                  ) : (
                    dataTransaksi.map((trx) => (
                      <TableRow key={trx.id} className="group hover:bg-gray-50 relative">
                        <TableCell><Checkbox /></TableCell>
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
                        <TableCell>
                          <Link href={`/gudang/${trx.warehouse.toLowerCase().replace(/ /g, "-")}`}>
                            <span className="text-blue-600 hover:underline">{trx.warehouse}</span>
                          </Link>
                        </TableCell>
                        <TableCell>{trx.operator}</TableCell>
                        <TableCell>
                          <span className={`text-sm px-2 py-1 rounded-full ${trx.isPurchase ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{trx.isPurchase ? "Pembelian" : "Penjualan"}</span>
                        </TableCell>
                        <TableCell>{trx.partner}</TableCell>
                        <TableCell>{trx.paymentMethod}</TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${trx.paymentStatus ? "bg-emerald-100 text-emerald-800" : "bg-yellow-100 text-yellow-700"}`}>{trx.paymentStatus ? "Lunas" : "Belum Lunas"}</span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </Card>
      </div>

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
