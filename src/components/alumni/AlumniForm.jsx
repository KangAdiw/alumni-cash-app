import React from "react";
import Button from "../ui/Button";

// Tambahkan prop 'initialData' (Data lama untuk diedit)
const AlumniForm = ({ onSubmit, onClose, initialData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      angkatan: e.target.angkatan.value,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
        <input
          name="name"
          type="text"
          required
          // Jika ada initialData, pakai namanya. Jika tidak, kosong.
          defaultValue={initialData ? initialData.name : ""}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Contoh: Budi Santoso"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input name="email" type="email" required defaultValue={initialData ? initialData.email : ""} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="email@contoh.com" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Angkatan</label>
        <input name="angkatan" type="number" required defaultValue={initialData ? initialData.angkatan : ""} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="2023" />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button type="button" variant="ghost" onClick={onClose}>
          Batal
        </Button>
        <Button type="submit" variant="primary">
          {/* Ubah teks tombol sesuai mode */}
          {initialData ? "Simpan Perubahan" : "Tambah Data"}
        </Button>
      </div>
    </form>
  );
};

export default AlumniForm;
