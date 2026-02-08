"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 1. Import Router
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { totalItems } = useCart();
  const router = useRouter();
  const [keyword, setKeyword] = useState(""); // 2. Simpan kata kunci

  // 3. Fungsi saat Enter ditekan
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman
    if (keyword.trim()) {
      // Pindah ke halaman katalog dengan parameter ?q=...
      router.push(`/katalog?q=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <div className="flex-shrink-0 cursor-pointer">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              TokoSaya.
            </Link>
          </div>

          {/* SEARCH BAR (Form) */}
          <div className="hidden md:flex flex-1 mx-8 max-w-lg">
            <form onSubmit={handleSearch} className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                placeholder="Cari sepatu, tas, atau elektronik..."
              />
            </form>
          </div>

          {/* MENU KANAN */}
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6 mr-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Beranda</Link>
              <Link href="/katalog" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Katalog</Link>
            </nav>

            <div className="flex items-center space-x-4 border-l pl-4 border-gray-200">
              <Link href="/keranjang">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative group">
                  <ShoppingCart className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full animate-bounce">
                      {totalItems}
                    </span>
                  )}
                </button>
              </Link>
              
              {/* TOMBOL LINK KE ADMIN/LOGIN */}
              <Link href="/login">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden sm:block relative group"
                  title="Login Admin"
                >
                  <User className="h-6 w-6 text-gray-600 hover:text-blue-600 transition-colors" />
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-gray-400 ring-2 ring-white group-hover:bg-blue-500"></span>
                </button>
              </Link>

              <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}