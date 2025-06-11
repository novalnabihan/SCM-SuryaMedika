'use client'

import { useState } from 'react'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Button } from '@/app/components/ui/button'
import { ItemRow } from './item-row'
import { WarehouseSelector } from './warehouse-selector'

export const FormAdd = ({ onSuccess }) => {
  const [partner, setPartner] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [paymentStatus, setPaymentStatus] = useState(false)
  const [isPurchase, setIsPurchase] = useState(true)
  const [warehouseId, setWarehouseId] = useState('')
  const [transactionDate, setTransactionDate] = useState(new Date().toISOString().slice(0, 10))
  const [items, setItems] = useState([{ itemId: '', quantity: 1, unitPrice: 0 }])
  const [loading, setLoading] = useState(false)

  const handleItemChange = (index, key, value) => {
    const updatedItems = [...items]
    updatedItems[index][key] = value
    setItems(updatedItems)
  }

  const handleAddItem = () => {
    setItems([...items, { itemId: '', quantity: 1, unitPrice: 0 }])
  }

  const handleRemoveItem = (index) => {
    const updated = [...items]
    updated.splice(index, 1)
    setItems(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transaksi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          partner,
          paymentMethod,
          paymentStatus,
          isPurchase,
          warehouseId,
          transactionDate,
          items
        })
      })

      const data = await res.json()
      if (res.ok) {
        onSuccess?.()
      } else {
        alert(data.message || 'Gagal menyimpan transaksi')
      }
    } catch (err) {
      console.error('Gagal submit transaksi:', err)
    } finally {
      setLoading(false)
    }
  }

 // Hapus wrapper modal dan gunakan hanya form content
return (
  <form className="space-y-8" onSubmit={handleSubmit}>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Tanggal Transaksi</Label>
        <Input
          type="date"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <WarehouseSelector value={warehouseId} onChange={setWarehouseId} 
        className = "h-11"/>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">
          {isPurchase ? 'Vendor' : 'Pembeli'} (Partner)
        </Label>
        <Input
          value={partner}
          onChange={(e) => setPartner(e.target.value)}
          placeholder={isPurchase ? 'Nama Vendor' : 'Nama Pembeli'}
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Metode Pembayaran</Label>
        <Input
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          placeholder="Contoh: Transfer, Cash"
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Status Pembayaran</Label>
        <select
          className="w-full h-11 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value === 'true')}
        >
          <option value="true">Lunas</option>
          <option value="false">Belum Lunas</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Jenis Transaksi</Label>
        <select
          className="w-full h-11 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          value={isPurchase}
          onChange={(e) => setIsPurchase(e.target.value === 'true')}
        >
          <option value="true">Pembelian</option>
          <option value="false">Penjualan</option>
        </select>
      </div>
    </div>

    <div className="border-t border-gray-200 pt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Daftar Item</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <ItemRow
              item={item}
              onChange={(key, value) => handleItemChange(index, key, value)}
              onRemove={() => handleRemoveItem(index)}
              isPurchase={isPurchase}
            />
          </div>
        ))}
      </div>
      <Button
        type="button"
        onClick={handleAddItem}
        className="mt-6 w-full bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-dashed border-slate-300 rounded-lg font-medium py-3"
      >
        + Tambah Item
      </Button>
    </div>

    <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
      <Button
        type="button"
        variant="outline"
        className="px-8 py-3 h-12"
        onClick={() => onSuccess?.()}
      >
        Batal
      </Button>
      <Button
        type="submit"
        className="bg-cyan-950 hover:bg-cyan-900 px-8 py-3 h-12"
        disabled={loading}
      >
        {loading ? 'Menyimpan...' : 'Simpan Transaksi'}
      </Button>
    </div>
  </form>
)
}