'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';

export default function ResetPasswordPage({ params }) {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reset/confirm-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: params.token,
          newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/login'), 2000);
      } else {
        alert(data.message || 'Gagal reset password');
      }
    } catch (err) {
      console.error('Reset error:', err);
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>
        {success ? (
          <p className="text-green-600 text-center">Password berhasil diubah! Mengarahkan ke login...</p>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <Label>Masukkan Password Baru</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-2"
                  required
                />
              </div>
              <Button
                className="w-full bg-cyan-950 hover:bg-cyan-900"
                onClick={handleReset}
                disabled={loading}
              >
                {loading ? 'Menyimpan...' : 'Reset Password'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
