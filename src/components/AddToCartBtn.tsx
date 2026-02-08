"use client";

import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';


export default function AddToCartBtn({ productId }: { productId: number }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    addToCart(productId);
    
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button 
      onClick={handleClick}
      className={`flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center shadow-lg active:scale-95 ${
        isAdded 
          ? "bg-green-600 hover:bg-green-700 text-white" 
          : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-200"
      }`}
    >
      {isAdded ? (
        <>
          <Check className="mr-2" />
          Masuk Keranjang!
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2" />
          Beli Sekarang
        </>
      )}
    </button>
  );
}