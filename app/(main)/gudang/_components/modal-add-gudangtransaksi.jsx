'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Plus } from 'lucide-react';
import { ItemRow } from '../../transaksi/_components/item-row';

export default function ModalAddGudangTransaksi({ warehouseId, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    transactionDate: new Date().toISOString().slice(0, 10),
    isPurchase: true,
    partner: '',
    paymentMethod: '',
    paymentStatus: false,
    items: [{ itemId: '', quantity: 1, unitPrice: 0 }],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleItemChange = (index, key, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][key] = value;
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { itemId: '', quantity: 1, unitPrice: 0 }],
    }));
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transaksi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          warehouseId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        onSuccess?.();
        setOpen(false);
      } else {
        alert(data.message || 'Gagal menyimpan transaksi');
      }
    } catch (err) {
      console.error('Gagal submit transaksi:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-cyan-950 hover:bg-cyan-900 text-white px-5 py-6 rounded-lg min-w-[200px] text-base"
      >
        <Plus className="w-5 h-5" />
        Buat Invoice Baru
      </Button>

      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Catat Transaksi Gudang</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Tanggal</Label>
              <Input
                type="date"
                value={formData.transactionDate}
                onChange={(e) => handleChange('transactionDate', e.target.value)}
              />
            </div>
            <div>
              <Label>Jenis Transaksi</Label>
              <select
                className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2"
                value={formData.isPurchase}
                onChange={(e) => handleChange('isPurchase', e.target.value === 'true')}
              >
                <option value="true">Pembelian</option>
                <option value="false">Penjualan</option>
              </select>
            </div>
            <div>
              <Label>Partner</Label>
              <Input
                value={formData.partner}
                onChange={(e) => handleChange('partner', e.target.value)}
                placeholder={formData.isPurchase ? 'Nama Vendor' : 'Nama Pembeli'}
              />
            </div>
            <div>
              <Label>Metode Pembayaran</Label>
              <Input
                value={formData.paymentMethod}
                onChange={(e) => handleChange('paymentMethod', e.target.value)}
              />
            </div>
            <div>
              <Label>Status Pembayaran</Label>
              <select
                className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2"
                value={formData.paymentStatus}
                onChange={(e) => handleChange('paymentStatus', e.target.value === 'true')}
              >
                <option value="true">Lunas</option>
                <option value="false">Belum Lunas</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-base font-semibold mb-2">Daftar Item</h3>
            <div className="space-y-4">
              {formData.items.map((item, index) => (
                <ItemRow
                  key={index}
                  item={item}
                  onChange={(key, value) => handleItemChange(index, key, value)}
                  onRemove={() => handleRemoveItem(index)}
                  isPurchase={formData.isPurchase}
                />
              ))}
            </div>
            <Button type="button" onClick={handleAddItem} className="mt-3">
              + Tambah Item
            </Button>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="bg-cyan-950 hover:bg-cyan-900 px-6"
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Simpan Transaksi'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
