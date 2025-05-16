import React from 'react'
import { Plus } from 'lucide-react';
import CustomModal from '@/app/components/modal';
import { useState } from 'react';
import { FormAdd } from './form-add';
import { Button } from "@/app/components/ui/button";

export const ModalAdd = () => {
    const [openDialog, setOpenDialog] = useState(false);
  return (
    <CustomModal 
    open={openDialog} 
    setOpen={setOpenDialog} 
    title={"Tambah Stok Baru"} 
    icon={<Plus />} 
    textButton={'Tambah Stok'}>
    <FormAdd/>
    <div>
      <Button className="w-full bg-cyan-950 hover:bg-cyan-900 mt-4">
        Simpan
      </Button>
    </div>
  </CustomModal>
  )
}

export default ModalAdd