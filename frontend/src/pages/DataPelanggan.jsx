import { useState } from "react";
import { BiSearch, BiSolidEdit, BiSolidTrash } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import Button from "../components/common/Button";
import TableComponent from "../components/common/table/Table";
import BoxContent from "../components/layout/BoxContent";
import DashboarLayout from "../components/layout/DashboarLayout";
import {
  addPelanggan,
  deletePelanggan,
  getPelanggan,
  updatetPelanggan,
} from "../api/pelanggan";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../components/layout/Loading";

export default function DataPelanggan() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    nama_pelanggan: "",
    jenis_kelamin: "Laki-Laki",
    alamat: "",
    no_telpon: "",
  });
  const [editCustomer, setEditCustomer] = useState({
    id: "",
    nama_pelanggan: "",
    jenis_kelamin: "Laki-Laki",
    alamat: "",
    no_telpon: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };
  const handleInputChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditCustomer({ ...editCustomer, [name]: value });
  };

  const clearPayload = () => {
    setNewCustomer({
      nama_pelanggan: "",
      jenis_kelamin: "Laki-Laki",
      alamat: "",
      no_telpon: "",
    });
  };
  const clearUpdatePayload = () => {
    setEditCustomer({
      id: "",
      nama_pelanggan: "",
      jenis_kelamin: "Laki-Laki",
      alamat: "",
      no_telpon: "",
    });
  };

  // get data
  const queryData = useQuery({
    queryKey: ["pelanggan"],
    queryFn: getPelanggan,
  });

  const onSubmitData = () => {
    // check data
    if (
      newCustomer.alamat === "" ||
      newCustomer.nama_pelanggan === "" ||
      newCustomer.no_telpon === ""
    ) {
      return Swal.fire({
        title: "Error",
        text: "Periksa Form Inputan anda",
        icon: "error",
      });
    }
    // prosess data
    const payload = {
      pelanggan_nama: newCustomer.nama_pelanggan,
      pelanggan_jk: newCustomer.jenis_kelamin,
      pelanggan_alamat: newCustomer.alamat,
      pelanggan_telp: newCustomer.no_telpon,
      pelanggan_foto: "https://dummyimage.com/100x100/000/fff&text=Foto+6",
      created_by: "1",
    };

    mutationCreate.mutate(payload);
  };

  const onUpdateData = () => {
    // check data
    if (
      editCustomer.alamat === "" ||
      editCustomer.nama_pelanggan === "" ||
      editCustomer.no_telpon === ""
    ) {
      return Swal.fire({
        title: "Error",
        text: "Periksa Form Inputan anda",
        icon: "error",
      });
    }
    // prosess data
    const payload = {
      pelanggan_nama: editCustomer.nama_pelanggan,
      pelanggan_jk: editCustomer.jenis_kelamin,
      pelanggan_alamat: editCustomer.alamat,
      pelanggan_telp: editCustomer.no_telpon,
      pelanggan_foto: "https://dummyimage.com/100x100/000/fff&text=Foto+6",
      created_by: "1",
    };

    mutationUpdate.mutate({ data: payload, id: editCustomer.id });
  };

  const mutationCreate = useMutation({
    mutationFn: addPelanggan,
    onSuccess: () => {
      setShowForm(false);
      queryData.refetch();
      clearPayload();
      return Swal.fire({
        title: "Berhasil",
        text: "Data Berhasil ditambahkan",
        icon: "success",
      });
    },
    onError: (err) => {
      return Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
      });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: updatetPelanggan,
    onSuccess: () => {
      setEditForm(false);
      queryData.refetch();
      clearUpdatePayload();
      return Swal.fire({
        title: "Berhasil",
        text: "Data Berhasil diubah",
        icon: "success",
      });
    },
    onError: (err) => {
      return Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
      });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deletePelanggan,
    onSuccess: () => {
      queryData.refetch();
      return Swal.fire({
        title: "Berhasil",
        text: "Data Berhasil dihapus",
        icon: "success",
      });
    },
    onError: (err) => {
      return Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
      });
    },
  });

  // const filteredData = payload || [];
  // const filteredData =
  //   payload?.filter((item) =>
  //     item.nama_pelanggan.toLowerCase().includes(searchQuery.toLowerCase())
  //   ) || [];

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
    { Header: "Nama Pelanggan", accessor: "pelanggan_nama" },
    { Header: "Jenis Kelamin", accessor: "pelanggan_jk" },
    { Header: "Alamat", accessor: "pelanggan_alamat" },
    { Header: "No Telpon", accessor: "pelanggan_telp" },
    {
      Header: "Aksi",
      accessor: (item) => (
        <div className="flex gap-3 justify-center">
          <button
            className="bg-[#541E50] text-white p-2 rounded-lg"
            onClick={() => {
              setEditCustomer({
                id: item.pelanggan_id,
                nama_pelanggan: item.pelanggan_nama,
                jenis_kelamin: item.pelanggan_jk,
                alamat: item.pelanggan_alamat,
                no_telpon: item.pelanggan_telp,
              });
              setEditForm(true);
            }}
          >
            <BiSolidEdit />
          </button>
          <button
            onClick={() => {
              Swal.fire({
                title: "Anda Yakin ingin hapus data ini?",
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: "Yes",
              }).then((result) => {
                if (result.isConfirmed) {
                  mutationDelete.mutate(item.pelanggan_id);
                }
              });
            }}
            className="bg-red-500 text-white p-2 rounded-lg"
          >
            <BiSolidTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboarLayout menu={2} title={"Data Pelanggan"}>
      {mutationCreate.isPending ||
      mutationUpdate.isPending ||
      mutationDelete.isPending ? (
        <Loading />
      ) : (
        ""
      )}
      <BoxContent className="p-5 border-[#d4bdd2a1]">
        {showForm ? (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Tambah Pelanggan
            </h2>
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
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                >
                  Kembali
                </button>
                <button
                  onClick={() => onSubmitData()}
                  className="px-4 py-2 bg-[#541E50] text-white rounded-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {editForm ? (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Ubah Pelanggan
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Nama Pelanggan</label>
                <input
                  type="text"
                  name="nama_pelanggan"
                  value={editCustomer.nama_pelanggan}
                  onChange={handleInputChangeEdit}
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
                      checked={editCustomer.jenis_kelamin === "Laki-Laki"}
                      onChange={handleInputChangeEdit}
                      className="text-blue-500 focus:ring-0"
                    />
                    <span>Laki-laki</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="jenis_kelamin"
                      value="Perempuan"
                      checked={editCustomer.jenis_kelamin === "Perempuan"}
                      onChange={handleInputChangeEdit}
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
                  value={editCustomer.alamat}
                  onChange={handleInputChangeEdit}
                  placeholder="Masukkan alamat"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">No Telpon</label>
                <input
                  type="text"
                  name="no_telpon"
                  value={editCustomer.no_telpon}
                  onChange={handleInputChangeEdit}
                  placeholder="Masukkan No.Telp"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={() => setEditForm(false)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                >
                  Kembali
                </button>
                <button
                  onClick={() => onUpdateData()}
                  className="px-4 py-2 bg-[#541E50] text-white rounded-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {!showForm & !editForm ? (
          <div>
            <div className="flex justify-between mb-5">
              <Button
                className="w-[150px]"
                label="Tambah Data"
                onClick={() => setShowForm(true)}
              />
              <div className="relative w-[300px]">
                <input
                  type="text"
                  placeholder="Cari pelanggan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-[#541E50] shadow-sm text-gray-700"
                />
                <BiSearch
                  className="absolute left-3 top-4 text-gray-400"
                  size={20}
                />
              </div>
            </div>
            <TableComponent
              data={queryData.data?.data || []}
              columns={columns}
              loading={queryData.isLoading}
            />
          </div>
        ) : (
          ""
        )}
      </BoxContent>
    </DashboarLayout>
  );
}
