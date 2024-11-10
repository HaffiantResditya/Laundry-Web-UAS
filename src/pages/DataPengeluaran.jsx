import { useState } from "react";
import { BiSearch, BiSolidBullseye, BiSolidTrash } from "react-icons/bi";
import Button from "../components/common/Button";
import TableComponent from "../components/common/table/Table";
import BoxContent from "../components/layout/BoxContent";
import DashboarLayout from "../components/layout/DashboarLayout";

export default function DataPengeluaran() {
  // Data dummy
  const data = [
    { id: "PG-0001", tanggal: "2024-11-04", catatan: "Beli Deterjen", pengeluaran: 100000 },
    { id: "PG-0002", tanggal: "2024-11-05", catatan: "Beli Pewangi", pengeluaran: 50000 },
    { id: "PG-0003", tanggal: "2024-11-06", catatan: "Beli Sabun Cuci", pengeluaran: 75000 },
  ];

  // State untuk pencarian
  const [searchQuery, setSearchQuery] = useState("");

  // Filter data berdasarkan query pencarian
  const filteredData = data.filter((item) =>
    item.catatan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Kolom-kolom untuk tabel
  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Tanggal", accessor: "tanggal" },
    { Header: "Catatan", accessor: "catatan" },
    { Header: "Pengeluaran", accessor: (row) => `Rp. ${row.pengeluaran}` },
    {
      Header: "Aksi",
      accessor: () => (
        <div className="flex gap-3 justify-center">
          <button className="bg-red-500 text-white p-2 rounded-lg">
            <BiSolidTrash />
          </button>
          <button className="bg-blue-500 text-white p-2 rounded-lg">
            <BiSolidBullseye />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboarLayout menu={6} title={"Data Pengeluaran"}>
      <BoxContent className="p-5 border-[#d4bdd2a1]">
        <div className="flex justify-between mb-5">
          <Button className="w-[170px] px-2" label="Tambah Pengeluaran" />
          <div className="relative w-[300px]">
            <input
              type="text"
              placeholder="Cari catatan pengeluaran..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm text-gray-700"
            />
            <BiSearch className="absolute left-3 top-4 text-gray-400" size={20} />
          </div>
        </div>
        <TableComponent data={filteredData} columns={columns} />
      </BoxContent>
    </DashboarLayout>
  );
}
