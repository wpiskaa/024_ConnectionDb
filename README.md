# 🎓 Express.js + PostgreSQL — Connection Database Mahasiswa

Proyek Express.js untuk koneksi database PostgreSQL dengan tabel `biodata` mahasiswa. Dibuat sebagai tugas **Pemrograman Web Server — Meeting 3**.

---

## 📋 Deskripsi

Program ini adalah REST API sederhana menggunakan **Express.js** yang terhubung ke database **PostgreSQL**. API menyediakan endpoint GET untuk mengambil data biodata mahasiswa dari database.

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Keterangan |
|-----------|------------|
| Node.js | Runtime JavaScript |
| Express.js | Framework web server |
| PostgreSQL | Database relasional |
| pg (node-postgres) | Driver PostgreSQL untuk Node.js |
| dotenv | Manajemen environment variable |

---

## 🗄️ Struktur Database

**Database:** `Data Piska`

**Tabel:** `biodata`

| Kolom | Tipe Data | Keterangan |
|-------|-----------|------------|
| `id` | SERIAL | Primary Key, Auto Increment |
| `nama` | VARCHAR(100) | Nama mahasiswa |
| `nim` | VARCHAR(20) | NIM mahasiswa (UNIQUE) |
| `kelas` | VARCHAR(20) | Kelas mahasiswa |

### SQL Schema

```sql
CREATE TABLE IF NOT EXISTS biodata (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    nim VARCHAR(20) NOT NULL UNIQUE,
    kelas VARCHAR(20) NOT NULL
);
```

---

## 📁 Struktur Proyek

```
Meeting 3/
├── config/
│   └── db.js               # Konfigurasi koneksi PostgreSQL
├── controllers/
│   └── biodataController.js # Logic handler untuk biodata
├── routes/
│   └── biodataRoutes.js    # Definisi endpoint/route
├── database/
│   ├── schema.sql          # SQL script pembuatan tabel
│   └── setup.js            # Script setup otomatis database
├── screenshots/
│   ├── get_all_biodata.png # Screenshot hasil GET semua data
│   └── root_endpoint.png   # Screenshot root endpoint
├── .env                    # Konfigurasi environment (tidak di-push)
├── .env.example            # Template konfigurasi environment
├── .gitignore              # File yang diabaikan Git
├── index.js                # Entry point aplikasi
├── package.json            # Metadata & dependencies
└── README.md               # Dokumentasi proyek
```

---

## ⚙️ Instalasi & Menjalankan

### 1. Clone repository

```bash
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Konfigurasi environment

Buat file `.env` di root proyek:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=your_database_name
PORT=3000
```

### 4. Setup database (buat tabel & isi data)

```bash
node database/setup.js
```

### 5. Jalankan server

```bash
npm start
```

Server akan berjalan di: `http://localhost:3000`

---

## 🔗 Endpoint API

### `GET /`
Root endpoint — informasi API

**Response:**
```json
{
  "success": true,
  "message": "API Server Mahasiswa berjalan dengan baik 🚀",
  "endpoints": {
    "getAllBiodata": "GET /api/biodata",
    "getBiodataById": "GET /api/biodata/:id"
  }
}
```

---

### `GET /api/biodata`
Mengambil seluruh data biodata mahasiswa

**Response:**
```json
{
  "success": true,
  "message": "Data biodata berhasil diambil",
  "total": 5,
  "data": [
    { "id": 1, "nama": "Andi Saputra", "nim": "2301010001", "kelas": "TI-A" },
    { "id": 2, "nama": "Budi Santoso", "nim": "2301010002", "kelas": "TI-A" },
    { "id": 3, "nama": "Citra Dewi", "nim": "2301010003", "kelas": "TI-B" },
    { "id": 4, "nama": "Dina Rahayu", "nim": "2301010004", "kelas": "TI-B" },
    { "id": 5, "nama": "Eko Prasetyo", "nim": "2301010005", "kelas": "TI-C" }
  ]
}
```

---

### `GET /api/biodata/:id`
Mengambil data biodata berdasarkan ID

**Contoh:** `GET /api/biodata/1`

**Response:**
```json
{
  "success": true,
  "message": "Data biodata berhasil diambil",
  "data": {
    "id": 1,
    "nama": "Andi Saputra",
    "nim": "2301010001",
    "kelas": "TI-A"
  }
}
```

---

## 📸 Screenshot Hasil

### GET /api/biodata — Semua Data

![GET /api/biodata](screenshots/get_all_biodata.png)

### Root Endpoint

![Root Endpoint](screenshots/root_endpoint.png)

---

## 👤 Author

**Mahasiswa PWS — Semester Antara 2026**
Meeting 3 — Connection Database PostgreSQL
