import { FaUsers } from "react-icons/fa";
import DashboarLayoutKasir from "../components/layout/DashboarLayoutKasir";
import { MdShoppingCart } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";


const BoxItem = ({ icon, val, label }) => {
  return (
    <div className="w-[100%] sm:w-[48%] bg-white p-5 xl:w-[23%] shadow-sm h-[100px] mb-5 flex items-center justify-between border-r-[15px] border-[#541E50]">
      <section className="w-[50px] h-[50px] text-[#541E50] bg-[#541E50] items-center flex justify-center bg-opacity-20 rounded-full border-2 border-[#541E50] border-opacity-30">
        {icon}
      </section>
      <section className="text-center">
        <p className="text-[20px] font-bold">{val}</p>
        <p className="text-[12px] text-gray-400">{label}</p>
      </section>
    </div>
  );
};

export default function HomeKasir() {
  return (
    <DashboarLayoutKasir menu={1} title={"Dashboard"}>
      <section className="flex justify-between mt-5 flex-wrap flex-row">
        <BoxItem
          icon={<FaUsers />}
          val={5}
          label={"Data Pelanggan"} />
        <BoxItem
          icon={<MdShoppingCart />}
          val={1}
          label={"Transaksi Laundry"}
        />
        <BoxItem
          icon={<FaMoneyBillTransfer />}
          val={3}
          label={"Data Pengeluaran"}
        />
        <BoxItem
          icon={<BiSolidReport />}
          val={5}
          label={"Data Laporan"}
        />
      </section>
    </DashboarLayoutKasir>
  );
}
