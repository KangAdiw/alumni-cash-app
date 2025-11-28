import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Loader2 } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const LoginPage = () => {
  const navigate = useNavigate();

  // State Form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State UI
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    setIsLoading(true); // Mulai loading

    try {
      // Panggil API Backend
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // JIKA SUKSES:
        // 1. Simpan tanda login di localStorage
        localStorage.setItem("isLoggedIn", "true");
        // 2. Simpan nama user juga (opsional, buat nanti ditampilkan)
        localStorage.setItem("userName", data.user.name);

        // 3. Pindah ke Dashboard
        navigate("/admin");
      } else {
        // JIKA GAGAL (Password Salah):
        setError(data.message || "Login gagal");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Gagal terhubung ke server backend");
    } finally {
      setIsLoading(false); // Stop loading
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
          <p className="text-gray-500">Silakan login dengan akun database.</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 text-center border border-red-200 animate-pulse">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="admin@gmail.com" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="admin123" required />
          </div>

          <Button className="w-full mt-4" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" /> Memproses...
              </div>
            ) : (
              "Masuk Sekarang"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Email: admin@gmail.com</p>
          <p>Pass: admin123</p>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
