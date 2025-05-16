import React from 'react'
import { Plus } from "lucide-react";
import CustomModal from '@/app/components/modal';
import { Button } from "@/app/components/ui/button";

export const ModalAdd = () => {
  return (
    <CustomModal
  open={openDialog}
  setOpen={setOpenDialog}
  title={"Buat Invoice Baru"}
  icon={<Plus />}
  textButton={"Buat Invoice"}>
<FormAdd/>
  <Button className="w-full bg-cyan-950 hover:bg-cyan-900 mt-4">
      Simpan
    </Button>
</CustomModal>

  )
}
