const express = require('express');
const router = express.Router();
const {
    getAllPelanggan,
    addPelanggan,
    updatePelanggan,
    deletePelanggan
} = require('../controllers/pelangganController');

// Route untuk mendapatkan semua pelanggan  
router.get('/', getAllPelanggan);

// Route untuk menambahkan pelanggan baru  
router.post('/', addPelanggan);

// PUT: Mengupdate data pelanggan berdasarkan pelanggan_id  
router.put('/:id', updatePelanggan);

// DELETE: Menghapus pelanggan berdasarkan pelanggan_id  
router.delete('/:id', deletePelanggan);

module.exports = router;  
