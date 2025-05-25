"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Warehouse, Trash2 } from "lucide-react";
import ModalAdd from "./_components/modal-add";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";


export default function GudangListPage() {
  const [gudangList, setGudangList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [gudangToDelete, setGudangToDelete] = useState(null);

  // Fetch data gudang dari backend
  const fetchGudang = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses`
      );
      const data = await res.json();
      setGudangList(data);
    } catch (err) {
      console.error("Gagal fetch gudang:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGudang();
  }, []);

  // Hapus gudang (soft delete)
  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus gudang ini?");
    if (!konfirmasi) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        // Refresh daftar gudang
        setGudangList((prev) => prev.filter((g) => g.id !== id));
      } else {
        alert("Gagal menghapus gudang.");
      }
    } catch (err) {
      console.error("Error hapus gudang:", err);
      alert("Server error");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-black">Daftar Gudang</h1>
        <ModalAdd refresh={fetchGudang} />
      </div>

      {loading ? (
        <p>Memuat data gudang...</p>
      ) : (
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
                    <h3 className="text-xl font-semibold text-gray-900">
                      {gudang.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-base mb-2">
                    {gudang.address}
                  </p>
                  <p className="text-black text-base mt-2">
                    Tipe:{" "}
                    <span className="capitalize font-semibold">
                      {gudang.type}
                    </span>
                  </p>
                  {/* Placeholder stok, akan diisi nanti */}
                  <p className="text-black text-base mt-1">
                    Stok barang: <span className="font-semibold">-</span>
                  </p>
                </div>
              </Link>

              <div className="mt-auto flex justify-end">
                <button
                  onClick={() => {
                    setGudangToDelete(gudang);
                    setConfirmDeleteDialog(true);
                  }}
                  className="flex items-center gap-2 text-base text-red-500 border border-red-500 hover:bg-red-100 px-2 py-2 rounded-lg"
                >
                  <Trash2 size={16} />
                  Hapus Gudang
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Dialog open={confirmDeleteDialog} onOpenChange={setConfirmDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus Gudang</DialogTitle>
          </DialogHeader>
          <p>
            Yakin ingin menghapus <strong>{gudangToDelete?.name}</strong>?
            Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setConfirmDeleteDialog(false)}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses/${gudangToDelete.id}`,
                    {
                      method: "DELETE",
                    }
                  );

                  if (res.ok) {
                    setGudangList((prev) =>
                      prev.filter((g) => g.id !== gudangToDelete.id)
                    );
                    setConfirmDeleteDialog(false);
                    setGudangToDelete(null);
                  } else {
                    alert("Gagal menghapus gudang.");
                  }
                } catch (err) {
                  console.error("Error hapus gudang:", err);
                  alert("Server error");
                }
              }}
            >
              Hapus
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
