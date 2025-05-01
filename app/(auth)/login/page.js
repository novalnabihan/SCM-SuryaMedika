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

    const res = await fetch ('http://localhost:3001/api/login', {
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
            
            {error && <p className='text-red-400 text-center'>{error}</p>}

            <Button className="w-full h-14 text-base font-medium bg-cyan-700 hover:bg-cyan-800 rounded-xl mt-6 py-4">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}