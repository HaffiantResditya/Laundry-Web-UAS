import { useState } from "react";
import { BiSearch, BiSolidBadgeDollar, BiSolidBullseye, BiSolidPrinter, BiSolidTrash } from "react-icons/bi";
import Button from "../components/common/Button";
import TableComponent from "../components/common/table/Table";
import BoxContent from "../components/layout/BoxContent";
import DashboarLayoutKasir from "../components/layout/DashboarLayoutKasir";

export default function DataTransaksi() {
  // Data dummy
  const data = [
    {
      id: 1,
      pelanggan: "Ishida",
      jenis_layanan: "Cuci Kering",
      tgl_terima: "2024-10-01",
      tgl_selesai: "2024-10-03",
      status_pembayaran: "Lunas",
      status_baju: "Sudah Diambil",
      total: 50000,
    },
    {
      id: 2,
      pelanggan: "Ichigo",
      jenis_layanan: "Cuci Setrika",
      tgl_terima: "2024-10-02",
      tgl_selesai: "2024-10-05",
      status_pembayaran: "Belum Lunas",
      status_baju: "Belum Diambil",
      total: 75000,
    },
    {
      id: 3,
      pelanggan: "Zaraki",
      jenis_layanan: "Setrika Saja",
      tgl_terima: "2024-10-03",
      tgl_selesai: "2024-10-04",
      status_pembayaran: "Lunas",
      status_baju: "Sudah Diambil",
      total: 30000,
    },
  ];

  // Kolom-kolom untuk tabel
  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Pelanggan", accessor: "pelanggan" },
    { Header: "Jenis Layanan", accessor: "jenis_layanan" },
    { Header: "Tgl. Terima", accessor: "tgl_terima" },
    { Header: "Tgl. Selesai", accessor: "tgl_selesai" },
    { Header: "Status", accessor: "status_pembayaran" },
    { Header: "Status Baju", accessor: "status_baju" },
    { Header: "Total Bayar", accessor: (row) => `Rp. ${row.total}` },
    {
      Header: "Aksi",
      accessor: (row) => (
        <div className="flex gap-3 justify-start">
          <button className="bg-blue-500 text-white p-2 rounded-lg text-[12px] flex gap-1 items-center">
            <BiSolidBullseye /> <span className="hidden md:block">Detail</span>
          </button>
          {row.status_pembayaran !== "Lunas" ? (
            <>
              <button className="bg-green-600 text-white p-2 rounded-lg text-[12px] flex gap-1 items-center">
                <BiSolidBadgeDollar />
                <span className="hidden md:block">Lunasi</span>
              </button>
              <button className="bg-red-600 text-white p-2 rounded-lg text-[12px] flex gap-1 items-center">
                <BiSolidTrash />
                <span className="hidden md:block">Hapus</span>
              </button>
            </>
          ) : (
            <button className="bg-green-600 text-white p-2 rounded-lg text-[12px] flex gap-1 items-center">
              <BiSolidPrinter />
              <span className="hidden md:block">Cetak</span>
            </button>
          )}
        </div>
      ),
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  // Filter data berdasarkan query pencarian
  const filteredData = data.filter((item) =>
    item.pelanggan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboarLayoutKasir menu={5} title={"Transaksi Laundry"}>
      <BoxContent className="p-5 border-[#d4bdd2a1]">
        <div className="flex justify-between mb-5">
          <Button className="w-[150px] px-2" label="Tambah Transaksi Laundry" />
          <div className="relative w-[300px]">
            <input
              type="text"
              placeholder="Cari transaksi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-[#541E50] shadow-sm text-gray-700"
            />
            <BiSearch className="absolute left-3 top-1/3 transform -translate-y-5 text-gray-400" size={20} />
          </div>
        </div>
        <TableComponent data={filteredData} columns={columns} />
      </BoxContent>
    </DashboarLayoutKasir>
  );
}
