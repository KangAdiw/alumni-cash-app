import React, { useState, useEffect } from "react";
import { Printer, Download, Filter, Search } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { formatCurrency } from "../utils/formatCurrency";

const LaporanPage = () => {
  // 1. State untuk Filter Tanggal (Default: Tanggal hari ini)
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);

  // 2. State Data
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ masuk: 0, keluar: 0, saldo: 0 });

  // Fungsi Ambil Data Laporan
  const fetchReport = async () => {
    try {
      // Panggil API backend dengan parameter tanggal
      const response = await fetch(`http://localhost:5000/api/reports?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setTransactions(data);

      // Hitung Ringkasan (Matematika)
      let totalMasuk = 0;
      let totalKeluar = 0;

      data.forEach((item) => {
        if (item.type === "IN") {
          totalMasuk += Number(item.amount);
        } else {
          totalKeluar += Number(item.amount);
        }
      });

      setSummary({
        masuk: totalMasuk,
        keluar: totalKeluar,
        saldo: totalMasuk - totalKeluar,
      });
    } catch (error) {
      console.error("Gagal ambil laporan:", error);
    }
  };

  // Ambil data otomatis saat tanggal berubah
  useEffect(() => {
    fetchReport();
  }, [startDate, endDate]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:space-y-0">
      {/* Header & Filter (Disembunyikan saat Print) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Laporan Keuangan</h2>
          <p className="text-gray-500 text-sm">Pilih periode tanggal untuk melihat laporan.</p>
        </div>

        {/* Input Filter Tanggal */}
        <div className="flex flex-col sm:flex-row gap-4 items-end bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Dari Tanggal</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-blue-500 cursor-pointer" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Sampai Tanggal</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-blue-500 cursor-pointer" />
          </div>
          <Button onClick={handlePrint} className="bg-gray-800 hover:bg-gray-900 text-white flex gap-2 h-[38px]">
            <Printer size={18} />
            Cetak
          </Button>
        </div>
      </div>

      {/* KERTAS LAPORAN */}
      <Card id="printable-area" className="p-8 min-h-[500px] print:shadow-none print:border-none print:p-0">
        {/* KOP LAPORAN */}
        <div className="text-center mb-8 print:mb-2 border-b-2 border-gray-800 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wider">Laporan Kas Alumni</h1>
          <p className="text-gray-500 mt-1">
            Periode: {new Date(startDate).toLocaleDateString("id-ID")} s/d {new Date(endDate).toLocaleDateString("id-ID")}
          </p>
        </div>

        {/* TABEL DATA */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b-2 border-gray-100 bg-gray-50 print:bg-transparent">
                <th className="py-3 px-2 font-bold text-gray-700">Tanggal</th>
                <th className="py-3 px-2 font-bold text-gray-700">Keterangan</th>
                <th className="py-3 px-2 font-bold text-gray-700">Tipe</th>
                <th className="py-3 px-2 font-bold text-gray-700 text-right">Jumlah (Rp)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-400 italic">
                    Tidak ada transaksi pada periode ini.
                  </td>
                </tr>
              ) : (
                transactions.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 print:py-1 px-2 text-gray-600">{new Date(item.date).toLocaleDateString("id-ID")}</td>
                    <td className="py-3 print:py-1 px-2 font-medium text-gray-800">
                      {item.note}
                      {item.alumni_name !== "-" && <span className="text-gray-400 text-xs ml-1">({item.alumni_name})</span>}
                    </td>
                    <td className="py-3 print:py-1 px-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.type === "IN" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} print:bg-transparent print:p-0`}>
                        {item.type === "IN" ? "Pemasukan" : "Pengeluaran"}
                      </span>
                    </td>
                    <td className={`py-3 print:py-1 px-2 text-right font-medium ${item.type === "IN" ? "text-green-600" : "text-red-600"}`}>
                      {item.type === "IN" ? "+" : "-"} {formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* RINGKASAN FINAL (TOTAL) */}
        <div className="mt-8 print:mt-2 border-t-2 border-gray-800 pt-4 flex justify-end">
          <div className="w-full sm:w-1/2 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total Pemasukan</span>
              <span className="font-medium text-green-600">{formatCurrency(summary.masuk)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total Pengeluaran</span>
              <span className="font-medium text-red-600">{formatCurrency(summary.keluar)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-2 mt-2">
              <span>Saldo Akhir Periode</span>
              <span className="text-blue-600">{formatCurrency(summary.saldo)}</span>
            </div>
          </div>
        </div>

        {/* Tanda Tangan */}
        <div className="mt-16 flex justify-end print:mt-24">
          <div className="text-center w-48">
            <p className="text-sm text-gray-500 mb-16">Lumbung, {new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}</p>
            <p className="font-bold border-t border-gray-300 pt-2 text-gray-800">Fahri Rizaldin</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LaporanPage;
