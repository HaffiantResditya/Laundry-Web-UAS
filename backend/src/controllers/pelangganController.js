const Pelanggan = require("../models/pelangganModel");

// Mendapatkan semua data pelanggan
exports.getAllPelanggan = async (req, res) => {
  try {
    const pelanggan = await Pelanggan.findAll({
      order: [["pelanggan_id", "DESC"]],
    });
    res.status(200).json({ success: true, data: pelanggan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Menambahkan pelanggan baru
exports.addPelanggan = async (req, res) => {
  try {
    const {
      pelanggan_id,
      pelanggan_nama,
      pelanggan_jk,
      pelanggan_alamat,
      pelanggan_telp,
      pelanggan_foto,
      created_by,
    } = req.body;

    // Validasi data: pastikan field wajib diisi
    if (
      !pelanggan_nama ||
      !pelanggan_jk ||
      !pelanggan_alamat ||
      !pelanggan_telp ||
      !created_by
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Semua field wajib diisi." });
    }

    // Membuat data pelanggan baru
    const newPelanggan = await Pelanggan.create({
      pelanggan_id: pelanggan_id || null, // Jika pelanggan_id tidak diinputkan, biarkan null
      pelanggan_nama,
      pelanggan_jk,
      pelanggan_alamat,
      pelanggan_telp,
      pelanggan_foto: pelanggan_foto || null, // Foto bisa null jika tidak ada
      created_by,
    });

    res.status(201).json({ success: true, data: newPelanggan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Menghapus pelanggan berdasarkan pelanggan_id
exports.deletePelanggan = async (req, res) => {
  try {
    const { id } = req.params;

    // Mencari pelanggan dengan ID yang diberikan
    const pelanggan = await Pelanggan.findByPk(id);

    if (!pelanggan) {
      return res
        .status(404)
        .json({ success: false, message: "Pelanggan tidak ditemukan" });
    }

    // Menghapus pelanggan
    await pelanggan.destroy();

    res
      .status(200)
      .json({ success: true, message: "Pelanggan berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mengupdate data pelanggan berdasarkan pelanggan_id
exports.updatePelanggan = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      pelanggan_id,
      pelanggan_nama,
      pelanggan_jk,
      pelanggan_alamat,
      pelanggan_telp,
      pelanggan_foto,
      created_by,
    } = req.body;

    // Mencari pelanggan dengan ID yang diberikan
    const pelanggan = await Pelanggan.findByPk(id);

    if (!pelanggan) {
      return res
        .status(404)
        .json({ success: false, message: "Pelanggan tidak ditemukan" });
    }

    // Mengupdate data pelanggan
    pelanggan.pelanggan_id = pelanggan_id || pelanggan.pelanggan_id; // Update pelanggan_id jika diberikan
    pelanggan.pelanggan_nama = pelanggan_nama || pelanggan.pelanggan_nama;
    pelanggan.pelanggan_jk = pelanggan_jk || pelanggan.pelanggan_jk;
    pelanggan.pelanggan_alamat = pelanggan_alamat || pelanggan.pelanggan_alamat;
    pelanggan.pelanggan_telp = pelanggan_telp || pelanggan.pelanggan_telp;
    pelanggan.pelanggan_foto = pelanggan_foto || pelanggan.pelanggan_foto;
    pelanggan.created_by = created_by || pelanggan.created_by;

    await pelanggan.save();

    res.status(200).json({ success: true, data: pelanggan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
