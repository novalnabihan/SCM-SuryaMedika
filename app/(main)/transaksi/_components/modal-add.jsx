// modal-add.jsx
import { FormAdd } from './form-add';
import CustomModal from '@/app/components/modal';
import { Button } from "@/app/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

const ModalAdd = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <CustomModal
      open={openDialog}
      setOpen={setOpenDialog}
      title={"Catat Transaksi Baru"}
      icon={<Plus />}
      textButton={"Catat Transaksi"}
    >
      <FormAdd onSuccess={() => setOpenDialog(false)} />
    </CustomModal>
  );
};

export default ModalAdd;
