import React, { useState, useEffect } from "react";
import { User, Save, Camera, Loader2 } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const SettingsPage = () => {
  const [user, setUser] = useState({ name: "", email: "", photo: null });
  const [preview, setPreview] = useState(null); // Untuk preview gambar sebelum di-save
  const [file, setFile] = useState(null); // File mentah untuk di-upload
  const [loading, setLoading] = useState(false);

  // Ambil ID user dari localStorage (Kita simpan saat login nanti)
  // Untuk sementara kita hardcode ID = 1 (Admin Utama) jika belum ada sistem auth ID yang kompleks
  const userId = 1;

  // Ambil Data User saat Load
  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        // Jika user punya foto, set previewnya (arahkan ke folder uploads backend)
        if (data.photo) {
          setPreview(`http://localhost:5000/uploads/${data.photo}`);
          // Simpan juga ke localStorage agar Header bisa baca
          localStorage.setItem("userPhoto", `http://localhost:5000/uploads/${data.photo}`);
          localStorage.setItem("userName", data.name);
        }
      });
  }, []);

  // Handle Pilih File
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    // Buat preview lokal
    setPreview(URL.createObjectURL(selectedFile));
  };

  // Handle Simpan
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Gunakan FormData karena kita kirim FILE + TEXT
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    if (file) {
      formData.append("photo", file);
    }

    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        body: formData, // Jangan pakai header Content-Type JSON!
      });
      const data = await res.json();

      if (res.ok) {
        alert("Profil berhasil diperbarui!");
        // Update localStorage agar Header langsung berubah
        localStorage.setItem("userName", user.name);
        if (data.photo) {
          localStorage.setItem("userPhoto", `http://localhost:5000/uploads/${data.photo}`);
        }
        window.location.reload(); // Refresh halaman agar Header terupdate
      }
    } catch (err) {
      console.error(err);
      alert("Gagal update profil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Edit Profil</h2>

      <Card className="p-8">
        <form onSubmit={handleSave} className="space-y-6">
          {/* FOTO PROFIL */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32">
              {/* Lingkaran Foto */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm bg-gray-200 flex items-center justify-center">
                {preview ? <img src={preview} alt="Profile" className="w-full h-full object-cover" /> : <User size={48} className="text-gray-400" />}
              </div>

              {/* Tombol Kamera Kecil */}
              <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-colors shadow-md">
                <Camera size={18} />
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
            <p className="text-sm text-gray-500">Klik ikon kamera untuk ganti foto</p>
          </div>

          {/* FORM INPUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50" />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button disabled={loading} className="flex gap-2">
              {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SettingsPage;
