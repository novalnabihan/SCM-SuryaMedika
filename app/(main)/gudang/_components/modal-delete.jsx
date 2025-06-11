'use client';

import { useState } from 'react';
import CustomModal from '@/app/components/modal';
import { Trash2 } from 'lucide-react';

const ModalDelete = ({ warehouse, onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={`Konfirmasi Hapus Gudang`}
      textButton="Hapus"
      icon={<Trash2 size={16} />}
      className="flex items-center gap-2 text-red-500 border border-red-500 hover:bg-red-100 px-3 py-2 text-sm rounded-lg"
    >
      <p>
        Yakin ingin menghapus <strong>{warehouse.name}</strong>? Tindakan ini tidak dapat dibatalkan.
      </p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => setOpen(false)}
          className="px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Batal
        </button>
        <button
          onClick={async () => {
            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses/${warehouse.id}`,
                { method: 'DELETE' }
              );
              if (res.ok) {
                onDelete?.();
                setOpen(false);
              } else {
                alert('Gagal menghapus gudang.');
              }
            } catch (err) {
              console.error('Error hapus gudang:', err);
              alert('Server error');
            }
          }}
          className="px-3 py-2 text-sm rounded-lg border border-red-500 text-red-500 hover:bg-red-100"
        >
          Hapus
        </button>
      </div>
    </CustomModal>
  );
};

export default ModalDelete;
