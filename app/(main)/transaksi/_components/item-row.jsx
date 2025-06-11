'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';

export const ItemRow = ({ item, onChange, onRemove, isPurchase }) => {
  const [itemList, setItemList] = useState([]);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setItemList(data);
    };

    fetchItems();
  }, []);

  useEffect(() => {
    setFiltered(
      itemList.filter((i) =>
        i.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, itemList]);

  const handleSelect = (selected) => {
    const selectedItem = itemList.find((i) => i.id === selected);
    if (selectedItem) {
      onChange('itemId', selectedItem.id);
      onChange('itemName', selectedItem.name); // for display
      onChange('unitPrice', selectedItem.currentPrice);
    }
    setQuery('');
  };

  return (
    <div className="relative">
      <div>
        <Label>Barang</Label>
        <Input
          placeholder="Cari nama barang..."
          value={query || item.itemName || ''}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-3 mb-6"
        />
        {query && (
          <div className="border absolute z-10 bg-white w-full shadow-lg mt-1 max-h-40 overflow-y-auto">
            {filtered.map((i) => (
              <div
                key={i.id}
                onClick={() => handleSelect(i.id)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {i.name}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="px-4 py-2 text-gray-500">Tidak ditemukan</div>
            )}
          </div>
        )}
      </div>

      <div>
        <Label>Jumlah</Label>
        <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onChange('quantity', parseInt(e.target.value))}
          className="mt-3 mb-6"
        />
      </div>

      <div>
        <Label>Harga Satuan</Label>
        <Input
          type="number"
          value={item.unitPrice}
          onChange={(e) => onChange('unitPrice', parseFloat(e.target.value))}
          disabled={!isPurchase} // hanya bisa diinput saat pembelian
          className="mt-3 mb-6"
        />
      </div>

      <Button type="button" variant="destructive" onClick={onRemove}>
        Hapus Item
      </Button>
    </div>
  );
};
