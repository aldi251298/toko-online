"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { totalItems } = useCart();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/katalog?q=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    
    <header className="sticky top-0 z-50 bg-blue-600 shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          
          <div className="flex-shrink-0 cursor-pointer">
            <Link href="/" className="text-2xl font-bold text-white hover:opacity-90 transition-opacity flex items-center gap-1">
              TokoSaya.
            </Link>
          </div>

         
          <div className="hidden md:flex flex-1 mx-8 max-w-lg">
            <form onSubmit={handleSearch} className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border-none rounded-md leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all shadow-sm"
                placeholder="Cari barang impianmu..."
              />
            </form>
          </div>

          
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            
            <nav className="hidden md:flex space-x-6 mr-4">
              <Link href="/" className="text-blue-100 hover:text-white font-medium transition-colors">Beranda</Link>
              <Link href="/katalog" className="text-blue-100 hover:text-white font-medium transition-colors">Katalog</Link>
            </nav>

            
            <div className="flex items-center space-x-2 sm:space-x-4 border-l border-blue-500 pl-4">
              
              <Link href="/keranjang">
                <button className="p-2 rounded-full hover:bg-blue-700 transition-colors relative group">
                  <ShoppingCart className="h-6 w-6 text-white" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-600 bg-yellow-400 rounded-full animate-bounce">
                      {totalItems}
                    </span>
                  )}
                </button>
              </Link>
              
              <Link href="/login">
                <button 
                  className="p-2 rounded-full hover:bg-blue-700 transition-colors hidden sm:block relative group"
                  title="Login Admin"
                >
                  <User className="h-6 w-6 text-white" />
                </button>
              </Link>

              
              <button className="md:hidden p-2 rounded-md text-white hover:bg-blue-700">
                <Menu className="h-6 w-6" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </header>
  );
}