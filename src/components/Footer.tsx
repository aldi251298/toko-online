import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    
    <footer className="bg-white text-gray-600 border-t border-blue-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            
            <h3 className="text-2xl font-bold text-blue-600">TokoSaya.</h3>
            <p className="text-sm leading-relaxed text-gray-500">
              Platform belanja online terpercaya dengan produk berkualitas dan harga terbaik.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-blue-400 hover:text-blue-600 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-blue-400 hover:text-blue-600 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-pink-500 hover:text-pink-600 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            
            <h4 className="text-lg font-bold text-blue-900 mb-4">Belanja</h4>
            <ul className="space-y-2">
              <li><Link href="/katalog" className="hover:text-blue-600 transition-colors">Semua Produk</Link></li>
              <li><Link href="/pria" className="hover:text-blue-600 transition-colors">Pakaian Pria</Link></li>
              <li><Link href="/wanita" className="hover:text-blue-600 transition-colors">Pakaian Wanita</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-blue-900 mb-4">Bantuan</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
              <li><Link href="/pengiriman" className="hover:text-blue-600 transition-colors">Info Pengiriman</Link></li>
              <li><Link href="/retur" className="hover:text-blue-600 transition-colors">Kebijakan Retur</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-blue-900 mb-4">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0 text-blue-500" />
                <span>Jl. Teknologi No. 10, Jakarta</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-green-500" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-yellow-500" />
                <span>support@tokosaya.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      
      <div className="border-t border-gray-100 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} TokoSaya. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}