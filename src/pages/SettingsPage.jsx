import React, { useState } from "react";
import { User, Lock, Save } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const SettingsPage = () => {
  // State untuk mengatur Tab mana yang aktif
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Pengaturan</h2>
        <p className="text-gray-500 text-sm">Atur profil dan keamanan akun kamu.</p>
      </div>

      {/* 1. Komponen Tabs Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "profile" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          <User size={18} />
          Profil Saya
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "password" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          <Lock size={18} />
          Ganti Password
        </button>
      </div>

      {/* 2. Konten Tab */}
      <Card className="p-6">
        {/* KONTEN TAB PROFIL */}
        {activeTab === "profile" && (
          <form className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">A</div>
              <div>
                <Button variant="outline" size="sm" type="button">
                  Ubah Foto
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input type="text" defaultValue="Admin Alumni" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" defaultValue="admin@alumni.id" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50" readOnly />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio Singkat</label>
                <textarea rows="3" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button className="flex gap-2">
                <Save size={18} />
                Simpan Profil
              </Button>
            </div>
          </form>
        )}

        {/* KONTEN TAB PASSWORD */}
        {activeTab === "password" && (
          <form className="max-w-md space-y-4 animate-in fade-in duration-300">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Lama</label>
              <input type="password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
              <input type="password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
              <input type="password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div className="flex justify-end mt-4">
              <Button variant="primary" className="flex gap-2">
                <Save size={18} />
                Update Password
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default SettingsPage;
