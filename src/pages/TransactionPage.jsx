import React, { useState, useEffect } from "react";
import { Search, Plus, Filter, ArrowUpRight, ArrowDownRight, Loader2, Trash2, Pencil } from "lucide-react";
import Card from "../components/ui/Card";
import { formatCurrency } from "../utils/formatCurrency";
import Modal from "../components/ui/Modal";
import TransactionForm from "../components/transaction/TransactionForm";

const TransactionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]); // State Data
  const [isLoading, setIsLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk kata kunci cari

  // --- 1. AMBIL DATA DARI SERVER ---
  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/transactions");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // --- 2. SIMPAN DATA (BISA TAMBAH / EDIT) ---
  const handleSave = async (formData) => {
    try {
      let url = "http://localhost:5000/api/transactions";
      let method = "POST";

      // Jika Mode Edit
      if (editData) {
        url = `http://localhost:5000/api/transactions/${editData.id}`;
        method = "PUT";
      }

      const payload = {
        type: formData.type,
        amount: formData.amount,
        date: formData.date,
        note: formData.note,
        alumni_name: formData.alumni,
      };

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(editData ? "Transaksi berhasil diperbarui!" : "Transaksi berhasil disimpan!");
        setIsModalOpen(false);
        setEditData(null);
        fetchTransactions();
      }
    } catch (error) {
      console.error("Error saving:", error);
      alert("Gagal menyimpan transaksi");
    }
  };

  // --- 3. HAPUS DATA ---
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus riwayat transaksi ini?")) {
      try {
        await fetch(`http://localhost:5000/api/transactions/${id}`, { method: "DELETE" });
        fetchTransactions(); // Refresh tabel
      } catch (error) {
        console.error("Gagal hapus:", error);
      }
    }
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setIsModalOpen(true);
  };

  // --- LOGIKA PENCARIAN ---
  const filteredTransactions = transactions.filter((item) => {
    if (searchTerm === "") return true; // Kalau kosong, tampilkan semua
    const term = searchTerm.toLowerCase();

    return (
      item.note.toLowerCase().includes(term) || // Cari di Keterangan
      (item.alumni_name && item.alumni_name.toLowerCase().includes(term)) || // Cari di Nama Alumni
      item.amount.toString().includes(term) // Cari di Nominal
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Transaksi Kas (Realtime)</h2>
          <p className="text-gray-500 text-sm">Riwayat pemasukan dan pengeluaran dana.</p>
        </div>

        <button
          onClick={() => {
            setEditData(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer"
        >
          <Plus size={18} />
          Catat Transaksi
        </button>
      </div>

      <Card className="p-0">
        <div className="p-4 border-b border-gray-100">
          <input type="text" placeholder="Cari keterangan atau nama..." className="border p-2 rounded text-sm w-full sm:w-64 focus:outline-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Keterangan</th>
                <th className="px-6 py-4">Nama Alumni</th>
                <th className="px-6 py-4 text-right">Jumlah</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-10">
                    <Loader2 className="animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">
                    {searchTerm ? "Transaksi tidak ditemukan." : "Belum ada transaksi."}
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    {/* Format Tanggal jadi lebih cantik (DD/MM/YYYY) */}
                    <td className="px-6 py-4 font-medium">{new Date(item.date).toLocaleDateString("id-ID")}</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {item.type === "IN" ? <ArrowUpRight size={16} className="text-green-500" /> : <ArrowDownRight size={16} className="text-red-500" />}
                        {item.note}
                      </div>
                    </td>

                    <td className="px-6 py-4">{item.type === "IN" ? item.alumni_name : <span className="text-gray-400 italic">-</span>}</td>

                    <td className={`px-6 py-4 text-right font-bold ${item.type === "IN" ? "text-green-600" : "text-red-600"}`}>
                      {item.type === "IN" ? "+" : "-"} {formatCurrency(item.amount)}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Tombol Edit */}
                        <button onClick={() => handleEditClick(item)} className="text-blue-500 hover:text-blue-700 cursor-pointer" title="Edit">
                          <Pencil size={18} />
                        </button>

                        {/* Tombol Hapus */}
                        <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600 cursor-pointer" title="Hapus">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editData ? "Edit Transaksi" : "Catat Transaksi Baru"}>
        <TransactionForm
          onSubmit={handleSave} // Arahkan ke fungsi handleSave yang baru
          onClose={() => setIsModalOpen(false)}
          initialData={editData} // Kirim data lama
        />
      </Modal>
    </div>
  );
};

export default TransactionPage;
