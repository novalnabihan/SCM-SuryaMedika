'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Warehouse, Plus, Trash2 } from 'lucide-react';

export default function GudangListPage() {
  const [gudangList, setGudangList] = useState([
    {
      id: 1,
      nama: 'Gudang Jakarta',
      alamat: 'Jl. Mangga Dua No. 10, Jakarta',
      jumlahItem: 120,
    },
    {
      id: 2,
      nama: 'Gudang Surabaya',
      alamat: 'Jl. Ahmad Yani No. 55, Surabaya',
      jumlahItem: 85,
    },
    {
      id: 3,
      nama: 'Gudang Bandung',
      alamat: 'Jl. Pasteur No. 99, Bandung',
      jumlahItem: 150,
    },
  ]);

  const handleDelete = (id) => {
    setGudangList((prev) => prev.filter((g) => g.id !== id));
  };

  const handleAddDummy = () => {
    const newId = Math.max(...gudangList.map((g) => g.id)) + 1;
    const newGudang = {
      id: newId,
      nama: `Gudang Baru ${newId}`,
      alamat: `Alamat Gudang ${newId}`,
      jumlahItem: 0,
    };
    setGudangList((prev) => [...prev, newGudang]);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Daftar Gudang</h1>
        <button
          onClick={handleAddDummy}
          className="flex items-center gap-2 bg-cyan-700 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          Tambah Gudang
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gudangList.map((gudang) => (
          <div
            key={gudang.id}
            className="bg-cyan-900 hover:bg-cyan-800 rounded-xl p-5 transition shadow-lg group"
          >
            <Link href={`/gudang/${gudang.id}`}>
              <div className="cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <Warehouse className="text-cyan-300 group-hover:scale-110 transition" />
                  <h3 className="text-lg font-semibold text-white">
                    {gudang.nama}
                  </h3>
                </div>
                <p className="text-cyan-200 text-sm">{gudang.alamat}</p>
                <p className="text-cyan-400 text-xs mt-3">
                  Stok barang: <span className="font-semibold">{gudang.jumlahItem}</span>
                </p>
              </div>
            </Link>
            <button
              onClick={() => handleDelete(gudang.id)}
              className="mt-4 flex items-center gap-2 text-sm text-red-300 hover:text-red-200"
            >
              <Trash2 size={16} />
              Hapus Gudang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
