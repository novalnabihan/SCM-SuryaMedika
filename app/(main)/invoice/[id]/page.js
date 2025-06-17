"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft, Warehouse, MapPin } from "lucide-react";

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/invoice/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setInvoice(data);
        console.log("Invoice:", invoice);
      } catch (err) {
        console.error("Gagal mengambil data invoice:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchInvoice();
  }, [id]);

  if (loading)
    return <div className="p-6 text-gray-500">Memuat data invoice...</div>;
  if (!invoice)
    return (
      <div className="p-6 text-red-500">Data invoice tidak ditemukan.</div>
    );

  return (
    <div className="p-6 space-y-6">
      <Button
        variant="ghost"
        onClick={() => router.push("/invoice")}
        className="text-sm text-cyan-700 border border-cyan-700 hover:bg-cyan-50 px-4 py-2 rounded-lg mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali
      </Button>
      <h1 className="text-2xl font-bold text-cyan-900">Detail Invoice</h1>

      <Card className="p-6 border border-slate-300 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Kode Invoice</p>
            <p className="font-medium text-lg text-cyan-950">
              {invoice.invoiceCode}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tanggal Transaksi</p>
            <p className="font-medium">
              {invoice.transactionDate
                ? format(new Date(invoice.transactionDate), "dd MMM yyyy")
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Metode Pembayaran</p>
            <p className="font-medium">{invoice.paymentMethod}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Status Pembayaran</p>
            <p
              className={`font-semibold ${
                invoice.paymentStatus ? "text-green-700" : "text-yellow-800"
              }`}
            >
              {invoice.paymentStatus ? "Lunas" : "Belum Lunas"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Status Transaksi</p>
            <p
              className={`font-semibold ${
                invoice.items?.[0]?.isPurchase
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {invoice.items?.[0]?.isPurchase ? "Pembelian" : "Penjualan"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Total Transaksi</p>
            <p className="font-semibold text-gray-900">
              Rp{" "}
              {invoice.items
                ?.reduce((acc, trx) => acc + trx.subtotal, 0)
                .toLocaleString("id-ID")}
            </p>
          </div>

          {invoice.items?.[0]?.isPurchase && invoice.items?.[0]?.partner && (
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">Vendor</p>
              <p className="font-medium">{invoice.items[0].partner}</p>
            </div>
          )}

          {invoice.buyer && (
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">Pembeli</p>
              <p className="font-medium">{invoice.buyer}</p>
            </div>
          )}
        </div>
      </Card>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-cyan-900 mb-4">
          Daftar Item Transaksi
        </h2>
        <div className="overflow-x-auto border rounded-md">
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead className="bg-slate-200">
              <tr>
                <th className="px-4 py-3 text-left">Kode Barang</th>
                <th className="px-4 py-3 text-left">Nama Barang</th>
                <th className="px-4 py-3 text-right">Jumlah</th>
                <th className="px-4 py-3 text-right">Harga Satuan</th>
                <th className="px-4 py-3 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {console.log(invoice)}
              {invoice.items?.map((trx) => (
                <tr key={trx.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{trx.item.kodeBarang}</td>
                  <td className="px-4 py-2">{trx.item.name}</td>
                  <td className="px-4 py-2 text-right">{trx.quantity}</td>
                  <td className="px-4 py-2 text-right">
                    Rp {trx.unitPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right">
                    Rp {trx.subtotal.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
