import { useState } from "react";
import logo from "../../assets/img/logo.png";
import Input from "../../components/common/input/Input";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const changePayload = (v, key) =>
    setPayload((prev) => {
      prev[key] = v;
      return { ...prev };
    });

  const handleLogin = () => {
    const { username, password } = payload;
    if (username === "admin" && password === "123") {
      navigate("/dash", { state: { role: "admin" } });
    } else if (username === "kasir" && password === "123") {
      navigate("/dash/kasir", { state: { role: "kasir" } });
    } else {
      setError("Username atau password Anda salah");
    }
  };

  return (
    <div className="w-full min-h-[100vh] bg-[#541E50] flex items-center justify-center">
      <section className="bg-white h-[450px] mx-auto w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] rounded-lg shadow flex flex-col items-center justify-center m-0">
        <img
          src={logo}
          className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full"
          alt="logo.png"
        />
        <section className="w-full px-5 md:px-20 pt-5">
          <Input
            val={payload.username}
            icon={<FaUser />}
            placeholder={"Username"}
            onChange={(v) => changePayload(v, "username")}
          />
          <Input
            val={payload.password}
            icon={<FaLock />}
            placeholder={"Password"}
            isPassword
            onChange={(v) => changePayload(v, "password")}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            onClick={handleLogin}
            className="h-[50px] w-full bg-[#541E50] rounded-lg text-white mt-5"
          >
            LOGIN
          </button>
        </section>
      </section>
    </div>
  );
}
