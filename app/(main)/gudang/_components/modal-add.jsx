import React from 'react'
import { useState } from 'react';
import { Plus } from 'lucide-react';
import CustomModal from '@/app/components/modal';
import { FormAdd } from './form-add';

const ModalAdd = ({ refresh }) => {
     const [openDialog, setOpenDialog] = useState(false);
  return (
    <CustomModal 
        open={openDialog} 
        setOpen={setOpenDialog} 
        title={"Tambah Gudang Baru"} 
        icon={<Plus />} 
        textButton={'Tambah Gudang'}>
        <FormAdd
          onSuccess={() => {
            refresh?.();
            setOpenDialog(false);
          }}
        />
    </CustomModal>
  )
}

export default ModalAdd