import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { BiSearch, BiSolidEdit, BiSolidTrash } from "react-icons/bi";
import Button from "../components/common/Button";
import TableComponent from "../components/common/table/Table";
import BoxContent from "../components/layout/BoxContent";
import DashboarLayout from "../components/layout/DashboarLayout";

export default function DataUser() {
  // Data dummy
  const data = [
    { username: "admin", password: "123", role: "admin" },
    { username: "user", password: "123", role: "user" },
  ];

  // State pencarian
  const [searchQuery, setSearchQuery] = useState("");

  // Filter data berdasarkan query pencarian
  const filteredData = data.filter((item) =>
    item.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Kolom-kolom untuk tabel
  const columns = [
    {
      Header: "Foto",
      accessor: () => (
        <section className="flex justify-center items-center">
          <section className="w-[50px] h-[50px] border justify-center items-center flex rounded-full bg-[#541E50] text-white">
            <FaUser />
          </section>
        </section>
      ),
    },
    { Header: "Username", accessor: "username" },
    { Header: "Password", accessor: "password" },
    { Header: "Role", accessor: "role" },
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
    <DashboarLayout menu={3} title={"Data User"}>
      <BoxContent className="p-5 border-[#d4bdd2a1]">
        <div className="flex justify-between mb-5">
          <Button className="w-[150px]" label="Tambah User" />
          <div className="relative w-[300px]">
            <input
              type="text"
              placeholder="Cari user..."
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
