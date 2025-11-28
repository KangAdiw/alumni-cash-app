import React, { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  // State untuk mengontrol Sidebar di Mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 1. Pasang Sidebar */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* 2. Area Konten Utama */}
      {/* md:ml-64 artinya: Di desktop, beri margin kiri 64 (selebar sidebar) agar konten tidak tertutup */}
      <main className="flex-1 w-full md:ml-64 transition-all duration-300">
        {/* Header Mobile (Hanya muncul di layar kecil) */}
        <div className="md:hidden bg-white p-4 flex items-center gap-4 border-b border-gray-200 shadow-sm sticky top-0 z-30">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu size={24} />
          </button>
          <span className="font-bold text-lg text-blue-600">Miftahul Jannah</span>
        </div>

        {/* Konten Halaman (Dashboard, Table, dll akan muncul di sini) */}
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
