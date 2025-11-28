import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import PublicLayout from "./layouts/PublicLayout";

// Pages Admin
import DashboardHome from "./pages/DashboardHome";
import AlumniPage from "./pages/AlumniPage";
import TransactionPage from "./pages/TransactionPage";
import LaporanPage from "./pages/LaporanPage";
import SettingsPage from "./pages/SettingsPage";

// Pages Public & Auth
import LandingPage from "./pages/public/LandingPage"; // Halaman Baru
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import PublicAlumniPage from "./pages/public/PublicAlumniPage";

// --- GUARDS ---
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("isLoggedIn");
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  // Admin pakai MainLayout (Sidebar)
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("isLoggedIn");
  // Kalau sudah login admin buka /, biarkan di public.
  // Kalau buka /login, baru lempar ke /admin
  return <Outlet />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* === A. WEBSITE PUBLIK (Layout Navbar) === */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profil" element={<div className="p-20 text-center">Halaman Profil (Coming Soon)</div>} />
          <Route path="/akademik" element={<div className="p-20 text-center">Halaman Akademik (Coming Soon)</div>} />
          <Route path="/cek-alumni" element={<PublicAlumniPage />} />
        </Route>

        {/* === B. LOGIN ADMIN === */}
        <Route path="/login" element={localStorage.getItem("isLoggedIn") ? <Navigate to="/admin" /> : <LoginPage />} />

        {/* === C. DASHBOARD ADMIN (Layout Sidebar) === */}
        {/* Semua route admin diawali dengan /admin */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route index element={<DashboardHome />} /> {/* /admin */}
          <Route path="alumni" element={<AlumniPage />} /> {/* /admin/alumni */}
          <Route path="transaksi" element={<TransactionPage />} /> {/* /admin/transaksi */}
          <Route path="laporan" element={<LaporanPage />} /> {/* /admin/laporan */}
          <Route path="settings" element={<SettingsPage />} /> {/* /admin/settings */}
        </Route>

        {/* === D. ERROR 404 === */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
