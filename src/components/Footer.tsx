import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      
      {/* BAGIAN ATAS: Informasi Utama */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* KOLOM 1: Brand & Deskripsi */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">TokoSaya.</h3>
            <p className="text-sm leading-relaxed">
              Platform belanja online terpercaya dengan produk berkualitas dan harga terbaik untuk kebutuhan sehari-hari Anda.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-blue-400 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* KOLOM 2: Link Cepat */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Belanja</h4>
            <ul className="space-y-2">
              <li><Link href="/pria" className="hover:text-white transition-colors">Pakaian Pria</Link></li>
              <li><Link href="/wanita" className="hover:text-white transition-colors">Pakaian Wanita</Link></li>
              <li><Link href="/elektronik" className="hover:text-white transition-colors">Elektronik</Link></li>
              <li><Link href="/aksesoris" className="hover:text-white transition-colors">Aksesoris</Link></li>
            </ul>
          </div>

          {/* KOLOM 3: Bantuan */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Bantuan</h4>
            <ul className="space-y-2">
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/pengiriman" className="hover:text-white transition-colors">Info Pengiriman</Link></li>
              <li><Link href="/retur" className="hover:text-white transition-colors">Kebijakan Retur</Link></li>
              <li><Link href="/kontak" className="hover:text-white transition-colors">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* KOLOM 4: Kontak Kami */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0 text-blue-500" />
                <span>Jl. Teknologi No. 10, Jakarta Selatan, Indonesia 12345</span>
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

      {/* BAGIAN BAWAH: Copyright */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} TokoSaya. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}