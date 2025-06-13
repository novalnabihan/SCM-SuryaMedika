"use client";

import { useState, useMemo } from "react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/app/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Label } from "@/app/components/ui/label";
import { FileSpreadsheet } from "lucide-react";

export default function ModalExportTransaksi({ transactions = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [filters, setFilters] = useState({
    invoiceCode: "",
    itemName: "",
    operator: "",
    status: "",
    partner: "",
    paymentStatus: "",
  });

  const filterOptions = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return { invoiceCodes: [], itemNames: [], operators: [], partners: [] };
    }
    const invoiceCodes = [...new Set(transactions.map(t => t.invoiceCode).filter(Boolean))];
    const itemNames = [...new Set(transactions.map(t => t.itemName).filter(Boolean))];
    const operators = [...new Set(transactions.map(t => t.operator).filter(Boolean))];
    const partners = [...new Set(transactions.map(t => t.partner).filter(Boolean))];
    return { invoiceCodes, itemNames, operators, partners };
  }, [transactions]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    return transactions.filter(trx => {
      return (
        (filters.invoiceCode ? trx.invoiceCode === filters.invoiceCode : true) &&
        (filters.itemName ? trx.itemName === filters.itemName : true) &&
        (filters.operator ? trx.operator === filters.operator : true) &&
        (filters.partner ? trx.partner === filters.partner : true) &&
        (filters.status ? (filters.status === 'purchase' ? trx.isPurchase : !trx.isPurchase) : true) &&
        (filters.paymentStatus ? String(trx.paymentStatus) === filters.paymentStatus : true)
      );
    });
  };
  
  const filteredCount = applyFilters().length;

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transaksi/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ filters }),
      });

      if (!res.ok) { throw new Error('Gagal mengambil file dari server.'); }

      const blob = await res.blob();
      const disposition = res.headers.get('Content-Disposition');
      let filename = `export-transaksi.csv`;
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
      alert("Terjadi kesalahan saat mengekspor data.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-cyan-950 hover:bg-cyan-900 text-white px-5 py-6 rounded-lg min-w-[200px] text-base">
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Filter dan Export Data Transaksi</DialogTitle>
          <DialogDescription>
            Pilih kriteria untuk data yang ingin Anda ekspor.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="invoiceCode">Kode Invoice</Label>
            <Select onValueChange={(v) => handleFilterChange('invoiceCode', v)}><SelectTrigger><SelectValue placeholder="Semua Invoice" /></SelectTrigger><SelectContent>{filterOptions.invoiceCodes.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="partner">Partner</Label>
            <Select onValueChange={(v) => handleFilterChange('partner', v)}><SelectTrigger><SelectValue placeholder="Semua Partner" /></SelectTrigger><SelectContent>{filterOptions.partners.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="itemName">Nama Barang</Label>
            <Select onValueChange={(v) => handleFilterChange('itemName', v)}><SelectTrigger><SelectValue placeholder="Semua Barang" /></SelectTrigger><SelectContent>{filterOptions.itemNames.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="operator">Operator</Label>
            <Select onValueChange={(v) => handleFilterChange('operator', v)}><SelectTrigger><SelectValue placeholder="Semua Operator" /></SelectTrigger><SelectContent>{filterOptions.operators.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent></Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status Transaksi</Label>
            <Select onValueChange={(v) => handleFilterChange('status', v)}><SelectTrigger><SelectValue placeholder="Semua Status" /></SelectTrigger><SelectContent><SelectItem value="purchase">Pembelian</SelectItem><SelectItem value="sale">Penjualan</SelectItem></SelectContent></Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentStatus">Status Pembayaran</Label>
            <Select onValueChange={(v) => handleFilterChange('paymentStatus', v)}><SelectTrigger><SelectValue placeholder="Semua Status" /></SelectTrigger><SelectContent><SelectItem value="true">Lunas</SelectItem><SelectItem value="false">Belum Lunas</SelectItem></SelectContent></Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleExport} disabled={isExporting || filteredCount === 0}>
            {isExporting ? "Mengekspor..." : `Export ${filteredCount} Baris`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}