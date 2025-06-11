"use client";

import React, { useState } from "react";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/app/components/ui/select";

export const FormAdd = ({ onSuccess }) => {
  const [form, setForm] = useState({ name: "", address: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

      const token = localStorage.getItem('token'); // ✅ tambahkan ini!

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/warehouses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (res.ok) {
        onSuccess?.(); // Refresh
      } else {
        alert(data.message || "Gagal menambahkan gudang");
      }
    } catch (err) {
      console.error("Error tambah gudang:", err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white-600">
      <div>
        <Label className="mb-3">Nama Gudang</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label className="mb-3">Alamat</Label>
        <Input
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />
      </div>
      <div className="mb-8">
        <Label className="mb-4">Tipe Gudang</Label>
        <Select
          value={form.type}
          onValueChange={(value) => setForm({ ...form, type: value })}
          required
        >
          <SelectTrigger>{form.type || "Pilih tipe gudang"}</SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="gudang">Gudang</SelectItem>
              <SelectItem value="konsinyasi">Konsinyasi</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full bg-cyan-950 hover:bg-cyan-900 ">
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
};
