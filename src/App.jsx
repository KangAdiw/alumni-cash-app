import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// Import Halaman
import DashboardHome from "./pages/DashboardHome";
import AlumniPage from "./pages/AlumniPage";
import TransactionPage from "./pages/TransactionPage";
import LaporanPage from "./pages/LaporanPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage"; // Import 404

// 1. PROTECTED ROUTE (Satpam Dashboard)
// Logika: Kalau BELUM login, tendang ke /login.
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("isLoggedIn");
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  // Kalau sudah login, tampilkan Layout + Halaman
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

// 2. PUBLIC ROUTE (Satpam Login)
// Logika: Kalau SUDAH login, jangan boleh masuk /login lagi (Tendang ke Dashboard).
const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("isLoggedIn");
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  // Kalau belum login, silakan buka Login Page
  return <Outlet />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* GROUP 1: Halaman Public (Login) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* GROUP 2: Halaman Private (Dashboard Admin) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/transaksi" element={<TransactionPage />} />
          <Route path="/laporan" element={<LaporanPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* GROUP 3: Halaman Error (404) */}
        {/* Tanda bintang '*' artinya: URL apapun selain yang diatas */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
