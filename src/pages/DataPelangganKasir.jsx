import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import Button from "../components/common/Button";
import TableComponent from "../components/common/table/Table";
import BoxContent from "../components/layout/BoxContent";
import DashboarLayoutKasir from "../components/layout/DashboarLayoutKasir";
import { BiSolidEdit, BiSolidTrash } from "react-icons/bi";

export default function DataPelangganKasir() {
  const data = [
    {
      foto: "https://dummyimage.com/100x100/000/fff&text=Foto+1",
      nama_pelanggan: "Ichigo",
      jenis_kelamin: "Laki-Laki",
      alamat: "Jalan Merpati No. 1, Jakarta",
      no_telpon: "081234567890",
      aksi: "Edit | Delete",
    },
    {
      foto: "https://dummyimage.com/100x100/000/fff&text=Foto+2",
      nama_pelanggan: "Zaraki",
      jenis_kelamin: "Perempuan",
      alamat: "Jalan Anggrek No. 12, Bandung",
      no_telpon: "081298765432",
      aksi: "Edit | Delete",
    },
    {
      foto: "https://dummyimage.com/100x100/000/fff&text=Foto+3",
      nama_pelanggan: "Toshiro",
      jenis_kelamin: "Laki-Laki",
      alamat: "Jalan Kenanga No. 5, Surabaya",
      no_telpon: "081334455667",
      aksi: "Edit | Delete",
    },
    {
      foto: "https://dummyimage.com/100x100/000/fff&text=Foto+4",
      nama_pelanggan: "Orihime",
      jenis_kelamin: "Perempuan",
      alamat: "Jalan Melati No. 3, Medan",
      no_telpon: "081366778899",
      aksi: "Edit | Delete",
    },
    {
      foto: "https://dummyimage.com/100x100/000/fff&text=Foto+5",
      nama_pelanggan: "Ishida",
      jenis_kelamin: "Laki-Laki",
      alamat: "Jalan Mawar No. 8, Yogyakarta",
      no_telpon: "081399112233",
      aksi: "Edit | Delete",
    },
  ];

  const columns = [
    {
      Header: "Foto",
      accessor: () => {
        return (
          <section className="flex justify-center items-center">
            <section className="w-[50px] h-[50px] border justify-center items-center flex rounded-full bg-[#541E50] text-white">
              <FaUser />
            </section>
          </section>
        );
      },
    },
    {
      Header: "Nama Pelanggan",
      accessor: "nama_pelanggan",
    },
    {
      Header: "Jenis Kelamin",
      accessor: "jenis_kelamin",
    },
    {
      Header: "Alamat",
      accessor: "alamat",
    },
    {
      Header: "No Telpon",
      accessor: "no_telpon",
    },
    {
      Header: "Aksi",
      accessor: () => {
        return (
          <div className="flex gap-3 justify-center">
            <button className="bg-[#541E50] text-white p-2 rounded-lg">
              <BiSolidEdit />
            </button>
            <button className="bg-red-500 text-white p-2 rounded-lg">
              <BiSolidTrash />
            </button>
          </div>
        );
      },
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((item) =>
    item.nama_pelanggan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboarLayoutKasir menu={2} title={"Data Pelanggan"}>
      <BoxContent className={"p-5 border-[#d4bdd2a1]"}>
        <div className="flex justify-between mb-5">
          <Button className={"w-[150px]"} label="Tambah Data" />
          <div className="relative w-[300px]">
            <input
              type="text"
              placeholder="Cari pelanggan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-[#541E50] shadow-sm text-gray-700"
            />
            <BiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <TableComponent data={filteredData} columns={columns} />
      </BoxContent>
    </DashboarLayoutKasir>
  );
}
