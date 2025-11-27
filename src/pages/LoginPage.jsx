import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulasi Cek Password (Hardcoded)
    if (email === "admin@alumni.id" && password === "admin123") {
      // 1. Simpan tanda "sudah login" di browser
      localStorage.setItem("isLoggedIn", "true");

      // 2. Arahkan ke Dashboard
      navigate("/");
    } else {
      setError("Email atau password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
            <LogIn size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Selamat Datang</h1>
          <p className="text-gray-500">Silakan login untuk masuk ke dashboard.</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 text-center border border-red-200">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="admin@alumni.id" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="admin123" required />
          </div>

          <Button className="w-full mt-4">Masuk Sekarang</Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Email: admin@alumni.id</p>
          <p>Pass: admin123</p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
