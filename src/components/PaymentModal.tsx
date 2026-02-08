"use client";

import React, { useState, useEffect } from "react";
import { X, Copy, CreditCard, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface PaymentModalProps {
  amount: number;
  method: string;
  onClose: () => void;
}

export default function PaymentModal({ amount, method, onClose }: PaymentModalProps) {
  const router = useRouter();
  const [status, setStatus] = useState("pending");
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const simulatePayment = (result: "success" | "failed") => {
    setStatus("processing");
    setTimeout(() => {
      if (result === "success") {
        router.push("/sukses");
      } else {
        router.push("/gagal");
      }
    }, 2000);
  };

  const renderContent = () => {
    switch (method) {
      case "qris":
        return (
          <div className="text-center">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 inline-block bg-white mb-4">
               
               <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Bayar Rp${amount}`} 
                alt="QRIS" 
                className="w-48 h-48 mx-auto"
              />
            </div>
            <p className="text-sm text-gray-500">Scan QRIS menggunakan GoPay, OVO, Dana, atau BCA Mobile.</p>
          </div>
        );

      case "bca":
      case "mandiri":
        const vaNumber = method === "bca" ? "880123456789" : "880987654321";
        const bankName = method === "bca" ? "BCA Virtual Account" : "Mandiri Virtual Account";
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-600 mb-1">{bankName}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-mono font-bold text-gray-800 tracking-widest">{vaNumber}</span>
                <button 
                  onClick={() => alert("Nomor VA Disalin!")}
                  className="text-blue-600 hover:text-blue-800 font-bold text-sm flex items-center"
                >
                  <Copy size={16} className="mr-1" /> Salin
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500 space-y-2">
              <p>1. Buka M-Banking {method.toUpperCase()}.</p>
              
              
              <p>2. Pilih menu Bayar &gt; Virtual Account.</p>
              
              <p>3. Masukkan nomor di atas.</p>
            </div>
          </div>
        );

      case "cc":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nomor Kartu</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" className="w-full pl-10 px-4 py-2 border rounded-lg" placeholder="4000 1234 5678 9010" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Valid Thru</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="MM/YY" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CVV</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="123" />
              </div>
            </div>
          </div>
        );

      default:
        return <p>Metode tidak dikenali.</p>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
        
        <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="animate-pulse w-2 h-2 bg-yellow-500 rounded-full"></span>
            <span className="font-bold text-gray-700">Menunggu Pembayaran</span>
          </div>
          <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-red-500" /></button>
        </div>

        <div className="bg-blue-600 text-white p-3 text-center text-sm font-medium">
          Selesaikan dalam {formatTime(timeLeft)}
        </div>

        <div className="p-6">
          <div className="mb-6 text-center">
            <p className="text-gray-500 text-sm">Total Tagihan</p>
            <h2 className="text-3xl font-bold text-gray-900">Rp {amount.toLocaleString("id-ID")}</h2>
          </div>

          {status === "processing" ? (
             <div className="py-10 text-center">
               <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
               <p className="text-gray-600 font-medium">Memverifikasi Pembayaran...</p>
               <p className="text-xs text-gray-400">Jangan tutup halaman ini.</p>
             </div>
          ) : (
             renderContent()
          )}
        </div>

        {status !== "processing" && (
          <div className="p-4 bg-gray-50 border-t border-gray-100 grid grid-cols-2 gap-3">
            <button 
              onClick={() => simulatePayment("failed")}
              className="flex items-center justify-center px-4 py-3 border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition text-sm"
            >
              <XCircle size={18} className="mr-2" />
              Simulasi Gagal
            </button>
            <button 
              onClick={() => simulatePayment("success")}
              className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition text-sm shadow-lg hover:shadow-green-200"
            >
              <CheckCircle size={18} className="mr-2" />
              Saya Sudah Bayar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}