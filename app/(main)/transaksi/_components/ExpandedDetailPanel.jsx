'use client';

import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';

export default function ExpandedDetailPanel({ data, onSave, onCancel }) {
  const [form, setForm] = useState({ ...data });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="w-[40%] bg-white shadow-lg border-l p-6 fixed top-0 right-0 h-full overflow-y-auto z-50">
      <h2 className="text-xl font-semibold mb-4">Edit Transaksi</h2>

      <div className="space-y-4">
        <div>
          <Label>Tanggal</Label>
          <Input
            type="date"
            value={form.transactionDate?.slice(0, 10)}
            onChange={(e) => handleChange('transactionDate', e.target.value)}
          />
        </div>

        <div>
          <Label>Jumlah</Label>
          <Input
            type="number"
            value={form.quantity}
            onChange={(e) => handleChange('quantity', e.target.value)}
          />
        </div>

        <div>
          <Label>Metode Pembayaran</Label>
          <Input
            type="text"
            value={form.paymentMethod}
            onChange={(e) => handleChange('paymentMethod', e.target.value)}
          />
        </div>

        <div>
          <Label>Status Pembayaran</Label>
          <select
            value={form.paymentStatus ? 'lunas' : 'belum'}
            onChange={(e) => handleChange('paymentStatus', e.target.value === 'lunas')}
            className="w-full border rounded p-2"
          >
            <option value="lunas">Lunas</option>
            <option value="belum">Belum Lunas</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
}