"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/app/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { FileSpreadsheet } from "lucide-react";


export default function ModalExportKaryawan() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  // State filter disederhanakan, tanpa tanggal
  const [filters, setFilters] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    role: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const handleExport = async () => {
    setIsExporting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ filters }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Gagal mengambil file.');
      }

      const blob = await res.blob();
      const disposition = res.headers.get('Content-Disposition');
      let filename = `export-karyawan.csv`;
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsOpen(false);

    } catch (err) {
      console.error("Gagal mengekspor data:", err);
      alert(err.message || "Terjadi kesalahan saat mengekspor data.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={"flex items-center gap-2 bg-cyan-950 hover:bg-cyan-900 text-white px-5 py-6 rounded-lg min-w-[200px] text-base"}>
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter dan Export Karyawan</DialogTitle>
          <DialogDescription>
            Filter daftar karyawan yang ingin Anda unduh.
          </DialogDescription>
        </DialogHeader>
        {/* Tampilan form disederhanakan */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullName" className="text-left">Nama Lengkap</Label>
            <Input id="fullName" value={filters.fullName} onChange={(e) => handleFilterChange('fullName', e.target.value)} className="col-span-3" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">Nama</Label>
            <Input id="username" value={filters.username} onChange={(e) => handleFilterChange('username', e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">Telepon</Label>
            <Input id="phone" value={filters.phone} onChange={(e) => handleFilterChange('phone', e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Email</Label>
            <Input id="email" value={filters.email} onChange={(e) => handleFilterChange('email', e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">Role</Label>
            <Select onValueChange={(v) => handleFilterChange('role', v)}>
              <SelectTrigger className="col-span-3"><SelectValue placeholder="Semua Role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="manajer">Manajer</SelectItem>
                <SelectItem value="karyawan">Karyawan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleExport} disabled={isExporting}>
            {isExporting ? "Mengekspor..." : "Export"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}