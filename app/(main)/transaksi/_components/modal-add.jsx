import { FormAdd } from "./form-add";
import CustomModal from "@/app/components/modal";
import { Plus } from "lucide-react";
import { useState } from "react";

const ModalAdd = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <CustomModal
      open={openDialog}
      setOpen={setOpenDialog}
      title="Form Transaksi Baru"
      icon={<Plus />}
      textButton="Catat Transaksi"
      triggerClassName=" bg-cyan-950 hover:bg-cyan-900 text-white px-5 py-6 rounded-lg min-w-[200px] text-base "
      contentClassName="!max-w-3xl w-full max-h-[90vh] overflow-y-auto"
    >
      <FormAdd onSuccess={() => setOpenDialog(false)} />
    </CustomModal>
  );
};

export default ModalAdd;
