"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Button } from "../ui/button";


const LogoutModal = ({ open, onCancel }) => {
    const router = useRouter();
  
    const handleConfirm = () => {
      // hapus token (misal di localStorage, cookies, dll)
      localStorage.removeItem("token");
  
      // navigasi ke /login
      router.push("/login");
    };
  
    return (
      <Dialog open={open} onOpenChange={onCancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Logout</DialogTitle>
          </DialogHeader>
          <p>Yakin mau logout?</p>
          <DialogFooter>
            <Button variant="outline" onClick={onCancel}>Batal</Button>
            <Button variant="destructive" onClick={handleConfirm}>Iya</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default LogoutModal;
