const express = require("express");
const cors = require("cors");
const mysql = require("mysql2"); // Import library MySQL
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 1. KONFIGURASI KONEKSI DATABASE
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Default XAMPP user
  password: "", // Default XAMPP password (kosong)
  database: "db_alumni_cash",
});

// Cek koneksi
db.connect((err) => {
  if (err) {
    console.error("Error koneksi database:", err);
  } else {
    console.log("Berhasil terhubung ke MySQL Database");
  }
});

app.get("/", (req, res) => {
  res.send("Server Backend dengan MySQL Ready!");
});

// --- ROUTES API (DENGAN SQL) ---

// 1. GET: Ambil semua data dari tabel MySQL
app.get("/api/alumni", (req, res) => {
  const sql = "SELECT * FROM alumni ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// 2. POST: Tambah data ke tabel MySQL
app.post("/api/alumni", (req, res) => {
  const { name, email, angkatan } = req.body;
  const sql = "INSERT INTO alumni (name, email, angkatan, status) VALUES (?, ?, ?, ?)";
  const values = [name, email, angkatan, "Menunggak"];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Kirim balik data yang baru dibuat beserta ID-nya
    res.status(201).json({
      message: "Berhasil disimpan",
      data: { id: result.insertId, ...req.body, status: "Menunggak" },
    });
  });
});

// 3. DELETE: Hapus data berdasarkan ID
app.delete("/api/alumni/:id", (req, res) => {
  const { id } = req.params; // Ambil ID dari URL (misal: /api/alumni/5)
  const sql = "DELETE FROM alumni WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Cek apakah ada baris yang terhapus
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.json({ message: "Berhasil dihapus" });
  });
});

// 4. PUT: Update data berdasarkan ID
app.put("/api/alumni/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, angkatan } = req.body; // Kita update 3 kolom ini saja

  const sql = "UPDATE alumni SET name = ?, email = ?, angkatan = ? WHERE id = ?";
  const values = [name, email, angkatan, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.json({ message: "Berhasil diupdate", data: { id, name, email, angkatan } });
  });
});

// 5. GET: Hitung Total Alumni untuk Dashboard
app.get("/api/dashboard/stats", (req, res) => {
  const sql = "SELECT COUNT(*) as total FROM alumni";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // Result akan berupa: [{ total: 5 }]
    res.json(result[0]);
  });
});

// --- FITUR TRANSAKSI ---

// 6. GET: Ambil semua transaksi (Urutkan dari yang terbaru)
app.get("/api/transactions", (req, res) => {
  const sql = "SELECT * FROM transactions ORDER BY date DESC, id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 7. POST: Tambah transaksi baru
app.post("/api/transactions", (req, res) => {
  const { type, amount, date, note, alumni_name } = req.body;

  const sql = "INSERT INTO transactions (type, amount, date, note, alumni_name) VALUES (?, ?, ?, ?, ?)";
  const values = [type, amount, date, note, alumni_name || "-"];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Transaksi tersimpan" });
  });
});

// 8. DELETE: Hapus transaksi
app.delete("/api/transactions/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM transactions WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Transaksi dihapus" });
  });
});

// 9. PUT: Update Transaksi
app.put("/api/transactions/:id", (req, res) => {
  const { id } = req.params;
  const { type, amount, date, note, alumni_name } = req.body;

  const sql = "UPDATE transactions SET type = ?, amount = ?, date = ?, note = ?, alumni_name = ? WHERE id = ?";
  const values = [type, amount, date, note, alumni_name || "-", id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Transaksi berhasil diupdate" });
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
