import React, { useState, useEffect } from "react";
import { Search, GraduationCap, User, Loader2 } from "lucide-react";
import Button from "../../components/ui/Button";

const PublicAlumniPage = () => {
  const [alumni, setAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Ambil Data dari Backend saat halaman dibuka
  useEffect(() => {
    fetch("http://localhost:5000/api/alumni")
      .then((res) => res.json())
      .then((data) => {
        setAlumni(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 2. Logika Pencarian
  const filteredAlumni = alumni.filter((item) => {
    if (searchTerm === "") return false; // Default: Jangan tampilkan apa-apa sebelum dicari
    const term = searchTerm.toLowerCase();
    return item.name.toLowerCase().includes(term) || item.angkatan.toString().includes(term);
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* HEADER SECTION */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Direktori Alumni</h1>
          <p className="text-gray-600 max-w-xl mx-auto">Cari data rekan alumni, periksa tahun angkatan, dan status keanggotaan. Ketik nama atau tahun angkatan di bawah ini.</p>
        </div>

        {/* SEARCH BAR BESAR */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-3 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Contoh: Budi Santoso atau 2023"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="px-8 hidden sm:flex">Cari</Button>
        </div>

        {/* HASIL PENCARIAN */}
        <div>
          {loading ? (
            <div className="flex justify-center py-20 text-gray-500 gap-2">
              <Loader2 className="animate-spin" /> Memuat Data...
            </div>
          ) : searchTerm === "" ? (
            // State Awal (Belum mencari)
            <div className="text-center py-20 text-gray-400">
              <GraduationCap size={48} className="mx-auto mb-4 opacity-20" />
              <p>Silakan ketik nama alumni untuk mulai mencari.</p>
            </div>
          ) : filteredAlumni.length === 0 ? (
            // Tidak ketemu
            <div className="text-center py-20 text-gray-500">
              <p>Maaf, data tidak ditemukan dengan kata kunci "{searchTerm}".</p>
            </div>
          ) : (
            // Grid Hasil
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAlumni.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                  {/* Avatar Inisial */}
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">{item.name.charAt(0).toUpperCase()}</div>

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <GraduationCap size={16} />
                      <span>Angkatan {item.angkatan}</span>
                    </div>

                    {/* Status Iuran (Read Only) */}
                    {/* <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${item.status === "Lunas" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-800"}`}>Status: {item.status}</div> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicAlumniPage;
