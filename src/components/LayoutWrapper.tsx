"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  
  const isAdminPage = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/login";

  
  if (isAdminPage || isLoginPage) {
    return <>{children}</>;
  }

  
  return (
    <>
      <Header />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </>
  );
}