'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Pencil } from 'lucide-react';

export default function ModalEdit({ item, onSave }) {
  const [open, setOpen] = useState(false);
  const [hargaBaru, setHargaBaru] = useState('');

  const handleSubmit = () => {
    const parsed = parseFloat(hargaBaru);
    if (!isNaN(parsed)) {
      onSave(parsed);
      setOpen(false);
      setHargaBaru('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Pencil className="w-4 h-4" />
          Ubah Harga
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ubah Harga Jual</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="itemName">Nama Item</Label>
            <Input
              id="itemName"
              value={item.name}
              disabled
              className="mt-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <Label htmlFor="hargaBaru">Harga Baru</Label>
            <Input
              id="hargaBaru"
              type="number"
              placeholder="Masukkan harga baru"
              value={hargaBaru}
              onChange={(e) => setHargaBaru(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
