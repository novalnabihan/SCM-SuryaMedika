'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ModalAdd from './_components/modal-add';
import ModalDelete from './_components/modal-delete';
import { Button } from '@/app/components/ui/button';

export default function StokProduk() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Stok Produk</h1>
        <ModalAdd onItemAdded={fetchItems} />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">Belum ada item.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 hover:shadow-lg rounded-xl p-6 transition-shadow-lg flex flex-col"
            >
              <div
                onClick={() => router.push(`/stok/${item.id}`)}
                className="cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-cyan-950 mb-2">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-base">
                  Harga Jual: Rp {item.currentPrice?.toLocaleString()}
                </p>
                <p className="text-gray-600 text-base mt-1">
                  Total Stok:{" "}
                  <span className="font-semibold">{item.stockTotal}</span>
                </p>
              </div>

              <div className="mt-auto flex justify-end gap-2 pt-4">
                <ModalDelete
                  item={item}
                  onDelete={fetchItems}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
