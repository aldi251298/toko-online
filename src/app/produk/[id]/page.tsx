import React from 'react';
import { products } from '@/data/products';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ShoppingCart, Star } from 'lucide-react';
import AddToCartBtn from '@/components/AddToCartBtn';


interface ProductDetailProps {
  params: Promise<{ id: string }>;
}


export default async function ProductDetail({ params }: ProductDetailProps) {
  
 
  const { id } = await params;

  
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors">
          <ChevronLeft size={20} className="mr-1" />
          Kembali ke Katalog
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
         
          <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg aspect-square relative">
             <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          
          <div>
            <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">
              {product.category}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <span className="ml-2 text-gray-500 text-sm">(4.8 / 5.0)</span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="border-t border-b border-gray-100 py-6 mb-8">
              <span className="text-gray-500 text-sm block mb-1">Harga:</span>
              <span className="text-4xl font-bold text-gray-900">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
             <AddToCartBtn productId={product.id} />

              <button className="flex-1 border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-gray-800 hover:text-gray-900 transition-all">
                Wishlist
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}