import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { BiSearch, BiSolidEdit, BiSolidTrash } from "react-icons/bi";
import Button from "../components/common/Button";
import TableComponent from "../components/common/table/Table";
import BoxContent from "../components/layout/BoxContent";
import DashboarLayout from "../components/layout/DashboarLayout";

export default function DataUser() {
  // Data dummy
  const initialData = [
    { username: "admin", password: "123", role: "admin" },
    { username: "user", password: "123", role: "kasir" },
  ];
  
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingUser, setIsAddingUser] = useState(false);
  
  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    { Header: "Username", accessor: "username" },
    { Header: "Password", accessor: "password" },
    { Header: "Role", accessor: "role" },
    {
      Header: "Aksi",
      accessor: () => (
        <div className="flex gap-3 justify-center">
          <button className="bg-[#541E50] text-white p-2 rounded-lg">
            <BiSolidEdit />
          </button>
          <button className="bg-red-500 text-white p-2 rounded-lg">
            <BiSolidTrash />
          </button>
        </div>
      ),
    },
  ];

  // Handler for adding a new user
  const handleAddUser = (newUser) => {
    setData([...data, newUser]);
    setIsAddingUser(false);
  };

  return (
    <DashboarLayout menu={3} title={"Data User"}>
      <BoxContent className="p-5 border-[#d4bdd2a1]">
        {isAddingUser ? (
          <TambahUserForm onAddUser={handleAddUser} onCancel={() => setIsAddingUser(false)} />
        ) : (
          <>
            <div className="flex justify-between mb-5">
              <Button className="w-[150px]" label="Tambah User" onClick={() => setIsAddingUser(true)} />
              <div className="relative w-[300px]">
                <input
                  type="text"
                  placeholder="Cari user..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-[#541E50] shadow-sm text-gray-700"
                />
                <BiSearch className="absolute left-3 top-4 text-gray-400" size={20} />
              </div>
            </div>
            <TableComponent data={filteredData} columns={columns} />
          </>
        )}
      </BoxContent>
    </DashboarLayout>
  );
}

function TambahUserForm({ onAddUser, onCancel }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Laki-laki");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Admin");

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = {
      username,
      password,
      role,
    };
    onAddUser(newUser);
  };

  return (
    <div className="p-6 border rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Tambah User</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Masukkan username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Masukkan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Retype password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Masukkan nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <div className="flex gap-4 items-center">
          <label>Jenis Kelamin:</label>
          <label>
            <input
              type="radio"
              checked={gender === "Laki-laki"}
              onChange={() => setGender("Laki-laki")}
            />
            Laki-laki
          </label>
          <label>
            <input
              type="radio"
              checked={gender === "Perempuan"}
              onChange={() => setGender("Perempuan")}
            />
            Perempuan
          </label>
        </div>
        <textarea
          placeholder="Masukkan alamat"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Masukkan No.Telp"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Admin">Admin</option>
          <option value="User">Kasir</option>
        </select>
      </div>
      <div className="flex gap-4 mt-4">
        <Button label="Tambah" onClick={handleSubmit} className=" text-white bg-[#541E50] rounded-lg" />
        <Button label="Kembali" onClick={onCancel} className=" bg-yellow-500 text-white" />
      </div>
    </div>
  );
}
