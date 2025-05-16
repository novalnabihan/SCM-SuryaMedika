import React from 'react'
import { Label } from '@/app/components/ui/label';
import { Input } from "@/app/components/ui/input";

export const FormAdd = () => {
  return (
    <form className='space-y-6'>
    <div>
        <Label htmlFor="nama">Nama Produk</Label>
        <Input
          id="nama_produk"
          placeholder="Masukkan nama produk baru"
          className="mt-2"
        />
      </div>
  
      <div>
        <Label htmlFor="total">Stok Total</Label>
        <Input
          id="total_stok"
          type="number"
          placeholder="Masukkan total stok produk"
          className="mt-2"
        />
      </div>
  
      <div>
        <Label htmlFor="harga">Harga Jual Produk</Label>
        <Input
          id="hargajual_stok"
          type="number"
          placeholder="Masukkan harga jual produk"
          className="mt-2"
        />
      </div>
    </form>
  )
}
