'use client'

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function KaryawanPage() {
  const [openDialog, setOpenDialog] = useState(false);

  const dummyKaryawan = [
    {
      id: 1,
      nama: "Andi Wijaya",
      email: "andi@example.com",
      role: "karyawan",
      tanggal: "2024-04-01",
    },
    {
      id: 2,
      nama: "Dewi Lestari",
      email: "dewi@example.com",
      role: "manager",
      tanggal: "2024-03-20",
    },
  ];

  return (
  <Card className="p-6 bg-slate-100 min-h-screen">
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Karyawan</h1>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-cyan-950 hover:bg-cyan-900 text-white px-6 py-3 rounded-lg">
              <Plus className="w-4 h-4" />
               Tambah Karyawan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Karyawan Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nama">Nama</Label>
                <Input id="nama" placeholder="Masukkan nama karyawan" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Masukkan email" />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="w-full border rounded-md px-3 py-2 text-sm text-gray-600"
                >
                  <option value="karyawan">Karyawan</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              <div>
                <Label htmlFor="password">Password Awal</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Opsional - Default oleh sistem"
                />
              </div>
              <Button className="w-full">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm">
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Tanggal Daftar</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dummyKaryawan.map((karyawan) => (
              <tr
                key={karyawan.id}
                className="border-t hover:bg-gray-50 text-sm"
              >
                <td className="px-4 py-2 font-medium">{karyawan.nama}</td>
                <td className="px-4 py-2">{karyawan.email}</td>
                <td className="px-4 py-2 capitalize">{karyawan.role}</td>
                <td className="px-4 py-2">{karyawan.tanggal}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button variant="outline" size="icon">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </Card>
  );
}
