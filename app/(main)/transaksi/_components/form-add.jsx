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

  return (
    <form className="space-y-6 p-6 bg-white rounded-2xl shadow-md border border-gray-100" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Form Transaksi Baru
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Tanggal Transaksi</Label>
          <Input
            type="date"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
          />
        </div>

        <WarehouseSelector value={warehouseId} onChange={setWarehouseId} />

        <div>
          <Label>{isPurchase ? 'Vendor' : 'Pembeli'} (Partner)</Label>
          <Input
            value={partner}
            onChange={(e) => setPartner(e.target.value)}
            placeholder={isPurchase ? 'Nama Vendor' : 'Nama Pembeli'}
          />
        </div>

        <div>
          <Label>Metode Pembayaran</Label>
          <Input
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            placeholder="Contoh: Transfer, Cash"
          />
        </div>

        <div>
          <Label>Status Pembayaran</Label>
          <select
            className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value === 'true')}
          >
            <option value="true">Lunas</option>
            <option value="false">Belum Lunas</option>
          </select>
        </div>

        <div>
          <Label>Jenis Transaksi</Label>
          <select
            className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2"
            value={isPurchase}
            onChange={(e) => setIsPurchase(e.target.value === 'true')}
          >
            <option value="true">Pembelian</option>
            <option value="false">Penjualan</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium text-gray-700 mb-2">Daftar Item</h3>
        <div className="space-y-4">
          {items.map((item, index) => (
            <ItemRow
              key={index}
              item={item}
              onChange={(key, value) => handleItemChange(index, key, value)}
              onRemove={() => handleRemoveItem(index)}
              isPurchase={isPurchase}
            />
          ))}
        </div>
        <Button
          type="button"
          onClick={handleAddItem}
          className="mt-4 w-full bg-slate-100 text-slate-700 hover:bg-slate-200"
        >
          + Tambah Item
        </Button>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          className="bg-cyan-950 hover:bg-cyan-900 px-6"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan Transaksi'}
        </Button>
      </div>
    </form>
  )
}
