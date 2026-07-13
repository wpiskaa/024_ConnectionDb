require('dotenv').config();
const express = require('express');
const app = express();
const biodataRoutes = require('./routes/biodataRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/biodata', biodataRoutes);

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

