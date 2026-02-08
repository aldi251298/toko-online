"use client";

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, ShoppingBag, Users, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Package, MoreVertical, Search, Bell, Calendar
} from 'lucide-react';

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  
  
  const [chartData, setChartData] = useState<number[]>([]);

  
  useEffect(() => {
    setMounted(true);
    
    const randomData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 80) + 20);
    setChartData(randomData);
  }, []);

  const today = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  if (!mounted) return null; 

  return (
    <div className="min-h-screen pb-10 font-sans">
      
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1 flex items-center">
            <Calendar size={14} className="mr-2" />
            {today}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
             <input type="text" placeholder="Cari pesanan..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all" />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 relative shadow-sm">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
          </button>
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
            A
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Pendapatan", value: "Rp 150.4jt", change: "+12.5%", isUp: true, icon: <DollarSign />, color: "from-blue-500 to-blue-600" },
          { title: "Total Order", value: "1,240", change: "+8.2%", isUp: true, icon: <ShoppingBag />, color: "from-purple-500 to-purple-600" },
          { title: "Produk Terjual", value: "3,500", change: "-2.4%", isUp: false, icon: <Package />, color: "from-orange-500 to-orange-600" },
          { title: "Pelanggan Baru", value: "840", change: "+18%", isUp: true, icon: <Users />, color: "from-green-500 to-green-600" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                 {React.cloneElement(stat.icon as React.ReactElement, { size: 22 })}
              </div>
              <button className="text-gray-300 hover:text-gray-600"><MoreVertical size={18} /></button>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <div className={`flex items-center text-xs font-bold ${stat.isUp ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50'} w-fit px-2 py-1 rounded-lg`}>
                {stat.isUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                <span>{stat.change}</span>
                <span className="text-gray-400 font-normal ml-2 bg-transparent">vs bulan lalu</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 pointer-events-none"></div>

            <div className="flex justify-between items-center mb-8 relative z-10">
              <div>
                <h3 className="font-bold text-gray-800 text-xl">Analitik Penjualan</h3>
                <p className="text-sm text-gray-500">Update real-time minggu ini</p>
              </div>
              <select className="text-sm border-gray-200 border rounded-lg px-4 py-2 bg-gray-50 font-medium text-gray-600 outline-none focus:border-blue-500">
                <option>Minggu Ini</option>
                <option>Bulan Ini</option>
                <option>Tahun Ini</option>
              </select>
            </div>
            
            
            <div className="flex items-end justify-between h-72 gap-3 relative z-10">
              {chartData.map((height, i) => (
                <div key={i} className="w-full flex flex-col justify-end group cursor-pointer relative h-full">
                  
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-xl transform translate-y-2 group-hover:translate-y-0 z-20">
                    Rp {height * 150}.000
                    
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                  
                  
                  <div className="relative w-full rounded-t-2xl overflow-hidden bg-gray-100 h-full flex items-end">
                     <div 
                        className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 opacity-80 group-hover:opacity-100 transition-all duration-700 ease-out rounded-t-2xl" 
                        style={{ height: `${height}%` }}
                     ></div>
                  </div>
                  
                  
                  <div className="text-center mt-4 text-sm font-medium text-gray-400 group-hover:text-blue-600 transition-colors">
                    {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-gray-800 text-lg">Transaksi Masuk</h3>
              <button className="text-blue-600 text-sm font-bold hover:bg-blue-50 px-4 py-2 rounded-lg transition">Lihat Semua</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-gray-500 uppercase text-xs border-b border-gray-100 bg-white">
                  <tr>
                    <th className="px-6 py-4 font-bold tracking-wider">Produk</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Pelanggan</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Total</th>
                    <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {[
                    { item: "Sepatu Nike Air", user: "Budi Santoso", price: "Rp 1.2jt", status: "Dikirim", color: "text-blue-700 bg-blue-100" },
                    { item: "Kemeja Flanel", user: "Siti Aminah", price: "Rp 250rb", status: "Selesai", color: "text-green-700 bg-green-100" },
                    { item: "Tas Laptop", user: "Joko Anwar", price: "Rp 450rb", status: "Pending", color: "text-yellow-700 bg-yellow-100" },
                    { item: "Jam Tangan", user: "Rina Nose", price: "Rp 850rb", status: "Batal", color: "text-red-700 bg-red-100" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900">{row.item}</td>
                      <td className="px-6 py-4 text-gray-500">{row.user}</td>
                      <td className="px-6 py-4 font-bold">{row.price}</td>
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

        </div>

        
        <div className="space-y-8">
          
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg mb-6">Produk Terlaris</h3>
            <div className="space-y-6">
              {[
                { name: "Jaket Denim Vintage", sales: "1,204 terjual", img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=100&q=60" },
                { name: "Sneakers Putih", sales: "890 terjual", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=100&q=60" },
                { name: "Jam Tangan Mewah", sales: "560 terjual", img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100&q=60" },
                { name: "Tas Ransel", sales: "430 terjual", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&q=60" },
              ].map((prod, idx) => (
                <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200 group-hover:border-blue-500 transition-colors">
                    
                    <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">{prod.name}</h4>
                    <p className="text-xs text-gray-400 font-medium">{prod.sales}</p>
                  </div>
                  <div className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${idx === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                    #{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg mb-6">Aktivitas Toko</h3>
            <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 pb-2">
              {[
                { text: "Order #402 masuk dari Budi", time: "Baru saja", icon: <ShoppingBag size={14} />, color: "bg-blue-500" },
                { text: "Stok 'Sepatu' menipis (Sisa 2)", time: "45 menit lalu", icon: <Package size={14} />, color: "bg-orange-500" },
                { text: "User 'Rina' mendaftar akun", time: "2 jam lalu", icon: <Users size={14} />, color: "bg-green-500" },
                { text: "Laporan bulanan diexport", time: "5 jam lalu", icon: <DollarSign size={14} />, color: "bg-purple-500" },
              ].map((act, i) => (
                <div key={i} className="ml-8 relative">
                  <div className={`absolute -left-[39px] w-4 h-4 rounded-full ${act.color} ring-4 ring-white shadow-sm`}></div>
                  <p className="text-sm font-semibold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors">{act.text}</p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">{act.time}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}