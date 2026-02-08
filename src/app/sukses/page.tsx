import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full animate-in slide-in-from-bottom-5 duration-700">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Pembayaran Berhasil! 🎉</h1>
        <p className="text-gray-500 mb-8">
          Terima kasih telah berbelanja di TokoSaya. Pesananmu sedang kami siapkan dan akan segera dikirim.
        </p>

        <div className="space-y-3">
          <Link 
            href="/" 
            className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Belanja Lagi
          </Link>
          <Link 
            href="/" 
            className="block w-full text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}