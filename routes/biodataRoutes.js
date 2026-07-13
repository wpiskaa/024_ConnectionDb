const express = require('express');
const router = express.Router();
const { getAllBiodata, getBiodataById } = require('../controllers/biodataController');

router.get('/', getAllBiodata);

router.get('/:id', getBiodataById);

module.exports = router;

