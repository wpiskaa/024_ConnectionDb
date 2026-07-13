const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function setupDatabase() {
  const client = await pool.connect();
  try {
    console.log('✅ Terhubung ke database:', process.env.DB_NAME);

    await client.query(`
      CREATE TABLE IF NOT EXISTS biodata (
        id SERIAL PRIMARY KEY,
        nama VARCHAR(100) NOT NULL,
        nim VARCHAR(20) NOT NULL UNIQUE,
        kelas VARCHAR(20) NOT NULL
      )
    `);
    console.log('✅ Tabel biodata berhasil dibuat (atau sudah ada)');

    const check = await client.query('SELECT COUNT(*) FROM biodata');
    const count = parseInt(check.rows[0].count);

    if (count === 0) {
      await client.query(`
        INSERT INTO biodata (nama, nim, kelas) VALUES
          ('Andi Saputra', '2301010001', 'TI-A'),
          ('Budi Santoso', '2301010002', 'TI-A'),
          ('Citra Dewi', '2301010003', 'TI-B'),
          ('Dina Rahayu', '2301010004', 'TI-B'),
          ('Eko Prasetyo', '2301010005', 'TI-C')
      `);
      console.log('✅ Data contoh berhasil dimasukkan');
    } else {
      console.log(`ℹ️  Tabel sudah memiliki ${count} baris data, skip insert`);
    }

    const result = await client.query('SELECT * FROM biodata ORDER BY id ASC');
    console.log('\n📋 Data di tabel biodata:');
    console.table(result.rows);

    console.log('\n✅ Setup database selesai!');
  } catch (error) {
    console.error('❌ Error saat setup database:', error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

setupDatabase();

