import React from "react";
import { FileText, Printer, Download } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button"; // Kita pakai tombol reusable kita
import { formatCurrency } from "../utils/formatCurrency";

const LaporanPage = () => {
  // Data Dummy Rekap Bulanan
  const reportData = [
    { id: 1, bulan: "Oktober 2023", masuk: 2500000, keluar: 500000 },
    { id: 2, bulan: "September 2023", masuk: 1800000, keluar: 200000 },
    { id: 3, bulan: "Agustus 2023", masuk: 3000000, keluar: 1200000 },
  ];

  // Fungsi Cetak Browser
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:space-y-0">
      {/* Header (Akan disembunyikan saat print) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Laporan Keuangan</h2>
          <p className="text-gray-500 text-sm">Rekapitulasi kas bulanan.</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex gap-2">
            <Download size={18} />
            Export Excel
          </Button>
          <Button onClick={handlePrint} className="flex gap-2 bg-gray-800 hover:bg-gray-900 text-white">
            <Printer size={18} />
            Cetak Laporan
          </Button>
        </div>
      </div>

      {/* Area Laporan */}
      <Card className="p-8 print:shadow-none print:border-none">
        {/* Kop Laporan (Muncul saat diprint) */}
        <div className="text-center mb-8 border-b-2 border-gray-800 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wider">Laporan Kas Alumni</h1>
          <p className="text-gray-500 mt-1">Periode: Tahun 2023</p>
        </div>

        {/* Tabel Ringkasan */}
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b-2 border-gray-100">
              <th className="py-3 font-bold text-gray-700">Bulan</th>
              <th className="py-3 font-bold text-green-600 text-right">Pemasukan</th>
              <th className="py-3 font-bold text-red-600 text-right">Pengeluaran</th>
              <th className="py-3 font-bold text-gray-800 text-right">Saldo Bersih</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {reportData.map((item) => (
              <tr key={item.id}>
                <td className="py-4 font-medium">{item.bulan}</td>
                <td className="py-4 text-right text-green-600">{formatCurrency(item.masuk)}</td>
                <td className="py-4 text-right text-red-600">{formatCurrency(item.keluar)}</td>
                <td className="py-4 text-right font-bold text-gray-800">{formatCurrency(item.masuk - item.keluar)}</td>
              </tr>
            ))}
          </tbody>
          {/* Footer Total */}
          <tfoot>
            <tr className="border-t-2 border-gray-200">
              <td className="py-4 font-bold text-lg">TOTAL TAHUN INI</td>
              <td colSpan="3" className="py-4 text-right font-bold text-xl text-blue-600">
                {formatCurrency(5400000)} {/* Dummy Total */}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Tanda Tangan (Hanya visual) */}
        <div className="mt-16 flex justify-end">
          <div className="text-center w-48">
            <p className="text-sm text-gray-500 mb-16">Jakarta, 27 November 2023</p>
            <p className="font-bold border-t border-gray-300 pt-2">Bendahara Umum</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LaporanPage;
