import { useState } from "react";
import { BiSearch, BiSolidEdit, BiSolidTrash } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import Button from "../components/common/Button";
import TableComponent from "../components/common/table/Table";
import BoxContent from "../components/layout/BoxContent";
import DashboarLayout from "../components/layout/DashboarLayout";

export default function DataPelanggan() {
  const initialData = [
    { foto: "https://dummyimage.com/100x100/000/fff&text=Foto+1", nama_pelanggan: "Ichigo", jenis_kelamin: "Laki-Laki", alamat: "Jalan Merpati No. 1, Jakarta", no_telpon: "081234567890", aksi: "Edit | Delete" },
    { foto: "https://dummyimage.com/100x100/000/fff&text=Foto+2", nama_pelanggan: "Zaraki", jenis_kelamin: "Perempuan", alamat: "Jalan Anggrek No. 12, Bandung", no_telpon: "081298765432", aksi: "Edit | Delete" },
    { foto: "https://dummyimage.com/100x100/000/fff&text=Foto+3", nama_pelanggan: "Toshiro", jenis_kelamin: "Laki-Laki", alamat: "Jalan Kenanga No. 5, Surabaya", no_telpon: "081334455667", aksi: "Edit | Delete" },
    { foto: "https://dummyimage.com/100x100/000/fff&text=Foto+4", nama_pelanggan: "Orihime", jenis_kelamin: "Perempuan", alamat: "Jalan Melati No. 3, Medan", no_telpon: "081366778899", aksi: "Edit | Delete" },
    { foto: "https://dummyimage.com/100x100/000/fff&text=Foto+5", nama_pelanggan: "Ishida", jenis_kelamin: "Laki-Laki", alamat: "Jalan Mawar No. 8, Yogyakarta", no_telpon: "081399112233", aksi: "Edit | Delete" },
  ];

  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    nama_pelanggan: "",
    jenis_kelamin: "Laki-Laki",
    alamat: "",
    no_telpon: "",
  });

  const handleAddButtonClick = () => setShowForm(true);
  const handleBackButtonClick = () => setShowForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleAddCustomer = () => {
    const updatedData = [...data, { ...newCustomer, foto: "https://dummyimage.com/100x100/000/fff&text=Foto+6", aksi: "Edit | Delete" }];
    setData(updatedData);
    setNewCustomer({ nama_pelanggan: "", jenis_kelamin: "Laki-Laki", alamat: "", no_telpon: "" });
    setShowForm(false);
  };

  const filteredData = data.filter((item) =>
    item.nama_pelanggan.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    { Header: "Nama Pelanggan", accessor: "nama_pelanggan" },
    { Header: "Jenis Kelamin", accessor: "jenis_kelamin" },
    { Header: "Alamat", accessor: "alamat" },
    { Header: "No Telpon", accessor: "no_telpon" },
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
    <DashboarLayout menu={2} title={"Data Pelanggan"}>
      <BoxContent className="p-5 border-[#d4bdd2a1]">
        {showForm ? (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Tambah Pelanggan</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Nama Pelanggan</label>
                <input
                  type="text"
                  name="nama_pelanggan"
                  value={newCustomer.nama_pelanggan}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama pelanggan"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Jenis Kelamin</label>
                <div className="flex items-center mt-1 space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="jenis_kelamin"
                      value="Laki-Laki"
                      checked={newCustomer.jenis_kelamin === "Laki-Laki"}
                      onChange={handleInputChange}
                      className="text-blue-500 focus:ring-0"
                    />
                    <span>Laki-laki</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="jenis_kelamin"
                      value="Perempuan"
                      checked={newCustomer.jenis_kelamin === "Perempuan"}
                      onChange={handleInputChange}
                      className="text-blue-500 focus:ring-0"
                    />
                    <span>Perempuan</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-700">Alamat</label>
                <textarea
                  name="alamat"
                  value={newCustomer.alamat}
                  onChange={handleInputChange}
                  placeholder="Masukkan alamat"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">No Telpon</label>
                <input
                  type="text"
                  name="no_telpon"
                  value={newCustomer.no_telpon}
                  onChange={handleInputChange}
                  placeholder="Masukkan No.Telp"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={handleBackButtonClick}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                >
                  Kembali
                </button>
                <button
                  onClick={handleAddCustomer}
                  className="px-4 py-2 bg-[#541E50] text-white rounded-lg"
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between mb-5">
              <Button className="w-[150px]" label="Tambah Data" onClick={handleAddButtonClick} />
              <div className="relative w-[300px]">
                <input
                  type="text"
                  placeholder="Cari pelanggan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-[#541E50] shadow-sm text-gray-700"
                />
                <BiSearch className="absolute left-3 top-4 text-gray-400" size={20} />
              </div>
            </div>
            <TableComponent data={filteredData} columns={columns} />
          </div>
        )}
      </BoxContent>
    </DashboarLayout>
  );
}
