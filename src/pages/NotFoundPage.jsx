import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
          <AlertTriangle size={32} />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Halaman Tidak Ditemukan</h2>

        <p className="text-gray-500 mb-8">Maaf, halaman yang Anda cari tidak ada atau URL salah. Silakan kembali ke jalan yang benar.</p>

        {/* <Link to="/">
          <Button className="w-full flex items-center justify-center gap-2">
            <ArrowLeft size={18} />
            Kembali ke Dashboard
          </Button>
        </Link> */}
      </Card>
    </div>
  );
};

export default NotFoundPage;
