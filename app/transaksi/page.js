import { Button } from "@/app/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Input } from "@/app/components/ui/input";
import { Card } from "@/app/components/ui/card";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import Link from "next/link";

const dataTransaksi = [
  {
    id: 1,
    tanggal: '2025-04-10',
    kode: 'QWE-21',
    barang: 'Bending Iron',
    jumlah: 2,
    hargasatuan: 500000,
    total: 1000000,
    jenis: 'Pembelian',
    gudang: 'Gudang A',
    operator: 'Andi'
  },
  {
    id: 2,
    tanggal: '2025-04-09',
    kode: 'SBD-01',
    barang: 'Surgical Bone Drill Driller',
    jumlah: 1,
    hargasatuan: 133735140,
    total: 133735140,
    jenis: 'Penjualan',
    gudang: 'Gudang A',
    operator: 'Bagus'
  },
  {
    id: 3,
    tanggal: '2025-04-10',
    kode: 'PVS -21',
    barang: 'PAVIS 400',
    jumlah: 2,
    hargasatuan: 800000,
    total: 1600000,
    jenis: 'Pembelian',
    gudang: 'Gudang D',  
    operator: 'Agus'
  },
  {
    id: 4,
    tanggal: '2025-04-10',
    kode: 'PVS-41',
    barang: 'PAVIS 401',
    jumlah: 2,
    hargasatuan: 750000,
    total: 1500000,
    jenis: 'Penjualan',
    gudang: 'Gudang E',
    operator: 'Agus'
  },
  {
    id: 5,
    tanggal: '2025-04-10',
    kode: 'PVS-55',
    barang: 'PAVIS 555',
    jumlah: 2,
    hargasatuan: 2000000,
    total: 4000000,
    jenis: 'Pembelian',
    gudang: 'RS Hermina',
    operator: 'Andi'
  },
  {
    id: 6,
    tanggal: '2025-04-10',
    kode: 'RSK-21',
    barang: 'Ruskin Liston Bone Cutting 18 CM',
    jumlah: 1,
    hargasatuan: 900000,
    total: 900000,
    jenis: 'Pembelian',
    gudang: 'Gudang B',
    operator: 'Andi'
  },
  {
    id: 7,
    tanggal: '2025-04-10',
    kode: 'QWE-21',
    barang: 'Cast Cutter Saw Oscimed Ergo II',
    jumlah: 1,
    hargasatuan: 11000000,
    total: 11000000,
    jenis: 'Penjualan',
    gudang: 'Klinik HK Medical Center',
    operator: 'Andi'
  },
];

export default function InvoiceTable() {
  return (
    <Card className="p-6 bg-slate-100 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Nama Tabel</h1>
        <div className="flex gap-2">
          <Input placeholder="Cari transaksi..." className="w-64" />
          <Button className= "bg-cyan-950">Buat Invoice Baru</Button>
        </div>
      </div>

      <Card className="p-4 shadow-md rounded-xl">
        <ScrollArea>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-200">
                <TableHead>Tanggal</TableHead>
                <TableHead>Kode Barang</TableHead>
                <TableHead>Nama Barang</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Harga Satuan</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Gudang</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataTransaksi.map((transaksi) => (
                <TableRow key={transaksi.id}>
                  <TableCell>{transaksi.tanggal}</TableCell>
                  <TableCell>{transaksi.kode}</TableCell>
                  <TableCell>{transaksi.barang}</TableCell>
                  <TableCell>{transaksi.jumlah}</TableCell>
                  <TableCell>Rp {transaksi.hargasatuan.toLocaleString()}</TableCell>
                  <TableCell>Rp {transaksi.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Link href={`/gudang/${transaksi.gudang.toLowerCase().replace(" ", "-")}`}>
                      <span className="text-blue-600 hover:underline cursor-pointer">{transaksi.gudang}</span>
                    </Link>
                  </TableCell>
                  <TableCell>{transaksi.operator}</TableCell>
                  <TableCell>
                    <span className={`bg-${transaksi.jenis === 'Pembelian' ? 'green' : 'red'}-100 text-${transaksi.jenis === 'Pembelian' ? 'green' : 'red'}-800 text-xs font-medium px-2 py-1 rounded-full`}>
                      {transaksi.jenis}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
    </Card>
  );
}
