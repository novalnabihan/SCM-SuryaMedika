'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import CustomModal from '@/app/components/modal'
import { FormAdd } from './form-add'

const ModalAdd = ({ refresh }) => {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <CustomModal
      open={openDialog}
      setOpen={setOpenDialog}
      title={'Tambah Karyawan Baru'}
      icon={<Plus />}
      textButton={'Tambah Karyawan'}
    >
      <FormAdd
        onSuccess={() => {
          refresh?.()     // refresh data parent
          setOpenDialog(false) // tutup modal
        }}
      />
    </CustomModal>
  )
}

export default ModalAdd
