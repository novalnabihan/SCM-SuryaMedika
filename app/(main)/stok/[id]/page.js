"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Package,
} from 'lucide-react';
import ModalEdit from "./_components/modal-edit";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [showEditModal, setShowEditModal] = useState(false);

  const fetchDetail = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/items/${id}/detail`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Gagal ambil detail item");

      const data = await res.json();
      setItem(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateHarga = async (hargaBaru) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/items/${id}/update-price`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ price: hargaBaru }),
        }
      );
      if (!res.ok) throw new Error("Gagal update harga");
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
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.push("/stok")}
          className="text-sm text-cyan-700 border border-cyan-700 hover:bg-cyan-50 px-4 py-2 rounded-lg "
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>
      </div>

      {/* Section 1: Detail */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-900">
          <Package className="text-cyan-800" /> {item.name}
        </h1>
        <div className="text-black">
          <p className="text-base">
            Harga Sekarang:{" "}
            <span className="font-semibold">
              Rp {item.currentPrice.toLocaleString()}
            </span>
          </p>
          <p className="text-base text-black mt-1">
            Total Stok: {item.totalStock || "-"}
          </p>
        </div>
      </div>

      {/* Section 2: Distribusi Stok */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-cyan-900">
            📦 Distribusi Stok di Gudang
          </h2>
          <Button variant="outline">Export CSV</Button>
        </div>

        <div className="border rounded-md overflow-auto max-h-[500px]">
          <Table className="table-auto text-base [&_th]:px-4 [&_th]:py-3 [&_td]:px-4 [&_td]:py-3">
            <TableHeader className="bg-slate-200 sticky top-0 z-10">
              <TableRow>
                <TableHead>Gudang</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {item.distributions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-6 text-gray-500"
                  >
                    Belum ada distribusi stok.
                  </TableCell>
                </TableRow>
              ) : (
                item.distributions.map((dist, i) => (
                  <TableRow key={i} className="hover:bg-gray-50">
                    <TableCell>{dist.warehouse}</TableCell>
                    <TableCell>{dist.address}</TableCell>
                    <TableCell>{dist.quantity}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Section 3: Harga */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-cyan-900">
            📈 Histori Perubahan Harga
          </h2>
          <div className="flex justify-end">
            <ModalEdit item={item} onSave={updateHarga} />
          </div>
        </div>

        <div className="border rounded-md overflow-auto max-h-[500px]">
          <Table className="table-auto text-base [&_th]:px-4 [&_th]:py-3 [&_td]:px-4 [&_td]:py-3">
            <TableHeader className="bg-slate-200 sticky top-0 z-10">
              <TableRow>
                <TableHead>Harga</TableHead>
                <TableHead>Diubah Oleh</TableHead>
                <TableHead>Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {item.histories.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-6 text-gray-500"
                  >
                    Belum ada histori perubahan harga.
                  </TableCell>
                </TableRow>
              ) : (
                item.histories.map((hist, i) => (
                  <TableRow key={i} className="hover:bg-gray-50">
                    <TableCell>Rp {hist.price.toLocaleString()}</TableCell>
                    <TableCell>{hist.changedBy}</TableCell>
                    <TableCell>
                      {new Date(hist.changedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
  );
};

export default Page;
