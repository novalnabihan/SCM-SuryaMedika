"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger } from "@/app/components/ui/select";
import ProductDetailModal from "@/app/components/productdetailmodal";
import { SelectGroup } from "@radix-ui/react-select";
import ModalAdd from "./_components/modal-add";

export default function StokProduk() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data dari backend saat komponen mount
  useEffect(() => {
  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3001/api/items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      console.log("Respon API:", data);

      const items = Array.isArray(data) ? data : data.rows || [];

      const transformed = items.map(item => ({
        id: item.id,
        nama: item.name,
        price: item.currentprice || item.currentPrice || 0,
        distribusi: [],
        stokTotal: 0,
      }));

      setProducts(transformed);
      setLoading(false);  // <--- ini penting
    } catch (err) {
      console.error("Gagal ambil data:", err.message);
      setLoading(false);  // supaya loading juga berhenti kalau error
    }
  };

  fetchItems();
}, []);



  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Stok Produk</h1>
        <div className="flex gap-4">
          <Input placeholder="Cari produk..." className="flex items-center gap-2 py-6 px-5 text-gray-600 border rounded-md" />
          <Select>
            <SelectTrigger className="flex items-center gap-2 py-6 px-5 text-gray-600 border rounded-md">
              <SelectGroup>
                <SelectLabel className="text-base">Filter Kategori</SelectLabel>
              </SelectGroup>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gudang-a">Gudang A</SelectItem>
              <SelectItem value="gudang-b">Gudang B</SelectItem>
            </SelectContent>
          </Select>
          <ModalAdd />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="shadow-md rounded-lg hover:shadow-lg transition-all p-4"
            >
              <CardContent>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.nama}
                </h2>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Harga Jual: Rp{product.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Total Stok: {product.stokTotal}
                </p>

                <div className="flex gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-sm flex gap-1 items-center py-2 px-4"
                      >
                        Lihat Persebaran Stok
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Detail Distribusi Stok</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-3 text-sm font-medium border-b pb-2 mb-2">
                        <span>Gudang</span>
                        <span>Alamat Gudang</span>
                        <span>Stok Tersisa</span>
                      </div>
                      {product.distribusi.length > 0 ? (
                        product.distribusi.map((item, idx) => (
                          <div
                            key={idx}
                            className="grid grid-cols-3 text-sm py-2 hover:bg-gray-50 rounded-md"
                          >
                            <div className="flex items-center gap-1">{item.gudang}</div>
                            <span>{item.alamat}</span>
                            <span>{item.stok}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">Belum ada data distribusi stok.</p>
                      )}
                      <Button variant="secondary" className="mt-4 w-full">
                        Kelola Stok
                      </Button>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-sm flex gap-1 items-center py-2 px-4"
                      >
                        Ubah Harga
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm">
                      <DialogHeader>
                        <DialogTitle>Ubah Harga Jual</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="harga">Harga Baru</Label>
                        <Input
                          id="harga"
                          placeholder="Masukkan harga baru"
                          type="number"
                        />
                        <Button className="mt-2">Simpan</Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <ProductDetailModal product={product} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
