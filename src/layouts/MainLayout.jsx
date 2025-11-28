import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Menu, User } from "lucide-react";

const MainLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State untuk Data User di Header
  const [userData, setUserData] = useState({
    name: "Admin",
    photoUrl: null,
  });

  // ID Admin (Sementara hardcode 1, nanti bisa dinamis dari token login)
  const userId = 1;

  // AMBIL DATA TERBARU DARI SERVER SETIAP KALI HALAMAN DIBUKA
  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUserData({
            name: data.name,
            // Cek apakah ada foto? Jika ada, gabungkan dengan URL backend
            photoUrl: data.photo ? `http://localhost:5000/uploads/${data.photo}` : null,
          });
        }
      })
      .catch((err) => console.error("Gagal ambil profil header:", err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main className="flex-1 w-full md:ml-64 transition-all duration-300">
        {/* --- HEADER --- */}
        <header className="bg-white px-8 py-4 flex justify-between items-center border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          {/* Kiri: Tombol Hamburger & Judul */}
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 hidden md:block">Panel Admin</h2>
          </div>

          {/* Kanan: Profil User (Data dari State, bukan LocalStorage) */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800">{userData.name}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>

            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
              {userData.photoUrl ? (
                <img src={userData.photoUrl} alt="User" className="w-full h-full object-cover" />
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
