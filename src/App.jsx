import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DashboardHome from "./pages/DashboardHome";
import AlumniPage from "./pages/AlumniPage";
import TransactionPage from "./pages/TransactionPage";
import LaporanPage from "./pages/LaporanPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";

// Komponen Pembungkus untuk memproteksi halaman
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("isLoggedIn");

  // Jika tidak ada token login, tendang ke login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika login, tampilkan layout utama (Sidebar + Konten)
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Route Public (Login) - Tanpa Sidebar */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route Protected (Semua halaman Admin) - Pakai Sidebar */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/transaksi" element={<TransactionPage />} />
          <Route path="/laporan" element={<LaporanPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
