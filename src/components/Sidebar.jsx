import React from "react";
import { Link, useLocation } from "react-router-dom";
// 1. Tambahkan LogOut di sini
import { LayoutDashboard, Users, Wallet, FileText, Settings, X, LogOut } from "lucide-react";
import { cn } from "../utils/cn";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Data Alumni", path: "/alumni", icon: Users },
    { name: "Setor Kas", path: "/transaksi", icon: Wallet },
    { name: "Laporan", path: "/laporan", icon: FileText },
    { name: "Pengaturan", path: "/settings", icon: Settings },
  ];

  // Class dasar untuk sidebar
  const sidebarClasses = cn(
    // 2. Tambahkan 'flex flex-col' agar kita bisa menaruh tombol logout di bawah
    "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out flex flex-col",

    // Logika Responsive
    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
  );

  const handleLogout = () => {
    // 1. Hapus status login
    localStorage.removeItem("isLoggedIn");
    // 2. Lempar ke halaman login
    navigate("/login");
  };

  return (
    <>
      {/* Overlay Gelap (Mobile) */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />}

      {/* Sidebar Content */}
      <aside className={sidebarClasses}>
        {/* Header Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 shrink-0">
          <h1 className="text-xl font-bold text-blue-600">Miftahul Jannah</h1>
          <button onClick={onClose} className="md:hidden text-gray-500">
            <X size={24} />
          </button>
        </div>

        {/* Menu Items (Flex-1 agar mengisi ruang kosong) */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              to={menu.path}
              onClick={() => onClose()}
              className={cn("flex items-center gap-3 px-4 py-3 rounded-lg transition-colors", location.pathname === menu.path ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-100")}
            >
              <menu.icon size={20} />
              <span>{menu.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 shrink-0">
          <button
            onClick={handleLogout}
            // Tambahkan 'cursor-pointer' di sini
            className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
