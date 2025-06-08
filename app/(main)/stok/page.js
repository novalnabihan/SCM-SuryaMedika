'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // ⬅ Tambahkan ini
import ModalAdd from './_components/modal-add';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import ConfirmModal from '@/app/components/modal/confirm-modal';

const StokProduk = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const router = useRouter(); // ⬅ Tambahkan ini

  const fetchItems = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/items`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const items = await res.json();

      const transformed = await Promise.all(
        items.map(async (item) => {
          try {
            const stockRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/item-stock/${item.id}`,
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );
            const stockData = await stockRes.json();
            return {
              id: item.id,
              name: item.name,
              currentPrice: item.currentPrice,
              stockTotal: stockData.total || 0,
            };
          } catch {
            return {
              id: item.id,
              name: item.name,
              currentPrice: item.currentPrice,
              stockTotal: '-',
            };
          }
        })
      );

      setProducts(transformed);
    } catch (err) {
      console.error('Gagal ambil data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/items/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Gagal hapus item:', err);
      alert('Gagal menghapus item');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-cyan-950">Stok Produk</h1>
        <ModalAdd onItemAdded={fetchItems} />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">Belum ada item.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((item) => (
            <Card
              key={item.id}
              className="p-4 shadow relative hover:cursor-pointer hover:ring-2 hover:ring-cyan-600 transition"
              onClick={() => router.push(`/stok/${item.id}`)} // ⬅ Arahkan ke halaman detail
            >
              <h2 className="text-lg font-semibold text-cyan-950">{item.name}</h2>
              <p className="text-gray-600">Harga Jual: Rp {item.currentPrice.toLocaleString()}</p>
              <p className="text-gray-600">Total Stok: {item.stockTotal || '-'}</p>
              <Button
                variant="destructive"
                className="absolute top-2 right-2 text-sm"
                onClick={(e) => {
                  e.stopPropagation(); // ⬅ Supaya klik tombol delete gak ikut trigger onClick Card
                  setDeleteItemId(item.id);
                }}
              >
                Hapus
              </Button>
            </Card>
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!deleteItemId}
        onConfirm={() => {
          handleDelete(deleteItemId);
          setDeleteItemId(null);
        }}
        onCancel={() => setDeleteItemId(null)}
        title="Konfirmasi Hapus"
        description="Serius mau delete item?"
      />
    </div>
  );
};

export default StokProduk;
