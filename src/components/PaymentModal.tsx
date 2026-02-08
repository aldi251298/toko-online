"use client";

import React, { useEffect, useState } from "react";
import { X, CheckCircle, Smartphone } from "lucide-react";

interface PaymentModalProps {
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentModal({ amount, onClose, onSuccess }: PaymentModalProps) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 Menit waktu bayar
  const [isChecking, setIsChecking] = useState(false);

  // Hitung mundur waktu
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format menit:detik
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Simulasi Cek Pembayaran
  const handleSimulatePayment = () => {
    setIsChecking(true);
    // Pura-pura loading cek ke bank (2 detik)
    setTimeout(() => {
      setIsChecking(false);
      onSuccess();
    }, 2000);
  };

  return (
    // Layar Hitam Belakang (Overlay)
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      
      {/* Kotak Putih Modal */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-300">
        
        {/* Tombol Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        {/* Header QRIS */}
        <div className="bg-blue-600 p-6 text-center text-white">
          <h2 className="text-xl font-bold mb-1">Scan QRIS</h2>
          <p className="text-blue-100 text-sm">Selesaikan pembayaran sebelum waktu habis</p>
          <div className="mt-4 font-mono text-3xl font-bold">
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Body QR Code */}
        <div className="p-8 text-center space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 inline-block bg-white">
            {/* API QR Code Gratis */}
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Pembayaran Toko Saya Sebesar Rp${amount}`} 
              alt="QRIS Code" 
              className="w-48 h-48 mx-auto"
            />
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-1">Total Pembayaran</p>
            <p className="text-2xl font-bold text-gray-900">Rp {amount.toLocaleString('id-ID')}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 flex items-start text-left">
            <Smartphone size={16} className="mt-1 mr-2 flex-shrink-0 text-blue-500" />
            <p>Buka aplikasi e-wallet (GoPay, OVO, Dana) atau BCA Mobile, lalu scan QR di atas.</p>
          </div>

          {/* Tombol Simulasi (Rahasia Developer) */}
          <button 
            onClick={handleSimulatePayment}
            disabled={isChecking}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all flex justify-center items-center"
          >
            {isChecking ? "Mengecek Status..." : "Saya Sudah Bayar (Simulasi)"}
          </button>
        </div>

      </div>
    </div>
  );
}