"use client"; // Wajib untuk animasi

import React from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { ArrowRight, Smartphone, Shirt, Watch, Monitor, ShoppingBag, Zap, Truck, ShieldCheck, Clock, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion'; // Import Animasi
import ScrollReveal from '@/components/ScrollReveal'; // Import Pembungkus Ajaib

export default function Home() {
  // Filter Data
  const electronics = products.filter(p => p.category === 'Elektronik').slice(0, 4);
  const mens = products.filter(p => p.category === 'Pria').slice(0, 4);
  const womens = products.filter(p => p.category === 'Wanita').slice(0, 4);

  // Komponen Kartu Produk (Dengan Hover Effect Zoom)
  const ProductCard = ({ product }: { product: any }) => (
    <Link href={`/produk/${product.id}`}>
      <motion.div 
        whileHover={{ y: -10 }} // Kalau di-hover naik dikit
        className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
      >
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          <motion.img 
            whileHover={{ scale: 1.1 }} // Gambar membesar pas di-hover
            transition={{ duration: 0.5 }}
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
          {/* Badge Kategori */}
          <span className="absolute top-2 left-2 bg-white/80 backdrop-blur text-xs font-bold px-2 py-1 rounded text-gray-800">
            {product.category}
          </span>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2">{product.name}</h3>
          <div className="mt-auto flex justify-between items-center">
            <span className="font-bold text-blue-600">Rp {product.price.toLocaleString('id-ID')}</span>
            <div className="bg-gray-50 p-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ShoppingBag size={16} />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-20 overflow-hidden">
      
      {/* 1. HERO BANNER (Animasi Masuk) */}
      <div className="relative bg-gray-900 h-[500px] sm:h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Parallax Effect */}
        <motion.div 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-40"
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-blue-600/20 text-blue-300 border border-blue-500/30 backdrop-blur-md text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6 inline-block">
              New Collection 2026
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight"
          >
            Temukan Gaya <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Impianmu.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
          >
            Eksplorasi koleksi fashion dan gadget premium dengan harga terbaik. Kualitas terjamin, pengiriman cepat.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/katalog" className="group bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all inline-flex items-center shadow-lg hover:shadow-blue-500/20">
              Mulai Belanja
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        
        {/* 2. MENU KATEGORI (Slide Up) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white/80 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl grid grid-cols-4 md:grid-cols-8 gap-6 mb-20"
        >
          {[
            { name: "Elektronik", icon: <Monitor />, color: "text-blue-600 bg-blue-50" },
            { name: "Pria", icon: <Shirt />, color: "text-green-600 bg-green-50" },
            { name: "Wanita", icon: <ShoppingBag />, color: "text-pink-600 bg-pink-50" },
            { name: "Jam Tangan", icon: <Watch />, color: "text-yellow-600 bg-yellow-50" },
            { name: "Gadget", icon: <Smartphone />, color: "text-purple-600 bg-purple-50" },
            { name: "Flash Sale", icon: <Zap />, color: "text-red-600 bg-red-50" },
            { name: "Gratis Ongkir", icon: <Truck />, color: "text-orange-600 bg-orange-50" },
            { name: "Official", icon: <ShieldCheck />, color: "text-teal-600 bg-teal-50" },
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${item.color} shadow-sm group-hover:shadow-md transition-all`}>
                {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
              </div>
              <span className="text-xs font-semibold text-gray-600 text-center">{item.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* 3. SECTION: GADGET (Pakai ScrollReveal) */}
        <ScrollReveal>
          <div className="mb-20">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Gadget & Elektronik</h2>
                <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
              </div>
              <Link href="/katalog" className="text-blue-600 font-semibold hover:underline flex items-center">
                Lihat Semua <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {electronics.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </ScrollReveal>

        {/* 4. BANNER PROMO (Parallax Mouse Move - Sederhana) */}
        <ScrollReveal>
          <div className="bg-gray-900 rounded-3xl p-10 md:p-16 mb-20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&q=80')] bg-cover bg-center opacity-30 group-hover:scale-105 transition-transform duration-1000"></div>
            <div className="relative z-10 text-white max-w-2xl">
              <span className="text-yellow-400 font-bold tracking-widest uppercase text-sm mb-2 block">Limited Time Offer</span>
              <h3 className="text-4xl md:text-5xl font-bold mb-6">Diskon Akhir Tahun <br/> Hingga 70%</h3>
              <p className="mb-8 text-gray-300 text-lg">Dapatkan penawaran eksklusif untuk produk elektronik pilihan. Jangan sampai kehabisan!</p>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors shadow-lg">
                Serbu Sekarang
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 5. SECTION: FASHION PRIA & WANITA */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Pria */}
            <div>
              <div className="flex justify-between items-end mb-6">
                 <h2 className="text-2xl font-bold text-gray-900">Fashion Pria</h2>
                 <Link href="/katalog" className="text-gray-500 hover:text-blue-600 text-sm">Lihat Semua</Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {mens.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            </div>
            
            {/* Wanita */}
            <div>
              <div className="flex justify-between items-end mb-6">
                 <h2 className="text-2xl font-bold text-gray-900">Fashion Wanita</h2>
                 <Link href="/katalog" className="text-gray-500 hover:text-blue-600 text-sm">Lihat Semua</Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {womens.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 6. TRUST SIGNALS (Footer Banner) */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-t border-gray-200">
             {[
               { icon: <Truck size={32} />, title: "Gratis Ongkir", desc: "Seluruh Indonesia" },
               { icon: <ShieldCheck size={32} />, title: "Pembayaran Aman", desc: "100% Secure" },
               { icon: <Clock size={32} />, title: "Pengiriman Cepat", desc: "24 Jam Sampai" },
               { icon: <CreditCard size={32} />, title: "Banyak Promo", desc: "Diskon Tiap Hari" },
             ].map((item, idx) => (
               <div key={idx} className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
                 <div className="text-blue-600">{item.icon}</div>
                 <div>
                   <h4 className="font-bold text-gray-900">{item.title}</h4>
                   <p className="text-xs text-gray-500">{item.desc}</p>
                 </div>
               </div>
             ))}
          </div>
        </ScrollReveal>

      </div>
    </main>
  );
}