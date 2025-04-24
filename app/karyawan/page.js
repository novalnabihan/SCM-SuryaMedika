"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
} from "@/app/components/ui/select"; // Pastikan import benar
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { SelectGroup } from "@radix-ui/react-select";

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
    <div className="p-6 bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Daftar Karyawan
        </h1>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-cyan-950 hover:bg-cyan-900 text-white px-5 py-6 rounded-lg min-w-[200px] text-base">
              <Plus className="w-5 h-5" />
              Tambah Karyawan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-6 bg-white rounded-xl shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Tambah Karyawan Baru
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-5">
              {/* Nama */}
              <div>
                <Label htmlFor="nama">Nama</Label>
                <Input
                  id="nama"
                  placeholder="Masukkan nama karyawan"
                  className="mt-2"
                />
              </div>
              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email"
                  className="mt-2"
                />
              </div>
              {/* Role */}
              <div>
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger className="w-full py-3 px-4 text-base text-gray-600 border rounded-md mt-2">
                    <SelectGroup>
                      <SelectLabel>Role Karyawan</SelectLabel>
                    </SelectGroup>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="karyawan">Karyawan</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Password */}
              <div>
                <Label htmlFor="password">Password Awal</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Opsional - Default oleh sistem"
                  className="mt-2"
                />
              </div>
              {/* Button */}
              <Button className="w-full bg-cyan-950 hover:bg-cyan-900 mt-4">
                Simpan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Card className="p-4 shadow-md rounded-xl">
          <ScrollArea>
            <Table className="min-w-full bg-white  rounded-lg shadow-md">
              <TableHeader>
                <TableRow className="bg-slate-200">
                  <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                    Nama
                  </TableHead>
                  <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                    Email
                  </TableHead>
                  <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                    Role
                  </TableHead>
                  <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                    Tanggal Daftar
                  </TableHead>
                  <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyKaryawan.map((karyawan) => (
                  <TableRow
                    key={karyawan.id}
                    className="hover:bg-gray-50 text-base"
                  >
                    <TableCell className="px-6 py-4">{karyawan.nama}</TableCell>
                    <TableCell className="px-6 py-4">
                      {karyawan.email}
                    </TableCell>
                    <TableCell className="px-6 py-4 capitalize">
                      {karyawan.role}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {karyawan.tanggal}
                    </TableCell>
                    <TableCell className="px-6 py-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:text-blue-600"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
