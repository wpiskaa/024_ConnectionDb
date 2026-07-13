const pool = require('../config/db');

const getAllBiodata = async (req, res) => {
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
};

const getBiodataById = async (req, res) => {
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
};

module.exports = { getAllBiodata, getBiodataById };

