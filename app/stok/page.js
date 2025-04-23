import { Card, CardContent } from "@/app/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Warehouse, Eye, Pencil } from "lucide-react";
import ProductDetailModal from "@/app/components/productdetailmodal";

export default function StokProduk() {
  const dummyProducts = [
    {
      id: 1,
      nama: "Produk A",
      price: 25000,
      stokTotal: 150,
      distribusi: [
        { gudang: "Gudang A", alamat: "Jl. Mawar No. 2", stok: 100 },
        { gudang: "Gudang B", alamat: "Jl. Melati No. 4", stok: 50 },
      ],
    },
    {
      id: 2,
      nama: "Produk B",
      price: 30000,
      stokTotal: 200,
      distribusi: [
        { gudang: "Gudang C", alamat: "Jl. Anggrek No. 1", stok: 200 },
      ],
    },
  ];

  return (
    <Card className="p-6 bg-slate-100 min-h-screen">
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Stok Produk</h1>
        <div className="flex gap-4">
          <Input placeholder="Cari produk..." className="w-64 p-3 text-sm" />
          <select className="border rounded-md px-4 py-2 text-sm text-gray-600">
            <option value="">Filter Kategori</option>
            <option value="gudang-a">Gudang A</option>
            <option value="gudang-b">Gudang B</option>
          </select>
          <Button className="bg-cyan-950 hover:bg-cyan-900 text-white py-2 px-6 text-sm">Tambah Produk Baru</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyProducts.map((product) => (
          <Card key={product.id} className="shadow-md rounded-lg hover:shadow-lg transition-all p-4">
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.nama}</h2>
              <p className="text-lg font-medium text-gray-700 mb-2">Harga Jual: Rp{product.price.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mb-4">Total Stok: {product.stokTotal}</p>

              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="text-sm flex gap-1 items-center py-2 px-4">
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
                    {product.distribusi.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-3 text-sm py-2 hover:bg-gray-50 rounded-md">
                        <div className="flex items-center gap-1"> {item.gudang}</div>
                        <span>{item.alamat}</span>
                        <span>{item.stok}</span>
                      </div>
                    ))}
                    <Button variant="secondary" className="mt-4 w-full">Kelola Stok</Button>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="text-sm flex gap-1 items-center py-2 px-4">
                        Ubah Harga
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Ubah Harga Jual</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="harga">Harga Baru</Label>
                      <Input id="harga" placeholder="Masukkan harga baru" type="number" />
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
    </div>
    </Card>
  );
}
