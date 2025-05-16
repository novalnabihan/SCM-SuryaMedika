import React from 'react'
import { Label } from '@/app/components/ui/label';
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

export const FormAdd = () => {
  return (<div>
    <form className='space-y-6'>
    <div>

      <Label htmlFor="nama">Nama Gudang</Label>
      <Input
        id="nama_gudang"
        placeholder="Masukkan nama gudang"
        className="mt-2"
      />
    </div>
    <div>

      <Label htmlFor="email">Alamat Gudang</Label>
      <Input
        id="alamat_gudang"
        placeholder="Masukkan alamat gudang"
        className="mt-2"
      />
    </div>
  </form>
  <div>
      {/* Button */}
      <Button className="w-full bg-cyan-950 hover:bg-cyan-900 mt-4">
        Simpan
      </Button>
    </div>
    </div>
  )
}
