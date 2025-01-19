import { useState } from "react";
import { BiSearch, BiSolidBullseye, BiSolidTrash } from "react-icons/bi";
import Button from "../components/common/Button";
import TableComponent from "../components/common/table/Table";
import BoxContent from "../components/layout/BoxContent";
import DashboarLayout from "../components/layout/DashboarLayout";

export default function DataPengeluaran() {
  // Data dummy
  const initialData = [
    { id: "PG-0001", tanggal: "2024-11-04", catatan: "Beli Deterjen", pengeluaran: 100000 },
    { id: "PG-0002", tanggal: "2024-11-05", catatan: "Beli Pewangi", pengeluaran: 50000 },
    { id: "PG-0003", tanggal: "2024-11-06", catatan: "Beli Sabun Cuci", pengeluaran: 75000 },
  ];

  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingExpense, setIsAddingExpense] = useState(false);

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.catatan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Columns for the table
  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Tanggal", accessor: "tanggal" },
    { Header: "Catatan", accessor: "catatan" },
    { Header: "Pengeluaran", accessor: (row) => `Rp. ${row.pengeluaran.toLocaleString()}` },
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

  // Handler to add a new expense
  const handleAddExpense = (newExpense) => {
    setData([...data, { ...newExpense, id: `PG-${data.length + 1}` }]);
    setIsAddingExpense(false);
  };

  return (
    <DashboarLayout menu={6} title={"Data Pengeluaran"}>
      <BoxContent className="p-5 border-[#d4bdd2a1]">
        {isAddingExpense ? (
          <TambahPengeluaranForm onAddExpense={handleAddExpense} onCancel={() => setIsAddingExpense(false)} />
        ) : (
          <>
            <div className="flex justify-between mb-5">
              <Button className="w-[170px] px-2" label="Tambah Pengeluaran" onClick={() => setIsAddingExpense(true)} />
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
          </>
        )}
      </BoxContent>
    </DashboarLayout>
  );
}

function TambahPengeluaranForm({ onAddExpense, onCancel }) {
  const [tanggal, setTanggal] = useState("");
  const [catatan, setCatatan] = useState("");
  const [pengeluaran, setPengeluaran] = useState("");

  const handleSubmit = () => {
    if (!tanggal || !catatan || !pengeluaran) {
      alert("Semua field harus diisi!");
      return;
    }

    const newExpense = {
      tanggal,
      catatan,
      pengeluaran: parseInt(pengeluaran, 10),
    };
    onAddExpense(newExpense);
  };

  return (
    <div className="p-6 border rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Tambah Pengeluaran</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Masukkan catatan"
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Pengeluaran (Rp)"
          value={pengeluaran}
          onChange={(e) => setPengeluaran(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex gap-4 mt-4">
        <Button label="Tambah" onClick={handleSubmit} className="bg-[#541E50] text-white" />
        <Button label="Kembali" onClick={onCancel} className="bg-yellow-500 text-white" />
      </div>
    </div>
  );
}
