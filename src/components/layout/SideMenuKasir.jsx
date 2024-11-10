import logo from "../../assets/img/logo.png";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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

export default function SideMenuKasir({ menu = 1 }) {
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
          href={"/dash/kasir"}
          active={menu === 1}
        />
        <ListMenu
          icon={<FaUsers />}
          label={"Data Pelanggan"}
          href={"/pelanggan/kasir"}
          active={menu === 2}
        />
        <ListMenu
          icon={<MdShoppingCart />}
          label={"Transaksi Laundry"}
          href={"/transaksi/kasir"}
          active={menu === 5}
        />
        <ListMenu
          icon={<FaMoneyBillTransfer />}
          label={"Data Pengeluaran"}
          href={"/pengeluaran/kasir"}
          active={menu === 6}
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
          active={menu === 7}
        />
      </section>
    </div>
  );
}
