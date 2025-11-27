import React, { useState, useEffect } from "react";
import { Search, Plus, Filter, Loader2, Trash2, Pencil } from "lucide-react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import AlumniForm from "../components/alumni/AlumniForm";

const AlumniPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alumniData, setAlumniData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState(""); // State untuk kata kunci cari

  const [editData, setEditData] = useState(null); // Jika null = Mode Tambah, Jika isi = Mode Edit

  // --- FUNGSI 1: AMBIL DATA DARI NODE.JS ---
  const fetchAlumni = async () => {
    setIsLoading(true);
    try {
      // Request ke Backend kita
      const response = await fetch("http://localhost:5000/api/alumni");
      const data = await response.json();
      setAlumniData(data); // Simpan ke state
    } catch (error) {
      console.error("Gagal ambil data:", error);
      alert("Gagal koneksi ke server backend!");
    } finally {
      setIsLoading(false);
    }
  };

  // Panggil fungsi fetch saat halaman dibuka
  useEffect(() => {
    fetchAlumni();
  }, []);

  // --- FUNGSI 2: SIMPAN DATA (BISA TAMBAH / UPDATE) ---
  const handleSave = async (formData) => {
    try {
      let url = "http://localhost:5000/api/alumni";
      let method = "POST";

      // Jika sedang Mode Edit (editData tidak null)
      if (editData) {
        url = `http://localhost:5000/api/alumni/${editData.id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editData ? "Data berhasil diperbarui!" : "Data berhasil ditambahkan!");
        setIsModalOpen(false);
        setEditData(null); // Reset kembali
        fetchAlumni(); // Refresh tabel
      } else {
        alert("Gagal menyimpan data.");
      }
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  // --- FUNGSI 3: HAPUS DATA ---
  const handleDelete = async (id) => {
    // Konfirmasi dulu agar tidak terhapus tidak sengaja
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/alumni/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Data berhasil dihapus!");
          fetchAlumni(); // Refresh tabel otomatis
        } else {
          alert("Gagal menghapus data.");
        }
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const handleEditClick = (data) => {
    setEditData(data); // Isi form dengan data baris ini
    setIsModalOpen(true); // Buka modal
  };

  // LOGIKA FILTERING
  // Jika searchTerm kosong, tampilkan semua. Jika ada isi, filter berdasarkan nama ATAU email.
  const filteredAlumni = alumniData.filter((item) => {
    if (searchTerm === "") return true;
    return item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Data Alumni (Node.js)</h2>
          <p className="text-gray-500 text-sm">Data diambil dari server lokal port 5000.</p>
        </div>

        {/* Tombol Tambah Alumni */}
        <button
          onClick={() => {
            setEditData(null); // Reset form agar kosong
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer"
        >
          <Plus size={18} />
          Tambah Alumni
        </button>
      </div>

      <Card className="p-0">
        {/* Search Bar Statis */}
        <div className="p-4 border-b border-gray-100">
          <input type="text" placeholder="Cari..." className="border p-2 rounded text-sm w-full sm:w-64" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Nama Alumni</th>
                <th className="px-6 py-4">Angkatan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-10">
                    <div className="flex justify-center items-center gap-2 text-gray-500">
                      <Loader2 className="animate-spin" /> Mengambil Data dari Server...
                    </div>
                  </td>
                </tr>
              ) : filteredAlumni.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-gray-500">
                    Tidak ada data. Coba cek server backend.
                  </td>
                </tr>
              ) : (
                filteredAlumni.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{item.angkatan}</td>
                    <td className="px-6 py-4">
                      <Badge variant={item.status === "Lunas" ? "success" : "danger"}>{item.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {/* Tombol Edit */}
                        <button onClick={() => handleEditClick(item)} className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded cursor-pointer transition-colors" title="Edit">
                          <Pencil size={18} />
                        </button>

                        {/* Tombol Hapus */}
                        <button
                          onClick={() => handleDelete(item.id)} // Panggil fungsi delete
                          className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded cursor-pointer transition-colors"
                          title="Hapus"
                        >
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // Judul berubah dinamis
        title={editData ? "Edit Data Alumni" : "Tambah Alumni Baru"}
      >
        <AlumniForm
          // Kirim data lama ke form
          initialData={editData}
          // Arahkan submit ke fungsi handleSave yang baru
          onSubmit={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default AlumniPage;
