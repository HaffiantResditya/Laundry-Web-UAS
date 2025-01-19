import axios from "axios";

const baseUrl = "http://localhost:2025";
export const getPelanggan = async () => {
  const url = baseUrl + "/api/pelanggan";
  const res = await axios.get(url, {
    headers: { "Content-Type": "application/json" },
  });

  return res.data;
};
export const addPelanggan = async (data) => {
  const url = baseUrl + "/api/pelanggan";
  const res = await axios.post(url, data, {
    headers: { "Content-Type": "application/json" },
  });

  return res.data;
};
export const updatetPelanggan = async ({ data, id }) => {
  const url = baseUrl + `/api/pelanggan/${id}`;
  const res = await axios.put(url, data, {
    headers: { "Content-Type": "application/json" },
  });

  return res.data;
};
export const deletePelanggan = async (id) => {
  const url = baseUrl + `/api/pelanggan/${id}`;
  const res = await axios.delete(url, {
    headers: { "Content-Type": "application/json" },
  });

  return res.data;
};
