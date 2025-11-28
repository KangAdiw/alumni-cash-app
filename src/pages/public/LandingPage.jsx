import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Users, BookOpen, ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button";

const LandingPage = () => {
  // Ambil data statistik real dari Backend
  const [stats, setStats] = useState({ totalAlumni: 0 });

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats({ totalAlumni: data.total }))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative bg-blue-900 text-white py-20 lg:py-32 overflow-hidden">
        {/* Background Pattern (Hiasan) */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-800 text-blue-200 text-sm font-semibold mb-6">✨ Penerimaan Peserta Didik Baru 2024 Dibuka!</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Mewujudkan Generasi <br /> <span className="text-blue-300">Cerdas & Berakhlak</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10">Yayasan Madrasah Miftahul Jannah berkomitmen mencetak lulusan yang unggul dalam IPTEK dan kokoh dalam IMTAQ.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg rounded-full">Daftar Sekarang</Button>
            <Link to="/profil">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full">
                Tentang Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* STATISTIK SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-blue-50 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-1">{stats.totalAlumni}+</h3>
              <p className="text-gray-600">Alumni Tersebar</p>
            </div>
            <div className="p-6 bg-green-50 rounded-2xl">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-1">100%</h3>
              <p className="text-gray-600">Kelulusan</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-2xl">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-1">3</h3>
              <p className="text-gray-600">Jenjang (MI, MTs, MA)</p>
            </div>
          </div>
        </div>
      </section>

      {/* SAMBUTAN KEPALA YAYASAN (Placeholder) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="w-full h-80 bg-gray-300 rounded-2xl shadow-lg"></div> {/* Placeholder Foto */}
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sambutan Ketua Yayasan</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              "Assalamu'alaikum Warahmatullahi Wabarakatuh. Selamat datang di website resmi kami. Digitalisasi ini adalah langkah nyata kami untuk transparansi dan kemudahan akses informasi bagi seluruh masyarakat..."
            </p>
            <div className="font-bold text-gray-900">H. Ahmad Dahlan, M.Pd</div>
            <div className="text-sm text-gray-500">Ketua Yayasan</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
