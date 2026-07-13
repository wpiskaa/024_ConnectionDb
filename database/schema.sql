-- ================================================
-- Script untuk membuat database mahasiswa dan tabel biodata
-- Database: Data Piska (sudah ada)
-- ================================================

-- Buat database mahasiswa (jalankan sebagai superuser di database lain)
-- CREATE DATABASE mahasiswa;

-- Pastikan kamu sudah terhubung ke database "Data Piska"
-- \c "Data Piska"

-- Drop tabel jika sudah ada (opsional, untuk reset)
-- DROP TABLE IF EXISTS biodata;

-- Buat tabel biodata
CREATE TABLE IF NOT EXISTS biodata (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    nim VARCHAR(20) NOT NULL UNIQUE,
    kelas VARCHAR(20) NOT NULL
);

-- Insert data contoh
INSERT INTO biodata (nama, nim, kelas) VALUES
    ('Andi Saputra', '2301010001', 'TI-A'),
    ('Budi Santoso', '2301010002', 'TI-A'),
    ('Citra Dewi', '2301010003', 'TI-B'),
    ('Dina Rahayu', '2301010004', 'TI-B'),
    ('Eko Prasetyo', '2301010005', 'TI-C');

-- Verifikasi data
SELECT * FROM biodata;
