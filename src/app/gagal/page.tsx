import Link from "next/link";
import { XCircle, RefreshCw } from "lucide-react";

export default function FailedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border-t-4 border-red-500 animate-in slide-in-from-top-5 duration-500">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran Gagal 😔</h1>
        <p className="text-gray-500 mb-6">
          Maaf, transaksi tidak dapat diproses. Mungkin saldo tidak cukup atau waktu pembayaran habis.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-sm text-left">
          <p className="font-bold text-gray-700">Kode Error: ERR_PAYMENT_TIMEOUT</p>
          <p className="text-gray-500">Silakan coba metode pembayaran lain.</p>
        </div>

        <div className="space-y-3">
          <Link 
            href="/checkout" 
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center"
          >
            <RefreshCw size={18} className="mr-2" />
            Coba Bayar Lagi
          </Link>
          <Link 
            href="/" 
            className="block w-full text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Batalkan Pesanan
          </Link>
        </div>
      </div>
    </div>
  );
}