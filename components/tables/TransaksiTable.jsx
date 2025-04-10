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
    barang: 'Laptop ASUS',
    jumlah: 2,
    hargasatuan: 5000,
    total: 24000000,
    jenis: 'Pembelian',
  },
  {
    id: 2,
    tanggal: '2025-04-09',
    kode: 'QWE-21',
    barang: 'Mouse Wireless',
    jumlah: 5,
    hargasatuan: 5000,
    total: 500000,
    jenis: 'Penjualan',
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
