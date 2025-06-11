'use client';

import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';

export default function ExpandedDetailPanel({ data, onSave, onDelete, onCancel }) {
  const [form, setForm] = useState({ ...data });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="fixed top-0 right-0 w-[40%] h-full bg-cyan-950 text-white shadow-lg z-50 p-6 overflow-y-auto border-l border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-white">Detail Transaksi</h2>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          ✕
        </Button>
      </div>

      <div className="space-y-7">
        {[
          { label: 'Kode Invoice', value: form.invoiceCode, type: 'text' },
          { label: 'Tanggal', value: new Date(form.transactionDate).toLocaleDateString(), type: 'date' },
          { label: 'Kode Barang', value: form.itemId },
          { label: 'Nama Barang', value: form.itemName },
          { label: 'Jumlah', value: form.quantity },
          { label: 'Harga Satuan', value: `Rp ${form.unitPrice?.toLocaleString()}` },
          { label: 'Subtotal', value: `Rp ${form.subtotal?.toLocaleString()}` },
          { label: 'Gudang', value: form.warehouse },
          { label: 'Operator', value: form.operator },
          { label: 'Status', value: form.isPurchase ? 'Pembelian' : 'Penjualan' },
          { label: 'Partner', value: form.partner },
        ].map((item, idx) => (
          <div key={idx}>
            <Label className="text-white mb-1 block">{item.label}</Label>
            <div className="text-xs text-gray-400 mb-2">{item.type || 'text'}</div>
            <Input
              value={item.value}
              disabled
              className="bg-white text-cyan-950 cursor-not-allowed"
            />
          </div>
        ))}

        {/* Editable Fields */}
        <div className="pt-4 border-t border-gray-700">
          <h3 className="text-sm font-medium text-white mb-4">Editable Fields</h3>
          <div className="space-y-5">
            <div>
              <Label className="text-white mb-1 block">Metode Pembayaran</Label>
              <div className="text-xs text-gray-400 mb-2">text</div>
              <Input
                value={form.paymentMethod}
                onChange={(e) => handleChange('paymentMethod', e.target.value)}
                placeholder="Masukkan metode pembayaran"
                className="bg-gray-800 text-white"
              />
            </div>

            <div>
              <Label className="text-white mb-1 block">Status Pembayaran</Label>
              <div className="text-xs text-gray-400 mb-2">select</div>
              <select
                value={form.paymentStatus ? 'lunas' : 'belum'}
                onChange={(e) => handleChange('paymentStatus', e.target.value === 'lunas')}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none rounded-md"
              >
                <option value="lunas">Lunas</option>
                <option value="belum">Belum Lunas</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-700">
        <Button
          onClick={onDelete}
          variant="destructive"
          className="text-sm font-medium"
        >
          Hapus
        </Button>
        <div className="flex gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className="text-sm"
          >
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-sm font-medium"
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
}
