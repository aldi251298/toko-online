"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ScrollReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Posisi awal: Transparan & agak di bawah
      whileInView={{ opacity: 1, y: 0 }} // Saat terlihat: Muncul & naik ke posisi normal
      viewport={{ once: true, margin: "-100px" }} // Animasi jalan sekali saja
      transition={{ duration: 0.8, ease: "easeOut" }} // Durasi 0.8 detik
    >
      {children}
    </motion.div>
  );
}