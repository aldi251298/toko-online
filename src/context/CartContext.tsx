"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Tipe data untuk barang di keranjang
type CartItem = {
  productId: number;
  quantity: number;
};

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  totalItems: number; // Total barang (untuk badge di header)
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Hitung total barang untuk badge header
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Fungsi Tambah Barang
  const addToCart = (productId: number) => {
    setCartItems((prevItems) => {
      // Cek apakah barang sudah ada di keranjang?
      const existingItem = prevItems.find((item) => item.productId === productId);
      
      if (existingItem) {
        // Kalau sudah ada, tambah jumlahnya saja
        return prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Kalau belum ada, masukkan sebagai barang baru
        return [...prevItems, { productId, quantity: 1 }];
      }
    });
    // Hapus alert bawaan browser, kita pakai animasi tombol saja nanti
  };

  // Fungsi Hapus Barang
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.productId !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart harus dipakai di dalam CartProvider");
  }
  return context;
}