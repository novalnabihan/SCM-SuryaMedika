'use client';

import { useState } from 'react';
import CustomModal from '@/app/components/modal';
import { Trash2 } from 'lucide-react';

const ModalDelete = ({ item, onDelete }) => {
  const [open, setOpen] = useState(false);

  if (!item || !item.id || !item.name) return null;

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={`Konfirmasi Hapus Item`}
      textButton="Hapus"
      icon={<Trash2 size={16} />}
      className="flex items-center gap-2 text-red-500 border border-red-500 hover:bg-red-100 px-3 py-2 text-sm rounded-lg"
    >
      <p>
        Yakin ingin menghapus <strong>{item.name}</strong>? Tindakan ini tidak dapat dibatalkan.
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
              const token = localStorage.getItem('token');
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/items/${item.id}`,
                {
                  method: 'DELETE',
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                }
              );
              if (res.ok) {
                onDelete?.(); // refresh list
                setOpen(false); // tutup modal
              } else {
                alert('Gagal menghapus item.');
              }
            } catch (err) {
              console.error('Error hapus item:', err);
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
