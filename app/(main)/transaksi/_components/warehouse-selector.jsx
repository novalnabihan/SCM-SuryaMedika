'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'

export const WarehouseSelector = ({ value, onChange }) => {
  const [query, setQuery] = useState('')
  const [warehouseList, setWarehouseList] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
  const fetchWarehouses = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!res.ok) {
        throw new Error(`Gagal fetch gudang: ${res.statusText}`)
      }

      const data = await res.json()

      if (!Array.isArray(data)) {
        console.error('Response bukan array:', data)
        return
      }

      setWarehouseList(data)
    } catch (err) {
      console.error('Fetch error:', err)
    }
  }

  fetchWarehouses()
}, [])


  useEffect(() => {
    if (query === '') {
      setFiltered([])
      return
    }

    setFiltered(
      warehouseList.filter((w) =>
        w.name.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [query, warehouseList])

  const handleSelect = (selectedId) => {
    const selectedWarehouse = warehouseList.find((w) => w.id === selectedId)
    if (selectedWarehouse) {
      onChange(selectedWarehouse.id)
      setQuery(selectedWarehouse.name)
    }
    setFiltered([])
  }

  const selectedName =
    warehouseList.find((w) => w.id === value)?.name || query

  return (
    <div className="relative space-y-2">
      <Label>Gudang</Label>
      <Input
        placeholder="Cari nama gudang..."
        value={selectedName}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && filtered.length > 0 && (
        <div className="absolute z-10 bg-white border mt-1 w-full max-h-40 overflow-y-auto shadow-lg rounded-md">
          {filtered.map((w) => (
            <div
              key={w.id}
              onClick={() => handleSelect(w.id)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {w.name}
            </div>
          ))}
        </div>
      )}
      {query && filtered.length === 0 && (
        <div className="absolute z-10 bg-white border mt-1 w-full shadow-md px-4 py-2 text-gray-500 rounded-md">
          Tidak ditemukan
        </div>
      )}
    </div>
  )
}
