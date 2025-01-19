const User = require("../models/usersModel");
const bcrypt = require("bcrypt"); // Untuk enkripsi password

// Mendapatkan semua data users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Menambahkan user baru
exports.addUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validasi input
    if (!username || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "Semua field wajib diisi." });
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login user (untuk autentikasi)
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username dan password wajib diisi.",
      });
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User tidak ditemukan." });
    }

    // Periksa password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Password salah." });
    }

    res
      .status(200)
      .json({ success: true, message: "Login berhasil", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
