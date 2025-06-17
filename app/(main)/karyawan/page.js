'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import ModalAdd from './_components/modal-add';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { Pencil, Trash2, Search, Loader2 } from 'lucide-react';
import ModalExportKaryawan from './_components/modal-export-karyawan';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/app/components/ui/select';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Card } from '@/app/components/ui/card';

export default function KaryawanPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [karyawanList, setKaryawanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [filters, setFilters] = useState({
    searchTerm: "",
  });

  const debounceTimeoutRef = useRef(null);
  const loadingIndicatorTimeoutRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(karyawanList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = karyawanList.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, searchTerm: value }));

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (loadingIndicatorTimeoutRef.current) {
      clearTimeout(loadingIndicatorTimeoutRef.current);
    }

    loadingIndicatorTimeoutRef.current = setTimeout(() => {
      setIsSearching(true);
    }, 100);

    debounceTimeoutRef.current = setTimeout(() => {
    }, 300);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);

      if (payload.role !== 'manajer') {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Gagal parsing token:', err);
      router.push('/login');
    }
  }, [router]);

  const fetchKaryawan = useCallback(async () => {
    if (karyawanList.length === 0) setLoading(true);
    setIsSearching(true);

    if (loadingIndicatorTimeoutRef.current) {
      clearTimeout(loadingIndicatorTimeoutRef.current);
    }

    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();

      if (filters.searchTerm) {
        params.append("q", filters.searchTerm);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setKaryawanList(data.filter((u) => u.deletedAt === null));
    } catch (error) {
      console.error('Gagal mengambil data user:', error);
      setKaryawanList([]);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  }, [user, filters, karyawanList.length]);

  useEffect(() => {
    if (user?.role === 'manajer') {
      fetchKaryawan();
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      if (loadingIndicatorTimeoutRef.current) {
        clearTimeout(loadingIndicatorTimeoutRef.current);
      }
    };
  }, [user, fetchKaryawan]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${selectedUser.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: selectedUser.username,
            email: selectedUser.email,
            role: selectedUser.role,
          }),
        }
      );
      const updated = await res.json();

      if (res.ok) {
        setKaryawanList((prev) =>
          prev.map((u) => (u.id === updated.id ? updated : u))
        );
        setEditDialog(false);
        setSelectedUser(null);
      } else {
        alert(updated.message || 'Gagal update user');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Server error');
    }
  };

  const handleHapus = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userToDelete.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 204) {
        await fetchKaryawan();
        setConfirmDeleteDialog(false);
        setUserToDelete(null);
      } else {
        alert('Gagal menghapus user');
      }
    } catch (err) {
      console.error('Error hapus user:', err);
      alert('Server error');
    }
  };

  if (loading && karyawanList.length === 0) return <p className="p-6 text-gray-700">Memuat data karyawan...</p>;
  if (!user || user.role !== 'manajer') return <p className="p-6 text-red-700">Akses ditolak. Anda tidak memiliki izin.</p>;


  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Daftar Karyawan</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              placeholder="Cari karyawan (nama, email, telepon)..."
              className="w-64 h-12 px-4 text-gray-600 border rounded-md pl-10"
              value={filters.searchTerm}
              onChange={handleSearchInputChange}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 animate-spin" />
            )}
          </div>
          <ModalExportKaryawan />
          <ModalAdd refresh={fetchKaryawan} />
        </div>
      </div>
      <Card className="p-4 shadow-md rounded-xl overflow-x-auto">
        <ScrollArea>
          <Table className="min-w-full bg-white">
            <TableHeader>
              <TableRow className="bg-slate-200">
                <TableHead>Nama Lengkap</TableHead>
                <TableHead>Nama Pengguna</TableHead>
                <TableHead>Telepon</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Tanggal Daftar</TableHead>
                <TableHead>Tanggal Perbarui</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {karyawanList.length > 0 ? (
                karyawanList.map((k) => (
                  <TableRow key={k.id}>
                    <TableCell>{k.fullName}</TableCell>
                    <TableCell>{k.username}</TableCell>
                    <TableCell>{k.phone}</TableCell>
                    <TableCell>{k.email}</TableCell>
                    <TableCell className="capitalize">{k.role}</TableCell>
                    <TableCell>
                      {new Date(k.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(k.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        size="icon"
                        onClick={() => {
                          setSelectedUser(k);
                          setEditDialog(true);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          setUserToDelete(k);
                          setConfirmDeleteDialog(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10">
                    {!isSearching && !loading && "Tidak ada data karyawan."}
                    {isSearching && (
                        <>
                            <Loader2 className="inline-block h-6 w-6 animate-spin mr-2" /> Mencari karyawan...
                        </>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </p>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Karyawan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nama Pengguna</Label>
              <Input
                value={selectedUser?.username || ''}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, username: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={selectedUser?.email || ''}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Role</Label>
              <Select
                value={selectedUser?.role || ''}
                onValueChange={(value) =>
                  setSelectedUser({ ...selectedUser, role: value })
                }
              >
                <SelectTrigger>{selectedUser?.role || 'Pilih Role'}</SelectTrigger>
                <SelectContent>
                  <SelectItem value="karyawan">Karyawan</SelectItem>
                  <SelectItem value="manajer">Manajer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full mt-4" onClick={handleUpdate}>
              Simpan Perubahan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmDeleteDialog} onOpenChange={setConfirmDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <p>
            Yakin ingin menghapus <strong>{userToDelete?.username}</strong>?
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setConfirmDeleteDialog(false)}
            >
              Batal
            </Button>
            <Button variant="destructive" onClick={handleHapus}>
              Hapus
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}