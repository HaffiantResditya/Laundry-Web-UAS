import { useState } from "react";
import { BiSearch, BiSolidEdit, BiSolidTrash } from "react-icons/bi";
import Button from "../components/common/Button";
import TableComponent from "../components/common/table/Table";
import BoxContent from "../components/layout/BoxContent";
import DashboarLayout from "../components/layout/DashboarLayout";

export default function DataLayanan() {
  // Data dummy
  const data = [
    { jenis_layanan: "Laundry + Strika", lama_proses: 3, tarif: 7000 },
    { jenis_layanan: "Fast Laundry", lama_proses: 1, tarif: 10000 },
    { jenis_layanan: "Regular", lama_proses: 2, tarif: 6000 },
    { jenis_layanan: "Cuci Karpet", lama_proses: 3, tarif: 10000 },
  ];

  // State untuk pencarian
  const [searchQuery, setSearchQuery] = useState("");

  // Filter data berdasarkan query pencarian
  const filteredData = data.filter((item) =>
    item.jenis_layanan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Kolom-kolom untuk tabel
  const columns = [
    { Header: "Jenis Layanan Laundry", accessor: "jenis_layanan" },
    { Header: "Lama Proses", accessor: (row) => `${row.lama_proses} Hari` },
    { Header: "Tarif per Kg", accessor: (row) => `Rp. ${row.tarif}` },
    {
      Header: "Aksi",
      accessor: () => (
        <div className="flex gap-3 justify-center">
          <button className="bg-[#541E50] text-white p-2 rounded-lg">
            <BiSolidEdit />
          </button>
          <button className="bg-red-500 text-white p-2 rounded-lg">
            <BiSolidTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboarLayout menu={4} title={"Jenis Layanan"}>
      <BoxContent className="p-5 border-[#d4bdd2a1]">
        <div className="flex justify-between mb-5">
          <Button className="w-[150px] px-2" label="Tambah Layanan" />
          <div className="relative w-[300px]">
            <input
              type="text"
              placeholder="Cari layanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-[#541E50] shadow-sm text-gray-700"
            />
            <BiSearch className="absolute left-3 top-4 text-gray-400" size={20} />
          </div>
        </div>
        <TableComponent data={filteredData} columns={columns} />
      </BoxContent>
    </DashboarLayout>
  );
}
