import React, { useState } from "react";

// Terima prop 'initialData'
const TransactionForm = ({ onSubmit, onClose, initialData }) => {
  // State tipe harus mengikuti data lama (jika ada)
  const [type, setType] = useState(initialData ? initialData.type : "IN");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      type: type,
      amount: parseFloat(e.target.amount.value),
      date: e.target.date.value,
      note: e.target.note.value,
      alumni: type === "IN" ? e.target.alumni.value : "-",
    };
    onSubmit(formData);
  };

  // Helper untuk format tanggal dari "YYYY-MM-DDTHH..." ke "YYYY-MM-DD" agar bisa masuk ke input date
  const formatDateForInput = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setType("IN")}
          className={`py-2 px-4 rounded-lg font-medium text-sm border cursor-pointer ${type === "IN" ? "bg-green-50 border-green-200 text-green-700" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"}`}
        >
          ⬇️ Pemasukan
        </button>
        <button
          type="button"
          onClick={() => setType("OUT")}
          className={`py-2 px-4 rounded-lg font-medium text-sm border cursor-pointer ${type === "OUT" ? "bg-red-50 border-red-200 text-red-700" : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"}`}
        >
          ⬆️ Pengeluaran
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
        <input
          name="date"
          type="date"
          required
          // Isi default tanggal
          defaultValue={initialData ? formatDateForInput(initialData.date) : ""}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {type === "IN" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Alumni</label>
          <input
            name="alumni"
            type="text"
            // Isi default nama alumni
            defaultValue={initialData ? initialData.alumni_name : ""}
            placeholder="Siapa yang setor?"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nominal (Rp)</label>
        <input
          name="amount"
          type="number"
          required
          // Isi default nominal
          defaultValue={initialData ? initialData.amount : ""}
          placeholder="Contoh: 50000"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
        <textarea
          name="note"
          rows="2"
          required
          // Isi default keterangan
          defaultValue={initialData ? initialData.note : ""}
          placeholder="Contoh: Iuran Bulan Ini"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        ></textarea>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
          Batal
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
          {initialData ? "Simpan Perubahan" : "Simpan Transaksi"}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
