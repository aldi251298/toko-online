import React from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Ringkasan Toko</h1>

      {/* 1. KARTU STATISTIK */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Pendapatan", value: "Rp 15.400.000", icon: <DollarSign />, color: "bg-blue-500" },
          { title: "Produk Terjual", value: "128 Item", icon: <ShoppingBag />, color: "bg-green-500" },
          { title: "Pelanggan Baru", value: "45 Orang", icon: <Users />, color: "bg-purple-500" },
          { title: "Pertumbuhan", value: "+24%", icon: <TrendingUp />, color: "bg-orange-500" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white shadow-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. TABEL TRANSAKSI TERAKHIR */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 text-lg">Transaksi Terbaru</h3>
            <button className="text-blue-600 text-sm hover:underline">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-3">ID Order</th>
                  <th className="px-6 py-3">Pelanggan</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { id: "#ORD-001", user: "Budi Santoso", price: "Rp 450.000", status: "Sukses", color: "bg-green-100 text-green-700" },
                  { id: "#ORD-002", user: "Siti Aminah", price: "Rp 1.200.000", status: "Pending", color: "bg-yellow-100 text-yellow-700" },
                  { id: "#ORD-003", user: "Joko Anwar", price: "Rp 85.000", status: "Sukses", color: "bg-green-100 text-green-700" },
                  { id: "#ORD-004", user: "Rina Nose", price: "Rp 320.000", status: "Batal", color: "bg-red-100 text-red-700" },
                  { id: "#ORD-005", user: "Dedi Corbuz", price: "Rp 5.500.000", status: "Sukses", color: "bg-green-100 text-green-700" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{row.id}</td>
                    <td className="px-6 py-4">{row.user}</td>
                    <td className="px-6 py-4">{row.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.color}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. CHART SEDERHANA (Grafik Batang CSS) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 text-lg mb-6">Grafik Penjualan (Mingguan)</h3>
          <div className="flex items-end justify-between h-64 space-x-2">
            {[40, 70, 35, 55, 80, 60, 90].map((height, idx) => (
              <div key={idx} className="w-full bg-gray-100 rounded-t-lg relative group flex flex-col justify-end">
                <div 
                  className="bg-blue-500 w-full rounded-t-lg transition-all duration-500 group-hover:bg-blue-600"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-500">
                  {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][idx]}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}