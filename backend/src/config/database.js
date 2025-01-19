const { Sequelize } = require('sequelize');
require('dotenv').config();

// Konfigurasi koneksi database
const sequelize = new Sequelize(
    process.env.DB_NAME,     // Nama database
    process.env.DB_USER,     // Username database
    process.env.DB_PASSWORD, // Password database
    {
        host: process.env.DB_HOST,  // Host database
        dialect: 'mysql',           // Gunakan MySQL sebagai database
    }
);

// Test koneksi database
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
