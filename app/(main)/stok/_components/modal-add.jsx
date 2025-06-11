// FE/stok/_components/modal-add.jsx
"use client";
import { Plus } from "lucide-react";
import CustomModal from "@/app/components/modal";
import { useState } from "react";
import FormAdd from "./form-add";
import { Button } from "@/app/components/ui/button";

const ModalAdd = ({ onItemAdded }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Gagal simpan item");

      const newItem = await res.json();
      setOpenDialog(false);
      onItemAdded(); // trigger refresh
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal
      open={openDialog}
      setOpen={setOpenDialog}
      title={"Tambah Item Baru"}
      icon={<Plus />}
      textButton={"Tambah Item"}
      triggerClassName="bg-cyan-950 hover:bg-cyan-900 text-white px-5 py-6 rounded-lg min-w-[200px] text-base"
    >
      <FormAdd onSubmit={handleSubmit} />
      <div>
        <Button
          className="w-full bg-cyan-950 hover:bg-cyan-900 mt-4"
          onClick={() =>
            document
              .querySelector("form")
              .dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
              )
          }
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </CustomModal>
  );
};

export default ModalAdd;
