-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Jan 2025 pada 14.30
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database_8laundry`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `jenis_layanan`
--

CREATE TABLE `jenis_layanan` (
  `id_jenis_layanan` int(11) NOT NULL,
  `jenis_laundry` varchar(255) NOT NULL,
  `lama_proses` int(11) DEFAULT NULL,
  `tarif` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `laporan_harian`
--

CREATE TABLE `laporan_harian` (
  `id_laporan` int(11) NOT NULL,
  `tgl_laporan` date NOT NULL,
  `ket_laporan` varchar(255) DEFAULT NULL,
  `catatan` text DEFAULT NULL,
  `pemasukan` int(11) DEFAULT NULL,
  `total_pengeluaran` int(11) DEFAULT NULL,
  `id_pengeluaran` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pelanggan`
--

CREATE TABLE `pelanggan` (
  `pelanggan_id` int(11) NOT NULL,
  `pelanggan_nama` varchar(255) NOT NULL,
  `pelanggan_jk` varchar(50) DEFAULT NULL,
  `pelanggan_alamat` varchar(255) DEFAULT NULL,
  `pelanggan_telp` varchar(15) DEFAULT NULL,
  `pelanggan_foto` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pelanggan`
--

INSERT INTO `pelanggan` (`pelanggan_id`, `pelanggan_nama`, `pelanggan_jk`, `pelanggan_alamat`, `pelanggan_telp`, `pelanggan_foto`, `created_by`) VALUES
(8, 'Budi Santoso', 'Laki-Laki', 'Jl. Melati No. 10', '081234567890', 'budi_foto.jpg', 1),
(11, 'Rian Kompling', 'Laki-Laki', 'Jl. Dahlia No. 69', '081234566969', 'rian_foto.jpg', 1),
(14, 'Ilham Goat Updated', 'Laki-Laki', 'Jl. Mawar No. 100', '08123459999', 'ilham_foto_updated.jpg', 2),
(16, 'Rani', 'Perempuan', 'Jl. tulip No. 69', '081234555555', 'rani_foto.jpg', 2),
(18, 'Rani122', 'Perempuan', 'Jl. tulip No. 69', '081234555555', 'rani_foto.jpg', 2),
(19, 'Rania', 'Perempuan', 'Jl. sudirman No. 69', '08123456767', 'rania_foto.jpg', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengeluaran`
--

CREATE TABLE `pengeluaran` (
  `id_pengeluaran` char(36) NOT NULL,
  `tgl_pengeluaran` date NOT NULL,
  `catatan` text DEFAULT NULL,
  `jumlah_pengeluaran` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi_laundry`
--

CREATE TABLE `transaksi_laundry` (
  `id_laundry` char(36) NOT NULL,
  `pelanggan_id` int(11) DEFAULT NULL,
  `users_id` int(11) DEFAULT NULL,
  `id_jenis_layanan` int(11) DEFAULT NULL,
  `tgl_terima` date NOT NULL,
  `tgl_selesai` date DEFAULT NULL,
  `catatan` text DEFAULT NULL,
  `total_bayar` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `users_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `jk` varchar(50) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `users_telp` varchar(15) DEFAULT NULL,
  `users_foto` varchar(255) DEFAULT NULL,
  `role` enum('admin','kasir') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`users_id`, `username`, `password`, `nama`, `jk`, `alamat`, `users_telp`, `users_foto`, `role`, `created_at`) VALUES
(1, 'admin', '123', NULL, NULL, NULL, NULL, NULL, 'admin', '2024-12-17 17:48:38'),
(2, 'kasir', 'kasir123', NULL, NULL, NULL, NULL, NULL, 'kasir', '2024-12-17 18:04:33');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `jenis_layanan`
--
ALTER TABLE `jenis_layanan`
  ADD PRIMARY KEY (`id_jenis_layanan`);

--
-- Indeks untuk tabel `laporan_harian`
--
ALTER TABLE `laporan_harian`
  ADD PRIMARY KEY (`id_laporan`),
  ADD KEY `id_pengeluaran` (`id_pengeluaran`);

--
-- Indeks untuk tabel `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`pelanggan_id`),
  ADD KEY `fk_created_by` (`created_by`);

--
-- Indeks untuk tabel `pengeluaran`
--
ALTER TABLE `pengeluaran`
  ADD PRIMARY KEY (`id_pengeluaran`),
  ADD KEY `created_by` (`created_by`);

--
-- Indeks untuk tabel `transaksi_laundry`
--
ALTER TABLE `transaksi_laundry`
  ADD PRIMARY KEY (`id_laundry`),
  ADD KEY `pelanggan_id` (`pelanggan_id`),
  ADD KEY `users_id` (`users_id`),
  ADD KEY `id_jenis_layanan` (`id_jenis_layanan`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `jenis_layanan`
--
ALTER TABLE `jenis_layanan`
  MODIFY `id_jenis_layanan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `laporan_harian`
--
ALTER TABLE `laporan_harian`
  MODIFY `id_laporan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `pelanggan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `users_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `laporan_harian`
--
ALTER TABLE `laporan_harian`
  ADD CONSTRAINT `laporan_harian_ibfk_1` FOREIGN KEY (`id_pengeluaran`) REFERENCES `pengeluaran` (`id_pengeluaran`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD CONSTRAINT `fk_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`users_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `pelanggan_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`users_id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `pengeluaran`
--
ALTER TABLE `pengeluaran`
  ADD CONSTRAINT `pengeluaran_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`users_id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `transaksi_laundry`
--
ALTER TABLE `transaksi_laundry`
  ADD CONSTRAINT `transaksi_laundry_ibfk_1` FOREIGN KEY (`pelanggan_id`) REFERENCES `pelanggan` (`pelanggan_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transaksi_laundry_ibfk_2` FOREIGN KEY (`users_id`) REFERENCES `users` (`users_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `transaksi_laundry_ibfk_3` FOREIGN KEY (`id_jenis_layanan`) REFERENCES `jenis_layanan` (`id_jenis_layanan`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
