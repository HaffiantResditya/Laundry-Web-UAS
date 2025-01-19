const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Menambahkan routes untuk users
router.get('/', usersController.getAllUsers); // Mendapatkan semua users
router.post('/', usersController.addUser);    // Menambahkan user baru
router.post('/login', usersController.loginUser); // Login user

module.exports = router;
