import { useState } from "react";
import { BiSearch, BiSolidBadgeDollar, BiSolidBullseye, BiSolidPrinter, BiSolidTrash } from "react-icons/bi";
import Button from "../components/common/Button";
import TableComponent from "../components/common/table/Table";
import BoxContent from "../components/layout/BoxContent";
import DashboarLayout from "../components/layout/DashboarLayout";

function TambahTransaksi({ onKembali, onTambahData }) {
  const [formData, setFormData] = useState({
    namaPelanggan: "",
    jenisLaundry: "",
    tarif: "",
    tglSelesai: "",
    jumlahKg: "",
    totalBayar: "",
    catatan: "",
    status: "Belum Lunas",
  });

  const layanan = [
    { jenis: "Cuci Kering", tarif: 5000, tglSelesai: "2024-11-20" },
    { jenis: "Cuci Setrika", tarif: 7500, tglSelesai: "2024-11-22" },
    { jenis: "Setrika Saja", tarif: 3000, tglSelesai: "2024-11-19" },
  ];

  const pelanggan = ["Ichigo", "Zaraki", "Toshiro", "Orihime", "Ishida"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "jenisLaundry") {
      const selected = layanan.find((item) => item.jenis === value);
      setFormData({
        ...formData,
        jenisLaundry: value,
        tarif: selected?.tarif || "",
        tglSelesai: selected?.tglSelesai || "",
      });
    } else if (name === "jumlahKg") {
      const total = value * (formData.tarif || 0);
      setFormData({ ...formData, jumlahKg: value, totalBayar: total });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    onTambahData(formData);
    onKembali();
  };

  return (
    <div className="p-5 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-5">Tambah Transaksi Laundry</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Nama Pelanggan</label>
          <select
            name="namaPelanggan"
            value={formData.namaPelanggan}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">--Pilih Nama--</option>
            {pelanggan.map((nama, index) => (
              <option key={index} value={nama}>
                {nama}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Jenis Laundry</label>
          <select
            name="jenisLaundry"
            value={formData.jenisLaundry}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">--Pilih Jenis--</option>
            {layanan.map((item, index) => (
              <option key={index} value={item.jenis}>
                {item.jenis}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Tarif (Hari)</label>
          <input
            type="text"
            name="tarif"
            value={formData.tarif}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label>Tgl. Selesai</label>
          <input
            type="text"
            name="tglSelesai"
            value={formData.tglSelesai}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label>Jumlah (Kg)</label>
          <input
            type="number"
            name="jumlahKg"
            value={formData.jumlahKg}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Total Bayar</label>
          <input
            type="text"
            name="totalBayar"
            value={formData.totalBayar}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="col-span-2">
          <label>Catatan</label>
          <textarea
            name="catatan"
            value={formData.catatan}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Lunas">Lunas</option>
            <option value="Belum Lunas">Belum Lunas</option>
          </select>
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Tambah
        </button>
        <button
          onClick={onKembali}
          className="bg-gray-500 text-white py-2 px-4 rounded"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}

export default function DataTransaksi() {
  const [data, setData] = useState([
    {
      id: 1,
      pelanggan: "John ",
      jenis_layanan: "Cuci Kering",
      tgl_terima: "2024-10-01",
      tgl_selesai: "2024-10-03",
      status_pembayaran: "Lunas",
      total: 50000,
    },
  ]);
  const [isTambahTransaksiVisible, setTambahTransaksiVisible] = useState(false);

  const tambahData = (formData) => {
    const newId = data.length + 1;
    const newData = {
      id: newId,
      pelanggan: formData.namaPelanggan,
      jenis_layanan: formData.jenisLaundry,
      tgl_terima: new Date().toISOString().split("T")[0],
      tgl_selesai: formData.tglSelesai,
      status_pembayaran: formData.status,
      total: formData.totalBayar,
    };
    setData([...data, newData]);
  };

  return (
    <DashboarLayout menu={5} title={"Transaksi Laundry"}>
      {isTambahTransaksiVisible ? (
        <TambahTransaksi
          onKembali={() => setTambahTransaksiVisible(false)}
          onTambahData={tambahData}
        />
      ) : (
        <BoxContent className="p-5 border-[#d4bdd2a1]">
          <div className="flex justify-between mb-5">
            <Button
              className="w-[150px] px-1"
              label="Tambah Transaksi Laundry"
              onClick={() => setTambahTransaksiVisible(true)}
            />
          </div>
          <TableComponent
            data={data}
            columns={[
              { Header: "ID", accessor: "id" },
              { Header: "Pelanggan", accessor: "pelanggan" },
              { Header: "Jenis Layanan", accessor: "jenis_layanan" },
              { Header: "Tgl. Terima", accessor: "tgl_terima" },
              { Header: "Tgl. Selesai", accessor: "tgl_selesai" },
              { Header: "Status", accessor: "status_pembayaran" },
              { Header: "Total Bayar", accessor: (row) => `Rp. ${row.total}` },
            ]}
          />
        </BoxContent>
      )}
    </DashboarLayout>
  );
}
