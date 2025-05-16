import React from 'react'
import { Label } from '@/app/components/ui/label';
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useState } from 'react';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectGroup,
  } from "@/app/components/ui/select";


export const FormAdd = () => {
      const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        role: "",
        password: "",
      });

      
  const handleSimpan = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (res.ok) {
        // setKaryawanList([data, ...karyawanList]);
        setNewUser({ username: "", email: "", role: "", password: "" });
        // setOpenDialog(false);
      } else {
        alert(data.message || "Gagal menambahkan user");
      }
    } catch (err) {
      console.error("Error tambah user:", err);
      alert("Server error");
    }
  };
  return (
    <form className="space-y-5">

    {/* Nama */}
    <div>
      <Label htmlFor="nama">Nama</Label>
      <Input
        id="nama"
        placeholder="Masukkan nama karyawan"
        className="mt-2"
        value={newUser.username}
        onChange={(e) =>
          setNewUser({ ...newUser, username: e.target.value })
        }
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
        onChange={(e) =>
          setNewUser({ ...newUser, email: e.target.value })
        }
      />
    </div>

    {/* Role */}
    <div>
      <Label htmlFor="role">Role</Label>
      <Select
        onValueChange={(value) =>
          setNewUser({ ...newUser, role: value })
        }
      >
        <SelectTrigger className="w-full py-3 px-4 text-base text-gray-600 border rounded-md mt-2">
          <SelectGroup>
            <SelectLabel>Role Karyawan</SelectLabel>
          </SelectGroup>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="staff">Staff</SelectItem>
          <SelectItem value="manager">Manager</SelectItem>
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
        onChange={(e) =>
          setNewUser({ ...newUser, password: e.target.value })
        }
      />
    </div>
    
    {/* Button */}
    <Button
      className="w-full bg-cyan-950 hover:bg-cyan-900 mt-4"
      onClick={handleSimpan}
    >
      Simpan
    </Button>
  </form>
  )
}
