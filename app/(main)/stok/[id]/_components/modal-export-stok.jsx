"use client";

import { useState, useMemo } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Label } from "@/app/components/ui/label";
import { Download } from "lucide-react";
import Papa from "papaparse";

export default function ModalExportStok({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [filters, setFilters] = useState({
    warehouse: "", // Filter berdasarkan nama gudang
  });

  // Ambil daftar nama gudang yang unik untuk opsi filter
  const warehouseOptions = useMemo(() => {
    if (!item?.distributions) return [];
    return [...new Set(item.distributions.map(dist => dist.warehouse))];
  }, [item]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleExport = () => {
    if (!item) return;
    setIsExporting(true);

    // Lakukan filter di sini (sisi frontend)
    const filteredDistributions = item.distributions.filter(dist => 
      filters.warehouse ? dist.warehouse === filters.warehouse : true
    );

    if (filteredDistributions.length === 0) {
      alert("Tidak ada data yang cocok dengan filter Anda.");
      setIsExporting(false);
      return;
    }
    
    // Siapkan data header dan data tabel yang sudah difilter
    const itemInfo = [
      { "Informasi": "Nama Item", "Value": item.name },
      { "Informasi": "Total Stok Keseluruhan", "Value": item.totalStock },
    ];
    const distributionData = filteredDistributions.map(dist => ({
      "Gudang": dist.warehouse,
      "Alamat": dist.address,
      "Jumlah Stok": dist.quantity,
    }));

    const itemInfoCsv = Papa.unparse(itemInfo);
    const distributionCsv = Papa.unparse(distributionData);

    const finalCsv = `${itemInfoCsv}\n\nDistribusi Stok (Terfilter)\n${distributionCsv}`;

    const blob = new Blob([finalCsv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `distribusi-stok-${item.name.replace(/\s/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsExporting(false);
    setIsOpen(false); // Tutup modal setelah selesai
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter dan Export Distribusi Stok</DialogTitle>
          <DialogDescription>
            Pilih gudang untuk memfilter data yang ingin diekspor.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="warehouse" className="text-right">
              Gudang
            </Label>
            <Select onValueChange={(value) => handleFilterChange('warehouse', value)}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Semua Gudang" />
                </SelectTrigger>
                <SelectContent>
                    {warehouseOptions.map(wh => <SelectItem key={wh} value={wh}>{wh}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? "Mengekspor..." : "Export"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}