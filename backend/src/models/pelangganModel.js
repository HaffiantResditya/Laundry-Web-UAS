const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pelanggan = sequelize.define('Pelanggan', {
    pelanggan_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pelanggan_nama: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    pelanggan_jk: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    pelanggan_alamat: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    pelanggan_telp: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    pelanggan_foto: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Nama tabel user
            key: 'users_id',
        },
    },
}, {
    tableName: 'pelanggan', // Nama tabel di database
    timestamps: false,      // Nonaktifkan createdAt & updatedAt
});

module.exports = Pelanggan;
