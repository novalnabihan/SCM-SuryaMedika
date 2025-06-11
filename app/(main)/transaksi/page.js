'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import ModalAdd from './_components/modal-add';
import Link from 'next/link';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Button } from '@/app/components/ui/button';

export default function InvoiceTable() {
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRowId, setExpandedRowId] = useState(null);

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transaksi`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (Array.isArray(data)) {
          setDataTransaksi(data);
        } else {
          setDataTransaksi([]);
        }
      } catch (error) {
        console.error('Gagal fetch transaksi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaksi();
  }, []);

  return (
    <div className="p-6 bg-slate-100 min-h-screen relative">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Tabel Transaksi</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Cari produk..."
            className="flex items-center gap-2 py-6 px-5 text-gray-600 border rounded-md"
          />
          <ModalAdd />
        </div>
      </div>

      <Card className="p-4 shadow-md rounded-xl">
        <ScrollArea>
          <Table className="table-auto">
            <TableHeader>
              <TableRow className="bg-slate-200">
                <TableHead />
                <TableHead />
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
                  <TableCell colSpan={14} className="text-center py-10">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : dataTransaksi.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={14} className="text-center py-10">
                    Tidak ada data transaksi.
                  </TableCell>
                </TableRow>
              ) : (
                dataTransaksi.map((trx) => (
                  <TableRow
                    key={trx.id}
                    className="group hover:bg-gray-50 relative"
                  >
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() =>
                          setExpandedRowId(expandedRowId === trx.id ? null : trx.id)
                        }
                        className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-800"
                      >
                        ⮞
                      </button>
                    </TableCell>
                    <TableCell>{new Date(trx.transactionDate).toLocaleDateString()}</TableCell>
                    <TableCell>{trx.itemId}</TableCell>
                    <TableCell>{trx.itemName}</TableCell>
                    <TableCell>{trx.quantity}</TableCell>
                    <TableCell>Rp {trx.unitPrice.toLocaleString()}</TableCell>
                    <TableCell>Rp {trx.subtotal.toLocaleString()}</TableCell>
                    <TableCell>
                      <Link href={`/gudang/${trx.warehouse.toLowerCase().replace(/ /g, '-')}`}>
                        <span className="text-blue-600 hover:underline">{trx.warehouse}</span>
                      </Link>
                    </TableCell>
                    <TableCell>{trx.operator}</TableCell>
                    <TableCell>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          trx.isPurchase ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {trx.isPurchase ? 'Pembelian' : 'Penjualan'}
                      </span>
                    </TableCell>
                    <TableCell>{trx.partner || '-'}</TableCell>
                    <TableCell>{trx.paymentMethod}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          trx.paymentStatus ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {trx.paymentStatus ? 'Lunas' : 'Belum Lunas'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>

      {/* Side panel (expanded view) */}
      {expandedRowId && (
        <div className="fixed top-0 right-0 w-[40%] h-full bg-white shadow-lg z-50 p-6 overflow-y-auto border-l">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Detail Transaksi</h2>
            <Button variant="ghost" onClick={() => setExpandedRowId(null)}>
              ❌
            </Button>
          </div>
          <p className="text-sm text-gray-500 mb-6">Form edit akan ditambahkan di sini.</p>
        </div>
      )}
    </div>
  );
}
