"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Warehouse, Trash2, Pencil } from "lucide-react";
import ModalAdd from "./_components/modal-add";
import ModalEdit from "./_components/modal-edit";
import ModalDelete from "./_components/modal-delete";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import useAuth from "@/hooks/useAuth";

export default function GudangListPage() {
  const { user, loading: authLoading } = useAuth();
  const [gudangList, setGudangList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [gudangToDelete, setGudangToDelete] = useState(null);

  const fetchGudang = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (Array.isArray(data)) {
        setGudangList(data);
      } else {
        console.error("Respon bukan array:", data);
        setGudangList([]);
      }
    } catch (err) {
      console.error("Gagal fetch gudang:", err);
      setGudangList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchGudang();
    }
  }, [user]);

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus gudang ini?");
    if (!konfirmasi) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setGudangList((prev) => prev.filter((g) => g.id !== id));
      } else {
        alert("Gagal menghapus gudang.");
      }
    } catch (err) {
      console.error("Error hapus gudang:", err);
      alert("Server error");
    }
  };

  if (authLoading) {
    return <p className="p-6">Memeriksa sesi...</p>;
  }

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
                  <p className="text-black text-base mt-1">
                    Stok barang:{" "}
                    <span className="font-semibold">
                      {gudang.totalStock}
                    </span>
                  </p>
                </div>
              </Link>

              {/* Tombol edit & hapus */}
              <div className="mt-auto flex justify-end gap-2 pt-4">
                <ModalEdit
                  warehouse={gudang}
                  refresh={fetchGudang}
                  buttonClass="flex items-center gap-2 text-base text-cyan-700 border border-cyan-700 hover:bg-cyan-50 px-2 py-2 rounded-lg"
                />
                <ModalDelete warehouse={gudang} onDelete={fetchGudang} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
