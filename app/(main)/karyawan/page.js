"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
} from "@/app/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import ModalAdd from './_components/modal-add';

export default function KaryawanPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [karyawanList, setKaryawanList] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
  });
  const [editDialog, setEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchKaryawan = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`);
        const data = await res.json();
        setKaryawanList(data);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      }
    };

    fetchKaryawan();
  }, []);


  const handleHapus = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus user ini?");
    if (!konfirmasi) return;

    try {
      const res = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: "DELETE",
      });

      if (res.status === 204) {
        // sukses hapus → update list
        setKaryawanList(karyawanList.filter((user) => user.id !== id));
      } else {
        alert("Gagal menghapus user");
      }
    } catch (err) {
      console.error("Error hapus user:", err);
      alert("Server error");
    }
  };

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Daftar Karyawan
        </h1>
        <ModalAdd />
        <Dialog open={editDialog} onOpenChange={setEditDialog}>
          <DialogContent className="max-w-4xl p-6 bg-white rounded-xl shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Edit Data Karyawan
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-5">
              <div>
                <Label htmlFor="edit-username">Nama</Label>
                <Input
                  id="edit-username"
                  value={selectedUser?.username || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      username: e.target.value,
                    })
                  }
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  value={selectedUser?.email || ""}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={selectedUser?.role || ""}
                  onValueChange={(value) =>
                    setSelectedUser({ ...selectedUser, role: value })
                  }
                >
                  <SelectTrigger className="w-full py-3 px-4 text-base text-gray-600 border rounded-md mt-2">
                    {selectedUser?.role || "Pilih Role"}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full bg-cyan-950 hover:bg-cyan-900 mt-4"
                onClick={async () => {
                  try {
                    const res = await fetch(
                      `http://localhost:3001/api/users/${selectedUser.id}`,
                      {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          username: selectedUser.username,
                          email: selectedUser.email,
                          role: selectedUser.role,
                        }),
                      }
                    );
                    const updated = await res.json();

                    if (res.ok) {
                      // update local list
                      setKaryawanList((prev) =>
                        prev.map((u) => (u.id === updated.id ? updated : u))
                      );
                      setEditDialog(false);
                      setSelectedUser(null);
                    } else {
                      alert(updated.message || "Gagal update user");
                    }
                  } catch (err) {
                    console.error("Update error:", err);
                    alert("Server error");
                  }
                }}
              >
                Simpan Perubahan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Card className="p-4 shadow-md rounded-xl">
          <ScrollArea>
            <Table className="min-w-full bg-white rounded-lg shadow-md">
              <TableHeader>
                <TableRow className="bg-slate-200">
                  <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                    Nama
                  </TableHead>
                  <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                    Email
                  </TableHead>
                  <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                    Role
                  </TableHead>
                  <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                    Tanggal Daftar
                  </TableHead>
                  <TableHead className="px-6 py-4 text-base font-semibold text-gray-600">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {karyawanList.map((karyawan) => (
                  <TableRow
                    key={karyawan.id}
                    className="hover:bg-gray-50 text-base"
                  >
                    <TableCell className="px-6 py-4">
                      {karyawan.username}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {karyawan.email}
                    </TableCell>
                    <TableCell className="px-6 py-4 capitalize">
                      {karyawan.role}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {new Date(karyawan.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-6 py-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedUser(karyawan); // simpan data user yg dipilih
                          setEditDialog(true); // buka modal edit
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          setUserToDelete(karyawan);
                          setConfirmDeleteDialog(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>
      </div>
      <Dialog open={confirmDeleteDialog} onOpenChange={setConfirmDeleteDialog}>
        <DialogContent className="max-w-md p-6 bg-white rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-red-600">
              Konfirmasi Hapus
            </DialogTitle>
          </DialogHeader>
          <div className="text-gray-700 text-base mt-2">
            Apakah kamu yakin ingin menghapus{" "}
            <strong>{userToDelete?.username}</strong> dari daftar karyawan?
            Tindakan ini tidak dapat dibatalkan.
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setConfirmDeleteDialog(false)}
              className="text-gray-600 border-gray-300"
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  const res = await fetch(
                    `http://localhost:3001/api/users/${userToDelete.id}`,
                    {
                      method: "DELETE",
                    }
                  );

                  if (res.status === 204) {
                    setKaryawanList((prev) =>
                      prev.filter((u) => u.id !== userToDelete.id)
                    );
                    setConfirmDeleteDialog(false);
                    setUserToDelete(null);
                  } else {
                    alert("Gagal menghapus user");
                  }
                } catch (err) {
                  console.error("Error hapus user:", err);
                  alert("Server error");
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
