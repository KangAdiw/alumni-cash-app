import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { LogIn, Menu, X } from "lucide-react";
import Button from "../components/ui/Button";

const PublicLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // --- KOMPONEN LINK DESKTOP DENGAN ANIMASI ---
  const DesktopLink = ({ to, children }) => (
    <NavLink to={to} className="relative group py-2">
      {({ isActive }) => (
        <>
          {/* Teks Menu */}
          <span className={`font-medium transition-colors duration-300 ${isActive ? " font-bold" : "text-gray-600 "}`}>{children}</span>

          {/* Garis Animasi di Bawah */}
          <span className={`absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-300 ease-in-out ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
        </>
      )}
    </NavLink>
  );

  // Helper untuk Style Menu Mobile (Tetap pakai Block Style biar enak dipencet di HP)
  const mobileLinkClass = ({ isActive }) => `block font-medium py-2 px-3 rounded-lg transition-colors ${isActive ? "text-blue-600 font-bold bg-blue-50" : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"}`;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">M</div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">Miftahul Jannah</h1>
                <p className="text-xs text-gray-500">Yayasan Pendidikan Islam</p>
              </div>
            </Link>

            {/* Menu Desktop (Pakai Komponen Baru) */}
            <div className="hidden md:flex items-center gap-8">
              <DesktopLink to="/">Beranda</DesktopLink>
              <DesktopLink to="/profil">Profil</DesktopLink>
              <DesktopLink to="/akademik">Akademik</DesktopLink>
              <DesktopLink to="/cek-alumni">Cari Alumni</DesktopLink>

              <Link to="/login">
                <Button className="flex items-center gap-2 rounded-full px-6 transition-transform hover:scale-105">
                  <LogIn size={18} />
                  Login Pengurus
                </Button>
              </Link>
            </div>

            {/* Tombol Menu Mobile */}
            <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-2 shadow-lg absolute w-full animate-in slide-in-from-top-5 duration-200">
            <NavLink to="/" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
              Beranda
            </NavLink>
            <NavLink to="/profil" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
              Profil
            </NavLink>
            <NavLink to="/akademik" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
              Akademik
            </NavLink>
            <NavLink to="/cek-alumni" className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
              Cari Alumni
            </NavLink>

            <div className="pt-2 border-t border-gray-100 mt-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full justify-center">Login Pengurus</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* 2. KONTEN HALAMAN */}
      <main className="flex-1 mt-20">
        <Outlet />
      </main>

      {/* 3. FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Miftahul Jannah</h3>
            <p className="text-sm leading-relaxed">Membangun generasi Islami yang cerdas, berakhlak mulia, dan berwawasan global.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/profil" className="hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/akademik" className="hover:text-white transition-colors">
                  Pendaftaran Siswa
                </Link>
              </li>
              <li>
                <Link to="/cek-alumni" className="hover:text-white transition-colors">
                  Data Alumni
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Kontak</h4>
            <p className="text-sm">Jl. Pendidikan No. 123, Kota Bandung</p>
            <p className="text-sm mt-2">Email: info@miftahuljannah.id</p>
            <p className="text-sm">Telp: (022) 1234567</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-xs">&copy; 2024 Yayasan Madrasah Miftahul Jannah. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default PublicLayout;
