import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"; // Import komponen Table

export default function ProductDetailModal({ product }) {
  const dummyHistory = [
    {
      vendor_name: "Vendor A",
      purchase_price: 10000,
      purchase_date: "2024-03-10"
    },
    {
      vendor_name: "Vendor B",
      purchase_price: 10500,
      purchase_date: "2024-04-15"
    },
    {
      vendor_name: "Vendor A",
      purchase_price: 12000,
      purchase_date: "2024-04-20"
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Lihat Detail Stok</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg p-6"> {/* Update padding untuk dialog content */}
        <DialogHeader>
          <DialogTitle>Detail {product.name}</DialogTitle>
        </DialogHeader>

        <div className="mt-2 text-sm text-muted-foreground">
          <p><strong>Harga Jual:</strong> Rp{product.price.toLocaleString()}</p>
          <p><strong>Total Stok:</strong> {product.stock}</p>
        </div>

        <div className="mt-4">
          <h2 className="text-base font-semibold mb-2">Historis Pembelian</h2>

          {/* Table untuk menampilkan historis pembelian */}
          <Table className="text-sm">
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Harga Beli</TableHead>
                <TableHead>Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyHistory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.vendor_name}</TableCell>
                  <TableCell>Rp{item.purchase_price.toLocaleString()}</TableCell>
                  <TableCell>{item.purchase_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
