import React from 'react'
import { Label } from '@/app/components/ui/label';

export const FormAdd = () => {
  return (
    <form className="space-y-6">
    <div>
      <Label htmlFor="tanggal">Tanggal</Label>
      <Input id="tanggal" type="date" className="mt-2" />
    </div>

    <div>
      <Label htmlFor="kode_barang">Kode Barang</Label>
      <Input id="kode_barang" placeholder="Masukkan kode barang" className="mt-2" />
    </div>

    <div>
      <Label htmlFor="nama_barang">Nama Barang</Label>
      <Input id="nama_barang" placeholder="Masukkan nama barang" className="mt-2" />
    </div>

    <div>
      <Label htmlFor="jumlah">Jumlah</Label>
      <Input id="jumlah" type="number" placeholder="Masukkan jumlah" className="mt-2" />
    </div>

    <div>
      <Label htmlFor="harga_satuan">Harga Satuan</Label>
      <Input id="harga_satuan" type="number" placeholder="Masukkan harga satuan" className="mt-2" />
    </div>

    <div>
      <Label htmlFor="total">Total</Label>
      <Input id="total" type="number" placeholder="Total akan dihitung otomatis" className="mt-2" disabled />
    </div>

    <div>
      <Label htmlFor="gudang">Gudang</Label>
      <Input id="gudang" placeholder="Masukkan nama gudang" className="mt-2" />
    </div>

    <div>
      <Label htmlFor="operator">Operator</Label>
      <Input id="operator" placeholder="Masukkan nama operator" className="mt-2" />
    </div>

    <div>
      <Label htmlFor="jenis">Status</Label>
      <select
        id="jenis"
        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2"
      >
        <option value="">Pilih jenis transaksi</option>
        <option value="Pembelian">Pembelian</option>
        <option value="Penjualan">Penjualan</option>
      </select>
    </div>
  </form>
  )
}
