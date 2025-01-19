import { useState } from "react";
import Button from "../components/common/Button";
import TableComponent from "../components/common/table/Table";
import BoxContent from "../components/layout/BoxContent";
import DashboarLayoutKasir from "../components/layout/DashboarLayoutKasir";
import { RiArrowUpDownFill } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { AiOutlinePrinter } from "react-icons/ai";
import { AiOutlineFile } from "react-icons/ai";

export default function DataLaporanKasir() {
    const initialData = [
        { no: 1, tanggal: "2024-11-01", keterangan: "pemasukan", catatan: "Penerimaan pembayaran dari pelanggan untuk 5 kg pakaian", pemasukan: 75000, pengeluaran: 0 },
        { no: 2, tanggal: "2024-11-02", keterangan: "pengeluaran", catatan: "Pembelian deterjen dan pewangi untuk operasional", pemasukan: 0, pengeluaran: 50000 },
        { no: 3, tanggal: "2024-11-03", keterangan: "pemasukan", catatan: "Pembayaran dari pelanggan untuk layanan setrika 3 kg", pemasukan: 30000, pengeluaran: 0 },
        { no: 4, tanggal: "2024-11-04", keterangan: "pengeluaran", catatan: "Pembayaran tagihan listrik bulan ini", pemasukan: 0, pengeluaran: 150000 },
        { no: 5, tanggal: "2024-11-05", keterangan: "pemasukan", catatan: "Layanan premium (cuci dan setrika) untuk 10 kg pakaian", pemasukan: 200000, pengeluaran: 0 },
    ];

    const [data, setData] = useState(initialData);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [dailyData, setDailyData] = useState([]);

    const filteredData = data.filter((item) => {
        const itemDate = new Date(item.tanggal);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return (!start || itemDate >= start) && (!end || itemDate <= end);
    });

    const columns = [
        { Header: "No", accessor: "no" },
        { Header: "Tanggal", accessor: "tanggal" },
        { Header: "Keterangan", accessor: "keterangan" },
        { Header: "Catatan", accessor: "catatan" },
        { Header: "Pemasukan", accessor: (row) => `Rp. ${row.pemasukan.toLocaleString()}` },
        { Header: "Pengeluaran", accessor: (row) => `Rp. ${row.pengeluaran.toLocaleString()}` },
    ];

    const totalPemasukan = filteredData.reduce((total, item) => total + item.pemasukan, 0);
    const totalPengeluaran = filteredData.reduce((total, item) => total + item.pengeluaran, 0);

    const handlePrint = () => {
        const printWindow = window.open("", "_blank");
        const htmlContent = `  
      <html>  
        <head>  
          <title>Data Laporan Kasir</title>  
          <style>  
            body { font-family: Arial, sans-serif; margin: 20px; }  
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }  
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }  
            th { background-color: #f4f4f4; }  
          </style>  
        </head>  
        <body>  
          <h2>Data Laporan</h2>  
          <table>  
            <thead>  
              <tr>  
                <th>No</th>  
                <th>Tanggal</th>  
                <th>Keterangan</th>  
                <th>Catatan</th>  
                <th>Pemasukan</th>  
                <th>Pengeluaran</th>  
              </tr>  
            </thead>  
            <tbody>  
              ${filteredData
                .map(
                    (item) => `  
                  <tr>  
                    <td>${item.no}</td>  
                    <td>${item.tanggal}</td>  
                    <td>${item.keterangan}</td>  
                    <td>${item.catatan}</td>  
                    <td>Rp. ${item.pemasukan.toLocaleString()}</td>  
                    <td>Rp. ${item.pengeluaran.toLocaleString()}</td>  
                  </tr>  
                `
                )
                .join("")}  
            </tbody>  
          </table>  
        </body>  
      </html>  
    `;
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.print();
    };

    const handleDailyReport = () => {
        const today = new Date().toISOString().split("T")[0];
        const dailyData = data.filter((item) => item.tanggal === today);

        const printWindow = window.open("", "_blank");
        const htmlContent = `
      <html>
        <head>
          <title>Laporan Harian</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          <h2>Laporan Harian - ${today}</h2>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Keterangan</th>
                <th>Catatan</th>
                <th>Pemasukan</th>
                <th>Pengeluaran</th>
              </tr>
            </thead>
            <tbody>
              ${dailyData
                .map(
                    (item) => `
                  <tr>
                    <td>${item.no}</td>
                    <td>${item.tanggal}</td>
                    <td>${item.keterangan}</td>
                    <td>${item.catatan}</td>
                    <td>Rp. ${item.pemasukan.toLocaleString()}</td>
                    <td>Rp. ${item.pengeluaran.toLocaleString()}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <DashboarLayoutKasir menu={7} title={"Data Laporan Kasir"}>
            <BoxContent className="p-5 border-[#d4bdd2a1]">
                <div className="flex flex-col md:flex-row justify-between mb-5 items-start lg:items-center">
                    <div className="relative w-full flex gap-5">
                        <section className="flex items-center bg-gray-100 px-2 rounded-lg">
                            <p className="text-gray-500 font-bold mr-2">Tgl Awal</p>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="p-2 rounded-lg border"
                            />
                        </section>
                        <section className="flex items-center bg-gray-100 px-2 rounded-lg">
                            <p className="text-gray-500 font-bold mr-2">Tgl Akhir</p>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="p-2 rounded-lg border"
                            />
                        </section>
                        <Button
                            icon={<IoSearch />}
                            className="bg-[#541E50] text-white px-5 py-2"
                            label="Cari"
                        />
                    </div>
                    <div className="flex gap-3 mt-5 md:mt-0">
                        <Button
                            icon={<AiOutlinePrinter />}
                            className="bg-blue-500 text-white px-5 py-2"
                            label="Cetak"
                            onClick={handlePrint}
                        />
                        <Button
                            icon={<AiOutlineFile />}
                            className="bg-green-500 text-white px-5 py-2"
                            label="Laporan Harian"
                            onClick={handleDailyReport} // Memanggil fungsi untuk laporan harian  
                        />
                    </div>
                </div>
                <section className="flex flex-col md:flex-row justify-between gap-10 my-10">
                    <BoxValue value={totalPemasukan} label="Total Pemasukan" icon={<RiArrowUpDownFill className="text-green-500" />} />
                    <BoxValue value={totalPengeluaran} label="Total Pengeluaran" icon={<RiArrowUpDownFill className="text-red-500" />} />
                    <BoxValue value={totalPemasukan - totalPengeluaran} label="Saldo Akhir" icon={<GrMoney className="text-yellow-500" />} />
                </section>
                <TableComponent data={dailyData.length > 0 ? dailyData : filteredData} columns={columns} />
            </BoxContent>
        </DashboarLayoutKasir>
    );
}

function BoxValue({ value, icon, label }) {
    return (
        <div className="flex-1 py-5 bg-[#541E50] rounded-xl flex items-center justify-between px-4 lg:px-5">
            <div className="w-[50px] h-[50px] bg-white rounded-full flex justify-center items-center text-3xl">{icon}</div>
            <div className="text-right">
                <p className="text-yellow-500 text-lg font-bold">Rp. {value.toLocaleString()}</p>
                <p className="text-white text-sm">{label}</p>
            </div>
        </div>
    );
}  
