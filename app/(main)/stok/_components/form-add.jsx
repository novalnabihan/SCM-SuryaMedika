// FE/stok/_components/form-add.jsx
"use client";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { useState } from "react";

const FormAdd = ({ onSubmit }) => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: nama, currentPrice: parseFloat(harga) });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="nama">Nama Produk</Label>
        <Input
          id="nama_produk"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan nama produk baru"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="harga">Harga Jual Produk</Label>
        <Input
          id="hargajual_stok"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          type="number"
          placeholder="Masukkan harga jual produk"
          className="mt-2"
        />
      </div>

      <button type="submit" hidden></button>
    </form>
  );
};

export default FormAdd;
