"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products'; // Butuh data produk untuk hitung harga
import { useRouter } from 'next/navigation';
import PaymentModal from '@/components/PaymentModal'; // Import Modal QRIS

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems } = useCart(); // Kita tidak hapus keranjang dulu biar datanya ada
  const [showModal, setShowModal] = useState(false); // State untuk buka/tutup modal
  
  // -- LOGIKA HITUNG HARGA (Sama kayak di keranjang) --
  const cartDetails = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...product!, quantity: item.quantity };
  });
  const subtotal = cartDetails.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.11;
  const grandTotal = subtotal + tax;
  // ---------------------------------------------------

  // Fungsi saat tombol "Bayar" diklik -> Buka Modal
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true); // Tampilkan QRIS!
  };

  // Fungsi kalau user sukses bayar di Modal
  const handlePaymentSuccess = () => {
    setShowModal(false);
    // Di sini nanti bisa tambahkan fungsi kosongkan keranjang (opsional)
    router.push('/sukses'); // Pindah ke halaman sukses
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* TAMPILKAN MODAL JIKA STATE 'showModal' TRUE */}
      {showModal && (
        <PaymentModal 
          amount={grandTotal} 
          onClose={() => setShowModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Checkout Aman</h1>
          <p className="text-gray-500 mt-2">Selesaikan pesananmu langkah demi langkah</p>
        </div>

        <form onSubmit={handleCheckout} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* KOLOM KIRI: Form (Sama seperti sebelumnya) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
              Informasi Pengiriman
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Budi Santoso" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                <input required type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0812..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                <textarea required rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Jl. Sudirman No. 1..."></textarea>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Total & Bayar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                Ringkasan Pembayaran
              </h2>
              
              <div className="space-y-3 mb-6 border-b pb-6">
                <div className="flex justify-between text-gray-600">
                   <span>Total Belanja</span>
                   <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center p-4 border rounded-xl cursor-pointer bg-blue-50 border-blue-200 transition-colors">
                  <input type="radio" name="payment" className="w-5 h-5 text-blue-600" defaultChecked />
                  <div className="ml-3">
                    <span className="block font-bold text-gray-900">QRIS (Instant)</span>
                    <span className="text-sm text-gray-500">GoPay, OVO, Dana, ShopeePay</span>
                  </div>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all hover:scale-[1.02]"
            >
              Bayar Rp {grandTotal.toLocaleString('id-ID')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}