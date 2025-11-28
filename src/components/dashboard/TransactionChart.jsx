import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Card from "../ui/Card";

const TransactionChart = ({ data }) => {
  // 1. State untuk Filter (Default: Tampilkan Semua)
  const [filter, setFilter] = useState("ALL"); // Pilihan: 'ALL', 'IN', 'OUT'

  return (
    <Card className="p-6 h-[450px] flex flex-col">
      {/* HEADER: Judul & Tombol Filter */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">Statistik Keuangan</h3>
          <p className="text-gray-500 text-sm">Analisis tren tahun ini</p>
        </div>

        {/* TOMBOL PILIHAN */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button onClick={() => setFilter("ALL")} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${filter === "ALL" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
            Semua
          </button>
          <button onClick={() => setFilter("IN")} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${filter === "IN" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
            Pemasukan
          </button>
          <button onClick={() => setFilter("OUT")} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${filter === "OUT" ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
            Pengeluaran
          </button>
        </div>
      </div>

      {/* AREA GRAFIK */}
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorMasuk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorKeluar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} tickFormatter={(value) => `${value / 1000}k`} />
            <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} formatter={(value) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value)} />

            {/* LOGIKA KONDISIONAL: Tampilkan garis sesuai filter */}

            {/* Garis Pemasukan (Biru) - Muncul jika filter ALL atau IN */}
            {(filter === "ALL" || filter === "IN") && <Area type="monotone" dataKey="masuk" name="Pemasukan" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorMasuk)" animationDuration={500} />}

            {/* Garis Pengeluaran (Merah) - Muncul jika filter ALL atau OUT */}
            {(filter === "ALL" || filter === "OUT") && <Area type="monotone" dataKey="keluar" name="Pengeluaran" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorKeluar)" animationDuration={500} />}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TransactionChart;
