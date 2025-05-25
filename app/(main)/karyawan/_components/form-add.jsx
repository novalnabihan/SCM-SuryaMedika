'use client'

import React, { useState } from 'react'
import { Label } from '@/app/components/ui/label'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '@/app/components/ui/select'

export const FormAdd = ({ onSuccess }) => {
  const [newUser, setNewUser] = useState({
    fullName: '',
    username: '',
    phone: '',
    email: '',
    role: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  const handleSimpan = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        phone: newUser.phone,
        fullName: newUser.fullName, // mapping di sini!
        role: newUser.role === 'staff' ? 'karyawan' : 'manajer',
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setNewUser({
        username: '',
        email: '',
        role: '',
        password: '',
        fullName: '',
        phone: '',
      });
      onSuccess?.();        // Refresh & tutup modal
    } else {
      alert(data.message || 'Gagal menambahkan user');
    }
  } catch (err) {
    console.error('Error tambah user:', err);
    alert('Server error');
  } finally {
    setLoading(false);
  }
};


  return (
    <form className="space-y-5" onSubmit={handleSimpan}>
      
      {/* Nama Lengkap */}
      <div>
        <Label htmlFor="nama_lengkap">Nama Lengkap</Label>
        <Input
          id="nama_lengkap"
          placeholder="Masukkan nama lengkap"
          className="mt-2"
          value={newUser.fullName}
          onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
          required
        />
      </div>

      {/* Nama */}
      <div>
        <Label htmlFor="nama">Nama</Label>
        <Input
          id="nama"
          placeholder="Masukkan nama karyawan"
          className="mt-2"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
      </div>

      
      {/* Nomor Telepon */}
      <div>
        <Label htmlFor="telepon">Nomor Telepon</Label>
        <Input
          id="nomor telepon"
          placeholder="Masukkan nomor telepon"
          className="mt-2"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          required
        />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Masukkan email"
          className="mt-2"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
      </div>

      {/* Role */}
      <div>
        <Label htmlFor="role">Role</Label>
        <Select
          value={newUser.role}
          onValueChange={(value) => setNewUser({ ...newUser, role: value })}
          required
        >
          <SelectTrigger className="w-full py-3 px-4 text-base text-gray-600 border rounded-md mt-2">
            {newUser.role || 'Pilih Role'}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="staff">Staff</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password">Password Awal</Label>
        <Input
          id="password"
          type="password"
          placeholder="Wajib diisi"
          className="mt-2"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
      </div>

      {/* Button */}
      <Button
        type="submit"
        className="w-full bg-cyan-950 hover:bg-cyan-900 mt-4"
        disabled={loading}
      >
        {loading ? 'Menyimpan...' : 'Simpan'}
      </Button>
    </form>
  )
}
