'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [hargaBaru, setHargaBaru] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/items/${id}/detail`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Gagal ambil detail item');

      const data = await res.json();
      setItem(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateHarga = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/items/${id}/update-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ price: parseFloat(hargaBaru) })
      });

      if (!res.ok) throw new Error('Gagal update harga');

      setHargaBaru('');
      fetchDetail();
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!item) return <p className="p-6">Item tidak ditemukan</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={() => router.push('/stok')} variant="outline">
          ← Kembali
        </Button>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-cyan-900">{item.name}</h1>
        <p className="text-gray-700">Harga Sekarang: Rp {item.currentPrice.toLocaleString()}</p>
        <p className="text-sm text-gray-500">Total Stok: {item.totalStock || '-'}</p>
      </div>

      {/* Distribusi Gudang */}
      <Card className="p-4 bg-slate-50">
        <h2 className="text-lg font-semibold mb-3">📦 Distribusi Stok di Gudang</h2>
        {item.distributions.length > 0 ? (
          <div className="grid grid-cols-3 font-medium text-gray-600 border-b pb-2">
            <span>Gudang</span>
            <span>Alamat</span>
            <span>Jumlah</span>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Belum ada distribusi stok.</p>
        )}
        {item.distributions.map((dist, i) => (
          <div key={i} className="grid grid-cols-3 py-2 border-b text-sm">
            <span>{dist.warehouse}</span>
            <span>{dist.address}</span>
            <span>{dist.quantity}</span>
          </div>
        ))}
      </Card>

      {/* Histori Harga */}
      <Card className="p-4 bg-slate-50">
        <h2 className="text-lg font-semibold mb-3">📈 Histori Perubahan Harga</h2>
        {item.histories.length > 0 ? (
          <div className="grid grid-cols-3 font-medium text-gray-600 border-b pb-2">
            <span>Harga</span>
            <span>Diubah Oleh</span>
            <span>Tanggal</span>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Belum ada histori perubahan harga.</p>
        )}
        {item.histories.map((hist, i) => (
          <div key={i} className="grid grid-cols-3 py-2 text-sm border-b">
            <span>Rp {hist.price.toLocaleString()}</span>
            <span>{hist.changedBy}</span>
            <span>{new Date(hist.changedAt).toLocaleDateString()}</span>
          </div>
        ))}
      </Card>

      {/* Edit Harga */}
      <Card className="p-4 bg-slate-50">
        <h2 className="text-lg font-semibold mb-3">🛠️ Ubah Harga Jual</h2>
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <Label htmlFor="hargaBaru">Harga Baru</Label>
            <Input
              id="hargaBaru"
              type="number"
              value={hargaBaru}
              onChange={(e) => setHargaBaru(e.target.value)}
              placeholder="Masukkan harga baru"
              className="mt-2"
            />
          </div>
          <Button onClick={updateHarga}>Simpan</Button>
        </div>
      </Card>
    </div>
  );
};

export default Page;
