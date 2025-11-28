import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Menu, User } from "lucide-react"; // Import User icon

const MainLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // AMBIL DATA DARI LOCAL STORAGE
  // Kita beri nilai default jika belum ada data
  const userName = localStorage.getItem("userName") || "Admin";
  const userPhoto = localStorage.getItem("userPhoto");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 w-full md:ml-64 transition-all duration-300">
        {/* --- HEADER --- */}
        <header className="bg-white px-8 py-4 flex justify-between items-center border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          {/* Kiri: Tombol Hamburger & Judul (Mobile) */}
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>
            {/* <h2 className="text-xl font-bold text-gray-800 hidden md:block">Panel Admin</h2> */}
          </div>

          {/* Kanan: Profil User */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800">{userName}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>

            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
              {userPhoto ? (
                <img src={userPhoto} alt="User" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <User size={20} />
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Konten Halaman */}
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
