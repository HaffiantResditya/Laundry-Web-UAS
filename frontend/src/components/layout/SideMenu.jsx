import logo from "../../assets/img/logo.png";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaUser } from "react-icons/fa";
import { RiServiceFill } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { BiSolidReport } from "react-icons/bi";

const ListMenu = ({ label, href, icon, active = false, onClick = false }) => {
  return (
    <a
      onClick={() => (onClick ? onClick() : "")}
      href={href}
      className="flex items-center text-white p-2 rounded-md mb-2 hover:opacity-80"
      style={{ background: active ? "#C9D454" : "#541E50" }}
    >
      {icon}
      <p className="pl-4 ">{label}</p>
    </a>
  );
};

export default function SideMenu({ menu = 1 }) {
  const navigate = useNavigate(); // Inisialisasi navigate

  return (
    <div className="hidden bg-[#541E50] w-[20%] min-w-[350px] max-w-[350px] items-center lg:flex flex-col">
      <section>
        <img src={logo} className="w-[200px] h-[200px]" alt="logo.png" />
      </section>
      <section className="flex-1 w-full p-5">
        <ListMenu
          icon={<MdDashboard />}
          label={"Dashboard"}
          href={"/dash"}
          active={menu === 1}
        />
        <ListMenu
          icon={<FaUsers />}
          label={"Data Pelanggan"}
          href={"/pelanggan"}
          active={menu === 2}
        />
        <ListMenu
          icon={<FaUser />}
          label={"Data User"}
          href={"/user"}
          active={menu === 3}
        />
        <ListMenu
          icon={<RiServiceFill />}
          label={"Jenis Layanan"}
          href={"/layanan"}
          active={menu === 4}
        />
        <ListMenu
          icon={<MdShoppingCart />}
          label={"Transaksi Laundry"}
          href={"/transaksi"}
          active={menu === 5}
        />
        <ListMenu
          icon={<FaMoneyBillTransfer />}
          label={"Data Pengeluaran"}
          href={"/pengeluaran"}
          active={menu === 6}
        />
        <ListMenu
          icon={<BiSolidReport />}
          label={"Data Laporan"}
          href={"/data-laporan"}
          active={menu === 7}
        />
        <ListMenu
          icon={<IoLogOut />}
          label={"Logout"}
          href={"#"}
          onClick={() =>
            Swal.fire({
              title: "Anda Yakin ingin Logout?",
              showDenyButton: false,
              showCancelButton: true,
              confirmButtonText: "Yes",
              denyButtonText: "Don't save",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire("Anda Berhasil Logout!", "", "success").then(() => {
                  navigate("/"); // Redirect ke halaman login setelah logout
                });
              }
            })
          }
          active={menu === 8}
        />
      </section>
    </div>
  );
}
