'use client';

import React, { useState } from 'react';
import CustomModal from '@/app/components/modal';
import { FormAdd } from './form-add';
import { Pencil } from 'lucide-react';

const ModalEdit = ({ warehouse, refresh, buttonClass }) => {
  const [open, setOpen] = useState(false);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={`Edit Gudang - ${warehouse.name}`}
      icon={<Pencil size={16} />}
      textButton={'Edit Gudang'}
      className={buttonClass || ''}
    >
      <FormAdd
        defaultData={warehouse}
        isEdit={true}
        onSuccess={() => {
          refresh?.();
          setOpen(false);
        }}
      />
    </CustomModal>
  );
};


export default ModalEdit;
