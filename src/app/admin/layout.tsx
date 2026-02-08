"use client"; // Ubah jadi Client Component untuk cek login

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Untuk redirect
import { LayoutDashboard, Package, PlusCircle, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  // --- CEK APAKAH SUDAH LOGIN? ---
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      // Kalau belum login, tendang ke halaman login
      router.push("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // Hapus kunci rahasia
    router.push("/login");
  };

  // Jangan tampilkan apapun sampai pengecekan selesai (biar gak kedip)
  if (!isAuthorized) return null;

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-full shadow-xl z-20">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Admin Panel
          </h2>
          <p className="text-gray-500 text-xs mt-1">Status: Logged In</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center space-x-3 px-4 py-3 bg-gray-800 rounded-lg text-white transition-colors">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/tambah-produk" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <PlusCircle size={20} />
            <span>Tambah Produk</span>
          </Link>
          <Link href="/katalog" className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            <Package size={20} />
            <span>Lihat Katalog</span>
          </Link>
          <div className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors cursor-pointer">
            <Settings size={20} />
            <span>Pengaturan</span>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout} // Panggil fungsi logout
            className="flex w-full items-center space-x-3 px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* KONTEN */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}