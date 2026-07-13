require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Gagal terhubung ke database:', err.message);
  } else {
    console.log('✅ Berhasil terhubung ke database PostgreSQL!');
    release();
  }
});

app.get('/api/biodata', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM biodata ORDER BY id ASC');
    res.status(200).json({
      success: true,
      message: 'Data biodata berhasil diambil',
      total: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data',
      error: error.message,
    });
  }
});

app.get('/api/biodata/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM biodata WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Data dengan id ${id} tidak ditemukan`,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Data biodata berhasil diambil',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data',
      error: error.message,
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Server Mahasiswa berjalan dengan baik 🚀',
    endpoints: {
      getAllBiodata: 'GET /api/biodata',
      getBiodataById: 'GET /api/biodata/:id',
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
