'use client'

import { useState } from 'react';
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch (`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })

    const data = await res.json()

    if (res.ok) {
    // Menyimpan token ke localStorage untuk autentikasi berikutnya
    localStorage.setItem('token', data.token)
    router.push('/dashboard') // redirect ke dashboard setelah login sukses
    } else {
      setError(data.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT: Branding */}
      <div className="w-full md:w-1/2 bg-cyan-950 text-white p-8 md:p-16 flex flex-col justify-center">
        <h2 className="text-xl font-medium mb-8">Website Manajemen Gudang</h2>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
          PT.<br />
          Hartindo<br />
          Surya<br />
          Medika.
        </h1>
        <p className="text-base text-cyan-100">
          Mari mulai harimu dengan semangat dan senyuman di pagi hari! Ayo atur supply di gudang hari ini.
        </p>
      </div>

      {/* RIGHT: Form */}
      <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-sm">
          <h2 className="text-2xl font-bold mb-10 text-center">Selamat Datang Kembali!</h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</label>
              <Input 
                id="email"
                type="email" 
                placeholder="Masukkan email Anda" 
                className="h-14 text-base px-4 border border-gray-200 rounded-xl focus:ring-1 focus:ring-cyan-600 focus:border-cyan-600"
                value = {email}
                onChange ={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <Input 
                id="password"
                type="password" 
                placeholder="Masukkan password" 
                className="h-14 text-base px-4 border border-gray-200 rounded-xl focus:ring-1 focus:ring-cyan-600 focus:border-cyan-600"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
              />
            </div>
            
                      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Email atau password salah</strong>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/></svg>
            </span>
          </div>

            <Button className="w-full h-14 text-base font-medium bg-cyan-700 hover:bg-cyan-800 rounded-xl mt-6 py-4">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}