'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Warehouse, Plus, Trash2 } from 'lucide-react';
import ModalAdd from './_components/modal-add';

export default function GudangListPage() {
 
  const [gudangList, setGudangList] = useState([
    {
      id: 1,
      nama: 'Gudang A',
      alamat: 'Jl. Mangga Dua No. 10, Jakarta',
      jumlahItem: 2,
    },
    {
      id: 2,
      nama: 'Gudang B',
      alamat: 'Jl. Ahmad Yani No. 55, Surabaya',
      jumlahItem: 2,
    },
    {
      id: 3,
      nama: 'Gudang C',
      alamat: 'Jl. Pasteur No. 99, Bandung',
      jumlahItem: 3,
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
        <h1 className="text-2xl font-semibold text-black">Daftar Gudang</h1>
        <ModalAdd />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {gudangList.map((gudang) => (
          <div
            key={gudang.id}
            className="bg-white border border-gray-200 hover:shadow-lg rounded-xl p-6 transition-shadow-lg flex flex-col"
          >
            <Link href={`/gudang/${gudang.id}`}>
              <div className="cursor-pointer">
                <div className="flex items-center gap-4 mb-3">
                  <Warehouse className="text-black group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-gray-900">{gudang.nama}</h3>
                </div>
                <p className="text-gray-600 text-base mb-2">{gudang.alamat}</p>
                <p className="text-black text-base mt-2">
                  Stok barang: <span className="font-semibold">{gudang.jumlahItem}</span>
                </p>
              </div>
            </Link>
            {/* Tombol Hapus Gudang di kanan bawah */}
            <div className="mt-auto flex justify-end">
              <button
                onClick={() => handleDelete(gudang.id)}
                className="flex items-center gap-2 text-base text-red-500 border border-red-500 hover:bg-red-100 px-2 py-2 rounded-lg"
              >
                <Trash2 size={16} />
                Hapus Gudang
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
