import React from "react";
import { useState } from "react";
import { Plus } from "lucide-react";
import CustomModal from "@/app/components/modal";
import { FormAdd } from "./form-add";

const ModalAdd = ({ refresh }) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <CustomModal
      open={openDialog}
      setOpen={setOpenDialog}
      title={"Tambah Gudang Baru"}
      icon={<Plus />}
      textButton={"Tambah Gudang"}
      triggerClassName="bg-cyan-950 hover:bg-cyan-900 text-white px-5 py-6 rounded-lg min-w-[200px] text-base"
    >
      <FormAdd
        onSuccess={() => {
          refresh?.();
          setOpenDialog(false);
        }}
      />
    </CustomModal>
  );
};

export default ModalAdd;
