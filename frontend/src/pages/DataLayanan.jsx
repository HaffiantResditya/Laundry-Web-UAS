import { useState } from "react";
import { BiSearch, BiSolidEdit, BiSolidTrash } from "react-icons/bi";
import Button from "../components/common/Button";
import TableComponent from "../components/common/table/Table";
import BoxContent from "../components/layout/BoxContent";
import DashboarLayout from "../components/layout/DashboarLayout";

export default function DataLayanan() {
  // Data layanan
  const [data, setData] = useState([
    { id: 1, jenis_layanan: "Laundry + Strika", lama_proses: 3, tarif: 7000 },
    { id: 2, jenis_layanan: "Fast Laundry", lama_proses: 1, tarif: 10000 },
    { id: 3, jenis_layanan: "Regular", lama_proses: 2, tarif: 6000 },
    { id: 4, jenis_layanan: "Cuci Karpet", lama_proses: 3, tarif: 10000 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [jenisLayanan, setJenisLayanan] = useState("");
  const [lamaProses, setLamaProses] = useState("");
  const [tarif, setTarif] = useState("");

  // Filter data berdasarkan query pencarian
  const filteredData = data.filter((item) =>
    item.jenis_layanan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fungsi untuk menambah data ke tabel
  const handleTambah = () => {
    if (editId === null) {
      const newData = {
        id: data.length + 1,
        jenis_layanan: jenisLayanan,
        lama_proses: parseInt(lamaProses),
        tarif: parseInt(tarif),
      };
      setData([...data, newData]);
    } else {
      const updatedData = data.map((item) =>
        item.id === editId
          ? { ...item, jenis_layanan: jenisLayanan, lama_proses: parseInt(lamaProses), tarif: parseInt(tarif) }
          : item
      );
      setData(updatedData);
      setEditId(null);
    }
    setShowForm(false);
    setJenisLayanan("");
    setLamaProses("");
    setTarif("");
  };

  // Fungsi untuk kembali ke tampilan tabel
  const handleKembali = () => {
    setShowForm(false);
    setEditId(null);
    setJenisLayanan("");
    setLamaProses("");
    setTarif("");
  };

  // Fungsi untuk menghapus data dengan konfirmasi
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Apakah anda ingin hapus data jenis layanan ini?");
    if (confirmDelete) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  // Fungsi untuk membuka form edit dengan data yang akan diedit
  const handleEdit = (item) => {
    setEditId(item.id);
    setJenisLayanan(item.jenis_layanan);
    setLamaProses(item.lama_proses.toString());
    setTarif(item.tarif.toString());
    setShowForm(true);
  };

  // Kolom-kolom untuk tabel
  const columns = [
    { Header: "Jenis Layanan Laundry", accessor: "jenis_layanan" },
    { Header: "Lama Proses", accessor: (row) => `${row.lama_proses} Hari` },
    { Header: "Tarif per Kg", accessor: (row) => `Rp. ${row.tarif}` },
    {
      Header: "Aksi",
      accessor: (row) => (
        <div className="flex gap-3 justify-center">
          <button onClick={() => handleEdit(row)} className="bg-[#541E50] text-white p-2 rounded-lg">
            <BiSolidEdit />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="bg-red-500 text-white p-2 rounded-lg"
          >
            <BiSolidTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboarLayout menu={4} title={"Jenis Layanan"}>
      <BoxContent className="p-5 border-[#d4bdd2a1]">
        {showForm ? (
          <div className="p-5 border border-gray-300 rounded-md bg-white shadow-sm">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Jenis Layanan Laundry</label>
              <input
                type="text"
                placeholder="Masukkan jenis laundry"
                value={jenisLayanan}
                onChange={(e) => setJenisLayanan(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#541E50]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Lama Proses (hari)</label>
              <input
                type="number"
                placeholder="Masukkan lama proses"
                value={lamaProses}
                onChange={(e) => setLamaProses(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#541E50]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Tarif (Per Kg)</label>
              <input
                type="number"
                placeholder="Masukkan tarif"
                value={tarif}
                onChange={(e) => setTarif(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#541E50]"
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleTambah} className="bg-[#541E50] text-white px-5 py-2 rounded-lg" label="Simpan" />
              <Button onClick={handleKembali} className="bg-yellow-500 text-white px-5 py-2 rounded-lg" label="Kembali" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between mb-5">
              <Button
                onClick={() => setShowForm(true)}
                className="w-[150px] px-2"
                label="Tambah Jenis Layanan"
              />
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
          </>
        )}
      </BoxContent>
    </DashboarLayout>
  );
}
