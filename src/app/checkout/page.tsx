"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import PaymentModal from '@/components/PaymentModal';
import { Building2, CreditCard, Smartphone, Wallet } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("qris"); 

  
  const cartDetails = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...product!, quantity: item.quantity };
  });
  const subtotal = cartDetails.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.11;
  const grandTotal = subtotal + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      
      
      {showModal && (
        <PaymentModal 
          amount={grandTotal} 
          method={paymentMethod} 
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Checkout Aman</h1>
          <p className="text-gray-500 mt-2">Pilih metode pembayaran yang kamu suka</p>
        </div>

        <form onSubmit={handleCheckout} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-semibold mb-6">Informasi Pengiriman</h2>
            <div className="space-y-4">
              <input required type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500" placeholder="Nama Lengkap" />
              <input required type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500" placeholder="Nomor WhatsApp" />
              <textarea required rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500" placeholder="Alamat Lengkap..."></textarea>
            </div>
          </div>

          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6">Metode Pembayaran</h2>
              
              <div className="space-y-3">
                
                
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'qris' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-blue-300'}`}>
                  <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod("qris")} checked={paymentMethod === "qris"} />
                  <div className="bg-white p-2 rounded-lg border border-gray-100 mr-4 text-blue-600">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-900">QRIS (Instant)</span>
                    <span className="text-sm text-gray-500">GoPay, OVO, Dana, ShopeePay</span>
                  </div>
                </label>

                
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'bca' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-blue-300'}`}>
                  <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod("bca")} checked={paymentMethod === "bca"} />
                  <div className="bg-white p-2 rounded-lg border border-gray-100 mr-4 text-blue-600">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-900">BCA Virtual Account</span>
                    <span className="text-sm text-gray-500">Cek otomatis</span>
                  </div>
                </label>

                
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'mandiri' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-blue-300'}`}>
                  <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod("mandiri")} checked={paymentMethod === "mandiri"} />
                  <div className="bg-white p-2 rounded-lg border border-gray-100 mr-4 text-yellow-600">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-900">Mandiri Virtual Account</span>
                    <span className="text-sm text-gray-500">Cek otomatis</span>
                  </div>
                </label>

                
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cc' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 hover:border-blue-300'}`}>
                  <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod("cc")} checked={paymentMethod === "cc"} />
                  <div className="bg-white p-2 rounded-lg border border-gray-100 mr-4 text-purple-600">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-900">Kartu Kredit / Debit</span>
                    <span className="text-sm text-gray-500">Visa, Mastercard, JCB</span>
                  </div>
                </label>

              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
               <div className="flex justify-between text-lg font-bold text-gray-900 mb-4">
                  <span>Total Bayar</span>
                  <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
               </div>
               <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all hover:scale-[1.02]"
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}