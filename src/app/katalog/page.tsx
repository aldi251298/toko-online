"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import { Search, SlidersHorizontal, ShoppingBag } from 'lucide-react';

function CatalogContent() {
  const searchParams = useSearchParams();
  
  // Ambil query dari URL (misal: ?q=sepatu)
  const queryFromUrl = searchParams.get('q') || "";

  // State
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState(queryFromUrl); 
  const [sortOption, setSortOption] = useState("default");

  // --- PERBAIKAN UTAMA DI SINI ---
  useEffect(() => {
    // Kita cek dulu: Apakah nilai di URL BEDA dengan yang ada di State sekarang?
    setSearchQuery((prevVal) => {
      if (prevVal !== queryFromUrl) {
        // Kalau beda, baru kita update (Reset Kategori juga)
        setSelectedCategory("Semua");
        return queryFromUrl;
      }
      // Kalau sama, kembalikan nilai lama (JANGAN update, biar gak error)
      return prevVal;
    });
  }, [queryFromUrl]); // Kita pantau variabel string-nya langsung, bukan objek searchParams

  const categories = ["Semua", "Pria", "Wanita", "Elektronik", "Olahraga", "Aksesoris"];

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory === "Semua") return true;
      return product.category === selectedCategory;
    })
    .filter((product) => {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOption === "low") return a.price - b.price;
      if (sortOption === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : "Katalog Lengkap"}
          </h1>
          <p className="text-gray-500 text-sm">Menampilkan {filteredProducts.length} produk</p>
        </div>

        {/* TOOLBAR */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 sticky top-20 z-30">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Cari nama produk..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal size={20} className="text-gray-500" />
              <select 
                className="border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Urutkan: Rekomendasi</option>
                <option value="low">Harga: Rendah ke Tinggi</option>
                <option value="high">Harga: Tinggi ke Rendah</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSearchQuery(""); }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* GRID PRODUK */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link href={`/produk/${product.id}`} key={product.id} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 w-full bg-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.id % 3 === 0 && (
                     <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="text-xs text-blue-500 font-semibold mb-1 uppercase tracking-wide">
                    {product.category}
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-900 font-extrabold text-lg">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    <button className="bg-gray-100 p-2 rounded-full text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Wah, kosong nih!</h3>
            <p className="text-gray-500 mt-2">Produk &quot;{searchQuery}&quot; tidak ditemukan.</p>
            <button 
              onClick={() => {setSelectedCategory("Semua"); setSearchQuery("");}}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Lihat Semua Produk
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Memuat Katalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}