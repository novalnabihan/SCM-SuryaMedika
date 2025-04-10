import * as React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip
} from '@mui/material';

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
    gudang: 'Gudang A'
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
    gudang: 'Gudang A'
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
    gudang: 'Gudang D'

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
    gudang: 'Gudang E'
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
    gudang: 'RS Hermina'
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
    gudang: 'Gudang B'
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
    gudang: 'Klinik HK Medical Center'
  },
];

export default function TabelTransaksi() {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3, mt: 3 }}>
      <Table>
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell><b>Tanggal</b></TableCell>
            <TableCell><b>Kode Barang</b></TableCell>
            <TableCell><b>Nama Barang</b></TableCell>
            <TableCell><b>Jumlah</b></TableCell>
            <TableCell><b>Harga Satuan</b></TableCell>
            <TableCell><b>Total</b></TableCell>
            <TableCell><b>Gudang</b></TableCell>
            <TableCell><b>Status</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTransaksi.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.tanggal}</TableCell>
              <TableCell>{row.kode}</TableCell>
              <TableCell>{row.barang}</TableCell>
              <TableCell>{row.jumlah}</TableCell>
              <TableCell>Rp{row.hargasatuan.toLocaleString()}</TableCell>
              <TableCell>Rp{row.total.toLocaleString()}</TableCell>
              <TableCell>{row.gudang}</TableCell>
              <TableCell>
                <Chip
                  label={row.jenis}
                  color={row.jenis === 'Pembelian' ? 'success' : 'warning'}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
