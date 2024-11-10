import logo from "../../assets/img/logo.png";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaUser } from "react-icons/fa";
import { RiServiceFill } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import Swal from "sweetalert2";
import { IoLogOut } from "react-icons/io5";

const ListMenu = ({ label, href, icon, active = false, onClick = false }) => {
  return (
    <a
      href={href}
      onClick={() => (onClick ? onClick() : "")}
      className="flex items-center text-white p-2 rounded-md mb-2 hover:opacity-80"
      style={{ background: active ? "#C9D454" : "#541E50" }}
    >
      {icon}
      <p className="pl-4 ">{label}</p>
    </a>
  );
};

export default function SideMenuMobile({ menu = 1, show, setShow }) {
  return (
    <div
      style={{ marginLeft: show ? 0 : "-100%" }}
      className="absolute duration-300 flex bg-[#541E50] w-[100%] h-full items-center lg:hidden flex-col"
    >
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
          icon={<IoLogOut />}
          label={"Logout"}
          href={"#"}
          onClick={() =>
            Swal.fire({
              title: "Anda Yakin ingin Logout?",
              showDenyButton: false,
              showCancelButton: true,
              confirmButtonText: "Yes",
              denyButtonText: `Don't save`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                Swal.fire("Anda Berhasil Logout!", "", "success");
              }
            })
          }
          active={menu === 7}
        />
      </section>
      <button
        onClick={() => setShow(false)}
        className="h-[50px] w-[50px] bg-gray-100 absolute bottom-10 rounded-full bg-opacity-60 text-white shadow"
      >
        X
      </button>
    </div>
  );
}
