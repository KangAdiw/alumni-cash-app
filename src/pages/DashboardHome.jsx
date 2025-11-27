import { DollarSign, Users, ArrowUpRight } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import React, { useEffect, useState } from "react";

const DashboardHome = () => {
  const [totalAlumni, setTotalAlumni] = useState(0); // Default 0

  useEffect(() => {
    // Ambil data jumlah dari backend
    fetch("http://localhost:5000/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setTotalAlumni(data.total))
      .catch((err) => console.error("Gagal ambil stats:", err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ringkasan Keuangan</h2>

      {/* Grid Layout Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Kas Terkumpul" value="Rp 45.200.000" icon={DollarSign} color="blue" />

        <StatCard title="Total Alumni Aktif" value={`${totalAlumni} Orang`} icon={Users} color="green" />

        <StatCard title="Pemasukan Bulan Ini" value="Rp 1.500.000" icon={ArrowUpRight} color="purple" trend="+12% dari bulan lalu" />
      </div>

      {/* Area kosong untuk Tabel Transaksi nanti */}
      <div className="mt-8 bg-white border border-dashed border-gray-300 rounded-xl h-64 flex items-center justify-center text-gray-400">Area Grafik / Tabel Transaksi (Akan Datang)</div>
    </div>
  );
};

export default DashboardHome;
