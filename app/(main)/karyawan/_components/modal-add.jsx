import React from 'react'
import { Plus } from 'lucide-react';
import CustomModal from '@/app/components/modal';
import { FormAdd } from './form-add';
import { useState } from 'react';

const ModalAdd = () => {
const [openDialog, setOpenDialog] = useState(false);
  return (
    <CustomModal 
        open={openDialog} 
        setOpen={setOpenDialog} 
        title={"Tambah Karyawan Baru"} 
        icon={<Plus />} 
        textButton={'Tambah Karyawan'}>
        <FormAdd/>
    </CustomModal>
  )
}

export default ModalAdd