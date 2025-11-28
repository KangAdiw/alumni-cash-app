import React, { useEffect, useState } from "react";
import { DollarSign, Users, ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import TransactionChart from "../components/dashboard/TransactionChart";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { formatCurrency } from "../utils/formatCurrency";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const [stats, setStats] = useState({ totalAlumni: 0, totalBalance: 0, monthlyIncome: 0 });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Gunakan Promise.all agar loading selesai bebarengan
    const fetchData = async () => {
      try {
        const [statsRes, balRes, incRes, recRes, chartRes] = await Promise.all([
          fetch("http://localhost:5000/api/dashboard/stats"),
          fetch("http://localhost:5000/api/dashboard/balance"),
          fetch("http://localhost:5000/api/dashboard/income-monthly"),
          fetch("http://localhost:5000/api/dashboard/recent-transactions"),
          fetch("http://localhost:5000/api/dashboard/chart-data"),
        ]);

        const statsData = await statsRes.json();
        const balData = await balRes.json();
        const incData = await incRes.json();
        const recData = await recRes.json();
        const chartData = await chartRes.json();

        setStats({
          totalAlumni: statsData.total,
          totalBalance: balData.total_balance,
          monthlyIncome: incData.total_income,
        });
        setRecentTransactions(recData);
        setChartData(chartData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Komponen Loading Skeleton (Animasi Abu-abu)
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[450px] bg-gray-200 rounded-xl"></div>
          <div className="h-[450px] bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-500 text-sm">Selamat datang kembali, Admin!</p>
        </div>
        <div className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium">📅 {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
      </div>

      {/* 1. STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Kas Terkumpul" value={formatCurrency(stats.totalBalance)} icon={Wallet} color="blue" />
        <StatCard title="Total Alumni Aktif" value={`${stats.totalAlumni} Orang`} icon={Users} color="green" />
        <StatCard title="Pemasukan Bulan Ini" value={`+ ${formatCurrency(stats.monthlyIncome)}`} icon={ArrowUpRight} color="purple" trend="vs Bulan Lalu" />
      </div>

      {/* 2. LAYOUT GRID UTAMA (Grafik Kiri, Tabel Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KOLOM KIRI: GRAFIK (Lebar 2/3) */}
        <div className="lg:col-span-2">
          <TransactionChart data={chartData} />
        </div>

        {/* KOLOM KANAN: TABEL RINGKAS (Lebar 1/3) */}
        <Card className="h-[450px] flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
            <h3 className="font-bold text-gray-800">Transaksi Baru</h3>
            <Link to="/transaksi" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
              Lihat Semua
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {recentTransactions.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500 text-sm">Belum ada data.</div>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-50 hover:border-gray-200">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.type === "IN" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                      {item.type === "IN" ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.note}</p>
                      <p className="text-xs text-gray-500 truncate">{new Date(item.date).toLocaleDateString("id-ID")}</p>
                    </div>
                    <div className={`text-sm font-bold whitespace-nowrap ${item.type === "IN" ? "text-green-600" : "text-red-600"}`}>
                      {item.type === "IN" ? "+" : "-"} {formatCurrency(item.amount).replace("Rp", "")}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
