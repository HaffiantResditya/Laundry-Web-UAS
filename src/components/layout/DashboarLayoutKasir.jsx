import PropTypes from "prop-types";
import SideMenuKasir from "./SideMenuKasir";
import { TiThMenu } from "react-icons/ti";
import { FaClipboardUser } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import TitleContent from "../common/TitleContent";
import SideMenuMobile from "./SideMenuMobile";
import Swal from "sweetalert2";

const HeadBar = ({ setShow }) => {
  const [logoutBox, setLogoutBox] = useState(false);

  return (
    <div className="border h-[80px] bg-white flex items-center justify-between lg:justify-end px-5">
      <button
        onClick={() => setShow()}
        className="w-[50px] lg:hidden h-[50px] border justify-center items-center flex text-[20px] text-[#541E50] rounded-lg bg-gray-400 bg-opacity-5 shadow hover:border-2 cursor-pointer duration-500"
      >
        <TiThMenu />
      </button>
      <button
        onClick={() => setLogoutBox((prev) => (prev ? false : true))}
        className="border w-[50px] h-[50px] shadow rounded-full text-[25px] flex items-center justify-center text-[#541E50] hover:border-2 cursor-pointer duration-500"
      >
        <FaClipboardUser />
      </button>
      <section
        style={{ display: logoutBox ? "flex" : "none" }}
        className="absolute right-5 p-5 border bg-white top-[70px]"
      >
        <button
          onClick={() => {
            Swal.fire({
              title: "Anda Yakin ingin Logout?",
              showDenyButton: false,
              showCancelButton: true,
              confirmButtonText: "Yes",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire("Anda Berhasil Logout!", "", "success");
                setLogoutBox(false);
                // Logika untuk logout, seperti navigasi ulang ke halaman login
              }
            });
          }}
          className="flex items-center gap-2"
        >
          <IoLogOut />
          <p>Logout</p>
        </button>
      </section>
    </div>
  );
};

const FooterBar = () => {
  return (
    <footer className="bg-white flex items-center justify-center h-[70px] shadow-sm border-t text-[12px] text-gray-400">
      &copy; 2024 8Laundry - Kelompok 8
    </footer>
  );
};

function DashboarLayoutKasir({ children, menu = 1, title }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  const { role } = location.state || { role: "kasir" }; // Default ke 'kasir' jika tidak ada state

  return (
    <div className="bg-white h-[100vh] w-[100vw] flex flex-row">
      <SideMenuKasir menu={menu} role={role} />
      <SideMenuMobile show={mobileMenu} setShow={setMobileMenu} menu={menu} role={role} />
      <div className="border flex flex-col flex-1 bg-gray-50">
        <HeadBar setShow={() => setMobileMenu(true)} />
        <section className="flex-1 p-5">
          <TitleContent title={title} />
          {children}
        </section>
        <FooterBar />
      </div>
    </div>
  );
}

DashboarLayoutKasir.propTypes = {
  children: PropTypes.node,
};

export default DashboarLayoutKasir;
